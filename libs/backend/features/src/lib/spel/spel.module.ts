import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Spel, SpelSchema } from '../schemas/spel.schema';
import { SpelController } from './spel.controller';
import { SpelService } from './spel.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [SpelController],
  providers: [SpelService],
  imports: [MongooseModule.forFeature([{
    name: Spel.name,
    schema : SpelSchema,
  }]),
  AuthModule],
})
export class SpelModule {}