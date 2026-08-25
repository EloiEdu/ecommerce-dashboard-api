from pathlib import Path

import pandas as pd


DATA_DIR = Path(__file__).resolve().parent.parent / "raw"


def inspect_csv(file_path: Path) -> None:
    df = pd.read_csv(file_path)

    print(f"\n{'=' * 60}")
    print(f"Arquivo: {file_path.name}")
    print(f"Linhas: {len(df)}")
    print(f"Colunas: {len(df.columns)}")
    print("\nColunas:")
    print(df.columns.tolist())

    print("\nTipos:")
    print(df.dtypes)

    print("\nValores nulos:")
    print(df.isnull().sum())


def main() -> None:
    csv_files = sorted(DATA_DIR.glob("*.csv"))

    if not csv_files:
        print("Nenhum arquivo CSV encontrado.")
        return

    for file_path in csv_files:
        inspect_csv(file_path)


if __name__ == "__main__":
    main()