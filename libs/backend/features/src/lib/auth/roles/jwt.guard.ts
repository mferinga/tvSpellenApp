import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import { JwtStrategy } from '../../auth/jwt.strategy';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtStrategy: JwtStrategy,
    private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const requiredRoles = this.reflector.getAllAndOverride<string[]>(
    //   ROLES_KEY,
    //   [context.getHandler(), context.getClass()],
    // );

    // const token = ;
    // context.getHandler().
    const request: Request = context.switchToHttp().getRequest();

    const cookies = request.cookies;

    if(!Object.hasOwn(cookies, "access_token")){
        console.log("access_token not present");
        return false;
    }

    const tokenStr = cookies["access_token"];
    console.log(tokenStr);

    return new Promise<boolean>(async (resolve, reject) => {
        this.jwtService.verifyAsync(tokenStr).then((token: any) => {
            this.jwtStrategy.validate(token).then((user: object) => {
                console.log(user);
                resolve(true);
            }).catch(() => {
                console.log("invalid token format");
                resolve(false);
            });
            
        }).catch(() => {
            console.log("invalid token");
            resolve(false);
        }); // jwt library de token laten parsen...
    });
  }
}
