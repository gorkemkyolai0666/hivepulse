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
import { HivesService } from './hives.service';
import { CreateHiveDto, UpdateHiveDto } from './dto/hive.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('hives')
@UseGuards(JwtAuthGuard)
export class HivesController {
  constructor(private hivesService: HivesService) {}

  @Get()
  list(
    @Request() req: { user: { apiaryId: string } },
    @Query('page') page?: string,
    @Query('status') status?: string,
    @Query('location') location?: string,
  ) {
    return this.hivesService.list(req.user.apiaryId, {
      page: page ? parseInt(page, 10) : undefined,
      status,
      location,
    });
  }

  @Get(':id')
  get(@Request() req: { user: { apiaryId: string } }, @Param('id') id: string) {
    return this.hivesService.get(req.user.apiaryId, id);
  }

  @Post()
  create(
    @Request() req: { user: { apiaryId: string } },
    @Body() dto: CreateHiveDto,
  ) {
    return this.hivesService.create(req.user.apiaryId, dto);
  }

  @Patch(':id')
  update(
    @Request() req: { user: { apiaryId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateHiveDto,
  ) {
    return this.hivesService.update(req.user.apiaryId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: { user: { apiaryId: string } }, @Param('id') id: string) {
    return this.hivesService.remove(req.user.apiaryId, id);
  }
}
