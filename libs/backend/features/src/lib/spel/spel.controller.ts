import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { SpelService } from './spel.service';
import { CreateSpelDTO } from '@org/dto';
import { Roles } from '../auth/roles/role.decorator';
import { RolesGuard } from '../auth/roles/role.guard';
import { JwtGuard } from '../auth/roles/jwt.guard';

@Controller('spel')
export class SpelController {
  constructor(private spelService: SpelService) {}

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'spelleider', 'speler')
  getAll() {
    return this.spelService.getAllSpellen();
  }

  @Get(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'spelleider', 'speler')
  async getSpelById(@Param('id') id: string) {
    const findSpel = await this.spelService.getSpelById(id);

    if (!findSpel) {
      throw new HttpException('Spel is niet gevonden', 404);
    }

    return findSpel;
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'spelleider')
  @UsePipes(new ValidationPipe())
  createSpel(@Body() createSpelDto: CreateSpelDTO) {
    return this.spelService.createSpel(createSpelDto);
  }
}