import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  ArrayUnique,
} from 'class-validator';

export class CreateSpellijstDTO {
  @IsString()
  naam!: string;

  @IsOptional()
  @IsString()
  beschrijving?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  spelIds?: string[];

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  spelerIds?: string[];
}