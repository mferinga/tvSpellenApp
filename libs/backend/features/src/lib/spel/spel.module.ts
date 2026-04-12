import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { SpelController } from './spel.controller';
import { SpelService } from './spel.service';
import { PresentatorController } from '../presentator/presentator.controller';
import { Spel, SpelSchema } from '../schemas/spel.schema';
import { Presentator, PresentatorSchema } from '../schemas/presentator.schema';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'spellenAvondSecreyKey',
    }),
    MongooseModule.forFeature([
      { name: Spel.name, schema: SpelSchema },
      { name: Presentator.name, schema: PresentatorSchema },
    ]),
  ],
  controllers: [SpelController, PresentatorController],
  providers: [SpelService],
  exports: [SpelService],
})
export class SpelModule {}