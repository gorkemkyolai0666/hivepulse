import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto, UpdateTreatmentDto } from './dto/treatment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('treatments')
@UseGuards(JwtAuthGuard)
export class TreatmentsController {
  constructor(private treatmentsService: TreatmentsService) {}

  @Get()
  list(
    @Request() req: { user: { apiaryId: string } },
    @Query('page') page?: string,
    @Query('status') status?: string,
  ) {
    return this.treatmentsService.list(req.user.apiaryId, {
      page: page ? parseInt(page, 10) : undefined,
      status,
    });
  }

  @Get(':id')
  get(@Request() req: { user: { apiaryId: string } }, @Param('id') id: string) {
    return this.treatmentsService.get(req.user.apiaryId, id);
  }

  @Post()
  create(
    @Request() req: { user: { apiaryId: string } },
    @Body() dto: CreateTreatmentDto,
  ) {
    return this.treatmentsService.create(req.user.apiaryId, dto);
  }

  @Patch(':id')
  update(
    @Request() req: { user: { apiaryId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateTreatmentDto,
  ) {
    return this.treatmentsService.update(req.user.apiaryId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: { user: { apiaryId: string } }, @Param('id') id: string) {
    return this.treatmentsService.remove(req.user.apiaryId, id);
  }
}
