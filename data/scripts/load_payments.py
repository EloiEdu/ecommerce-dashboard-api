from decimal import Decimal
from pathlib import Path

import pandas as pd

from database import get_connection


ROOT_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = ROOT_DIR / "data" / "raw"


def load_payments() -> None:
    file_path = DATA_DIR / "olist_order_payments_dataset.csv"

    payments = pd.read_csv(file_path)

    required_columns = [
        "order_id",
        "payment_sequential",
        "payment_type",
        "payment_installments",
        "payment_value",
    ]

    missing_columns = [
        column
        for column in required_columns
        if column not in payments.columns
    ]

    if missing_columns:
        raise ValueError(
            f"Colunas obrigatórias ausentes: {missing_columns}"
        )

    if payments[required_columns].isnull().any().any():
        raise ValueError(
            "Existem valores nulos nas colunas obrigatórias de Payment."
        )

    rows = [
        (
            row.order_id,
            row.payment_sequential,
            row.payment_type,
            row.payment_installments,
            Decimal(str(row.payment_value)),
        )
        for row in payments.itertuples(index=False)
    ]

    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.executemany(
                """
                INSERT INTO "Payment" (
                    "orderId",
                    "sequential",
                    "type",
                    "installments",
                    "value"
                )
                VALUES (%s, %s, %s, %s, %s)
                """,
                rows,
            )

        connection.commit()

    print(f"{len(rows)} payments carregados com sucesso.")


if __name__ == "__main__":
    load_payments()