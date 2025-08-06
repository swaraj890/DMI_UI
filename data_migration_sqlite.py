from langchain.tools import BaseTool
from typing import Type
from pydantic import BaseModel, Field
import pandas as pd
import sqlite3
import os
import re

# Input schema
class DataMigrationInput(BaseModel):
    query: str = Field(..., description="Instruction like 'Migrate data from file.csv to table table_name'")

class DataMigrationTool(BaseTool):
    name: str = "data_migration_tool"
    description: str = (
        "Migrates data from CSV or Excel to SQLite. "
        "Provide a prompt like 'Migrate data from file.csv to table table_name'."
    )
    args_schema: Type[BaseModel] = DataMigrationInput

    def _run(self, query: str) -> str:
        try:
            # Extract file_path and table_name
            match = re.search(r"from\s+([^\s]+)(?:\s+to\s+table\s+([^\s]+))?", query)
            if not match:
                return "Could not parse input. Use: 'Migrate data from <file> to table <table_name>'."

            file_path = os.path.abspath(match.group(1))
            table_name = match.group(2) or os.path.splitext(os.path.basename(file_path))[0]

            # Load file
            if file_path.endswith(".csv"):
                df = pd.read_csv(file_path)
            elif file_path.endswith((".xls", ".xlsx")):
                df = pd.read_excel(file_path)
            else:
                return "Unsupported file format. Use CSV or XLS/XLSX."

            # SQLite connection (creates db file if it doesn't exist)
            db_path = os.path.join(os.getcwd(), "data.db")
            conn = sqlite3.connect(db_path)
            cursor = conn.cursor()

            # Drop table if exists
            cursor.execute(f'DROP TABLE IF EXISTS "{table_name}"')

            # Create table with TEXT columns
            columns = ", ".join([f'"{col}" TEXT' for col in df.columns])
            cursor.execute(f'CREATE TABLE "{table_name}" ({columns})')

            # Insert data
            for _, row in df.iterrows():
                values = "', '".join(str(val).replace("'", "''") for val in row.tolist())
                cursor.execute(f"INSERT INTO \"{table_name}\" VALUES ('{values}')")

            conn.commit()
            cursor.close()
            conn.close()

            return f"Data from {file_path} migrated to SQLite table '{table_name}' in database '{db_path}'"

        except Exception as e:
            return f"Data migration failed: {e}"

    def _arun(self, query: str):
        raise NotImplementedError("Async not supported.")
