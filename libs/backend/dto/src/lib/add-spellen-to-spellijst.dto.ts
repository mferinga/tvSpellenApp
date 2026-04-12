import { ArrayNotEmpty, IsArray, IsMongoId } from 'class-validator';

export class AddSpellenToSpellijstDTO {
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  spelIds!: string[];
}