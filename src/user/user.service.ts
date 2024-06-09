import { Injectable } from "@nestjs/common";
import { CrudService } from "src/crud/crud.service";
import { User } from "./schema/user.schema";
import { Password } from "src/common/utils/password";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import UserAdapter from "./user.adapter";
import { Token } from "src/common/utils/token";
import { UnauthorizedError } from "src/common/utils/erros/unauthorized";
import { StatusCode } from "src/common/enum/statusCode";

@Injectable()
export class UserService extends CrudService<User, CreateUserDto, UpdateUserDto> {
  constructor(
    protected readonly userRepository: UserRepository,
    protected readonly adapter: UserAdapter
  ) {
    super(userRepository, adapter);
  }

  public async create(newUser: CreateUserDto): Promise<void> {
    const user = await this.userRepository.findByEmailOrUsername(newUser)
    if (!user) {
      newUser.password = await Password.generatePassword(newUser.password)
      await this.userRepository.create(newUser)
    }
  }

  public async login(loginUser: CreateUserDto): Promise<string> {
    const user: CreateUserDto | null = await this.userRepository.findByEmailOrUsername(loginUser)
    if (!Password.verify(user.password, loginUser.password)) {
      throw new UnauthorizedError('Unauthorized user', StatusCode.UNAUTHORIZED)
    }
    return "teste"
    // return Token.generateToken(loginUser)
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.findAll()
     
  }

  public async findById(idUser: string): Promise<User>{
    return await this.userRepository.findById(idUser)
  }

  public async update(idUser: string, updatedUser: User){
    await this.userRepository.update(idUser, updatedUser)
  }

  public async delete(idUser: string){
    await this.userRepository.delete(idUser)
  }



}