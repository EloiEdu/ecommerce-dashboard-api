import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  DashboardFilters,
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

export interface DashboardDataPayload {
  summary: DashboardSummary;
  gmvByMonth: GmvByMonth[];
  gmvByCategory: GmvByCategory[];
  ordersByStatus: OrdersByStatus[];
  ordersByMonth: OrdersByMonth[];
  averageTicketByMonth: AverageTicketByMonth[];
  ordersByCategory: OrdersByCategory[];
  averageTicketByCategory: AverageTicketByCategory[];
  gmvByStatus: GmvByStatus[];
  gmvByState: GmvByState[];
  ordersByState: OrdersByState[];
  averageTicketByState: AverageTicketByState[];
  itemsByCategory: ItemsByCategory[];
  gmvBySellerState: GmvBySellerState[];
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/dashboard`;

  private buildParams(filters: DashboardFilters): HttpParams {
    let params = new HttpParams();
    if (filters.startDate) {
      params = params.set('startDate', filters.startDate);
    }
    if (filters.endDate) {
      params = params.set('endDate', filters.endDate);
    }
    return params;
  }

  getSummary(filters: DashboardFilters): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.apiUrl}/resumo`, {
      params: this.buildParams(filters),
    });
  }

  getGmvByMonth(filters: DashboardFilters): Observable<GmvByMonth[]> {
    return this.http.get<GmvByMonth[]>(`${this.apiUrl}/gmv/mensal`, {
      params: this.buildParams(filters),
    });
  }

  getGmvByCategory(filters: DashboardFilters): Observable<GmvByCategory[]> {
    return this.http.get<GmvByCategory[]>(`${this.apiUrl}/gmv/categoria`, {
      params: this.buildParams(filters),
    });
  }

  getOrdersByStatus(filters: DashboardFilters): Observable<OrdersByStatus[]> {
    return this.http.get<OrdersByStatus[]>(`${this.apiUrl}/pedidos/status`, {
      params: this.buildParams(filters),
    });
  }

  getOrdersByMonth(filters: DashboardFilters): Observable<OrdersByMonth[]> {
    return this.http.get<OrdersByMonth[]>(`${this.apiUrl}/pedidos/mensal`, {
      params: this.buildParams(filters),
    });
  }

  getAverageTicketByMonth(filters: DashboardFilters): Observable<AverageTicketByMonth[]> {
    return this.http.get<AverageTicketByMonth[]>(`${this.apiUrl}/ticket-medio/mensal`, {
      params: this.buildParams(filters),
    });
  }

  getOrdersByCategory(filters: DashboardFilters): Observable<OrdersByCategory[]> {
    return this.http.get<OrdersByCategory[]>(`${this.apiUrl}/pedidos/categoria`, {
      params: this.buildParams(filters),
    });
  }

  getAverageTicketByCategory(filters: DashboardFilters): Observable<AverageTicketByCategory[]> {
    return this.http.get<AverageTicketByCategory[]>(`${this.apiUrl}/ticket-medio/categoria`, {
      params: this.buildParams(filters),
    });
  }

  getGmvByStatus(filters: DashboardFilters): Observable<GmvByStatus[]> {
    return this.http.get<GmvByStatus[]>(`${this.apiUrl}/gmv/status`, {
      params: this.buildParams(filters),
    });
  }

  getGmvByState(filters: DashboardFilters): Observable<GmvByState[]> {
    return this.http.get<GmvByState[]>(`${this.apiUrl}/gmv/estado`, {
      params: this.buildParams(filters),
    });
  }

  getOrdersByState(filters: DashboardFilters): Observable<OrdersByState[]> {
    return this.http.get<OrdersByState[]>(`${this.apiUrl}/pedidos/estado`, {
      params: this.buildParams(filters),
    });
  }

  getAverageTicketByState(filters: DashboardFilters): Observable<AverageTicketByState[]> {
    return this.http.get<AverageTicketByState[]>(`${this.apiUrl}/ticket-medio/estado`, {
      params: this.buildParams(filters),
    });
  }

  getItemsByCategory(filters: DashboardFilters): Observable<ItemsByCategory[]> {
    return this.http.get<ItemsByCategory[]>(`${this.apiUrl}/itens/categoria`, {
      params: this.buildParams(filters),
    });
  }

  getGmvBySellerState(filters: DashboardFilters): Observable<GmvBySellerState[]> {
    return this.http.get<GmvBySellerState[]>(`${this.apiUrl}/gmv/estado-vendedor`, {
      params: this.buildParams(filters),
    });
  }

  getDashboardData(filters: DashboardFilters): Observable<DashboardDataPayload> {
    const options = { params: this.buildParams(filters) };

    return forkJoin({
      summary: this.http.get<DashboardSummary>(`${this.apiUrl}/resumo`, options),
      gmvByMonth: this.http.get<GmvByMonth[]>(`${this.apiUrl}/gmv/mensal`, options),
      gmvByCategory: this.http.get<GmvByCategory[]>(`${this.apiUrl}/gmv/categoria`, options),
      ordersByStatus: this.http.get<OrdersByStatus[]>(`${this.apiUrl}/pedidos/status`, options),
      ordersByMonth: this.http.get<OrdersByMonth[]>(`${this.apiUrl}/pedidos/mensal`, options),
      averageTicketByMonth: this.http.get<AverageTicketByMonth[]>(`${this.apiUrl}/ticket-medio/mensal`, options),
      ordersByCategory: this.http.get<OrdersByCategory[]>(`${this.apiUrl}/pedidos/categoria`, options),
      averageTicketByCategory: this.http.get<AverageTicketByCategory[]>(`${this.apiUrl}/ticket-medio/categoria`, options),
      gmvByStatus: this.http.get<GmvByStatus[]>(`${this.apiUrl}/gmv/status`, options),
      gmvByState: this.http.get<GmvByState[]>(`${this.apiUrl}/gmv/estado`, options),
      ordersByState: this.http.get<OrdersByState[]>(`${this.apiUrl}/pedidos/estado`, options),
      averageTicketByState: this.http.get<AverageTicketByState[]>(`${this.apiUrl}/ticket-medio/estado`, options),
      itemsByCategory: this.http.get<ItemsByCategory[]>(`${this.apiUrl}/itens/categoria`, options),
      gmvBySellerState: this.http.get<GmvBySellerState[]>(`${this.apiUrl}/gmv/estado-vendedor`, options),
    });
  }
}