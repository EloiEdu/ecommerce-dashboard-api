import { Injectable } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class DashboardAdapterService {
  private readonly chartPalette = [
    {
      border: '#6366F1',
      fill: 'rgba(99, 102, 241, 0.72)',
      hover: 'rgba(99, 102, 241, 0.92)',
    },
    {
      border: '#06B6D4',
      fill: 'rgba(6, 182, 212, 0.72)',
      hover: 'rgba(6, 182, 212, 0.92)',
    },
    {
      border: '#10B981',
      fill: 'rgba(16, 185, 129, 0.72)',
      hover: 'rgba(16, 185, 129, 0.92)',
    },
    {
      border: '#F59E0B',
      fill: 'rgba(245, 158, 11, 0.72)',
      hover: 'rgba(245, 158, 11, 0.92)',
    },
    {
      border: '#F43F5E',
      fill: 'rgba(244, 63, 94, 0.72)',
      hover: 'rgba(244, 63, 94, 0.92)',
    },
  ] as const;

  readonly defaultOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          color: '#64748B',
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          boxHeight: 8,
          padding: 16,
          font: {
            family: 'Inter, ui-sans-serif, system-ui, sans-serif',
            size: 11,
            weight: 500,
          },
        },
      },
      tooltip: {
        backgroundColor: '#0F172A',
        titleColor: '#F8FAFC',
        bodyColor: '#CBD5E1',
        borderColor: 'rgba(148, 163, 184, 0.2)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        caretSize: 5,
        displayColors: false,
        titleFont: {
          family: 'Inter, ui-sans-serif, system-ui, sans-serif',
          size: 12,
          weight: 600,
        },
        bodyFont: {
          family: 'Inter, ui-sans-serif, system-ui, sans-serif',
          size: 12,
        },
      },
    },
    scales: {
      x: {
        border: { display: false },
        grid: { display: false },
        ticks: {
          color: '#64748B',
          maxRotation: 0,
          font: {
            family: 'Inter, ui-sans-serif, system-ui, sans-serif',
            size: 10,
          },
        },
      },
      y: {
        beginAtZero: true,
        border: { display: false },
        grid: {
          color: 'rgba(148, 163, 184, 0.16)',
          drawTicks: false,
        },
        ticks: {
          color: '#64748B',
          padding: 10,
          maxTicksLimit: 5,
          font: {
            family: 'Inter, ui-sans-serif, system-ui, sans-serif',
            size: 10,
          },
          callback: (value) =>
            new Intl.NumberFormat('pt-BR', {
              notation: 'compact',
              maximumFractionDigits: 1,
            }).format(Number(value)),
        },
      },
    },
  };

  toLineChartData<T>(
    data: T[],
    dateKey: keyof T,
    valueKey: keyof T,
    seriesLabel: string
  ): ChartData<'line'> {

    const safeData = data || [];

    return {
      labels: safeData.map((item) =>
        new Date(String(item[dateKey])).toLocaleDateString('pt-BR', {
          month: 'short',
          year: 'numeric',
          timeZone: 'UTC',
        })
      ),
      datasets: [
        {
          data: safeData.map((item) => Number(item[valueKey])),
          label: seriesLabel,
          borderColor: '#6366F1',
          backgroundColor: 'rgba(99, 102, 241, 0.12)',
          pointBackgroundColor: '#FFFFFF',
          pointBorderColor: '#6366F1',
          pointHoverBackgroundColor: '#6366F1',
          pointHoverBorderColor: '#FFFFFF',
          tension: 0.38,
          fill: 'origin',
          borderWidth: 2.5,
          borderCapStyle: 'round',
          borderJoinStyle: 'round',
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHitRadius: 12,
          pointBorderWidth: 2,
        },
      ],
    };
  }

  toBarChartData<T>(
    data: T[],
    labelKey: keyof T,
    valueKey: keyof T,
    seriesLabel: string
  ): ChartData<'bar'> {
    const safeData = data || [];

    return {
      labels: safeData.map((item) => String(item[labelKey])),
      datasets: [
        {
          label: seriesLabel,
          data: safeData.map((item) => Number(item[valueKey])),
          backgroundColor: safeData.map(
            (_, index) => this.chartPalette[index % this.chartPalette.length].fill
          ),
          borderColor: safeData.map(
            (_, index) => this.chartPalette[index % this.chartPalette.length].border
          ),
          hoverBackgroundColor: safeData.map(
            (_, index) => this.chartPalette[index % this.chartPalette.length].hover
          ),
          borderWidth: 1,
          borderRadius: 6,
          borderSkipped: false,
          maxBarThickness: 44,
        },
      ],
    };
  }

  toDoughnutChartData<T>(
    data: T[],
    labelKey: keyof T,
    valueKey: keyof T,
    seriesLabel: string
  ): ChartData<'doughnut'> {
    const safeData = data || [];
    const colors = this.getDoughnutColors(safeData.length);

    return {
      labels: safeData.map((item) => String(item[labelKey])),
      datasets: [
        {
          label: seriesLabel,
          data: safeData.map((item) => Number(item[valueKey])),
          backgroundColor: colors,
          borderColor: colors.map(() => '#FFFFFF'),
          hoverBackgroundColor: colors.map((color) => color),
          borderWidth: 2,
          hoverOffset: 6,
        },
      ],
    };
  }

  private getDoughnutColors(count: number): string[] {
    const baseColors = this.chartPalette.map((color) => color.border);

    return Array.from({ length: count }, (_, index) => {
      if (index < baseColors.length) {
        return baseColors[index];
      }

      // The golden angle spreads additional categories across the color wheel,
      // avoiding the repeated colors used by the fixed palette in bar charts.
      const hue = Math.round(((index - baseColors.length) * 137.508 + 275) % 360);
      return `hsl(${hue} 72% 46%)`;
    });
  }
}
