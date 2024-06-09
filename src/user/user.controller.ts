import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CrudController } from 'src/crud/crud.controller';
import { User } from './user.types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController extends CrudController<User, CreateUserDto, UpdateUserDto> {

  constructor(protected readonly Userservice: UserService) {
    super(Userservice)
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    return await this.Userservice.create(createUserDto)
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.Userservice.login(createUserDto)
  }

}
