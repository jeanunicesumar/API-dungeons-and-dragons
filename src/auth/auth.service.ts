import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Usuário inválido');
    }
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw new UnauthorizedException('Usuário ou senha inválidos');
  }

  async gerarToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    const secretKey = this.configService.get<string>('SECRET_KEY');
    return {
      access_token: this.jwtService.sign(payload, {
        secret: secretKey,
        expiresIn: '60m',
      }),
    };
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    return this.gerarToken(user);
  }

  async register(user: User): Promise<any> {
    const hashedPassword = await bcrypt.hash(user.password, 10); 
    await this.userService.create({
     user: user.username,
     email: user.email,
     password: hashedPassword,
    });

    const newUser = await this.userService.findByUsername(user.username);
    newUser ? this.gerarToken(newUser) : new Error('Falha ao criar usuário');
  }
}
