import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/common/utils/guards/jwt.guard';
import { CrudController } from 'src/crud/crud.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController extends CrudController<User, CreateUserDto, UpdateUserDto> {

  constructor(protected readonly userService: UserService) {
    super(userService)
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    return await this.userService.create(createUserDto)
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto): Promise<string> {
    return await this.userService.login(createUserDto)
  }
}
