import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import CommonRequest from './common-request';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [],
  exports: [CommonRequest],
})
export class CommonRequestModule {}
