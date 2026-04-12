import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpellijstController } from './spellijst.controller';
import { SpellijstService } from './spellijst.service';
import { Spellijst, SpellijstSchema } from '../schemas/spelLijst.schema';
import { Spel, SpelSchema } from '../schemas/spel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Spellijst.name, schema: SpellijstSchema },
      { name: Spel.name, schema: SpelSchema },
    ]),
  ],
  controllers: [SpellijstController],
  providers: [SpellijstService],
  exports: [SpellijstService],
})
export class SpellijstModule {}