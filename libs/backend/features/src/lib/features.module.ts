import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpelModule } from './spel/spel.module';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/TvSpellenApp'), SpelModule],
})
export class OrgFeaturesSpelModule {}
