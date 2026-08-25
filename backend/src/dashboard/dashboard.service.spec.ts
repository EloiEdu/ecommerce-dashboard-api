import { Test, TestingModule } from '@nestjs/testing';

jest.mock('../database/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

import { DashboardService } from './dashboard.service';
import { PrismaService } from '../database/prisma.service';

describe('DashboardService', () => {
  let service: DashboardService;

  const prismaMock = {
    $queryRaw: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the dashboard summary', async () => {
    prismaMock.$queryRaw.mockResolvedValue([
      {
        gmv: 100000,
        orders: 500,
        averageTicket: 200,
      },
    ]);

    const result = await service.getDashboardSummary({});

    expect(result).toEqual({
      gmv: 100000,
      orders: 500,
      averageTicket: 200,
    });

    expect(prismaMock.$queryRaw).toHaveBeenCalled();
  });

  it('should return zero values when the dashboard summary is empty', async () => {
    prismaMock.$queryRaw.mockResolvedValue([
      {
        gmv: 0,
        orders: 0,
        averageTicket: 0,
      },
    ]);

    const result = await service.getDashboardSummary({});

    expect(result).toEqual({
      gmv: 0,
      orders: 0,
      averageTicket: 0,
    });
  });
});
