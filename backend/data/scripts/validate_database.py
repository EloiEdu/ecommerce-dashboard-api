from database import get_connection


TABLE_COUNTS = {
    "Customer": 99441,
    "Order": 99441,
    "Product": 32951,
    "Seller": 3095,
    "OrderItem": 112650,
    "Payment": 103886,
    "Review": 99224,
}


def validate_table_counts(connection) -> None:
    print("\n=== CONTAGEM DAS TABELAS ===\n")

    with connection.cursor() as cursor:
        for table, expected_count in TABLE_COUNTS.items():
            cursor.execute(
                f'SELECT COUNT(*) FROM "{table}"'
            )

            actual_count = cursor.fetchone()[0]

            if actual_count == expected_count:
                print(
                    f"[OK] {table}: {actual_count} registros."
                )
            else:
                print(
                    f"[ERRO] {table}: esperado "
                    f"{expected_count}, encontrado "
                    f"{actual_count}."
                )


def validate_foreign_keys(connection) -> None:
    print("\n=== INTEGRIDADE REFERENCIAL ===\n")

    validations = [
        (
            "Order → Customer",
            """
            SELECT COUNT(*)
            FROM "Order" o
            LEFT JOIN "Customer" c
                ON c."customerId" = o."customerId"
            WHERE c."customerId" IS NULL
            """,
        ),
        (
            "OrderItem → Order",
            """
            SELECT COUNT(*)
            FROM "OrderItem" oi
            LEFT JOIN "Order" o
                ON o."orderId" = oi."orderId"
            WHERE o."orderId" IS NULL
            """,
        ),
        (
            "OrderItem → Product",
            """
            SELECT COUNT(*)
            FROM "OrderItem" oi
            LEFT JOIN "Product" p
                ON p."productId" = oi."productId"
            WHERE p."productId" IS NULL
            """,
        ),
        (
            "OrderItem → Seller",
            """
            SELECT COUNT(*)
            FROM "OrderItem" oi
            LEFT JOIN "Seller" s
                ON s."sellerId" = oi."sellerId"
            WHERE s."sellerId" IS NULL
            """,
        ),
        (
            "Payment → Order",
            """
            SELECT COUNT(*)
            FROM "Payment" p
            LEFT JOIN "Order" o
                ON o."orderId" = p."orderId"
            WHERE o."orderId" IS NULL
            """,
        ),
        (
            "Review → Order",
            """
            SELECT COUNT(*)
            FROM "Review" r
            LEFT JOIN "Order" o
                ON o."orderId" = r."orderId"
            WHERE o."orderId" IS NULL
            """,
        ),
    ]

    with connection.cursor() as cursor:
        for name, query in validations:
            cursor.execute(query)

            invalid_count = cursor.fetchone()[0]

            if invalid_count == 0:
                print(f"[OK] {name}")
            else:
                print(
                    f"[ERRO] {name}: "
                    f"{invalid_count} referências inválidas."
                )


def validate_unique_constraints(connection) -> None:
    print("\n=== CHAVES E DUPLICIDADES ===\n")

    validations = [
        (
            "Customer.customerId",
            """
            SELECT COUNT(*)
            FROM (
                SELECT "customerId"
                FROM "Customer"
                GROUP BY "customerId"
                HAVING COUNT(*) > 1
            ) duplicates
            """,
        ),
        (
            "Order.orderId",
            """
            SELECT COUNT(*)
            FROM (
                SELECT "orderId"
                FROM "Order"
                GROUP BY "orderId"
                HAVING COUNT(*) > 1
            ) duplicates
            """,
        ),
        (
            "Product.productId",
            """
            SELECT COUNT(*)
            FROM (
                SELECT "productId"
                FROM "Product"
                GROUP BY "productId"
                HAVING COUNT(*) > 1
            ) duplicates
            """,
        ),
        (
            "Seller.sellerId",
            """
            SELECT COUNT(*)
            FROM (
                SELECT "sellerId"
                FROM "Seller"
                GROUP BY "sellerId"
                HAVING COUNT(*) > 1
            ) duplicates
            """,
        ),
        (
            "OrderItem.orderId + orderItemId",
            """
            SELECT COUNT(*)
            FROM (
                SELECT "orderId", "orderItemId"
                FROM "OrderItem"
                GROUP BY "orderId", "orderItemId"
                HAVING COUNT(*) > 1
            ) duplicates
            """,
        ),
        (
            "Payment.orderId + sequential",
            """
            SELECT COUNT(*)
            FROM (
                SELECT "orderId", "sequential"
                FROM "Payment"
                GROUP BY "orderId", "sequential"
                HAVING COUNT(*) > 1
            ) duplicates
            """,
        ),
    ]

    with connection.cursor() as cursor:
        for name, query in validations:
            cursor.execute(query)

            duplicate_count = cursor.fetchone()[0]

            if duplicate_count == 0:
                print(f"[OK] {name}")
            else:
                print(
                    f"[ERRO] {name}: "
                    f"{duplicate_count} duplicidades."
                )


def main() -> None:
    with get_connection() as connection:
        validate_table_counts(connection)
        validate_foreign_keys(connection)
        validate_unique_constraints(connection)


if __name__ == "__main__":
    main()