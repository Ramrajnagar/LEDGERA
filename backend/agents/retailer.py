from crewai import Agent

retailer_agent = Agent(
    role="Retailer Agent",
    goal="Ensure successful order fulfillment",
    backstory="Customer satisfaction specialist",
    verbose=True
)
