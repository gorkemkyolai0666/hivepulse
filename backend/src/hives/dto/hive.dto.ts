import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { HiveStatus, HiveType } from '@prisma/client';

export class CreateHiveDto {
  @IsString()
  number: string;

  @IsString()
  location: string;

  @IsOptional()
  @IsEnum(HiveType)
  hiveType?: HiveType;

  @IsOptional()
  @IsInt()
  @Min(0)
  queenAgeMonths?: number;

  @IsOptional()
  @IsEnum(HiveStatus)
  status?: HiveStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateHiveDto {
  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(HiveType)
  hiveType?: HiveType;

  @IsOptional()
  @IsInt()
  @Min(0)
  queenAgeMonths?: number;

  @IsOptional()
  @IsEnum(HiveStatus)
  status?: HiveStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
