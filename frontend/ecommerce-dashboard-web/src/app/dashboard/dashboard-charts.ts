import { signal } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

// ============================================================
// GRÁFICOS MENSAIS
// ============================================================

export const gmvChartData = signal<ChartData<'line'>>({
  labels: [],
  datasets: [
    {
      data: [],
      label: 'GMV',
      tension: 0.3,
      fill: false,
      borderWidth: 2,
      pointRadius: 3,
    },
  ],
});

export const gmvChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
};

export const ordersChartData = signal<ChartData<'line'>>({
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

export const ordersChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
};

export const averageTicketChartData = signal<ChartData<'line'>>({
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

export const averageTicketChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
};

export const ordersByMonthChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
};

export const averageTicketByMonthChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
};


// ============================================================
// GRÁFICOS POR CATEGORIA
// ============================================================

export const gmvCategoryChartData = signal<ChartData<'bar'>>({
  labels: [],
  datasets: [
    {
      label: 'GMV',
      data: [],
    },
  ],
});

export const ordersCategoryChartData = signal<ChartData<'bar'>>({
  labels: [],
  datasets: [
    {
      label: 'Pedidos',
      data: [],
    },
  ],
});

export const averageTicketCategoryChartData = signal<ChartData<'bar'>>({
  labels: [],
  datasets: [
    {
      label: 'Ticket Médio',
      data: [],
    },
  ],
});

export const itemsCategoryChartData = signal<ChartData<'bar'>>({
  labels: [],
  datasets: [
    {
      label: 'Itens vendidos',
      data: [],
    },
  ],
});

export const categoryChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
};

export const ordersCategoryChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
};

export const averageTicketCategoryChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
};

export const itemsByCategoryChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
};

export const itemsCategoryChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
};


// ============================================================
// GRÁFICOS POR STATUS
// ============================================================

export const ordersStatusChartData = signal<ChartData<'doughnut'>>({
  labels: [],
  datasets: [
    {
      label: 'Pedidos',
      data: [],
    },
  ],
});

export const ordersStatusChartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
};

export const gmvStatusChartData = signal<ChartData<'bar'>>({
  labels: [],
  datasets: [
    {
      label: 'GMV',
      data: [],
    },
  ],
});

export const gmvStatusChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
};

export const averageTicketStatusChartData = signal<ChartData<'bar'>>({
  labels: [],
  datasets: [
    {
      label: 'Ticket Médio',
      data: [],
    },
  ],
});

export const averageTicketStatusChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
};


// ============================================================
// GRÁFICOS POR ESTADO
// ============================================================

export const gmvStateChartData = signal<ChartData<'bar'>>({
  labels: [],
  datasets: [
    {
      label: 'GMV',
      data: [],
    },
  ],
});

export const gmvStateChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
};

export const ordersStateChartData = signal<ChartData<'bar'>>({
  labels: [],
  datasets: [
    {
      label: 'Pedidos',
      data: [],
    },
  ],
});

export const ordersStateChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
};

export const averageTicketStateChartData = signal<ChartData<'bar'>>({
  labels: [],
  datasets: [
    {
      label: 'Ticket Médio',
      data: [],
    },
  ],
});

export const averageTicketStateChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
};


// ============================================================
// GRÁFICO POR ESTADO DO VENDEDOR
// ============================================================

export const gmvSellerStateChartData = signal<ChartData<'bar'>>({
  labels: [],
  datasets: [
    {
      label: 'GMV',
      data: [],
    },
  ],
});

export const gmvSellerStateChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
  },
};
