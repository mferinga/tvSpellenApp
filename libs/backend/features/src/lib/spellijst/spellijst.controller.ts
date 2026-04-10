import {
  Body,
  Controller,
  Get,
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

@Controller('spellijsten')
export class SpellijstController {
  constructor(private readonly spellijstService: SpellijstService) {}

  @Get()
  @UseGuards(LoginAuthGuard, RolesGuard)
  @Roles('admin', 'spelleider', 'speler')
  getAll() {
    return this.spellijstService.getAll();
  }

  @Post()
  @UseGuards(LoginAuthGuard, RolesGuard)
  @Roles('admin', 'spelleider')
  @UsePipes(new ValidationPipe())
  create(
    @Body() dto: CreateSpellijstDTO,
    @Req() req: any
  ) {
    return this.spellijstService.createSpellijst(dto, req.user._id);
  }
}