import { Component, OnInit, inject,signal } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

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
  imports: [BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard implements OnInit {
  private readonly dashboardService = inject(DashboardService);

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
  gmvChartData = signal<ChartData<'line'>> ({
    labels: [],
    datasets: [
      {
        data: [],
        label: 'GMV',
        tension: 0.3,
        fill:false,
        borderWidth: 2,
        pointRadius: 3,
      },
    ],
  });

  ordersChartData = signal<ChartData<'line'>>({
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Pedidos',
        tension: 0.3,
        fill: false,
        borderWidth: 2,
        pointRadius: 3,
      },
    ],
  });

  averageTicketChartData = signal<ChartData<'line'>>({
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Ticket Médio',
        tension: 0.3,
        fill: false,
        borderWidth: 2,
        pointRadius: 3,
      },
    ],
  });

  ordersChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  averageTicketChartOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
        },
      },
  };

  gmvChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      }
    }
  };

  gmvCategoryChartData = signal<ChartData<'bar'>>({
    labels: [],
    datasets: [
      {
        label: 'GMV',
        data: [],
      },
    ],
  });

  categoryChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  ordersStatusChartData = signal<ChartData<'doughnut'>>({
    labels: [],
    datasets: [
      {
        label: 'Pedidos',
        data: [],
      },
    ],
  });

  ordersByMonthChartOptions: ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
        },
      },
    };

  averageTicketByMonthChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  itemsByCategoryChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  gmvStatusChartData = signal<ChartData<'bar'>>({
    labels: [],
    datasets: [
      {
        label: 'GMV',
        data: [],
      },
    ],
  });

  averageTicketStatusChartData = signal<ChartData<'bar'>>({
    labels: [],
    datasets: [
      {
        label: 'Ticket Médio',
        data: [],
      },
    ],
  });

  gmvStatusChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  ordersStatusChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  averageTicketStatusChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  ordersCategoryChartData = signal<ChartData<'bar'>>({
    labels: [],
    datasets: [
      {
        label: 'Pedidos',
        data: [],
      },
    ],
  });

  averageTicketCategoryChartData = signal<ChartData<'bar'>>({
    labels: [],
    datasets: [
      {
        label: 'Ticket Médio',
        data: [],
      },
    ],
  });

  ordersCategoryChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  averageTicketCategoryChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  gmvStateChartData = signal<ChartData<'bar'>>({
    labels: [],
    datasets: [
      {
        label: 'GMV',
        data: [],
      },
    ],
  });

  ordersStateChartData = signal<ChartData<'bar'>>({
    labels: [],
    datasets: [
      {
        label: 'Pedidos',
        data: [],
      },
    ],
  });

  averageTicketStateChartData = signal<ChartData<'bar'>>({
    labels: [],
    datasets: [
      {
        label: 'Ticket Médio',
        data: [],
      },
    ],
  });

  gmvStateChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  ordersStateChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  averageTicketStateChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  itemsCategoryChartData = signal<ChartData<'bar'>>({
    labels: [],
    datasets: [
      {
        label: 'Itens vendidos',
        data: [],
      },
    ],
  });

  gmvSellerStateChartData = signal<ChartData<'bar'>>({
    labels: [],
    datasets: [
      {
        label: 'GMV',
        data: [],
      },
    ],
  });

  itemsCategoryChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  gmvSellerStateChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };



  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
  });
}
  ngOnInit(): void {
    this.dashboardService.getSummary().subscribe({
      next: (data) => {
        console.log('Dashboard:', data);
        this.summary.set(data)
      },
      error: (error) => {
        console.error('Erro ao carregar dashboard:', error);
      },
    });

    this.dashboardService.getGmvByMonth().subscribe({
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

    this.dashboardService.getGmvByCategory().subscribe({
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

    this.dashboardService.getOrdersByStatus().subscribe({
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

    this.dashboardService.getOrdersByMonth().subscribe({
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

    this.dashboardService.getAverageTicketByMonth().subscribe({
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

    this.dashboardService.getOrdersByCategory().subscribe({
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

    this.dashboardService.getAverageTicketByCategory().subscribe({
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

    this.dashboardService.getGmvByStatus().subscribe({
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

    this.dashboardService.getGmvByState().subscribe({
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

    this.dashboardService.getOrdersByState().subscribe({
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

    this.dashboardService.getAverageTicketByState().subscribe({
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

    this.dashboardService.getItemsByCategory().subscribe({
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

    this.dashboardService.getGmvBySellerState().subscribe({
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