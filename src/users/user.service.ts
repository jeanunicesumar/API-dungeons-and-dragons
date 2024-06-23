import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CrudService } from '../crud/crud.service';
import { User } from './schema/user.schema';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserAdapter from './user.adapter';
import { Password } from 'src/common/utils/password';
import { Token } from 'src/common/utils/token/token';
import { InvalidCredentials } from 'src/exceptions/invalid-credentials.exception';
import { DuplicatedUser } from 'src/exceptions/duplicated-user.exception';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService extends CrudService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    protected readonly userRepository: UserRepository,
    protected readonly adapter: UserAdapter,
    protected readonly token: Token,
  ) {
    super(userRepository, adapter);
  }

  public async create(newUser: CreateUserDto): Promise<void> {
    const existsUser: User | null = await this.validEmailOrUsername(newUser);

    if (existsUser) {
      throw new DuplicatedUser();
    }

    const user: User = this.adapter.createToEntity(newUser);
    user.password = await Password.generateEncrypted(user.password);
    await this.userRepository.create(user);
  }

  public async login(loginUser: LoginUserDto): Promise<string> {
    const foundUser: User | null = await this.validEmailOrUsername(loginUser as CreateUserDto);

    if (!foundUser) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const userIsValid: boolean | null = await Password.verify(
      loginUser.password,
      foundUser.password,
    );

    if (!userIsValid) {
      throw new InvalidCredentials();
    }

    return this.token.generateToken(foundUser);
  }

  private async validEmailOrUsername(
    user: CreateUserDto,
  ): Promise<User | null> {
    return this.userRepository.findByEmailOrUsername(user.email, user.username);
  }
}
