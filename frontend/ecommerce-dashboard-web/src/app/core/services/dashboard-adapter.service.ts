import { Injectable } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class DashboardAdapterService {
  readonly defaultOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
    },
  };

  /**
   * Converte séries temporais mensais em ChartData para gráficos de linha.
   */
  toLineChartData<T>(
    data: T[],
    dateKey: keyof T,
    valueKey: keyof T,
    seriesLabel: string
  ): ChartData<'line'> {
    return {
      labels: data.map((item) =>
        new Date(String(item[dateKey])).toLocaleDateString('pt-BR', {
          month: 'short',
          year: 'numeric',
        })
      ),
      datasets: [
        {
          data: data.map((item) => Number(item[valueKey])),
          label: seriesLabel,
          tension: 0.3,
          fill: false,
          borderWidth: 2,
          pointRadius: 3,
        },
      ],
    };
  }

  /**
   * Converte agregações para ChartData do tipo Barra.
   */
  toBarChartData<T>(
    data: T[],
    labelKey: keyof T,
    valueKey: keyof T,
    seriesLabel: string
  ): ChartData<'bar'> {
    return {
      labels: data.map((item) => String(item[labelKey])),
      datasets: [
        {
          label: seriesLabel,
          data: data.map((item) => Number(item[valueKey])),
        },
      ],
    };
  }

  /**
   * Converte agregações para ChartData do tipo Doughnut (Rosca).
   */
  toDoughnutChartData<T>(
    data: T[],
    labelKey: keyof T,
    valueKey: keyof T,
    seriesLabel: string
  ): ChartData<'doughnut'> {
    return {
      labels: data.map((item) => String(item[labelKey])),
      datasets: [
        {
          label: seriesLabel,
          data: data.map((item) => Number(item[valueKey])),
        },
      ],
    };
  }
}
