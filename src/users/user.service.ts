import { Injectable } from '@nestjs/common';
import { CrudService } from '../crud/crud.service';
import { User } from './schema/user.schema';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserAdapter from './user.adapter';
import { Password } from 'src/common/utils/password';
import { Token } from 'src/common/utils/token/token';

@Injectable()
export class UserService extends CrudService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    protected readonly userRepository: UserRepository,
    protected readonly adapter: UserAdapter,
    protected readonly token: Token
  ) {
    super(userRepository, adapter);
  }

  public async create(newUser: CreateUserDto): Promise<void> {
    const _user = this.adapter.createToEntity(newUser)
    const user = await this.userRepository.findByEmail(_user.email, _user.username)
    if (!user) {
      _user.password = await Password.generateEncrypted(_user.password)
      await this.userRepository.create(_user)
    }
  }

  public async login(loginUser: CreateUserDto): Promise<string> {
    const user = this.adapter.createToEntity(loginUser)
    const dataUser: User | null = await this.userRepository.findByEmail(user.email, user.username)
    if (!Password.verify(dataUser.password, loginUser.password)) {
      throw new Error
    }

    return this.token.generateToken(dataUser)
  }

}
