import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Roles } from './../auth/roles/role.decorator';
import { RolesGuard } from './../auth/roles/role.guard';
import { CreateUserDto } from '@org/dto';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {

    const bcrypt = await import('bcrypt');
    const hash = await bcrypt.hash(dto.wachtwoord, 10);

    return this.userService.create({
      ...dto,
      wachtwoordHash: hash,
    });
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
