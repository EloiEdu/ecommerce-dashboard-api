from pathlib import Path

import pandas as pd

from database import get_connection


ROOT_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = ROOT_DIR / "data" / "raw"


def load_sellers() -> None:
    file_path = DATA_DIR / "olist_sellers_dataset.csv"

    sellers = pd.read_csv(file_path)

    required_columns = [
        "seller_id",
        "seller_zip_code_prefix",
        "seller_city",
        "seller_state",
    ]

    missing_columns = [
        column
        for column in required_columns
        if column not in sellers.columns
    ]

    if missing_columns:
        raise ValueError(
            f"Colunas obrigatórias ausentes: {missing_columns}"
        )

    if sellers[required_columns].isnull().any().any():
        raise ValueError(
            "Existem valores nulos nas colunas obrigatórias de Seller."
        )

    rows = [
        (
            row.seller_id,
            row.seller_zip_code_prefix,
            row.seller_city,
            row.seller_state,
        )
        for row in sellers.itertuples(index=False)
    ]

    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.executemany(
                """
                INSERT INTO "Seller" (
                    "sellerId",
                    "zipCodePrefix",
                    "city",
                    "state"
                )
                VALUES (%s, %s, %s, %s)
                """,
                rows,
            )

        connection.commit()

    print(f"{len(rows)} sellers carregados com sucesso.")


if __name__ == "__main__":
    load_sellers()