import { ApiProperty } from '@nestjs/swagger';

export class DashboardSummaryDto {
  @ApiProperty({
    example: 100000,
    description: 'Valor bruto total das vendas',
  })
  gmv!: number;

  @ApiProperty({
    example: 500,
    description: 'Quantidade total de pedidos',
  })
  orders!: number;

  @ApiProperty({
    example: 200,
    description: 'Ticket médio dos pedidos',
  })
  averageTicket!: number;
}

export class GmvByMonthDto {
  @ApiProperty({
    example: '2018-01-01T00:00:00.000Z',
    description: 'Mês de referência',
    type: String,
    format: 'date-time',
  })
  month!: Date;

  @ApiProperty({
    example: 150000,
    description: 'Valor bruto das vendas no mês',
  })
  gmv!: number;
}

export class OrdersByMonthDto {
  @ApiProperty({
    example: '2018-01-01T00:00:00.000Z',
    description: 'Mês de referência',
    type: String,
    format: 'date-time',
  })
  month!: Date;

  @ApiProperty({
    example: 750,
    description: 'Quantidade de pedidos no mês',
  })
  orders!: number;
}

export class AverageTicketByMonthDto {
  @ApiProperty({
    example: '2018-01-01T00:00:00.000Z',
    description: 'Mês de referência',
    type: String,
    format: 'date-time',
  })
  month!: Date;

  @ApiProperty({
    example: 200,
    description: 'Ticket médio no mês',
  })
  averageTicket!: number;
}

export class GmvByCategoryDto {
  @ApiProperty({
    example: 'beleza_saude',
    description: 'Categoria dos produtos',
  })
  category!: string;

  @ApiProperty({
    example: 250000,
    description: 'Valor bruto das vendas na categoria',
  })
  gmv!: number;
}

export class OrdersByCategoryDto {
  @ApiProperty({
    example: 'beleza_saude',
    description: 'Categoria dos produtos',
  })
  category!: string;

  @ApiProperty({
    example: 1200,
    description: 'Quantidade de pedidos na categoria',
  })
  orders!: number;
}

export class AverageTicketByCategoryDto {
  @ApiProperty({
    example: 'beleza_saude',
    description: 'Categoria dos produtos',
  })
  category!: string;

  @ApiProperty({
    example: 208.33,
    description: 'Ticket médio da categoria',
  })
  averageTicket!: number;
}

export class OrdersByStatusDto {
  @ApiProperty({
    example: 'delivered',
    description: 'Status dos pedidos',
  })
  status!: string;

  @ApiProperty({
    example: 9500,
    description: 'Quantidade de pedidos com o status',
  })
  orders!: number;
}

export class GmvByStatusDto {
  @ApiProperty({
    example: 'delivered',
    description: 'Status dos pedidos',
  })
  status!: string;

  @ApiProperty({
    example: 1800000,
    description: 'Valor bruto das vendas com o status',
  })
  gmv!: number;
}

export class GmvByStateDto {
  @ApiProperty({
    example: 'SP',
    description: 'Estado do cliente',
  })
  state!: string;

  @ApiProperty({
    example: 750000,
    description: 'Valor bruto das vendas no estado',
  })
  gmv!: number;
}

export class OrdersByStateDto {
  @ApiProperty({
    example: 'SP',
    description: 'Estado do cliente',
  })
  state!: string;

  @ApiProperty({
    example: 3500,
    description: 'Quantidade de pedidos no estado',
  })
  orders!: number;
}

export class AverageTicketByStateDto {
  @ApiProperty({
    example: 'SP',
    description: 'Estado do cliente',
  })
  state!: string;

  @ApiProperty({
    example: 214.29,
    description: 'Ticket médio no estado',
  })
  averageTicket!: number;
}

export class ItemsByCategoryDto {
  @ApiProperty({
    example: 'beleza_saude',
    description: 'Categoria dos produtos',
  })
  category!: string;

  @ApiProperty({
    example: 1500,
    description: 'Quantidade de itens vendidos na categoria',
  })
  items!: number;
}

export class GmvBySellerStateDto {
  @ApiProperty({
    example: 'SP',
    description: 'Estado do vendedor',
  })
  state!: string;

  @ApiProperty({
    example: 680000,
    description: 'Valor bruto das vendas de vendedores do estado',
  })
  gmv!: number;
}
