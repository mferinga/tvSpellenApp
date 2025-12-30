import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrgFeaturesSpelModule } from '@org/features';

@Module({
  imports: [OrgFeaturesSpelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
