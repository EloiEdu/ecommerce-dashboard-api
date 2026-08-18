import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('gmv/mensal')
  getGmvByMonth() {
    return this.dashboardService.getGmvByMonth();
  }
  @Get('pedidos/mensal')
  getOrdersByMonth() {
    return this.dashboardService.getOrdersByMonth();
  }
  @Get('ticket-medio/mensal')
  getAverageTicketByMonth() {
    return this.dashboardService.getAverageTicketByMonth();
  }
  @Get('gmv/categoria')
  getGmvByCategory() {
    return this.dashboardService.getGmvByCategory();
  }
  @Get('pedidos/categoria')
  getOrdersByCategory() {
    return this.dashboardService.getOrdersByCategory();
  }
  @Get('ticket-medio/categoria')
  getAverageTicketByCategory() {
    return this.dashboardService.getAverageTicketByCategory();
  }
  @Get('pedidos/status')
  getOrdersByStatus() {
    return this.dashboardService.getOrdersByStatus();
  }
  @Get('gmv/status')
  getGmvByStatus() {
    return this.dashboardService.getGmvByStatus();
  }
  @Get('gmv/estado')
  getGmvByState() {
    return this.dashboardService.getGmvByState();
  }
  @Get('pedidos/estado')
  getOrdersByState() {
    return this.dashboardService.getOrdersByState();
  }
  @Get('ticket-medio/estado')
  getAverageTicketByState() {
    return this.dashboardService.getAverageTicketByState();
  }
  @Get('resumo')
  getDashboardSummary() {
    return this.dashboardService.getDashboardSummary();
  }
  @Get('itens/categoria')
  getItemsByCategory() {
    return this.dashboardService.getItemsByCategory();
  }
  @Get('gmv/estado-vendedor')
  getGmvBySellerState() {
    return this.dashboardService.getGmvBySellerState();
  }
}
