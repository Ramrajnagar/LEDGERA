from crewai import Crew, Task
from agents.supplier import supplier_agent
from agents.warehouse import warehouse_agent
from agents.transport import transport_agent
from agents.retailer import retailer_agent
from blockchain.ledger import ledger
from analytics.trust import calculate_trust
import logging
from typing import Dict, Any

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def run_workflow(order: Dict[str, Any]) -> Dict[str, Any]:
    """
    Execute the supply chain workflow with AI agents
    
    Args:
        order: Dictionary containing order details
        
    Returns:
        Dictionary with execution results, status, trust score, and blockchain data
    """
    try:
        logger.info(f"Starting workflow for order: {order}")
        
        # Log order to blockchain
        ledger.add_block({"event": "Order Received", "order": order})
        
        # Define agent tasks
        tasks = [
            Task(
                description=f"Select best supplier for order: {order.get('product', 'N/A')}. "
                           f"Consider cost, reliability, and distance.",
                agent=supplier_agent,
                expected_output="Selected supplier with justification"
            ),
            Task(
                description=f"Assign nearest warehouse to handle order for: {order.get('destination', 'N/A')}. "
                           f"Optimize for inventory availability and proximity.",
                agent=warehouse_agent,
                expected_output="Assigned warehouse with details"
            ),
            Task(
                description=f"Compute optimal delivery route from warehouse to: {order.get('destination', 'N/A')}. "
                           f"Minimize time and fuel cost.",
                agent=transport_agent,
                expected_output="Optimized route with estimated delivery time"
            ),
            Task(
                description=f"Confirm delivery and ensure customer satisfaction for order.",
                agent=retailer_agent,
                expected_output="Delivery confirmation and customer feedback"
            )
        ]
        
        # Create and execute crew
        crew = Crew(
            agents=[supplier_agent, warehouse_agent, transport_agent, retailer_agent],
            tasks=tasks,
            verbose=True
        )
        
        logger.info("Executing crew workflow...")
        result = crew.kickoff()
        logger.info("Crew workflow completed successfully")
        
        # Calculate trust score
        # TODO: Make these values dynamic based on actual performance
        trust_score = calculate_trust(92, 88, 95)
        
        # Log completion to blockchain
        ledger.add_block({
            "event": "Order Completed",
            "order_id": order.get("order_id", "N/A"),
            "trust_score": trust_score
        })
        
        return {
            "status": "success",
            "message": "Order processed successfully",
            "order_id": order.get("order_id", "N/A"),
            "delivery_status": "Delivered",
            "trust_score": trust_score,
            "workflow_result": str(result),
            "blockchain": ledger.get_chain()
        }
        
    except Exception as e:
        logger.error(f"Error in workflow execution: {str(e)}", exc_info=True)
        
        # Log error to blockchain
        try:
            ledger.add_block({
                "event": "Order Failed",
                "order": order,
                "error": str(e)
            })
        except:
            pass
        
        return {
            "status": "error",
            "message": f"Workflow execution failed: {str(e)}",
            "order_id": order.get("order_id", "N/A"),
            "blockchain": ledger.get_chain()
        }
