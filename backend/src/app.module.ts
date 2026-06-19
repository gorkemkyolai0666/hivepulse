import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { ApiaryModule } from './apiary/apiary.module';
import { HivesModule } from './hives/hives.module';
import { HarvestsModule } from './harvests/harvests.module';
import { InspectionsModule } from './inspections/inspections.module';
import { TreatmentsModule } from './treatments/treatments.module';
import { HoneyVarietiesModule } from './honey-varieties/honey-varieties.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    AuthModule,
    ApiaryModule,
    HivesModule,
    HarvestsModule,
    InspectionsModule,
    TreatmentsModule,
    HoneyVarietiesModule,
    DashboardModule,
  ],
})
export class AppModule {}
