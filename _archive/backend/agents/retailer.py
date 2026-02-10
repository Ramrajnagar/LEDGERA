from crewai import Agent, LLM
import os

llm = LLM(
    model="gemini/gemini-1.5-flash-latest",
    temperature=0.3,
    api_key=os.getenv("GOOGLE_API_KEY")
)

retailer_agent = Agent(
    role="Retailer Agent",
    goal="Ensure successful order fulfillment",
    backstory="Customer satisfaction specialist",
    llm=llm,
    verbose=True
)
