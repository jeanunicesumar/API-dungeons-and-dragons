import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const user: User | null = await this.validEmailOrUsername(newUser)
    // if (!user) {
    //   throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    // }
    if (!user) {
      const _user = this.adapter.createToEntity(newUser)
      _user.password = await Password.generateEncrypted(_user.password)
      await this.userRepository.create(_user)
    }
  }

  public async login(loginUser: CreateUserDto): Promise<string> {
    const dataUser: User | null = await this.validEmailOrUsername(loginUser)
    if (!dataUser) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    const validateUser: boolean | null = await Password.verify(loginUser.password, dataUser.password)
    console.log(validateUser)
    if (!validateUser) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }
    return this.token.generateToken(dataUser)
  }

  private async validEmailOrUsername(user: CreateUserDto): Promise<User | null> {
    return this.userRepository.findByEmailOrUsername(user.email, user.username)
  }

}
