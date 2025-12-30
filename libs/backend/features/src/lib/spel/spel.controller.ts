import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SpelService } from '../spel.service';
import type { ISpel } from '@org/data-api';
import { CreateSpelDTO } from '@org/dto';

@Controller('spel')
export class SpelController {
  constructor(private readonly spelService: SpelService) {}

  @Get('')
  getAll(): ISpel[] {
    return this.spelService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number): ISpel {
    return this.spelService.getById(id);
  }

  @Post('')
  create(@Body() spelData: CreateSpelDTO): ISpel {
    return this.spelService.create(spelData);
  }
}
