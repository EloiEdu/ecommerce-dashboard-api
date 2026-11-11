import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType, ChartOptions } from 'chart.js';
import { DashboardAdapterService } from '../../../../core/services/dashboard-adapter.service';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.css']
})
export class ChartCardComponent implements OnChanges {
  @Input() title: string = '';
  @Input() data: ChartData | null = null;
  @Input() type: ChartType = 'bar';

  @ViewChild(BaseChartDirective) chartDirective?: BaseChartDirective;

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly adapter = inject(DashboardAdapterService);

  chartOptions: ChartOptions = this.adapter.defaultOptions;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.chartOptions = this.getOptionsForType(this.type);
    }

    if (changes['data'] && this.data) {
      this.cdr.detectChanges();
      this.chartDirective?.update();
    }
  }

  private getOptionsForType(type: ChartType): ChartOptions {
    if (type !== 'doughnut' && type !== 'pie') {
      return this.adapter.defaultOptions;
    }

    const isDoughnut = type === 'doughnut';

    return {
      ...this.adapter.defaultOptions,
      ...(isDoughnut ? { cutout: '56%' } : {}),
      layout: { padding: 0 },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          align: 'center',
          labels: {
            color: '#64748B',
            usePointStyle: true,
            pointStyle: 'circle',
            boxWidth: 7,
            boxHeight: 7,
            padding: 8,
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
          callbacks: {
            title: (items) => items[0]?.label ?? '',
            label: (item) => {
              const metric = item.dataset.label ?? 'Valor';
              const value = Number(item.raw);
              const total = item.dataset.data.reduce<number>(
                (sum, entry) => sum + (typeof entry === 'number' ? entry : 0),
                0
              );
              const percentage = total > 0 ? (Number(item.parsed) / total) * 100 : 0;
              const formattedValue = /gmv/i.test(metric)
                ? new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(value)
                : new Intl.NumberFormat('pt-BR', {
                    maximumFractionDigits: 0,
                  }).format(value);

              return `${metric}: ${formattedValue} (${percentage.toLocaleString('pt-BR', {
                maximumFractionDigits: 1,
              })}%)`;
            },
          },
        },
      },
    };
  }
}
