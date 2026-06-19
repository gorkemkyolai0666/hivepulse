import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTreatmentDto, UpdateTreatmentDto } from './dto/treatment.dto';

@Injectable()
export class TreatmentsService {
  constructor(private prisma: PrismaService) {}

  async list(apiaryId: string, params: { page?: number; status?: string }) {
    const page = params.page || 1;
    const limit = 20;
    const where: Record<string, unknown> = { apiaryId };
    if (params.status) where.status = params.status;

    const [data, total] = await Promise.all([
      this.prisma.treatment.findMany({
        where,
        orderBy: { scheduledAt: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.treatment.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async get(apiaryId: string, id: string) {
    const treatment = await this.prisma.treatment.findFirst({
      where: { id, apiaryId },
    });
    if (!treatment) throw new NotFoundException('Treatment not found');
    return treatment;
  }

  async create(apiaryId: string, dto: CreateTreatmentDto) {
    return this.prisma.treatment.create({
      data: {
        ...dto,
        apiaryId,
        scheduledAt: new Date(dto.scheduledAt),
      },
    });
  }

  async update(apiaryId: string, id: string, dto: UpdateTreatmentDto) {
    await this.get(apiaryId, id);
    const { scheduledAt, ...rest } = dto;
    return this.prisma.treatment.update({
      where: { id },
      data: {
        ...rest,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
      },
    });
  }

  async remove(apiaryId: string, id: string) {
    await this.get(apiaryId, id);
    return this.prisma.treatment.delete({ where: { id } });
  }
}
