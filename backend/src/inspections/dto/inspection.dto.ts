import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import {
  BroodPattern,
  InspectionStatus,
  Temperament,
} from '@prisma/client';

export class CreateInspectionDto {
  @IsString()
  hiveId: string;

  @IsDateString()
  inspectedAt: string;

  @IsOptional()
  @IsEnum(BroodPattern)
  broodPattern?: BroodPattern;

  @IsOptional()
  @IsEnum(Temperament)
  temperament?: Temperament;

  @IsOptional()
  @IsNumber()
  @Min(0)
  honeyStores?: number;

  @IsOptional()
  @IsEnum(InspectionStatus)
  status?: InspectionStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateInspectionDto {
  @IsOptional()
  @IsString()
  hiveId?: string;

  @IsOptional()
  @IsDateString()
  inspectedAt?: string;

  @IsOptional()
  @IsEnum(BroodPattern)
  broodPattern?: BroodPattern;

  @IsOptional()
  @IsEnum(Temperament)
  temperament?: Temperament;

  @IsOptional()
  @IsNumber()
  @Min(0)
  honeyStores?: number;

  @IsOptional()
  @IsEnum(InspectionStatus)
  status?: InspectionStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
