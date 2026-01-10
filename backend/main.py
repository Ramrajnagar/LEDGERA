from fastapi import FastAPI, WebSocket
from workflow.orchestrator import run_workflow
import asyncio

app = FastAPI()

@app.websocket("/ws/tracking")
async def tracking_socket(ws: WebSocket):
    await ws.accept()
    stages = ["Supplier", "Warehouse", "Transport", "Out for Delivery", "Delivered"]
    for stage in stages:
        await ws.send_json({"status": stage})
        await asyncio.sleep(2)
    await ws.close()

@app.post("/order")
def create_order(order: dict):
    return run_workflow(order)
