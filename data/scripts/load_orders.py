from pathlib import Path

import pandas as pd

from database import get_connection


ROOT_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = ROOT_DIR / "data" / "raw"


def load_orders() -> None:
    file_path = DATA_DIR / "olist_orders_dataset.csv"

    orders = pd.read_csv(file_path)

    required_columns = [
        "order_id",
        "customer_id",
        "order_status",
        "order_purchase_timestamp",
        "order_approved_at",
        "order_delivered_carrier_date",
        "order_delivered_customer_date",
        "order_estimated_delivery_date",
    ]

    missing_columns = [
        column
        for column in required_columns
        if column not in orders.columns
    ]

    if missing_columns:
        raise ValueError(
            f"Colunas obrigatórias ausentes: {missing_columns}"
        )

    orders["order_purchase_timestamp"] = pd.to_datetime(
        orders["order_purchase_timestamp"],
        errors="raise",
    )

    date_columns = [
        "order_approved_at",
        "order_delivered_carrier_date",
        "order_delivered_customer_date",
        "order_estimated_delivery_date",
    ]

    for column in date_columns:
        orders[column] = pd.to_datetime(
            orders[column],
            errors="coerce",
        )

    rows = [
        (
            row.order_id,
            row.customer_id,
            row.order_status,
            row.order_purchase_timestamp,
            row.order_approved_at,
            row.order_delivered_carrier_date,
            row.order_delivered_customer_date,
            row.order_estimated_delivery_date,
        )
        for row in orders.itertuples(index=False)
    ]

    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.executemany(
                """
                INSERT INTO "Order" (
                    "orderId",
                    "customerId",
                    "status",
                    "purchaseTimestamp",
                    "approvedAt",
                    "deliveredCarrierDate",
                    "deliveredCustomerDate",
                    "estimatedDeliveryDate"
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """,
                rows,
            )

        connection.commit()

    print(f"{len(rows)} orders carregados com sucesso.")


if __name__ == "__main__":
    load_orders()