import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInspectionDto, UpdateInspectionDto } from './dto/inspection.dto';

@Injectable()
export class InspectionsService {
  constructor(private prisma: PrismaService) {}

  async list(apiaryId: string, params: { page?: number; status?: string }) {
    const page = params.page || 1;
    const limit = 20;
    const where: Record<string, unknown> = { apiaryId };
    if (params.status) where.status = params.status;

    const [data, total] = await Promise.all([
      this.prisma.inspection.findMany({
        where,
        orderBy: { inspectedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { hive: { select: { id: true, number: true, location: true } } },
      }),
      this.prisma.inspection.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async get(apiaryId: string, id: string) {
    const inspection = await this.prisma.inspection.findFirst({
      where: { id, apiaryId },
      include: { hive: true },
    });
    if (!inspection) throw new NotFoundException('Inspection not found');
    return inspection;
  }

  async create(apiaryId: string, dto: CreateInspectionDto) {
    return this.prisma.inspection.create({
      data: {
        ...dto,
        apiaryId,
        inspectedAt: new Date(dto.inspectedAt),
      },
    });
  }

  async update(apiaryId: string, id: string, dto: UpdateInspectionDto) {
    await this.get(apiaryId, id);
    const { inspectedAt, ...rest } = dto;
    return this.prisma.inspection.update({
      where: { id },
      data: {
        ...rest,
        inspectedAt: inspectedAt ? new Date(inspectedAt) : undefined,
      },
    });
  }

  async remove(apiaryId: string, id: string) {
    await this.get(apiaryId, id);
    return this.prisma.inspection.delete({ where: { id } });
  }
}
