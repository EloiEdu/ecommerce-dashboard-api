from pathlib import Path

import pandas as pd


DATA_DIR = Path(__file__).resolve().parent.parent / "raw"


def load_csv(filename: str) -> pd.DataFrame:
    return pd.read_csv(DATA_DIR / filename)


def check_duplicates(
    df: pd.DataFrame,
    columns: list[str],
    table_name: str,
) -> None:
    duplicated = df.duplicated(subset=columns).sum()

    if duplicated == 0:
        print(f"[OK] {table_name}: nenhuma duplicidade em {columns}.")
    else:
        print(
            f"[ERRO] {table_name}: "
            f"{duplicated} registros duplicados em {columns}."
        )


def check_reference(
    child_df: pd.DataFrame,
    child_column: str,
    parent_df: pd.DataFrame,
    parent_column: str,
    relationship: str,
) -> None:
    child_values = set(child_df[child_column].dropna())
    parent_values = set(parent_df[parent_column].dropna())

    missing = child_values - parent_values

    if not missing:
        print(f"[OK] {relationship}: todas as referências existem.")
    else:
        print(
            f"[ERRO] {relationship}: "
            f"{len(missing)} referências não encontradas."
        )


def inspect_review_duplicates(reviews: pd.DataFrame) -> None:
    duplicated_reviews = reviews[
        reviews.duplicated(subset=["review_id"], keep=False)
    ].sort_values("review_id")

    if duplicated_reviews.empty:
        print("[OK] Nenhum review_id duplicado encontrado.")
        return

    print("\n=== DETALHES DOS REVIEWS DUPLICADOS ===\n")

    print(
        f"Review IDs distintos: "
        f"{reviews['review_id'].nunique()}"
    )

    print(
        f"Review IDs duplicados: "
        f"{duplicated_reviews['review_id'].nunique()}"
    )

    print(
        f"Registros envolvidos: "
        f"{len(duplicated_reviews)}"
    )

    print("\nDistribuição das duplicidades:")

    print(
        duplicated_reviews["review_id"]
        .value_counts()
        .value_counts()
        .sort_index()
    )

    print("\nExemplos:")

    print(
        duplicated_reviews[
            [
                "review_id",
                "order_id",
                "review_score",
                "review_creation_date",
                "review_answer_timestamp",
            ]
        ]
        .head(20)
        .to_string(index=False)
    )


def main() -> None:
    print("\n=== CARREGANDO DATASETS ===\n")

    customers = load_csv("olist_customers_dataset.csv")
    orders = load_csv("olist_orders_dataset.csv")
    order_items = load_csv("olist_order_items_dataset.csv")
    products = load_csv("olist_products_dataset.csv")
    sellers = load_csv("olist_sellers_dataset.csv")
    payments = load_csv("olist_order_payments_dataset.csv")
    reviews = load_csv("olist_order_reviews_dataset.csv")

    print("Datasets carregados.\n")

    print("=== DUPLICIDADES ===\n")

    check_duplicates(
        customers,
        ["customer_id"],
        "customers.customer_id",
    )

    check_duplicates(
        orders,
        ["order_id"],
        "orders.order_id",
    )

    check_duplicates(
        products,
        ["product_id"],
        "products.product_id",
    )

    check_duplicates(
        sellers,
        ["seller_id"],
        "sellers.seller_id",
    )

    check_duplicates(
        order_items,
        ["order_id", "order_item_id"],
        "order_items.order_id + order_item_id",
    )

    check_duplicates(
        payments,
        ["order_id", "payment_sequential"],
        "payments.order_id + payment_sequential",
    )

    check_duplicates(
        reviews,
        ["review_id"],
        "reviews.review_id",
    )

    inspect_review_duplicates(reviews)

    print("\n=== INTEGRIDADE REFERENCIAL ===\n")

    check_reference(
        orders,
        "customer_id",
        customers,
        "customer_id",
        "orders.customer_id → customers.customer_id",
    )

    check_reference(
        order_items,
        "order_id",
        orders,
        "order_id",
        "order_items.order_id → orders.order_id",
    )

    check_reference(
        order_items,
        "product_id",
        products,
        "product_id",
        "order_items.product_id → products.product_id",
    )

    check_reference(
        order_items,
        "seller_id",
        sellers,
        "seller_id",
        "order_items.seller_id → sellers.seller_id",
    )

    check_reference(
        payments,
        "order_id",
        orders,
        "order_id",
        "payments.order_id → orders.order_id",
    )

    check_reference(
        reviews,
        "order_id",
        orders,
        "order_id",
        "reviews.order_id → orders.order_id",
    )


if __name__ == "__main__":
    main()