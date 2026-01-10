from crewai import Crew, Task
from agents.supplier import supplier_agent
from agents.warehouse import warehouse_agent
from agents.transport import transport_agent
from agents.retailer import retailer_agent
from blockchain.ledger import ledger
from analytics.trust import calculate_trust

def run_workflow(order):
    ledger.add_block({"event": "Order Received", "order": order})

    tasks = [
        Task(description="Select best supplier", agent=supplier_agent),
        Task(description="Assign nearest warehouse", agent=warehouse_agent),
        Task(description="Compute optimal delivery route", agent=transport_agent),
        Task(description="Confirm delivery", agent=retailer_agent)
    ]

    crew = Crew(
        agents=[supplier_agent, warehouse_agent, transport_agent, retailer_agent],
        tasks=tasks,
        verbose=True
    )

    crew.kickoff()

    trust = calculate_trust(92, 88, 95)

    ledger.add_block({"event": "Order Completed", "trust_score": trust})

    return {
        "status": "Delivered",
        "trust_score": trust,
        "ledger": ledger.chain
    }
