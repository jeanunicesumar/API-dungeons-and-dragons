import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://0.0.0.0:27018/api-D&D')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
