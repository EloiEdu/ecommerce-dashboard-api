import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
} from '../interfaces/dashboard.interfaces'
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/dashboard';

  getSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(
      `${this.apiUrl}/resumo`,
    );
  }
  getGmvByMonth(): Observable<GmvByMonth[]> {
    return this.http.get<GmvByMonth[]>(
    `${this.apiUrl}/gmv/mensal`,
  );  
  }
  getGmvByCategory(): Observable<GmvByCategory[]> {
    return this.http.get<GmvByCategory[]>(
    `${this.apiUrl}/gmv/categoria`,
    );
  }

  getOrdersByStatus(): Observable<OrdersByStatus[]> {
    return this.http.get<OrdersByStatus[]>(
    `${this.apiUrl}/pedidos/status`,
  );
  }
  getOrdersByMonth(): Observable<OrdersByMonth[]> {
  return this.http.get<OrdersByMonth[]>(
    `${this.apiUrl}/pedidos/mensal`,
  );
}

getAverageTicketByMonth(): Observable<AverageTicketByMonth[]> {
  return this.http.get<AverageTicketByMonth[]>(
    `${this.apiUrl}/ticket-medio/mensal`,
  );
}

getOrdersByCategory(): Observable<OrdersByCategory[]> {
  return this.http.get<OrdersByCategory[]>(
    `${this.apiUrl}/pedidos/categoria`,
  );
}

getAverageTicketByCategory(): Observable<AverageTicketByCategory[]> {
  return this.http.get<AverageTicketByCategory[]>(
    `${this.apiUrl}/ticket-medio/categoria`,
  );
}

getGmvByStatus(): Observable<GmvByStatus[]> {
  return this.http.get<GmvByStatus[]>(
    `${this.apiUrl}/gmv/status`,
  );
}

getGmvByState(): Observable<GmvByState[]> {
  return this.http.get<GmvByState[]>(
    `${this.apiUrl}/gmv/estado`,
  );
}

getOrdersByState(): Observable<OrdersByState[]> {
  return this.http.get<OrdersByState[]>(
    `${this.apiUrl}/pedidos/estado`,
  );
}

getAverageTicketByState(): Observable<AverageTicketByState[]> {
  return this.http.get<AverageTicketByState[]>(
    `${this.apiUrl}/ticket-medio/estado`,
  );
}

getItemsByCategory(): Observable<ItemsByCategory[]> {
  return this.http.get<ItemsByCategory[]>(
    `${this.apiUrl}/itens/categoria`,
  );
}

getGmvBySellerState(): Observable<GmvBySellerState[]> {
  return this.http.get<GmvBySellerState[]>(
    `${this.apiUrl}/gmv/estado-vendedor`,
  );
}

}