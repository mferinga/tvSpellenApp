import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Presentator } from '../schemas/presentator.schema';
import { JwtGuard } from '../auth/roles/jwt.guard';
import { RolesGuard } from '../auth/roles/role.guard';
import { Roles } from '../auth/roles/role.decorator';
import { CreatePresentatorDTO } from '../../../../dto/src/lib/create-presentator.dto';

@Controller('presentator')
export class PresentatorController {
  constructor(
    @InjectModel(Presentator.name)
    private presentatorModel: Model<Presentator>
  ) {}

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'spelleider', 'speler')
  getAll() {
    return this.presentatorModel.find().exec();
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin', 'spelleider')
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreatePresentatorDTO) {
    const presentator = new this.presentatorModel({
      naam: dto.naam,
      geboortedatum: dto.geboortedatum ? new Date(dto.geboortedatum) : undefined,
      bio: dto.bio,
    });

    return presentator.save();
  }
}