import { IsBoolean, IsOptional, IsString, IsNumber } from 'class-validator';

export class UpsertSpelDto {
  @IsString()
  mongoId!: string;

  @IsString()
  naam!: string;

  @IsOptional()
  @IsBoolean()
  teams?: boolean;

  @IsOptional()
  @IsNumber()
  teamgrootte?: number;
}