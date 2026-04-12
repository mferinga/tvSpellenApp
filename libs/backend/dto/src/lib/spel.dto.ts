import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsArray,
  IsMongoId,
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
  orgineleNaam?: string;

  @IsBoolean()
  @IsOptional()
  teams?: boolean;
  @IsNumber()
  @IsOptional()
  teamGrootte?: number;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  presentators?: string[];
}
