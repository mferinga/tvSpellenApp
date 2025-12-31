import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, HttpException } from '@nestjs/common';
import { SpelService } from './spel.service';
import { CreateSpelDTO } from '@org/dto';

@Controller('spel')
export class SpelController {
  constructor(private spelService: SpelService) {}

  @Get()
  getAll() {
    return this.spelService.getAllSpellen();
  }

  @Get(':id')
  async getSpelById(@Param('id') id: string) {
    const findSpel = await this.spelService.getSpelById(id);
    if(!findSpel)
    {
      throw new HttpException("Spel is niet gevonden", 404);
    }
    return findSpel;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createSpel(@Body() createSpelDto: CreateSpelDTO) {
    console.log(createSpelDto);
    return this.spelService.createSpel(createSpelDto);
  }
}
