from crewai import Agent

warehouse_agent = Agent(
    role="Warehouse Agent",
    goal="Allocate nearest warehouse efficiently",
    backstory="Optimizes warehouse selection and inventory",
    verbose=True
)
