import { Test, TestingModule } from '@nestjs/testing';

jest.mock('./dashboard.service', () => ({
  DashboardService: class DashboardService {},
}));

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

describe('DashboardController', () => {
  let controller: DashboardController;

  const dashboardServiceMock = {
    getDashboardSummary: jest.fn(),
    getGmvByMonth: jest.fn(),
    getOrdersByMonth: jest.fn(),
    getAverageTicketByMonth: jest.fn(),
    getGmvByCategory: jest.fn(),
    getOrdersByCategory: jest.fn(),
    getAverageTicketByCategory: jest.fn(),
    getOrdersByStatus: jest.fn(),
    getGmvByStatus: jest.fn(),
    getGmvByState: jest.fn(),
    getOrdersByState: jest.fn(),
    getAverageTicketByState: jest.fn(),
    getItemsByCategory: jest.fn(),
    getGmvBySellerState: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        {
          provide: DashboardService,
          useValue: dashboardServiceMock,
        },
      ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
