import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userRepository: Model<UserDocument>) { }
  
  create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userRepository(createUserDto)
    return createdUser.save();
  }

  findAll() {
    return `This action returns all user`;
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOne({ username: username })
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
