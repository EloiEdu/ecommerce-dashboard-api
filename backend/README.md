# E-commerce Dashboard API

API Backend para um dashboard analítico de e-commerce desenvolvido com **NestJS**, **PostgreSQL** e **Prisma**, utilizando o Brazilian E-Commerce Public Dataset by Olist como fonte de dados.

O projeto tem como objetivo construir uma API REST capaz de disponibilizar métricas de vendas e comportamento do e-commerce para consumo por um dashboard.

## Sobre o projeto

O projeto combina desenvolvimento backend e conceitos de engenharia de dados.

O foco principal está na construção de uma API organizada e escalável, enquanto os dados do dataset são processados, validados e carregados em um banco PostgreSQL para serem utilizados pelas consultas analíticas.

Entre as métricas disponibilizadas estão:

* GMV
* quantidade de pedidos
* ticket médio
* vendas por categoria
* pedidos por categoria
* vendas por status
* pedidos por status
* métricas por estado
* métricas mensais
* vendas por estado do vendedor
* quantidade de itens por categoria

## Tecnologias

### Backend

* Node.js
* TypeScript
* NestJS
* Prisma
* PostgreSQL
* REST API

### Data Engineering

* Python
* Pandas
* PostgreSQL
* Scripts de validação e carga de dados
* Brazilian E-Commerce Public Dataset by Olist

### Ferramentas

* Git
* GitHub
* ESLint
* Prettier
* Jest

## Arquitetura

A aplicação é organizada em módulos seguindo a estrutura do NestJS.

```text
src/
├── dashboard/
│   ├── interfaces/
│   │   └── dashboard.interface.ts
│   ├── dashboard.controller.ts
│   ├── dashboard.service.ts
│   └── dashboard.module.ts
│
├── database/
│   ├── database.module.ts
│   └── prisma.service.ts
│
└── ...
```

O `DashboardController` é responsável pelos endpoints da API, enquanto o `DashboardService` concentra as consultas e regras relacionadas às métricas analíticas.

O acesso ao PostgreSQL é realizado através do Prisma.

## Dataset

O projeto utiliza o **Brazilian E-Commerce Public Dataset by Olist**, que contém informações sobre pedidos, produtos, vendedores, clientes, pagamentos e avaliações de um marketplace brasileiro.

O dataset original não é armazenado neste repositório.

Os scripts utilizados para inspeção, validação, transformação e carga dos dados estão disponíveis em:

```text
data/scripts/
```

Os dados brutos devem ser obtidos separadamente e colocados em:

```text
data/raw/
```

## Principais endpoints

A API utiliza endpoints em português para representar as funcionalidades disponibilizadas pelo dashboard.

### Resumo

```http
GET /dashboard/resumo
```

Retorna as principais métricas gerais do e-commerce:

* GMV
* pedidos
* ticket médio

### Métricas mensais

```http
GET /dashboard/gmv/mensal
GET /dashboard/pedidos/mensal
GET /dashboard/ticket-medio/mensal
```

### Métricas por categoria

```http
GET /dashboard/gmv/categoria
GET /dashboard/pedidos/categoria
GET /dashboard/ticket-medio/categoria
GET /dashboard/itens/categoria
```

### Métricas por status

```http
GET /dashboard/gmv/status
GET /dashboard/pedidos/status
```

### Métricas por estado

```http
GET /dashboard/gmv/estado
GET /dashboard/pedidos/estado
GET /dashboard/ticket-medio/estado
```

### Métricas relacionadas aos vendedores

```http
GET /dashboard/gmv/estado-vendedor
```

## Configuração do projeto

Clone o repositório e instale as dependências:

```bash
git clone <https://github.com/EloiEdu/ecommerce-dashboard-api.git>
cd ecommerce-dashboard-api
npm install
```

Configure a variável de ambiente:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

As migrations do Prisma estão disponíveis em:

```text
prisma/migrations/
```

Execute as migrations:

```bash
npx prisma migrate deploy
```

## Scripts

### Desenvolvimento

```bash
npm run start:dev
```

### Build

```bash
npm run build
```

### Produção

```bash
npm run start:prod
```

### Testes

```bash
npm run test
npm run test:e2e
npm run test:cov
```

## Data pipeline

Os scripts Python em `data/scripts/` são responsáveis pelas etapas de preparação e carregamento dos dados.

Entre as etapas implementadas estão:

1. inspeção do dataset;
2. validação da qualidade dos dados;
3. tratamento e tradução de categorias;
4. carregamento das entidades no PostgreSQL;
5. validação dos dados após a carga.

O pipeline foi desenvolvido para transformar os dados brutos em uma estrutura relacional adequada para as consultas utilizadas pela API.

## Próximos passos

* integração com o frontend do dashboard;
* autenticação e autorização;
* filtros dinâmicos para as métricas;
* documentação da API;
* melhorias de performance nas consultas analíticas;
* deploy da aplicação.

