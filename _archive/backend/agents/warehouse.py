from crewai import Agent, LLM
import os

llm = LLM(
    model="gemini/gemini-1.5-flash-latest",
    temperature=0.3,
    api_key=os.getenv("GOOGLE_API_KEY")
)

warehouse_agent = Agent(
    role="Warehouse Agent",
    goal="Allocate nearest warehouse efficiently",
    backstory="Optimizes warehouse selection and inventory",
    llm=llm,
    verbose=True
)
