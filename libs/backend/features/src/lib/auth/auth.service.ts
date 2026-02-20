import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '@org/dto';
import { LoginDto } from '@org/dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const hash = await bcrypt.hash(dto.wachtwoord, 10);

    const user = await this.userService.create({
      ...dto,
      wachtwoordHash: hash,
    });

    return this.signToken(user);
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(
      dto.wachtwoord,
      user.wachtwoordHash,
    );

    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.signToken(user);
  }

  private signToken(user: any) {
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.rol,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
