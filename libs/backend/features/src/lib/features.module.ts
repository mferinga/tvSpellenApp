import { Module } from '@nestjs/common';
import { SpelController } from './spel/spel.controller';
import { SpelService } from './spel.service';

@Module({
  controllers: [SpelController],
  providers: [SpelService],
  exports: [SpelService],
})
export class OrgFeaturesSpelModule {}
