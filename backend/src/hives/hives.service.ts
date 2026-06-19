import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHiveDto, UpdateHiveDto } from './dto/hive.dto';

@Injectable()
export class HivesService {
  constructor(private prisma: PrismaService) {}

  async list(apiaryId: string, params: { page?: number; status?: string; location?: string }) {
    const page = params.page || 1;
    const limit = 20;
    const where: Record<string, unknown> = { apiaryId };
    if (params.status) where.status = params.status;
    if (params.location) where.location = params.location;

    const [data, total] = await Promise.all([
      this.prisma.hive.findMany({
        where,
        orderBy: [{ location: 'asc' }, { number: 'asc' }],
        skip: (page - 1) * limit,
        take: limit,
        include: {
          inspections: {
            orderBy: { inspectedAt: 'desc' },
            take: 1,
          },
        },
      }),
      this.prisma.hive.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async get(apiaryId: string, id: string) {
    const hive = await this.prisma.hive.findFirst({
      where: { id, apiaryId },
      include: {
        inspections: { orderBy: { inspectedAt: 'desc' }, take: 5 },
        harvests: { orderBy: { createdAt: 'desc' }, take: 5 },
      },
    });
    if (!hive) throw new NotFoundException('Hive not found');
    return hive;
  }

  async create(apiaryId: string, dto: CreateHiveDto) {
    return this.prisma.hive.create({ data: { ...dto, apiaryId } });
  }

  async update(apiaryId: string, id: string, dto: UpdateHiveDto) {
    await this.get(apiaryId, id);
    return this.prisma.hive.update({ where: { id }, data: dto });
  }

  async remove(apiaryId: string, id: string) {
    await this.get(apiaryId, id);
    return this.prisma.hive.delete({ where: { id } });
  }
}
