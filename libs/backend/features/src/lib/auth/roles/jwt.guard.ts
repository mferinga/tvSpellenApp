import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request & { user?: any }>();
    const cookies = request.cookies;

    if (!cookies || !cookies.access_token) {
      console.log('access_token not present');
      return false;
    }

    try {
      const tokenStr = cookies.access_token;
      const payload = await this.jwtService.verifyAsync(tokenStr);

      request.user = {
        userId: payload.sub,
        email: payload.email,
        role: payload.role,
      };

      return true;
    } catch (error) {
      console.log('invalid token', error);
      return false;
    }
  }
}