from crewai import Agent, LLM
import os

llm = LLM(
    model="gemini/gemini-1.5-flash-latest",
    temperature=0.3,
    api_key=os.getenv("GOOGLE_API_KEY")
)

supplier_agent = Agent(
    role="Supplier Agent",
    goal="Choose the most cost-effective and reliable supplier",
    backstory="Expert in supplier evaluation using cost, distance, and reliability",
    llm=llm,
    verbose=True
)
