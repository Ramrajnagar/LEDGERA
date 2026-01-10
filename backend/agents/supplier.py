from crewai import Agent
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3)

supplier_agent = Agent(
    role="Supplier Agent",
    goal="Choose the most cost-effective and reliable supplier",
    backstory="Expert in supplier evaluation using cost, distance, and reliability",
    llm=llm,
    verbose=True
)
