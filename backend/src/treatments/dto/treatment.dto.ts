import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { TreatmentCategory, TreatmentStatus } from '@prisma/client';

export class CreateTreatmentDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TreatmentCategory)
  category?: TreatmentCategory;

  @IsOptional()
  @IsString()
  location?: string;

  @IsDateString()
  scheduledAt: string;

  @IsOptional()
  @IsEnum(TreatmentStatus)
  status?: TreatmentStatus;
}

export class UpdateTreatmentDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TreatmentCategory)
  category?: TreatmentCategory;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @IsOptional()
  @IsEnum(TreatmentStatus)
  status?: TreatmentStatus;
}
