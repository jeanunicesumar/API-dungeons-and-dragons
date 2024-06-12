import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { CharacterModule } from './characters/character.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [UserModule, CharacterModule, MongooseModule.forRoot('mongodb://0.0.0.0:27018/api-D&D'), ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
