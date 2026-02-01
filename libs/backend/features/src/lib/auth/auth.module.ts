import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LoginStrategy } from './login.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'spellenAvondSecreyKey',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, LoginStrategy],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
