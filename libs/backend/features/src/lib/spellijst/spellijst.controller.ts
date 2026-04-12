import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SpellijstService } from './spellijst.service';
import { LoginAuthGuard } from '../auth/login.auth.guard';
import { RolesGuard } from '../auth/roles/role.guard';
import { Roles } from '../auth/roles/role.decorator';
import { CreateSpellijstDTO } from '../../../../dto/src/lib/create-spellijst.dto';
import { AddSpellenToSpellijstDTO } from '../../../../dto/src/lib/add-spellen-to-spellijst.dto'
import { CreateSpelDTO } from '@org/dto';

@Controller('spellijsten')
export class SpellijstController {
  constructor(private readonly spellijstService: SpellijstService) {}

  @Get()
  @UseGuards(LoginAuthGuard, RolesGuard)
  @Roles('admin', 'spelleider', 'speler')
  getAll() {
    return this.spellijstService.getAll();
  }

  @Get(':id')
  @UseGuards(LoginAuthGuard, RolesGuard)
  @Roles('admin', 'spelleider', 'speler')
  async getSpelById(@Param('id') id: string) {
    return await this.spellijstService.getSpelById(id);
  }

  @Post()
  @UseGuards(LoginAuthGuard, RolesGuard)
  @Roles('admin', 'spelleider')
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateSpellijstDTO, @Req() req: any) {
    return this.spellijstService.createSpellijst(dto, req.user._id);
  }

  @Post(':id/spellen')
  @UseGuards(LoginAuthGuard, RolesGuard)
  @Roles('admin', 'spelleider')
  @UsePipes(new ValidationPipe())
  addExistingSpellen(
    @Param('id') id: string,
    @Body() dto: AddSpellenToSpellijstDTO
  ) {
    return this.spellijstService.addExistingSpellen(id, dto.spelIds);
  }

  @Post(':id/spellen/create')
  @UseGuards(LoginAuthGuard, RolesGuard)
  @Roles('admin', 'spelleider')
  @UsePipes(new ValidationPipe())
  createSpelAndAdd(
    @Param('id') id: string,
    @Body() dto: CreateSpelDTO
  ) {
    return this.spellijstService.createSpelAndAddToSpellijst(id, dto);
  }

  @Delete(':id/spellen/:spelId')
  @UseGuards(LoginAuthGuard, RolesGuard)
  @Roles('admin', 'spelleider')
  removeSpel(
    @Param('id') id: string,
    @Param('spelId') spelId: string
  ) {
    return this.spellijstService.removeSpelFromSpellijst(id, spelId);
  }
}