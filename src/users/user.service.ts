import { Injectable } from '@nestjs/common';
import { CrudService } from '../crud/crud.service';
import { User } from './schema/user.schema';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserAdapter from './user.adapter';

@Injectable()
export class UserService extends CrudService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    protected readonly userRepository: UserRepository,
    protected readonly adapter: UserAdapter,
  ) {
    super(userRepository, adapter);
  }
  
  async findByUsername(username: string): Promise<User | undefined> {
    const users: User[] = await this.userRepository.findAll();
    return users.find(user => user.username === username);
  }
  
}
