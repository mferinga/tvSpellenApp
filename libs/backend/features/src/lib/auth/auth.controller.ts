import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@org/dto';
import type { Response } from 'express';
import type { Request } from 'express';
import { JwtGuard } from './roles/jwt.guard';
//import { LoginDto } from '@org/dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: any, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(dto);

    console.log(token);
    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    });

    return { success: true };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { success: true };
  }

  @Get('me')
  @UseGuards(JwtGuard)
  me(@Req() req : Request) {
    return req.user;
  }

}
