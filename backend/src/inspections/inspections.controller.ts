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
  HttpCode,
} from '@nestjs/common';
import { InspectionsService } from './inspections.service';
import { CreateInspectionDto, UpdateInspectionDto } from './dto/inspection.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('inspections')
@UseGuards(JwtAuthGuard)
export class InspectionsController {
  constructor(private inspectionsService: InspectionsService) {}

  @Get()
  list(
    @Request() req: { user: { apiaryId: string } },
    @Query('page') page?: string,
    @Query('status') status?: string,
  ) {
    return this.inspectionsService.list(req.user.apiaryId, {
      page: page ? parseInt(page, 10) : undefined,
      status,
    });
  }

  @Get('follow-up')
  followUp(@Request() req: { user: { apiaryId: string } }) {
    return this.inspectionsService.list(req.user.apiaryId, { status: 'follow_up' });
  }

  @Get(':id')
  get(@Request() req: { user: { apiaryId: string } }, @Param('id') id: string) {
    return this.inspectionsService.get(req.user.apiaryId, id);
  }

  @Post()
  @HttpCode(201)
  create(
    @Request() req: { user: { apiaryId: string } },
    @Body() dto: CreateInspectionDto,
  ) {
    return this.inspectionsService.create(req.user.apiaryId, dto);
  }

  @Patch(':id')
  update(
    @Request() req: { user: { apiaryId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateInspectionDto,
  ) {
    return this.inspectionsService.update(req.user.apiaryId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: { user: { apiaryId: string } }, @Param('id') id: string) {
    return this.inspectionsService.remove(req.user.apiaryId, id);
  }
}
