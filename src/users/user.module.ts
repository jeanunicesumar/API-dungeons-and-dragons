import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config'
import UserAdapter from './user.adapter';
import { JwtModule } from '@nestjs/jwt';
import { Token } from 'src/common/utils/token/token';
import { JwtStrategy } from 'src/common/utils/strategy/jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('SECRET_KEY'),
      signOptions: { expiresIn: '60min' }
    })
  })
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserAdapter, Token, JwtStrategy],
  exports: [UserService]
})
export class UserModule { }
