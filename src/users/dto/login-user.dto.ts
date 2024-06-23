import { IsEmail, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class LoginUserDto {

    @ValidateIf(field => !field.email)
    @IsString()
    @IsNotEmpty()
    username?: string;
  
    @ValidateIf(field => !field.username)
    @IsEmail()
    @IsNotEmpty()
    email?: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
}