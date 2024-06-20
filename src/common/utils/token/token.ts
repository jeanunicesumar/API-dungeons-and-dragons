import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schema/user.schema';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Token {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async generateToken(user: User): Promise<string> {
    const payload = {
      email: user.email,
      username: user.username,
    };
    const secretKey = this.configService.get<string>('SECRET_KEY');
    return this.jwtService.sign(payload, {
      secret: secretKey,
      expiresIn: '60min',
    });
  }
}
