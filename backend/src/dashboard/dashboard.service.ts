import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats(apiaryId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);

    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const [
      apiary,
      totalHives,
      activeHives,
      inactiveHives,
      totalHarvests,
      completedInspections,
      followUpInspections,
      pendingTreatments,
      upcomingHoneyVarieties,
      harvestValue,
      recentInspections,
      locations,
    ] = await Promise.all([
      this.prisma.apiary.findUnique({ where: { id: apiaryId } }),
      this.prisma.hive.count({ where: { apiaryId } }),
      this.prisma.hive.count({ where: { apiaryId, status: 'active' } }),
      this.prisma.hive.count({ where: { apiaryId, status: 'inactive' } }),
      this.prisma.harvest.count({
        where: { apiaryId, status: { in: ['extracted', 'stored'] } },
      }),
      this.prisma.inspection.count({ where: { apiaryId, status: 'completed' } }),
      this.prisma.inspection.count({
        where: {
          apiaryId,
          status: 'follow_up',
          inspectedAt: { lte: thirtyDaysLater },
        },
      }),
      this.prisma.treatment.count({
        where: {
          apiaryId,
          status: { in: ['scheduled', 'overdue'] },
          scheduledAt: { lte: sevenDaysLater },
        },
      }),
      this.prisma.honeyVariety.count({
        where: {
          apiaryId,
          status: { in: ['seasonal', 'discontinued'] },
        },
      }),
      this.prisma.harvest.aggregate({
        where: { apiaryId, status: { in: ['extracted', 'stored', 'sold'] } },
        _sum: { weightKg: true },
      }),
      this.prisma.inspection.findMany({
        where: { apiaryId },
        include: {
          hive: { select: { number: true, location: true } },
        },
        orderBy: { inspectedAt: 'desc' },
        take: 5,
      }),
      this.prisma.hive.groupBy({
        by: ['location'],
        where: { apiaryId },
        _count: { id: true },
      }),
    ]);

    const totalCapacity = apiary?.totalHives || totalHives || 1;
    const hiveActivityRate =
      totalHives > 0 ? Math.round((activeHives / totalHives) * 1000) / 10 : 0;

    const monthlyTrend = await this.getMonthlyTrend(apiaryId, sixMonthsAgo);

    return {
      totalHives,
      activeHives,
      inactiveHives,
      totalCapacity,
      hiveActivityRate,
      totalHarvests,
      completedInspections,
      followUpInspections,
      pendingTreatments,
      upcomingHoneyVarieties,
      harvestValue: harvestValue._sum.weightKg || 0,
      recentInspections,
      locations: locations.map((l) => ({
        location: l.location,
        hiveCount: l._count.id,
      })),
      monthlyTrend,
    };
  }

  private async getMonthlyTrend(apiaryId: string, since: Date) {
    const inspections = await this.prisma.inspection.findMany({
      where: { apiaryId, inspectedAt: { gte: since } },
      select: { inspectedAt: true, status: true, honeyStores: true },
    });

    const months: Record<string, { inspections: number; honeyStores: number }> = {};

    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      months[key] = { inspections: 0, honeyStores: 0 };
    }

    inspections.forEach((inspection) => {
      const key = `${inspection.inspectedAt.getFullYear()}-${String(inspection.inspectedAt.getMonth() + 1).padStart(2, '0')}`;
      if (months[key]) {
        months[key].inspections++;
        months[key].honeyStores += inspection.honeyStores || 0;
      }
    });

    return Object.entries(months).map(([month, data]) => ({
      month,
      ...data,
    }));
  }
}
