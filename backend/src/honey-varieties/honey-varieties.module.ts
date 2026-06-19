import { Module } from '@nestjs/common';
import { HoneyVarietiesController } from './honey-varieties.controller';
import { HoneyVarietiesService } from './honey-varieties.service';

@Module({
  controllers: [HoneyVarietiesController],
  providers: [HoneyVarietiesService],
})
export class HoneyVarietiesModule {}
