import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType, ChartOptions } from 'chart.js';

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

  private cdr = inject(ChangeDetectorRef);

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.cdr.detectChanges();
      this.chartDirective?.update();
    }
  }
}