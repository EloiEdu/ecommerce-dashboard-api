import { Component, input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.css'],
})
export class ChartCardComponent {
  /** Título do card (ex: "GMV por Categoria") */
  title = input.required<string>();

  /** Estrutura de dados exigida pelo Chart.js (vinda do DashboardAdapterService) */
  data = input.required<ChartData<any>>();

  /** Tipo do gráfico (bar, line, doughnut, etc.). Padrão: 'bar' */
  type = input<ChartType>('bar');

  /** Opções do gráfico. Possui fallback para opções responsivas padrão */
  options = input<ChartOptions>({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
    },
  });
}
