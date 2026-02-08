from crewai import Agent, LLM
import os

llm = LLM(
    model="gemini/gemini-1.5-flash-latest",
    temperature=0.2,
    api_key=os.getenv("GOOGLE_API_KEY")
)

transport_agent = Agent(
    role="Transport Agent",
    goal="Optimize route by minimizing time and fuel cost",
    backstory="Logistics optimization expert",
    llm=llm,
    verbose=True
)
