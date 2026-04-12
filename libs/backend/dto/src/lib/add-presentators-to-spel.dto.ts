import { ArrayNotEmpty, IsArray, IsMongoId } from 'class-validator';

export class AddPresentatorsToSpelDTO {
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  presentatorIds!: string[];
}