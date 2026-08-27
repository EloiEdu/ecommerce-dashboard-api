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
