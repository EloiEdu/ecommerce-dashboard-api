import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { filter, Observable } from 'rxjs';
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
  DashboardFilters,
} from '../interfaces/dashboard.interfaces'
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/dashboard';

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
    return this.http.get<DashboardSummary>(
      `${this.apiUrl}/resumo`,
      {
        params: this.buildParams(filters)
      }
    );
  }
  getGmvByMonth(filters: DashboardFilters): Observable<GmvByMonth[]> {
    return this.http.get<GmvByMonth[]>(
    `${this.apiUrl}/gmv/mensal`,
    {
      params: this.buildParams(filters)
    }
  );  
  }
  getGmvByCategory(filters: DashboardFilters): Observable<GmvByCategory[]> {
    return this.http.get<GmvByCategory[]>(
    `${this.apiUrl}/gmv/categoria`,
    {
      params: this.buildParams(filters)
    }
    );
  }

  getOrdersByStatus(filters: DashboardFilters): Observable<OrdersByStatus[]> {
    return this.http.get<OrdersByStatus[]>(
    `${this.apiUrl}/pedidos/status`,
    {
      params: this.buildParams(filters)
    }
  );
  }
  getOrdersByMonth(filters: DashboardFilters): Observable<OrdersByMonth[]> {
  return this.http.get<OrdersByMonth[]>(
    `${this.apiUrl}/pedidos/mensal`,
    {
      params: this.buildParams(filters)
    }
  );
}

getAverageTicketByMonth(filters: DashboardFilters): Observable<AverageTicketByMonth[]> {
  return this.http.get<AverageTicketByMonth[]>(
    `${this.apiUrl}/ticket-medio/mensal`,
    {
      params: this.buildParams(filters)
    }
  );
}

getOrdersByCategory(filters: DashboardFilters): Observable<OrdersByCategory[]> {
  return this.http.get<OrdersByCategory[]>(
    `${this.apiUrl}/pedidos/categoria`,
    {
      params: this.buildParams(filters)
    }
  );
}

getAverageTicketByCategory(filters: DashboardFilters): Observable<AverageTicketByCategory[]> {
  return this.http.get<AverageTicketByCategory[]>(
    `${this.apiUrl}/ticket-medio/categoria`,
    {
      params: this.buildParams(filters)
    }
  );
}

getGmvByStatus(filters: DashboardFilters): Observable<GmvByStatus[]> {
  return this.http.get<GmvByStatus[]>(
    `${this.apiUrl}/gmv/status`,
    {
      params: this.buildParams(filters)
    }
  );
}

getGmvByState(filters: DashboardFilters): Observable<GmvByState[]> {
  return this.http.get<GmvByState[]>(
    `${this.apiUrl}/gmv/estado`,
  );
}

getOrdersByState(filters: DashboardFilters): Observable<OrdersByState[]> {
  return this.http.get<OrdersByState[]>(
    `${this.apiUrl}/pedidos/estado`,
    {
      params: this.buildParams(filters)
    }
  );
}

getAverageTicketByState(filters: DashboardFilters): Observable<AverageTicketByState[]> {
  return this.http.get<AverageTicketByState[]>(
    `${this.apiUrl}/ticket-medio/estado`,
    {
      params: this.buildParams(filters)
    }
  );
}

getItemsByCategory(filters: DashboardFilters): Observable<ItemsByCategory[]> {
  return this.http.get<ItemsByCategory[]>(
    `${this.apiUrl}/itens/categoria`,
    {
      params: this.buildParams(filters)
    }
  );
}

getGmvBySellerState(filters: DashboardFilters): Observable<GmvBySellerState[]> {
  return this.http.get<GmvBySellerState[]>(
    `${this.apiUrl}/gmv/estado-vendedor`,
    {
      params: this.buildParams(filters)
    }
  );
}

}