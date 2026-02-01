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

  // CREATE user (admin creates accounts)
  @Post()
  async create(@Body() dto: CreateUserDto) {

    const bcrypt = await import('bcrypt');
    const hash = await bcrypt.hash(dto.wachtwoord, 10);

    return this.userService.create({
      ...dto,
      wachtwoordHash: hash,
    });
  }

  // READ all users
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  // READ one user
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  // DELETE user
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
