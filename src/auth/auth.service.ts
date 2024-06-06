import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOneByUsername(username);
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
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.SECRET_KEY,
        expiresIn: '60m',
      }),
    };
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    return this.gerarToken(user);
  }

  async register(user: User): Promise<any> {
    const hashedPassword = await bcrypt.hash(user.password, 10); //passar DTO depois
    const newUser = await this.userService.create({
      ...user,
      password: hashedPassword,
    });
    return this.gerarToken(newUser);
  }
}
