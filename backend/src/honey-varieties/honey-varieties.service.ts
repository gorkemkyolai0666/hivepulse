import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateHoneyVarietyDto,
  UpdateHoneyVarietyDto,
} from './dto/honey-variety.dto';

@Injectable()
export class HoneyVarietiesService {
  constructor(private prisma: PrismaService) {}

  async list(apiaryId: string, params: { page?: number; status?: string }) {
    const page = params.page || 1;
    const limit = 20;
    const where: Record<string, unknown> = { apiaryId };
    if (params.status) where.status = params.status;

    const [data, total] = await Promise.all([
      this.prisma.honeyVariety.findMany({
        where,
        orderBy: { title: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.honeyVariety.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async get(apiaryId: string, id: string) {
    const variety = await this.prisma.honeyVariety.findFirst({
      where: { id, apiaryId },
    });
    if (!variety) throw new NotFoundException('Honey variety not found');
    return variety;
  }

  async create(apiaryId: string, dto: CreateHoneyVarietyDto) {
    return this.prisma.honeyVariety.create({ data: { ...dto, apiaryId } });
  }

  async update(apiaryId: string, id: string, dto: UpdateHoneyVarietyDto) {
    await this.get(apiaryId, id);
    return this.prisma.honeyVariety.update({ where: { id }, data: dto });
  }

  async remove(apiaryId: string, id: string) {
    await this.get(apiaryId, id);
    return this.prisma.honeyVariety.delete({ where: { id } });
  }
}
