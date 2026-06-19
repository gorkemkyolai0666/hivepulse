import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { HoneyVarietyCategory, HoneyVarietyStatus } from '@prisma/client';

export class CreateHoneyVarietyDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsEnum(HoneyVarietyCategory)
  varietyCategory?: HoneyVarietyCategory;

  @IsOptional()
  @IsEnum(HoneyVarietyStatus)
  status?: HoneyVarietyStatus;

  @IsNumber()
  @Min(0)
  pricePerKg: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  moisturePercent?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateHoneyVarietyDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(HoneyVarietyCategory)
  varietyCategory?: HoneyVarietyCategory;

  @IsOptional()
  @IsEnum(HoneyVarietyStatus)
  status?: HoneyVarietyStatus;

  @IsOptional()
  @IsNumber()
  @Min(0)
  pricePerKg?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  moisturePercent?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
