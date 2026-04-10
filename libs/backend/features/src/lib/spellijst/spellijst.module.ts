import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpellijstController } from './spellijst.controller';
import { SpellijstService } from './spellijst.service';
import { Spellijst, SpellijstSchema } from '../schemas/spelLijst.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Spellijst.name,
        schema: SpellijstSchema,
      },
    ]),
  ],
  controllers: [SpellijstController],
  providers: [SpellijstService],
})
export class SpellijstModule {}