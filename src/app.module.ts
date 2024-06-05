import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrudModule } from './crud/crud.module';
import { TesteModule } from './teste/teste.module';
import { TesteModule } from './teste/teste.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://0.0.0.0:27018/api-D&D'), CrudModule, TesteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
