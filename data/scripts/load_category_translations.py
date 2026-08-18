from pathlib import Path

import pandas as pd

from database import get_connection


ROOT_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = ROOT_DIR / "data" / "raw"


def load_category_translations() -> None:
    file_path = DATA_DIR / "product_category_name_translation.csv"

    translations = pd.read_csv(file_path)

    required_columns = [
        "product_category_name",
        "product_category_name_english",
    ]

    missing_columns = [
        column
        for column in required_columns
        if column not in translations.columns
    ]

    if missing_columns:
        raise ValueError(
            f"Colunas obrigatórias ausentes: {missing_columns}"
        )

    if translations[required_columns].isnull().any().any():
        raise ValueError(
            "Existem valores nulos nas colunas de tradução."
        )

    if translations["product_category_name"].duplicated().any():
        raise ValueError(
            "Existem categorias duplicadas no arquivo de tradução."
        )

    rows = [
        (
            row.product_category_name,
            row.product_category_name_english,
        )
        for row in translations.itertuples(index=False)
    ]

    with get_connection() as connection:
        with connection.cursor() as cursor:
            for category_name, category_name_english in rows:
                cursor.execute(
                    """
                    UPDATE "Product"
                    SET "categoryNameEnglish" = %s
                    WHERE "categoryName" = %s
                    """,
                    (
                        category_name_english,
                        category_name,
                    ),
                )

        connection.commit()

    print(
        f"{len(rows)} traduções processadas com sucesso."
    )


if __name__ == "__main__":
    load_category_translations()