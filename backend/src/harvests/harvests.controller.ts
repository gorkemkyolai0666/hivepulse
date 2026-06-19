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
import { HarvestsService } from './harvests.service';
import { CreateHarvestDto, UpdateHarvestDto } from './dto/harvest.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('harvests')
@UseGuards(JwtAuthGuard)
export class HarvestsController {
  constructor(private harvestsService: HarvestsService) {}

  @Get()
  list(
    @Request() req: { user: { apiaryId: string } },
    @Query('page') page?: string,
    @Query('status') status?: string,
  ) {
    return this.harvestsService.list(req.user.apiaryId, {
      page: page ? parseInt(page, 10) : undefined,
      status,
    });
  }

  @Get(':id')
  get(@Request() req: { user: { apiaryId: string } }, @Param('id') id: string) {
    return this.harvestsService.get(req.user.apiaryId, id);
  }

  @Post()
  create(
    @Request() req: { user: { apiaryId: string } },
    @Body() dto: CreateHarvestDto,
  ) {
    return this.harvestsService.create(req.user.apiaryId, dto);
  }

  @Patch(':id')
  update(
    @Request() req: { user: { apiaryId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateHarvestDto,
  ) {
    return this.harvestsService.update(req.user.apiaryId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: { user: { apiaryId: string } }, @Param('id') id: string) {
    return this.harvestsService.remove(req.user.apiaryId, id);
  }
}
