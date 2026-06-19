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
import { HoneyVarietiesService } from './honey-varieties.service';
import { CreateHoneyVarietyDto, UpdateHoneyVarietyDto } from './dto/honey-variety.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('honey-varieties')
@UseGuards(JwtAuthGuard)
export class HoneyVarietiesController {
  constructor(private honeyVarietiesService: HoneyVarietiesService) {}

  @Get()
  list(
    @Request() req: { user: { apiaryId: string } },
    @Query('page') page?: string,
    @Query('status') status?: string,
  ) {
    return this.honeyVarietiesService.list(req.user.apiaryId, {
      page: page ? parseInt(page, 10) : undefined,
      status,
    });
  }

  @Get(':id')
  get(@Request() req: { user: { apiaryId: string } }, @Param('id') id: string) {
    return this.honeyVarietiesService.get(req.user.apiaryId, id);
  }

  @Post()
  create(
    @Request() req: { user: { apiaryId: string } },
    @Body() dto: CreateHoneyVarietyDto,
  ) {
    return this.honeyVarietiesService.create(req.user.apiaryId, dto);
  }

  @Patch(':id')
  update(
    @Request() req: { user: { apiaryId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateHoneyVarietyDto,
  ) {
    return this.honeyVarietiesService.update(req.user.apiaryId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: { user: { apiaryId: string } }, @Param('id') id: string) {
    return this.honeyVarietiesService.remove(req.user.apiaryId, id);
  }
}
