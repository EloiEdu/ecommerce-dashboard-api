from database import get_connection


def validate_orders(connection) -> None:
    print("\n=== ORDERS ===\n")

    queries = [
        (
            "Status nulo",
            """
            SELECT COUNT(*)
            FROM "Order"
            WHERE "status" IS NULL
            """,
        ),
        (
            "Data de compra nula",
            """
            SELECT COUNT(*)
            FROM "Order"
            WHERE "purchaseTimestamp" IS NULL
            """,
        ),
        (
            "Data de compra fora do intervalo",
            """
            SELECT COUNT(*)
            FROM "Order"
            WHERE "purchaseTimestamp" < '2016-01-01'
               OR "purchaseTimestamp" > '2020-01-01'
            """,
        ),
    ]

    with connection.cursor() as cursor:
        for name, query in queries:
            cursor.execute(query)
            count = cursor.fetchone()[0]

            if count == 0:
                print(f"[OK] {name}")
            else:
                print(f"[ERRO] {name}: {count}")


def validate_products(connection) -> None:
    print("\n=== PRODUCTS ===\n")

    queries = [
        (
            "Preço negativo",
            """
            SELECT COUNT(*)
            FROM "OrderItem"
            WHERE "price" < 0
            """,
        ),
        (
            "Frete negativo",
            """
            SELECT COUNT(*)
            FROM "OrderItem"
            WHERE "freightValue" < 0
            """,
        ),
        (
            "Score fora do intervalo 1-5",
            """
            SELECT COUNT(*)
            FROM "Review"
            WHERE "score" < 1
               OR "score" > 5
            """,
        ),
    ]

    with connection.cursor() as cursor:
        for name, query in queries:
            cursor.execute(query)
            count = cursor.fetchone()[0]

            if count == 0:
                print(f"[OK] {name}")
            else:
                print(f"[ERRO] {name}: {count}")


def validate_payments(connection) -> None:
    print("\n=== PAYMENTS ===\n")

    queries = [
        (
            "Valor negativo",
            """
            SELECT COUNT(*)
            FROM "Payment"
            WHERE "value" < 0
            """,
        ),
        (
            "Parcelas menores que 1",
            """
            SELECT COUNT(*)
            FROM "Payment"
            WHERE "installments" < 1
            """,
        ),
    ]

    with connection.cursor() as cursor:
        for name, query in queries:
            cursor.execute(query)
            count = cursor.fetchone()[0]

            if name == "Parcelas menores que 1":
                if count == 2:
                    print(
                        "[ATENÇÃO] 2 pagamentos possuem "
                        "installments = 0, conforme encontrado no dataset."
                    )
                elif count == 0:
                    print(f"[OK] {name}")
                else:
                    print(f"[ERRO] {name}: {count}")
            elif count == 0:
                print(f"[OK] {name}")
            else:
                print(f"[ERRO] {name}: {count}")


def validate_categories(connection) -> None:
    print("\n=== CATEGORIES ===\n")

    query = """
        SELECT COUNT(DISTINCT "categoryName")
        FROM "Product"
        WHERE "categoryName" IS NOT NULL
          AND "categoryNameEnglish" IS NULL
    """

    with connection.cursor() as cursor:
        cursor.execute(query)
        count = cursor.fetchone()[0]

    if count == 2:
        print(
            "[OK] 2 categorias sem tradução, "
            "conforme identificado no dataset."
        )
    else:
        print(
            f"[ATENÇÃO] Esperadas 2 categorias sem tradução, "
            f"encontradas {count}."
        )


def main() -> None:
    with get_connection() as connection:
        validate_orders(connection)
        validate_products(connection)
        validate_payments(connection)
        validate_categories(connection)


if __name__ == "__main__":
    main()