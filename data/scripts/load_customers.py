from pathlib import Path

import pandas as pd
import psycopg

from database import get_connection

ROOT_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = ROOT_DIR / "data" / "raw"



def load_customers() -> None:
    file_path = DATA_DIR / "olist_customers_dataset.csv"

    customers = pd.read_csv(file_path)

    required_columns = [
        "customer_id",
        "customer_unique_id",
        "customer_zip_code_prefix",
        "customer_city",
        "customer_state",
    ]

    missing_columns = [
        column
        for column in required_columns
        if column not in customers.columns
    ]

    if missing_columns:
        raise ValueError(
            f"Colunas obrigatórias ausentes: {missing_columns}"
        )

    if customers[required_columns].isnull().any().any():
        raise ValueError(
            "Existem valores nulos nas colunas obrigatórias de Customer."
        )

    rows = [
        (
            row.customer_id,
            row.customer_unique_id,
            row.customer_zip_code_prefix,
            row.customer_city,
            row.customer_state,
        )
        for row in customers.itertuples(index=False)
    ]

    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.executemany(
                """
                INSERT INTO "Customer" (
                    "customerId",
                    "customerUniqueId",
                    "zipCodePrefix",
                    "city",
                    "state"
                )
                VALUES (%s, %s, %s, %s, %s)
                """,
                rows,
            )

        connection.commit()

    print(f"{len(rows)} customers carregados com sucesso.")


if __name__ == "__main__":
    load_customers()