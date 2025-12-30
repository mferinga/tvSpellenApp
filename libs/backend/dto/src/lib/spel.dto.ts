import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ICreateSpel } from '@org/data-api';

export class CreateSpelDTO implements ICreateSpel {
  @IsString()
  @IsNotEmpty()
  naam!: string;

  @IsString()
  @IsNotEmpty()
  beschrijving!: string;
  @IsString()
  @IsNotEmpty()
  uitleg!: string;

  @IsString()
  @IsOptional()
  originleNaam?: string;

  @IsBoolean()
  @IsOptional()
  teams?: boolean;
  @IsNumber()
  @IsOptional()
  teamgrootte?: number;
}
