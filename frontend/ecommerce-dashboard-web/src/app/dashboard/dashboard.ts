import { Component, OnInit, inject,signal } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { FormsModule } from '@angular/forms';

import * as charts from './dashboard-charts';

import {
  DashboardSummary,
  GmvByMonth,
  GmvByCategory,
  OrdersByStatus,
  OrdersByMonth,
  AverageTicketByMonth,
  OrdersByCategory,
  AverageTicketByCategory,
  GmvByStatus,
  GmvByState,
  OrdersByState,
  AverageTicketByState,
  ItemsByCategory,
  GmvBySellerState,
  DashboardFilters
} from '../interfaces/dashboard.interfaces';

import {
  Chart,
  ChartData,
  ChartOptions,
  registerables,
} from 'chart.js';

Chart.register(...registerables);

import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  imports: [
    BaseChartDirective,
    FormsModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  gmvChartData = charts.gmvChartData;
  gmvChartOptions = charts.gmvChartOptions;

  ordersChartData = charts.ordersChartData;
  ordersChartOptions = charts.ordersChartOptions;

  averageTicketChartData = charts.averageTicketChartData;
  averageTicketChartOptions = charts.averageTicketChartOptions;

  gmvCategoryChartData = charts.gmvCategoryChartData;
  categoryChartOptions = charts.categoryChartOptions;

  ordersStatusChartData = charts.ordersStatusChartData;
  ordersStatusChartOptions = charts.ordersStatusChartOptions;

  ordersByMonthChartOptions = charts.ordersByMonthChartOptions;
  averageTicketByMonthChartOptions = charts.averageTicketByMonthChartOptions;

  gmvStatusChartData = charts.gmvStatusChartData;
  gmvStatusChartOptions = charts.gmvStatusChartOptions;

  averageTicketStatusChartData = charts.averageTicketStatusChartData;
  averageTicketStatusChartOptions = charts.averageTicketStatusChartOptions;

  ordersCategoryChartData = charts.ordersCategoryChartData;
  ordersCategoryChartOptions = charts.ordersCategoryChartOptions;

  averageTicketCategoryChartData = charts.averageTicketCategoryChartData;
  averageTicketCategoryChartOptions = charts.averageTicketCategoryChartOptions;

  gmvStateChartData = charts.gmvStateChartData;
  gmvStateChartOptions = charts.gmvStateChartOptions;

  ordersStateChartData = charts.ordersStateChartData;
  ordersStateChartOptions = charts.ordersStateChartOptions;

  averageTicketStateChartData = charts.averageTicketStateChartData;
  averageTicketStateChartOptions = charts.averageTicketStateChartOptions;

  itemsCategoryChartData = charts.itemsCategoryChartData;
  itemsCategoryChartOptions = charts.itemsCategoryChartOptions;

  gmvSellerStateChartData = charts.gmvSellerStateChartData;
  gmvSellerStateChartOptions = charts.gmvSellerStateChartOptions;

  itemsByCategoryChartOptions = charts.itemsByCategoryChartOptions;

  gmvByMonth = signal<GmvByMonth[]>([]);
  gmvByCategory = signal<GmvByCategory[]>([]);
  ordersByStatus = signal<OrdersByStatus[]>([]);

  ordersByMonth = signal<OrdersByMonth[]>([]);
  averageTicketByMonth = signal<AverageTicketByMonth[]>([]);

  ordersByCategory = signal<OrdersByCategory[]>([]);
  averageTicketByCategory = signal<AverageTicketByCategory[]>([]);

  gmvByStatus = signal<GmvByStatus[]>([]);

  gmvByState = signal<GmvByState[]>([]);
  ordersByState = signal<OrdersByState[]>([]);
  averageTicketByState = signal<AverageTicketByState[]>([]);

  itemsByCategory = signal<ItemsByCategory[]>([]);

  gmvBySellerState = signal<GmvBySellerState[]>([]);

  summary = signal<DashboardSummary>({
    gmv: 0,
    orders: 0,
    averageTicket: 0,
  });

  startDate = '';
  endDate = '';

  private getFilters(): DashboardFilters {
    return {
      startDate: this.startDate || undefined,
      endDate: this.endDate || undefined,

    }
  }

  ngOnInit(): void {
    this.loadDashboard();
  }

  applyFilters(): void {
    if (
      this.startDate &&
      this.endDate &&
      this.startDate > this.endDate
    ) {
      return;
    }
    this.loadDashboard();
  }

  clearFilters(): void {
    this.startDate = '';
    this.endDate = '';

    this.loadDashboard();
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
  });
}
  private loadDashboard(): void {

    const filters = this.getFilters();

    this.dashboardService.getSummary(filters).subscribe({
      next: (data) => {
        console.log('Dashboard:', data);
        this.summary.set(data)
      },
      error: (error) => {
        console.error('Erro ao carregar dashboard:', error);
      },
    });

    this.dashboardService.getGmvByMonth(filters).subscribe({
      next: (data) => {
        console.log('GMV mensal:', data);
        this.gmvByMonth.set(data)

        this.gmvChartData.set({
          labels: data.map((item) =>
          new Date(item.month).toLocaleDateString('pt-BR', {
            month: 'short',
            year: 'numeric'
          }),
        ),
        datasets: [
          {
            data: data.map((item) => item.gmv),
            label: 'GMV',
            tension: 0.3,
            fill: false,
            borderWidth: 2,
            pointRadius: 3,
          },
        ],
        });
        console.log('Chart data:', this.gmvChartData);
      },
      error: (error) => {
        console.error('Erro ao carregar GMV mensal:', error);
      },
    });

    this.dashboardService.getGmvByCategory(filters).subscribe({
    next: (data) => {
      console.log('GMV por categoria:', data);
      this.gmvByCategory.set(data);

      this.gmvCategoryChartData.set({
        labels: data.map((item) => item.category),
        datasets: [
          {
            label: 'GMV',
            data: data.map((item) => item.gmv),
          },
        ],
      });
      },
      error: (error) => {
        console.error('Erro ao carregar GMV por categoria:', error);
      },
    });

    this.dashboardService.getOrdersByStatus(filters).subscribe({
      next: (data) => {
        console.log('Pedidos por status:', data);
        this.ordersByStatus.set(data);

        this.ordersStatusChartData.set({
          labels: data.map((item) => item.status),
          datasets: [
            {
              label: 'Pedidos',
              data: data.map((item) => item.orders),
            },
          ],
        });
      },
      error: (error) => {
        console.error('Erro ao carregar pedidos por status:', error);
      },
    });

    this.dashboardService.getOrdersByMonth(filters).subscribe({
      next: (data) => {
        console.log('Pedidos mensal:', data);
        this.ordersByMonth.set(data);
        
        this.ordersChartData.set({
          labels: data.map((item) =>
            new Date(item.month).toLocaleDateString('pt-BR', {
              month: 'short',
              year: 'numeric',
            }),
          ),
          datasets: [
            {
              data: data.map((item) => item.orders),
              label: 'Pedidos',
              tension: 0.3,
              fill: false,
              borderWidth: 2,
              pointRadius: 3,
            },
          ],
        });
      },
      error: (error) => {
        console.error('Erro ao carregar pedidos mensal:', error);
      },
    });

    this.dashboardService.getAverageTicketByMonth(filters).subscribe({
      next: (data) => {
        console.log('Ticket médio mensal:', data);
        this.averageTicketByMonth.set(data);

        this.averageTicketChartData.set({
          labels: data.map((item) =>
            new Date(item.month).toLocaleDateString('pt-BR', {
              month: 'short',
              year: 'numeric',
            }),
          ),
          datasets: [
            {
              data: data.map((item) => item.averageTicket),
              label: 'Ticket Médio',
              tension: 0.3,
              fill: false,
              borderWidth: 2,
              pointRadius: 3,
            },
          ],
        });

      },
      error: (error) => {
        console.error('Erro ao carregar ticket médio mensal:', error);
      },
    });

    this.dashboardService.getOrdersByCategory(filters).subscribe({
      next: (data) => {
        console.log('Pedidos por categoria:', data);
        this.ordersByCategory.set(data);

        this.ordersCategoryChartData.set({
        labels: data.map((item) => item.category),
        datasets: [
          {
            label: 'Pedidos',
            data: data.map((item) => item.orders),
          },
        ],
      });
      },
      error: (error) => {
        console.error('Erro ao carregar pedidos por categoria:', error);
      },
    });

    this.dashboardService.getAverageTicketByCategory(filters).subscribe({
      next: (data) => {
        console.log('Ticket médio por categoria:', data);
        this.averageTicketByCategory.set(data);

        this.averageTicketCategoryChartData.set({
        labels: data.map((item) => item.category),
        datasets: [
            {
              label: 'Ticket Médio',
              data: data.map((item) => item.averageTicket),
            },
          ],
        });
      },
      error: (error) => {
        console.error('Erro ao carregar ticket médio por categoria:', error);
      },
    });

    this.dashboardService.getGmvByStatus(filters).subscribe({
      next: (data) => {
        console.log('GMV por status:', data);
        this.gmvByStatus.set(data);

        this.gmvStatusChartData.set({
          labels: data.map((item) => item.status),
          datasets: [
            {
              label: 'GMV',
              data: data.map((item) => item.gmv),
            },
          ],
        });
      },
      error: (error) => {
        console.error('Erro ao carregar GMV por status:', error);
      },
    });

    this.dashboardService.getGmvByState(filters).subscribe({
      next: (data) => {
        console.log('GMV por estado:', data);
        this.gmvByState.set(data);
        this.gmvStateChartData.set({
          labels: data.map((item) => item.state),
          datasets: [
            {
              label: 'GMV',
              data: data.map((item) => item.gmv),
            },
          ],
        });
      },
      error: (error) => {
        console.error('Erro ao carregar GMV por estado:', error);
      },
    });

    this.dashboardService.getOrdersByState(filters).subscribe({
      next: (data) => {
        console.log('Pedidos por estado:', data);
        this.ordersByState.set(data);
        this.ordersStateChartData.set({
          labels: data.map((item) => item.state),
          datasets: [
            {
              label: 'Pedidos',
              data: data.map((item) => item.orders),
            },
          ],
        });
      },
      error: (error) => {
        console.error('Erro ao carregar pedidos por estado:', error);
      },
    });

    this.dashboardService.getAverageTicketByState(filters).subscribe({
      next: (data) => {
        console.log('Ticket médio por estado:', data);
        this.averageTicketByState.set(data);

        this.averageTicketStateChartData.set({
          labels: data.map((item) => item.state),
          datasets: [
            {
              label: 'Ticket Médio',
              data: data.map((item) => item.averageTicket),
            },
          ],
        });
      },
      error: (error) => {
        console.error('Erro ao carregar ticket médio por estado:', error);
      },
    });

    this.dashboardService.getItemsByCategory(filters).subscribe({
      next: (data) => {
        console.log('Itens por categoria:', data);
        this.itemsByCategory.set(data);

        this.itemsCategoryChartData.set({
        labels: data.map((item) => item.category),
        datasets: [
          {
            label: 'Itens vendidos',
            data: data.map((item) => item.items),
          },
        ],
      });

      },
      error: (error) => {
        console.error('Erro ao carregar itens por categoria:', error);
      },
    });

    this.dashboardService.getGmvBySellerState(filters).subscribe({
      next: (data) => {
        console.log('GMV por estado do vendedor:', data);
        this.gmvBySellerState.set(data);

        this.gmvSellerStateChartData.set({
          labels: data.map((item) => item.state),
          datasets: [
            {
              label: 'GMV',
              data: data.map((item) => item.gmv),
            },
          ],
        });
      },
      error: (error) => {
        console.error('Erro ao carregar GMV por estado do vendedor:', error);
      },
    });

  }
}