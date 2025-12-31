import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { SpelService } from './spel.service';
import type { ISpel } from '@org/data-api';
import { CreateSpelDTO } from '@org/dto';

@Controller('spel')
export class SpelController {
  constructor(private spelService: SpelService) {}

  @Get('')
  getAll() {
    return this.spelService.getAllSpellen();
  }

  // @Get(':id')
  // getById(@Param('id') id: number): ISpel {
  //   return this.spelService.getById(id);
  // }

  @Post()
  @UsePipes(new ValidationPipe())
  createSpel(@Body() createSpelDto: CreateSpelDTO) {
    console.log(createSpelDto);
    return this.spelService.createSpel(createSpelDto);
  }
}
