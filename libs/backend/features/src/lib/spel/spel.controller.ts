import {
  Controller,
  Get,
  Post,
  Put,
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
import { AddPresentatorsToSpelDTO } from '../../../../dto/src/lib/add-presentators-to-spel.dto';
import { CreatePresentatorDTO } from '../../../../dto/src/lib/create-presentator.dto';

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

  @Put(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'spelleider')
  @UsePipes(new ValidationPipe())
  async updateSpel(
    @Param('id') id: string,
    @Body() updateSpelDto: CreateSpelDTO
  ) {
    const updatedSpel = await this.spelService.updateSpel(id, updateSpelDto);

    if (!updatedSpel) {
      throw new HttpException('Spel is niet gevonden', 404);
    }

    return updatedSpel;
  }

  @Post(':id/presentators')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'spelleider')
  @UsePipes(new ValidationPipe())
  addExistingPresentators(
    @Param('id') id: string,
    @Body() dto: AddPresentatorsToSpelDTO
  ) {
    return this.spelService.addExistingPresentators(id, dto.presentatorIds);
  }

  @Post(':id/presentators/create')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'spelleider')
  @UsePipes(new ValidationPipe())
  createPresentatorAndAdd(
    @Param('id') id: string,
    @Body() dto: CreatePresentatorDTO
  ) {
    return this.spelService.createPresentatorAndAddToSpel(id, dto);
  }
}