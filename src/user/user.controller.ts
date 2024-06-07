import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('users')
export class UserController extends CrudController<User, CreateUserDto, UpdateUserDto> {
  
  constructor(protected readonly service: UserService) {
    super(service)
  }

}
