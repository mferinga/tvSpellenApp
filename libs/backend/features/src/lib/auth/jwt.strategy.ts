import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

function extractAccessToken(req: Request): string | null {
  const cookieValue = req?.cookies?.access_token;

  if (!cookieValue) return null;

  // Case 1: cookie is already the JWT string
  if (typeof cookieValue === 'string') {
    return cookieValue;
  }

  // Case 2: { access_token: 'jwt' }
  if (
    typeof cookieValue === 'object' &&
    typeof cookieValue.access_token === 'string'
  ) {
    return cookieValue.access_token;
  }

  // Case 3: { access_token: { access_token: 'jwt' } }
  if (
    typeof cookieValue === 'object' &&
    typeof cookieValue.access_token === 'object' &&
    cookieValue.access_token !== null &&
    typeof cookieValue.access_token.access_token === 'string'
  ) {
    return cookieValue.access_token.access_token;
  }

  return null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => extractAccessToken(req),
      ]),
      secretOrKey: process.env.JWT_SECRET || 'spellenAvondSecreyKey',
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      _id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}