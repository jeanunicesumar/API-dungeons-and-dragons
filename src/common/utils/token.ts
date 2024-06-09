import { JwtService } from '@nestjs/jwt'
import { UnauthorizedError } from './erros/unauthorized'
import { User } from 'src/user/schema/user.schema'
import { StatusCode } from '../enum/statusCode'
import { ConfigService } from '@nestjs/config'
import jwt from 'jsonwebtoken'
import { configServer } from './configServidor'

export class Token {

    private static readonly jwtService: JwtService
    private static readonly configService: ConfigService


    public static generateToken(user: User): string {
        const payload = {
            email: user.email,
            username: user.username,
        }
        const secretKey = this.configService.get<string | undefined>('SECRET_KEY')
        console.log(secretKey)
        return this.jwtService.sign(payload, {
            secret: secretKey,
            expiresIn: '60min'
        })
    }

}