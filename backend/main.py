from fastapi import FastAPI, WebSocket, HTTPException, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import os

# Workaround for CrewAI's mandatory OpenAI key check
if not os.getenv("OPENAI_API_KEY"):
    os.environ["OPENAI_API_KEY"] = "na"

from workflow.orchestrator import run_workflow
from blockchain.ledger import ledger
from agents.supplier import supplier_agent
from agents.warehouse import warehouse_agent
from agents.transport import transport_agent
from agents.retailer import retailer_agent
from config import settings
import asyncio
import logging
from typing import Dict, Any, List
from pydantic import BaseModel

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Decentralized Supply Chain Orchestrator with AI Agents and Blockchain",
    debug=settings.debug
)

# Configure CORS
origins = settings.cors_origins
allow_all = "*" in origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=not allow_all, # credentials cannot be True when allow_origins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request validation
class OrderRequest(BaseModel):
    """Order request model"""
    order_id: str
    product: str
    quantity: int
    destination: str
    customer_name: str = "Unknown"

class ConnectionManager:
    """WebSocket connection manager"""
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info(f"WebSocket connected. Total connections: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        logger.info(f"WebSocket disconnected. Total connections: {len(self.active_connections)}")

    async def broadcast(self, message: dict):
        """Broadcast message to all connected clients"""
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception as e:
                logger.error(f"Error broadcasting to websocket: {e}")

manager = ConnectionManager()

# API Endpoints

@app.get("/", tags=["Root"])
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to Decentralized Supply Chain Orchestrator API",
        "version": settings.app_version,
        "docs": "/docs"
    }

@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": settings.app_name,
        "blockchain_valid": ledger.is_chain_valid(),
        "blockchain_length": len(ledger.chain)
    }

@app.get("/agents", tags=["Agents"])
async def get_agents():
    """Get information about all AI agents"""
    try:
        agents_info = [
            {
                "role": supplier_agent.role,
                "goal": supplier_agent.goal,
                "backstory": supplier_agent.backstory
            },
            {
                "role": warehouse_agent.role,
                "goal": warehouse_agent.goal,
                "backstory": warehouse_agent.backstory
            },
            {
                "role": transport_agent.role,
                "goal": transport_agent.goal,
                "backstory": transport_agent.backstory
            },
            {
                "role": retailer_agent.role,
                "goal": retailer_agent.goal,
                "backstory": retailer_agent.backstory
            }
        ]
        return {
            "status": "success",
            "agents": agents_info,
            "count": len(agents_info)
        }
    except Exception as e:
        logger.error(f"Error fetching agents: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/order", tags=["Orders"])
async def create_order(order: OrderRequest):
    """Create and process a new order through the agent workflow"""
    try:
        logger.info(f"Received order: {order.order_id}")
        
        # Convert to dict for processing
        order_dict = order.model_dump()
        
        # Run the workflow
        result = run_workflow(order_dict)
        
        # Broadcast to connected WebSocket clients
        await manager.broadcast({
            "type": "order_update",
            "order_id": order.order_id,
            "status": result.get("status"),
            "message": "Order processed"
        })
        
        return result
        
    except Exception as e:
        logger.error(f"Error processing order: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/blockchain", tags=["Blockchain"])
async def get_blockchain():
    """Get the entire blockchain"""
    try:
        return {
            "status": "success",
            "chain": ledger.get_chain(),
            "length": len(ledger.chain),
            "is_valid": ledger.is_chain_valid()
        }
    except Exception as e:
        logger.error(f"Error fetching blockchain: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/blockchain/{block_index}", tags=["Blockchain"])
async def get_block(block_index: int):
    """Get a specific block by index"""
    try:
        block = ledger.get_block_by_index(block_index)
        if block is None:
            raise HTTPException(status_code=404, detail="Block not found")
        return {
            "status": "success",
            "block": block
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching block: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.websocket("/ws/tracking")
async def tracking_socket(websocket: WebSocket):
    """WebSocket endpoint for real-time order tracking"""
    await manager.connect(websocket)
    try:
        # Send initial connection message
        await websocket.send_json({
            "type": "connection",
            "status": "connected",
            "message": "Connected to tracking system"
        })
        
        # Simulate order stages for demo
        stages = [
            {"stage": "Supplier", "status": "Selecting best supplier", "progress": 25},
            {"stage": "Warehouse", "status": "Assigning warehouse", "progress": 50},
            {"stage": "Transport", "status": "Optimizing route", "progress": 75},
            {"stage": "Out for Delivery", "status": "Package in transit", "progress": 90},
            {"stage": "Delivered", "status": "Order delivered successfully", "progress": 100}
        ]
        
        for stage_info in stages:
            await websocket.send_json({
                "type": "tracking_update",
                **stage_info
            })
            await asyncio.sleep(2)
        
        # Keep connection alive and listen for messages
        while True:
            try:
                data = await websocket.receive_text()
                logger.info(f"Received WebSocket message: {data}")
                await websocket.send_json({
                    "type": "echo",
                    "message": f"Received: {data}"
                })
            except WebSocketDisconnect:
                break
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        logger.info("WebSocket disconnected")
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug
    )
