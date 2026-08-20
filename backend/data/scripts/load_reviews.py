from pathlib import Path

import pandas as pd

from database import get_connection


ROOT_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = ROOT_DIR / "data" / "raw"


def load_reviews() -> None:
    file_path = DATA_DIR / "olist_order_reviews_dataset.csv"

    reviews = pd.read_csv(file_path)

    required_columns = [
        "review_id",
        "order_id",
        "review_score",
        "review_creation_date",
        "review_answer_timestamp",
    ]

    missing_columns = [
        column
        for column in required_columns
        if column not in reviews.columns
    ]

    if missing_columns:
        raise ValueError(
            f"Colunas obrigatórias ausentes: {missing_columns}"
        )

    if reviews[required_columns].isnull().any().any():
        raise ValueError(
            "Existem valores nulos nas colunas obrigatórias de Review."
        )

    reviews["review_creation_date"] = pd.to_datetime(
        reviews["review_creation_date"],
        errors="raise",
    )

    reviews["review_answer_timestamp"] = pd.to_datetime(
        reviews["review_answer_timestamp"],
        errors="raise",
    )

    rows = [
        (
            row.review_id,
            row.order_id,
            row.review_score,
            row.review_creation_date,
            row.review_answer_timestamp,
        )
        for row in reviews.itertuples(index=False)
    ]

    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.executemany(
                """
                INSERT INTO "Review" (
                    "reviewId",
                    "orderId",
                    "score",
                    "creationDate",
                    "answerTimestamp"
                )
                VALUES (%s, %s, %s, %s, %s)
                """,
                rows,
            )

        connection.commit()

    print(f"{len(rows)} reviews carregados com sucesso.")


if __name__ == "__main__":
    load_reviews()