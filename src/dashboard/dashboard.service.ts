import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import {
  GmvByMonth,
  OrdersByMonth,
  AverageTicketByMonth,
  GmvByCategory,
  OrdersByCategory,
  AverageTicketByCategory,
  OrdersByStatus,
  GmvByStatus,
  GmvByState,
  OrdersByState,
  AverageTicketByState,
  DashboardSummary,
  ItemsByCategory,
  GmvBySellerState,
} from './interfaces/dashboard.interface';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getGmvByMonth(): Promise<GmvByMonth[]> {
    return this.prisma.$queryRaw<GmvByMonth[]>`
      SELECT
      DATE_TRUNC('month', o."purchaseTimestamp") AS month,
      SUM(oi."price")::DOUBLE PRECISION AS gmv
    FROM "Order" o
    JOIN "OrderItem" oi
      ON oi."orderId" = o."orderId"
    GROUP BY DATE_TRUNC('month', o."purchaseTimestamp")
    ORDER BY month;    
    `;
  }

  async getOrdersByMonth(): Promise<OrdersByMonth[]> {
    return this.prisma.$queryRaw<OrdersByMonth[]>`
      SELECT
      DATE_TRUNC('month', o."purchaseTimestamp") AS month,
      COUNT(DISTINCT o."orderId")::INTEGER AS orders
      FROM "Order" o
      GROUP BY DATE_TRUNC('month', o."purchaseTimestamp")
      ORDER BY month;
      `;
  }

  async getAverageTicketByMonth(): Promise<AverageTicketByMonth[]> {
    return this.prisma.$queryRaw<AverageTicketByMonth[]>`
      SELECT
      DATE_TRUNC('month', o."purchaseTimestamp") AS month,
      (
        SUM(oi."price") / COUNT(DISTINCT o."orderId")
      )::DOUBLE PRECISION AS "averageTicket"
      FROM "Order" o
      JOIN "OrderItem" oi
        ON oi."orderId" = o."orderId"
      GROUP BY DATE_TRUNC('month', o."purchaseTimestamp")
      ORDER BY month;
    `;
  }

  async getGmvByCategory(): Promise<GmvByCategory[]> {
    return this.prisma.$queryRaw<GmvByCategory[]>`
      SELECT
        COALESCE(p."categoryName", p."categoryNameEnglish", 'unknown') AS category,
        SUM(oi."price")::DOUBLE PRECISION AS gmv
      FROM "OrderItem" oi
      JOIN "Product" p
        ON p."productId" = oi."productId"
      GROUP BY COALESCE(
        p."categoryName",
        p."categoryNameEnglish",
        'unknown'
      )
      ORDER BY gmv DESC;
      `;
  }

  async getOrdersByCategory(): Promise<OrdersByCategory[]> {
    return this.prisma.$queryRaw<OrdersByCategory[]>`
      SELECT
        COALESCE(
          p."categoryName",
          p."categoryNameEnglish",
          'unknown'
        ) AS category,
        COUNT(DISTINCT oi."orderId")::INTEGER AS orders
      FROM "OrderItem" oi
      JOIN "Product" p
        ON p."productId" = oi."productId"
      GROUP BY COALESCE(
        p."categoryName",
        p."categoryNameEnglish",
        'unknown'
      )
      ORDER BY orders DESC;
    `;
  }

  async getAverageTicketByCategory(): Promise<AverageTicketByCategory[]> {
    return this.prisma.$queryRaw<AverageTicketByCategory[]>`
      SELECT
        COALESCE(
          p."categoryName",
          p."categoryNameEnglish",
          'unknown'
        ) AS category,
        (
          SUM(oi."price") / COUNT(DISTINCT oi."orderId")
        )::DOUBLE PRECISION AS "averageTicket"
      FROM "OrderItem" oi
      JOIN "Product" p
        ON p."productId" = oi."productId"
      GROUP BY COALESCE(
        p."categoryName",
        p."categoryNameEnglish",
        'unknown'
      )
      ORDER BY "averageTicket" DESC;    
    `;
  }

  async getOrdersByStatus(): Promise<OrdersByStatus[]> {
    return this.prisma.$queryRaw<OrdersByStatus[]>`
      SELECT
        o."status",
        COUNT(*)::INTEGER AS orders
      FROM "Order" o
      GROUP BY o."status"
      ORDER BY orders DESC;
    `;
  }

  async getGmvByStatus(): Promise<GmvByStatus[]> {
    return this.prisma.$queryRaw<GmvByStatus[]>`
      SELECT
        o."status",
        SUM(oi."price")::DOUBLE PRECISION AS gmv
      FROM "Order" o
      JOIN "OrderItem" oi
        ON oi."orderId" = o."orderId"
      GROUP BY o."status"
      ORDER BY gmv DESC;
    `;
  }

  async getGmvByState(): Promise<GmvByState[]> {
    return this.prisma.$queryRaw<GmvByState[]>`
      SELECT
      c."state",
      SUM(oi."price")::DOUBLE PRECISION AS gmv
      FROM "Order" o
      JOIN "Customer" c
        ON c."customerId" = o."customerId"
      JOIN "OrderItem" oi
        ON oi."orderId" = o."orderId"
      GROUP BY c."state"
      ORDER BY gmv DESC;
    `;
  }

  async getOrdersByState(): Promise<OrdersByState[]> {
    return this.prisma.$queryRaw<OrdersByState[]>`
      SELECT
      c."state",
      COUNT(DISTINCT o."orderId")::INTEGER AS orders
      FROM "Order" o
      JOIN "Customer" c
        ON c."customerId" = o."customerId"
      GROUP BY c."state"
      ORDER BY orders DESC;
    `;
  }

  async getAverageTicketByState(): Promise<AverageTicketByState[]> {
    return this.prisma.$queryRaw<AverageTicketByState[]>`
      SELECT
      c."state",
      (
        SUM(oi."price") / COUNT(DISTINCT o."orderId")
      )::DOUBLE PRECISION AS "averageTicket"
      FROM "Order" o
      JOIN "Customer" c
        ON c."customerId" = o."customerId"
      JOIN "OrderItem" oi
        ON oi."orderId" = o."orderId"
      GROUP BY c."state"
      ORDER BY "averageTicket" DESC;
    `;
  }

  async getDashboardSummary(): Promise<DashboardSummary> {
    const result = await this.prisma.$queryRaw<DashboardSummary[]>`
      SELECT
      SUM(oi."price")::DOUBLE PRECISION AS gmv,
      COUNT(DISTINCT oi."orderId")::INTEGER AS orders,
      (
        SUM(oi."price") / COUNT(DISTINCT oi."orderId")
      )::DOUBLE PRECISION AS "averageTicket"
      FROM "OrderItem" oi;
    `;
    return (
      result[0] ?? {
        gmv: 0,
        orders: 0,
        averageTicket: 0,
      }
    );
  }

  async getItemsByCategory(): Promise<ItemsByCategory[]> {
    return this.prisma.$queryRaw<ItemsByCategory[]>`
      SELECT
      COALESCE(
        p."categoryName",
        p."categoryNameEnglish",
        'unknown'
      ) AS category,
      COUNT(*)::INTEGER AS items
      FROM "OrderItem" oi
      JOIN "Product" p
        ON p."productId" = oi."productId"
      GROUP BY COALESCE(
        p."categoryName",
        p."categoryNameEnglish",
        'unknown'
      )
      ORDER BY items DESC
      LIMIT 10;
      `;
  }

  async getGmvBySellerState(): Promise<GmvBySellerState[]> {
    return this.prisma.$queryRaw<GmvBySellerState[]>`
      SELECT
        s."state",
        SUM(oi."price")::DOUBLE PRECISION AS gmv
      FROM "OrderItem" oi
      JOIN "Seller" s
        ON s."sellerId" = oi."sellerId"
      GROUP BY s."state"
      ORDER BY gmv DESC;
    `;
  }
}
