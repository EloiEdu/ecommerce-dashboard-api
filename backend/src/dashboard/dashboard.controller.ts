import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AverageTicketByCategoryDto,
  AverageTicketByMonthDto,
  AverageTicketByStateDto,
  DashboardSummaryDto,
  GmvByCategoryDto,
  GmvByMonthDto,
  GmvBySellerStateDto,
  GmvByStateDto,
  GmvByStatusDto,
  ItemsByCategoryDto,
  OrdersByCategoryDto,
  OrdersByMonthDto,
  OrdersByStateDto,
  OrdersByStatusDto,
} from './dto/dashboard-response.dto';
import { DashboardFilterDto } from './dto/dashboard-filter.dto';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @ApiOperation({
    summary: 'Retorna o GMV mensal',
  })
  @ApiResponse({
    status: 200,
    description: 'GMV agrupado por mês',
    type: [GmvByMonthDto],
  })
  @Get('gmv/mensal')
  getGmvByMonth(@Query() filters: DashboardFilterDto) {
    return this.dashboardService.getGmvByMonth(filters);
  }

  @ApiOperation({
    summary: 'Retorna a quantidade de pedidos por mês',
  })
  @ApiResponse({
    status: 200,
    description: 'Quantidade de pedidos agrupada por mês',
    type: [OrdersByMonthDto],
  })
  @Get('pedidos/mensal')
  getOrdersByMonth(@Query() filters: DashboardFilterDto) {
    return this.dashboardService.getOrdersByMonth(filters);
  }

  @ApiOperation({
    summary: 'Retorna o ticket médio mensal',
  })
  @ApiResponse({
    status: 200,
    description: 'Ticket médio agrupado por mês',
    type: [AverageTicketByMonthDto],
  })
  @Get('ticket-medio/mensal')
  getAverageTicketByMonth(@Query() filters: DashboardFilterDto) {
    return this.dashboardService.getAverageTicketByMonth(filters);
  }

  @ApiOperation({
    summary: 'Retorna o GMV por categoria',
  })
  @ApiResponse({
    status: 200,
    description: 'GMV agrupado por categoria de produto',
    type: [GmvByCategoryDto],
  })
  @Get('gmv/categoria')
  getGmvByCategory(@Query() filters: DashboardFilterDto) {
    return this.dashboardService.getGmvByCategory(filters);
  }

  @ApiOperation({
    summary: 'Retorna a quantidade de pedidos por categoria',
  })
  @ApiResponse({
    status: 200,
    description: 'Quantidade de pedidos agrupada por categoria de produto',
    type: [OrdersByCategoryDto],
  })
  @Get('pedidos/categoria')
  getOrdersByCategory(@Query() filters: DashboardFilterDto) {
    return this.dashboardService.getOrdersByCategory(filters);
  }

  @ApiOperation({
    summary: 'Retorna o ticket médio por categoria',
  })
  @ApiResponse({
    status: 200,
    description: 'Ticket médio agrupado por categoria de produto',
    type: [AverageTicketByCategoryDto],
  })
  @Get('ticket-medio/categoria')
  getAverageTicketByCategory(@Query() filters: DashboardFilterDto) {
    return this.dashboardService.getAverageTicketByCategory(filters);
  }

  @ApiOperation({
    summary: 'Retorna a quantidade de pedidos por status',
  })
  @ApiResponse({
    status: 200,
    description: 'Quantidade de pedidos agrupada por status',
    type: [OrdersByStatusDto],
  })
  @Get('pedidos/status')
  getOrdersByStatus(@Query() filters: DashboardFilterDto) {
    return this.dashboardService.getOrdersByStatus(filters);
  }

  @ApiOperation({
    summary: 'Retorna o GMV por status',
  })
  @ApiResponse({
    status: 200,
    description: 'GMV agrupado por status do pedido',
    type: [GmvByStatusDto],
  })
  @Get('gmv/status')
  getGmvByStatus(@Query() filters: DashboardFilterDto) {
    return this.dashboardService.getGmvByStatus(filters);
  }
  @ApiOperation({
    summary: 'Retorna o GMV por estado',
  })
  @ApiResponse({
    status: 200,
    description: 'GMV agrupado por estado do cliente',
    type: [GmvByStateDto],
  })
  @Get('gmv/estado')
  getGmvByState(@Query() filters: DashboardFilterDto) {
    return this.dashboardService.getGmvByState(filters);
  }

  @ApiOperation({
    summary: 'Retorna a quantidade de pedidos por estado',
  })
  @ApiResponse({
    status: 200,
    description: 'Quantidade de pedidos agrupada por estado do cliente',
    type: [OrdersByStateDto],
  })
  @Get('pedidos/estado')
  getOrdersByState(@Query() filters: DashboardFilterDto) {
    return this.dashboardService.getOrdersByState(filters);
  }

  @ApiOperation({
    summary: 'Retorna o ticket médio por estado',
  })
  @ApiResponse({
    status: 200,
    description: 'Ticket médio agrupado por estado do cliente',
    type: [AverageTicketByStateDto],
  })
  @Get('ticket-medio/estado')
  getAverageTicketByState(@Query() filters: DashboardFilterDto) {
    return this.dashboardService.getAverageTicketByState(filters);
  }

  @ApiOperation({ summary: 'Retorna o resumo geral do dashboard' })
  @ApiResponse({
    status: 200,
    description: 'Resumo das principais métricas do e-commerce',
    type: DashboardSummaryDto,
  })
  @Get('resumo')
  getDashboardSummary(@Query() filters: DashboardFilterDto) {
    return this.dashboardService.getDashboardSummary(filters);
  }

  @ApiOperation({
    summary: 'Retorna a quantidade de itens por categoria',
  })
  @ApiResponse({
    status: 200,
    description: 'Quantidade de itens vendidos agrupada por categoria',
    type: [ItemsByCategoryDto],
  })
  @Get('itens/categoria')
  getItemsByCategory(@Query() filters: DashboardFilterDto) {
    return this.dashboardService.getItemsByCategory(filters);
  }

  @ApiOperation({
    summary: 'Retorna o GMV por estado do vendedor',
  })
  @ApiResponse({
    status: 200,
    description: 'GMV agrupado por estado dos vendedores',
    type: [GmvBySellerStateDto],
  })
  @Get('gmv/estado-vendedor')
  getGmvBySellerState(@Query() filters: DashboardFilterDto) {
    return this.dashboardService.getGmvBySellerState(filters);
  }
}
