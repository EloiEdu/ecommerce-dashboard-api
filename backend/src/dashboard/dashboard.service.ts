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
import { DashboardFilterDto } from './dto/dashboard-filter.dto';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  private buildDashboardDateFilter(filters: DashboardFilterDto): Prisma.Sql {
    const conditions: Prisma.Sql[] = [];

    if (filters.startDate) {
      conditions.push(
        Prisma.sql`o."purchaseTimestamp" >= ${filters.startDate}::DATE`,
      );
    }

    if (filters.endDate) {
      conditions.push(
        Prisma.sql`o."purchaseTimestamp" < ${filters.endDate}::DATE + INTERVAL '1 day'`,
      );
    }

    return conditions.length > 0
      ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}`
      : Prisma.empty;
  }
  async getGmvByMonth(filters: DashboardFilterDto): Promise<GmvByMonth[]> {
    const where = this.buildDashboardDateFilter(filters);

    return this.prisma.$queryRaw<GmvByMonth[]>`
      SELECT
      DATE_TRUNC('month', o."purchaseTimestamp") AS month,
      SUM(oi."price")::DOUBLE PRECISION AS gmv
    FROM "Order" o
    JOIN "OrderItem" oi
      ON oi."orderId" = o."orderId"
      ${where}
    GROUP BY DATE_TRUNC('month', o."purchaseTimestamp")
    ORDER BY month;    
    `;
  }

  async getOrdersByMonth(
    filters: DashboardFilterDto,
  ): Promise<OrdersByMonth[]> {
    const where = this.buildDashboardDateFilter(filters);

    return this.prisma.$queryRaw<OrdersByMonth[]>`
      SELECT
      DATE_TRUNC('month', o."purchaseTimestamp") AS month,
      COUNT(DISTINCT o."orderId")::INTEGER AS orders
      FROM "Order" o
      ${where}
      GROUP BY DATE_TRUNC('month', o."purchaseTimestamp")
      ORDER BY month;
      `;
  }

  async getAverageTicketByMonth(
    filters: DashboardFilterDto,
  ): Promise<AverageTicketByMonth[]> {
    const where = this.buildDashboardDateFilter(filters);

    return this.prisma.$queryRaw<AverageTicketByMonth[]>`
      SELECT
      DATE_TRUNC('month', o."purchaseTimestamp") AS month,
      ROUND(
        SUM(oi."price") / COUNT(DISTINCT o."orderId"),
        2
      )::DOUBLE PRECISION AS "averageTicket"
      FROM "Order" o
      JOIN "OrderItem" oi
        ON oi."orderId" = o."orderId"
        ${where}
      GROUP BY DATE_TRUNC('month', o."purchaseTimestamp")
      ORDER BY month;
    `;
  }

  async getGmvByCategory(
    filters: DashboardFilterDto,
  ): Promise<GmvByCategory[]> {
    const where = this.buildDashboardDateFilter(filters);
    return this.prisma.$queryRaw<GmvByCategory[]>`
      SELECT
        COALESCE(p."categoryName", p."categoryNameEnglish", 'unknown') AS category,
        SUM(oi."price")::DOUBLE PRECISION AS gmv
      FROM "OrderItem" oi
      JOIN "Order" o
        ON o."orderId" = oi."orderId"
      JOIN "Product" p
        ON p."productId" = oi."productId"
        ${where}
      GROUP BY COALESCE(
        p."categoryName",
        p."categoryNameEnglish",
        'unknown'
      )
      ORDER BY gmv DESC;
      `;
  }

  async getOrdersByCategory(
    filters: DashboardFilterDto,
  ): Promise<OrdersByCategory[]> {
    const where = this.buildDashboardDateFilter(filters);

    return this.prisma.$queryRaw<OrdersByCategory[]>`
      SELECT
        COALESCE(
          p."categoryName",
          p."categoryNameEnglish",
          'unknown'
        ) AS category,
        COUNT(DISTINCT oi."orderId")::INTEGER AS orders
      FROM "OrderItem" oi
      JOIN "Order" o
        ON o."orderId" = oi."orderId"
      JOIN "Product" p
        ON p."productId" = oi."productId"
      ${where}
      GROUP BY COALESCE(
        p."categoryName",
        p."categoryNameEnglish",
        'unknown'
      )
      ORDER BY orders DESC;
    `;
  }

  async getAverageTicketByCategory(
    filters: DashboardFilterDto,
  ): Promise<AverageTicketByCategory[]> {
    const where = this.buildDashboardDateFilter(filters);

    return this.prisma.$queryRaw<AverageTicketByCategory[]>`
      SELECT
        COALESCE(
          p."categoryName",
          p."categoryNameEnglish",
          'unknown'
        ) AS category,
        ROUND(
         SUM(oi."price")::NUMERIC
          / COUNT(DISTINCT oi."orderId"),
          2
          )::DOUBLE PRECISION AS "averageTicket"
      FROM "OrderItem" oi
      JOIN "Order" o
        ON o."orderId" = oi."orderId"
      JOIN "Product" p
        ON p."productId" = oi."productId"
      ${where}
      GROUP BY COALESCE(
        p."categoryName",
        p."categoryNameEnglish",
        'unknown'
      )
      ORDER BY "averageTicket" DESC;    
    `;
  }

  async getOrdersByStatus(
    filters: DashboardFilterDto,
  ): Promise<OrdersByStatus[]> {
    const where = this.buildDashboardDateFilter(filters);

    return this.prisma.$queryRaw<OrdersByStatus[]>`
      SELECT
        o."status" AS status,
        COUNT(*)::INTEGER AS orders
      FROM "Order" o
      ${where}
      GROUP BY o."status"
      ORDER BY orders DESC;
    `;
  }

  async getGmvByStatus(filters: DashboardFilterDto): Promise<GmvByStatus[]> {
    const where = this.buildDashboardDateFilter(filters);

    return this.prisma.$queryRaw<GmvByStatus[]>`
      SELECT
        o."status" AS status,
        SUM(oi."price")::DOUBLE PRECISION AS gmv
      FROM "Order" o
      JOIN "OrderItem" oi
        ON oi."orderId" = o."orderId"
      ${where}
      GROUP BY o."status"
      ORDER BY gmv DESC;
    `;
  }

  async getGmvByState(filters: DashboardFilterDto): Promise<GmvByState[]> {
    const where = this.buildDashboardDateFilter(filters);

    return this.prisma.$queryRaw<GmvByState[]>`
      SELECT
      c."state" AS state,
      SUM(oi."price")::DOUBLE PRECISION AS gmv
      FROM "Order" o
      JOIN "OrderItem" oi
        ON oi."orderId" = o."orderId"
      JOIN "Customer" c
        ON c."customerId" = o."customerId"
      ${where}
      GROUP BY c."state"
      ORDER BY gmv DESC;
    `;
  }

  async getOrdersByState(
    filters: DashboardFilterDto,
  ): Promise<OrdersByState[]> {
    const where = this.buildDashboardDateFilter(filters);

    return this.prisma.$queryRaw<OrdersByState[]>`
      SELECT
      c."state" AS state,
      COUNT(DISTINCT o."orderId")::INTEGER AS orders
      FROM "Order" o
      JOIN "Customer" c
        ON c."customerId" = o."customerId"
      ${where}
      GROUP BY c."state"
      ORDER BY orders DESC;
    `;
  }

  async getAverageTicketByState(
    filters: DashboardFilterDto,
  ): Promise<AverageTicketByState[]> {
    const where = this.buildDashboardDateFilter(filters);

    return this.prisma.$queryRaw<AverageTicketByState[]>`
      SELECT
      c."state" AS state,
      ROUND(
        SUM(oi."price") / COUNT(DISTINCT o."orderId"),
        2
      )::DOUBLE PRECISION AS "averageTicket"
      FROM "Order" o
      JOIN "OrderItem" oi
        ON oi."orderId" = o."orderId"
      JOIN "Customer" c
        ON c."customerId" = o."customerId"
      ${where}
      GROUP BY c."state"
      ORDER BY "averageTicket" DESC;
    `;
  }

  async getDashboardSummary(
    filters: DashboardFilterDto,
  ): Promise<DashboardSummary> {
    const where = this.buildDashboardDateFilter(filters);
    const result = await this.prisma.$queryRaw<DashboardSummary[]>`
      SELECT
      SUM(oi."price")::DOUBLE PRECISION AS gmv,
      COUNT(DISTINCT oi."orderId")::INTEGER AS orders,
      ROUND(
        SUM(oi."price") / COUNT(DISTINCT oi."orderId"),
        2
      )::DOUBLE PRECISION AS "averageTicket"
      FROM "Order" o

      JOIN "OrderItem" oi
       ON oi."orderId" = o."orderId"
      ${where}
    `;
    return (
      result[0] ?? {
        gmv: 0,
        orders: 0,
        averageTicket: 0,
      }
    );
  }

  async getItemsByCategory(
    filters: DashboardFilterDto,
  ): Promise<ItemsByCategory[]> {
    const where = this.buildDashboardDateFilter(filters);

    return this.prisma.$queryRaw<ItemsByCategory[]>`
      SELECT
      COALESCE(
        p."categoryName",
        p."categoryNameEnglish",
        'unknown'
      ) AS category,
      COUNT(*)::INTEGER AS items
      FROM "OrderItem" oi
      JOIN "Order" o
        ON o."orderId" = oi."orderId"
      JOIN "Product" p
        ON p."productId" = oi."productId"
      ${where}
      GROUP BY COALESCE(
        p."categoryName",
        p."categoryNameEnglish",
        'unknown'
      )
      ORDER BY items DESC
      LIMIT 10;
      `;
  }

  async getGmvBySellerState(
    filters: DashboardFilterDto,
  ): Promise<GmvBySellerState[]> {
    const where = this.buildDashboardDateFilter(filters);
    return this.prisma.$queryRaw<GmvBySellerState[]>`
      SELECT
        s."state" AS state,
        SUM(oi."price")::DOUBLE PRECISION AS gmv
      FROM "Order" o
      JOIN "OrderItem" oi
        ON oi."orderId" = o."orderId"
      JOIN "Seller" s
        ON s."sellerId" = oi."sellerId"
      ${where}
      GROUP BY s."state"
      ORDER BY gmv DESC;
    `;
  }
}
