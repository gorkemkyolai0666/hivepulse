import { Module } from '@nestjs/common';
import { ApiaryController } from './apiary.controller';
import { ApiaryService } from './apiary.service';

@Module({
  controllers: [ApiaryController],
  providers: [ApiaryService],
})
export class ApiaryModule {}
