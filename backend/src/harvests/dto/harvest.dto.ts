import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { HarvestContainer, HarvestStatus } from '@prisma/client';

export class CreateHarvestDto {
  @IsString()
  batchName: string;

  @IsOptional()
  @IsString()
  hiveId?: string;

  @IsOptional()
  @IsString()
  floralSource?: string;

  @IsNumber()
  @Min(0)
  weightKg: number;

  @IsOptional()
  @IsEnum(HarvestContainer)
  container?: HarvestContainer;

  @IsOptional()
  @IsEnum(HarvestStatus)
  status?: HarvestStatus;

  @IsOptional()
  @IsDateString()
  harvestedAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateHarvestDto {
  @IsOptional()
  @IsString()
  batchName?: string;

  @IsOptional()
  @IsString()
  hiveId?: string;

  @IsOptional()
  @IsString()
  floralSource?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weightKg?: number;

  @IsOptional()
  @IsEnum(HarvestContainer)
  container?: HarvestContainer;

  @IsOptional()
  @IsEnum(HarvestStatus)
  status?: HarvestStatus;

  @IsOptional()
  @IsDateString()
  harvestedAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
