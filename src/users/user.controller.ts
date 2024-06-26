import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CrudController } from 'src/crud/crud.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UserController extends CrudController<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(protected readonly userService: UserService) {
    super(userService);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() createUserDto: LoginUserDto): Promise<Object> {
    return { token: await this.userService.login(createUserDto) }
  }
}
