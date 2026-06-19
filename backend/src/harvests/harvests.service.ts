import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHarvestDto, UpdateHarvestDto } from './dto/harvest.dto';

@Injectable()
export class HarvestsService {
  constructor(private prisma: PrismaService) {}

  async list(apiaryId: string, params: { page?: number; status?: string }) {
    const page = params.page || 1;
    const limit = 20;
    const where: Record<string, unknown> = { apiaryId };
    if (params.status) where.status = params.status;

    const [data, total] = await Promise.all([
      this.prisma.harvest.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { hive: { select: { id: true, number: true, location: true } } },
      }),
      this.prisma.harvest.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async get(apiaryId: string, id: string) {
    const harvest = await this.prisma.harvest.findFirst({
      where: { id, apiaryId },
      include: { hive: true },
    });
    if (!harvest) throw new NotFoundException('Harvest not found');
    return harvest;
  }

  async create(apiaryId: string, dto: CreateHarvestDto) {
    const { harvestedAt, ...rest } = dto;
    return this.prisma.harvest.create({
      data: {
        ...rest,
        apiaryId,
        harvestedAt: harvestedAt ? new Date(harvestedAt) : undefined,
      },
    });
  }

  async update(apiaryId: string, id: string, dto: UpdateHarvestDto) {
    await this.get(apiaryId, id);
    const { harvestedAt, ...rest } = dto;
    return this.prisma.harvest.update({
      where: { id },
      data: {
        ...rest,
        harvestedAt: harvestedAt ? new Date(harvestedAt) : undefined,
      },
    });
  }

  async remove(apiaryId: string, id: string) {
    await this.get(apiaryId, id);
    return this.prisma.harvest.delete({ where: { id } });
  }
}
