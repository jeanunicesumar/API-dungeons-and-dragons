import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CharacterModule } from './character/character.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, CharacterModule, MongooseModule.forRoot('mongodb://0.0.0.0:27018/api-D&D'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
