import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CrudController } from 'src/crud/crud.controller';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController extends CrudController<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(protected readonly service: UserService) {
    super(service);
  }
}
