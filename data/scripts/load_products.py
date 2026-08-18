from pathlib import Path

import pandas as pd

from database import get_connection


ROOT_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = ROOT_DIR / "data" / "raw"


def load_products() -> None:
    file_path = DATA_DIR / "olist_products_dataset.csv"

    products = pd.read_csv(file_path)

    required_columns = [
        "product_id",
        "product_category_name",
        "product_name_lenght",
        "product_description_lenght",
        "product_photos_qty",
        "product_weight_g",
        "product_length_cm",
        "product_height_cm",
        "product_width_cm",
    ]

    missing_columns = [
        column
        for column in required_columns
        if column not in products.columns
    ]

    if missing_columns:
        raise ValueError(
            f"Colunas obrigatórias ausentes: {missing_columns}"
        )

    integer_columns = [
        "product_name_lenght",
        "product_description_lenght",
        "product_photos_qty",
        "product_weight_g",
        "product_length_cm",
        "product_height_cm",
        "product_width_cm",
    ]

    for column in integer_columns:
        products[column] = products[column].astype("Int64")

    products = products.astype(object).where(pd.notna(products), None)

    rows = [
        (
            row.product_id,
            row.product_category_name,
            None,
            row.product_name_lenght,
            row.product_description_lenght,
            row.product_photos_qty,
            row.product_weight_g,
            row.product_length_cm,
            row.product_height_cm,
            row.product_width_cm,
        )
        for row in products.itertuples(index=False)
    ]

    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.executemany(
                """
                INSERT INTO "Product" (
                    "productId",
                    "categoryName",
                    "categoryNameEnglish",
                    "nameLength",
                    "descriptionLength",
                    "photosQuantity",
                    "weightGrams",
                    "lengthCm",
                    "heightCm",
                    "widthCm"
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """,
                rows,
            )

        connection.commit()

    print(f"{len(rows)} products carregados com sucesso.")


if __name__ == "__main__":
    load_products()