import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { CharacterModule } from './characters/character.module';
import { ConfigModule } from '@nestjs/config';
import { GeminiService } from './gemini/gemini.service';
import { LogSchema } from './responseTime/schema/log.schema';
import { LogService } from './responseTime/log.service';
import { LogModule } from './responseTime/log.module';


@Module({
  imports: [
    UserModule,
    CharacterModule,
    MongooseModule.forRoot('mongodb://0.0.0.0:27018/api-D&D'),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forFeature([{ name: 'Log', schema: LogSchema }]),
    LogModule
  ],
  controllers: [],
  providers: [GeminiService, LogService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogService).forRoutes('*');
  }
}
