import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpelModule } from './spel/spel.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SpellijstModule } from './spellijst/spellijst.module';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/TvSpellenApp'), 
    UserModule,
    SpelModule,
    AuthModule,
    SpellijstModule
  ],
})
export class OrgFeaturesSpelModule {}
