from decimal import Decimal
from pathlib import Path

import pandas as pd

from database import get_connection


ROOT_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = ROOT_DIR / "data" / "raw"


def load_order_items() -> None:
    file_path = DATA_DIR / "olist_order_items_dataset.csv"

    order_items = pd.read_csv(file_path)

    required_columns = [
        "order_id",
        "order_item_id",
        "product_id",
        "seller_id",
        "shipping_limit_date",
        "price",
        "freight_value",
    ]

    missing_columns = [
        column
        for column in required_columns
        if column not in order_items.columns
    ]

    if missing_columns:
        raise ValueError(
            f"Colunas obrigatórias ausentes: {missing_columns}"
        )

    if order_items[required_columns].isnull().any().any():
        raise ValueError(
            "Existem valores nulos nas colunas obrigatórias de OrderItem."
        )

    order_items["shipping_limit_date"] = pd.to_datetime(
        order_items["shipping_limit_date"],
        errors="raise",
    )

    rows = [
        (
            row.order_id,
            row.order_item_id,
            row.product_id,
            row.seller_id,
            row.shipping_limit_date,
            Decimal(str(row.price)),
            Decimal(str(row.freight_value)),
        )
        for row in order_items.itertuples(index=False)
    ]

    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.executemany(
                """
                INSERT INTO "OrderItem" (
                    "orderId",
                    "orderItemId",
                    "productId",
                    "sellerId",
                    "shippingLimitDate",
                    "price",
                    "freightValue"
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """,
                rows,
            )

        connection.commit()

    print(f"{len(rows)} order items carregados com sucesso.")


if __name__ == "__main__":
    load_order_items()