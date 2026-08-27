import { Component, NgZone, OnInit, inject, signal, computed, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartData } from 'chart.js';

import { DashboardService } from '../services/dashboard.service';
import { DashboardAdapterService } from '../core/services/dashboard-adapter.service';
import { DashboardFilters, DashboardSummary } from '../interfaces/dashboard.interfaces';
import { ChartCardComponent } from '../features/dashboard/components/chart-card/chart-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private readonly zone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly dashboardService = inject(DashboardService);
  private readonly adapter = inject(DashboardAdapterService);

  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  startDate = signal<string>('');
  endDate = signal<string>('');

  summary = signal<DashboardSummary | null>(null);

  gmvByMonthChart = signal<ChartData<'line'> | null>(null);
  gmvByCategoryChart = signal<ChartData<'bar'> | null>(null);
  ordersByStatusChart = signal<ChartData<'doughnut'> | null>(null);
  ordersByMonthChart = signal<ChartData<'line'> | null>(null);
  averageTicketByMonthChart = signal<ChartData<'line'> | null>(null);
  ordersByCategoryChart = signal<ChartData<'bar'> | null>(null);
  averageTicketByCategoryChart = signal<ChartData<'bar'> | null>(null);
  gmvByStatusChart = signal<ChartData<'doughnut'> | null>(null);
  gmvByStateChart = signal<ChartData<'bar'> | null>(null);
  ordersByStateChart = signal<ChartData<'bar'> | null>(null);
  averageTicketByStateChart = signal<ChartData<'bar'> | null>(null);
  itemsByCategoryChart = signal<ChartData<'bar'> | null>(null);
  gmvBySellerStateChart = signal<ChartData<'bar'> | null>(null);

  allChartsReady = computed(() => {
    return !!this.gmvByMonthChart() && !!this.summary();
  });

  ngOnInit(): void {
    this.fetchData();
  }

  onStartDateChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.startDate.set(value);
  }

  onEndDateChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.endDate.set(value);
  }

  applyFilter(): void {
    this.fetchData();
  }

  clearFilter(): void {
    this.startDate.set('');
    this.endDate.set('');
    this.fetchData();
  }

  private fetchData(): void {
    const filters: DashboardFilters = {};

    if (this.startDate()) {
      filters.startDate = this.startDate();
    }
    if (this.endDate()) {
      filters.endDate = this.endDate();
    }

    this.loadDashboardData(filters);
  }

  loadDashboardData(filters: DashboardFilters): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.dashboardService.getDashboardData(filters).subscribe({
      next: (data) => {
        this.zone.run(() => {
          this.summary.set(data.summary);

          this.gmvByMonthChart.set(
            this.adapter.toLineChartData(data.gmvByMonth, 'month', 'gmv', 'GMV (R$)')
          );
          this.ordersByMonthChart.set(
            this.adapter.toLineChartData(data.ordersByMonth, 'month', 'orders', 'Pedidos')
          );
          this.averageTicketByMonthChart.set(
            this.adapter.toLineChartData(data.averageTicketByMonth, 'month', 'averageTicket', 'Ticket Médio (R$)')
          );

          this.gmvByCategoryChart.set(
            this.adapter.toBarChartData(data.gmvByCategory, 'category', 'gmv', 'GMV por Categoria')
          );
          this.ordersByCategoryChart.set(
            this.adapter.toBarChartData(data.ordersByCategory, 'category', 'orders', 'Pedidos por Categoria')
          );
          this.averageTicketByCategoryChart.set(
            this.adapter.toBarChartData(data.averageTicketByCategory, 'category', 'averageTicket', 'Ticket Médio por Categoria')
          );
          this.itemsByCategoryChart.set(
            this.adapter.toBarChartData(data.itemsByCategory, 'category', 'items', 'Itens por Categoria')
          );
          this.gmvByStateChart.set(
            this.adapter.toBarChartData(data.gmvByState, 'state', 'gmv', 'GMV por Estado')
          );
          this.ordersByStateChart.set(
            this.adapter.toBarChartData(data.ordersByState, 'state', 'orders', 'Pedidos por Estado')
          );
          this.averageTicketByStateChart.set(
            this.adapter.toBarChartData(data.averageTicketByState, 'state', 'averageTicket', 'Ticket Médio por Estado')
          );
          this.gmvBySellerStateChart.set(
            this.adapter.toBarChartData(data.gmvBySellerState, 'state', 'gmv', 'GMV por Estado do Vendedor')
          );

          this.ordersByStatusChart.set(
            this.adapter.toDoughnutChartData(data.ordersByStatus, 'status', 'orders', 'Pedidos por Status')
          );
          this.gmvByStatusChart.set(
            this.adapter.toDoughnutChartData(data.gmvByStatus, 'status', 'gmv', 'GMV por Status')
          );

          this.isLoading.set(false);
          
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.zone.run(() => {
          console.error('Erro ao carregar dados do dashboard:', err);
          this.errorMessage.set('Não foi possível carregar as informações do dashboard. Tente novamente mais tarde.');
          this.isLoading.set(false);
          this.cdr.detectChanges();
        });
      },
    });
  }
}