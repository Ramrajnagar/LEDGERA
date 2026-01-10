from crewai import Agent
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.2)

transport_agent = Agent(
    role="Transport Agent",
    goal="Optimize route by minimizing time and fuel cost",
    backstory="Logistics optimization expert",
    llm=llm,
    verbose=True
)
