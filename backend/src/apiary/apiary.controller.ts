import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { ApiaryService } from './apiary.service';
import { UpdateApiaryDto } from './dto/update-apiary.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('apiary')
@UseGuards(JwtAuthGuard)
export class ApiaryController {
  constructor(private apiaryService: ApiaryService) {}

  @Get()
  get(@Request() req: { user: { apiaryId: string } }) {
    return this.apiaryService.get(req.user.apiaryId);
  }

  @Patch()
  update(
    @Request() req: { user: { apiaryId: string } },
    @Body() dto: UpdateApiaryDto,
  ) {
    return this.apiaryService.update(req.user.apiaryId, dto);
  }
}
