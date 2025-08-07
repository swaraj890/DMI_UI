from dotenv import load_dotenv
load_dotenv()

from langchain.agents import initialize_agent, AgentType
from langchain.memory import ConversationBufferMemory
from langchain.chat_models import AzureChatOpenAI
# from data_migration import DataMigrationTool  # ← import custom tool
from data_migration_sqlite import DataMigrationTool  # Importing the SQLite migration tool

# Initialize LLM
llm = AzureChatOpenAI(
    deployment_name="Med-GPT",
    model_name="gpt-3.5-turbo",
    temperature=0,
)

# Add our custom tool
tools = [DataMigrationTool()]

# Conversation memory
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

# Initialize agent
agent_chain = initialize_agent(
    tools,
    llm,
    agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
    verbose=True,
    memory=memory,
    max_iterations=3
)

# Run conversation with dynamic tool use
response = agent_chain.run(input="Migrate data from countries.csv.")
print(response)
