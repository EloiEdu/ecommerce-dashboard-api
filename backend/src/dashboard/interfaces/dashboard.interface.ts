export interface GmvByMonth {
  month: Date;
  gmv: number;
}

export interface OrdersByMonth {
  month: Date;
  orders: number;
}

export interface AverageTicketByMonth {
  month: Date;
  averageTicket: number;
}

export interface GmvByCategory {
  category: string;
  gmv: number;
}

export interface OrdersByCategory {
  category: string;
  orders: number;
}

export interface AverageTicketByCategory {
  category: string;
  averageTicket: number;
}

export interface OrdersByStatus {
  status: string;
  orders: number;
}

export interface GmvByStatus {
  status: string;
  gmv: number;
}

export interface GmvByState {
  state: string;
  gmv: number;
}

export interface OrdersByState {
  state: string;
  orders: number;
}

export interface AverageTicketByState {
  state: string;
  averageTicket: number;
}

export interface DashboardSummary {
  gmv: number;
  orders: number;
  averageTicket: number;
}

export interface ItemsByCategory {
  category: string;
  items: number;
}

export interface GmvBySellerState {
  state: string;
  gmv: number;
}
