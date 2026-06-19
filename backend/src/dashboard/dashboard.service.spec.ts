import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DashboardService', () => {
  let service: DashboardService;

  const mockPrisma = {
    apiary: { findUnique: jest.fn() },
    hive: { count: jest.fn(), groupBy: jest.fn() },
    harvest: { count: jest.fn(), aggregate: jest.fn() },
    inspection: {
      count: jest.fn(),
      findMany: jest.fn().mockResolvedValue([]),
    },
    treatment: { count: jest.fn() },
    honeyVariety: { count: jest.fn() },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    jest.clearAllMocks();
  });

  it('should return dashboard stats', async () => {
    mockPrisma.apiary.findUnique.mockResolvedValue({ totalHives: 48 });
    mockPrisma.hive.count.mockResolvedValue(10);
    mockPrisma.harvest.count.mockResolvedValue(8);
    mockPrisma.inspection.count.mockResolvedValue(5);
    mockPrisma.harvest.aggregate.mockResolvedValue({ _sum: { weightKg: 220.5 } });
    mockPrisma.inspection.findMany.mockResolvedValue([]);
    mockPrisma.treatment.count.mockResolvedValue(2);
    mockPrisma.honeyVariety.count.mockResolvedValue(1);
    mockPrisma.hive.groupBy.mockResolvedValue([
      { location: 'Meadow North', _count: { id: 5 } },
    ]);

    const stats = await service.getStats('apiary-1');

    expect(stats).toHaveProperty('hiveActivityRate');
    expect(stats).toHaveProperty('harvestValue', 220.5);
    expect(stats).toHaveProperty('locations');
    expect(stats).toHaveProperty('followUpInspections');
    expect(stats).toHaveProperty('pendingTreatments');
    expect(stats).toHaveProperty('upcomingHoneyVarieties');
  });
});
