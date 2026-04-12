import { ArrayUnique, IsArray, IsString } from 'class-validator';

export class UpsertSpellijstDto {
  @IsString()
  mongoId!: string;

  @IsString()
  naam!: string;

  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  spelIds!: string[];
}