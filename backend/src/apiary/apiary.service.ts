import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateApiaryDto } from './dto/update-apiary.dto';

@Injectable()
export class ApiaryService {
  constructor(private prisma: PrismaService) {}

  get(apiaryId: string) {
    return this.prisma.apiary.findUnique({ where: { id: apiaryId } });
  }

  update(apiaryId: string, dto: UpdateApiaryDto) {
    return this.prisma.apiary.update({ where: { id: apiaryId }, data: dto });
  }
}
