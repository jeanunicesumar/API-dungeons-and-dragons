import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { CrudRepository } from 'src/crud/crud.repository';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends CrudRepository<User> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }

  public async create(user: User): Promise<void> {
    await this.userModel.create(user)
  }

  public async findByEmail(userEmail: string, userName: string): Promise<User | null> {
    const _user: User = await this.userModel.findOne({ email: userEmail, username: userName});
    return _user;
  }
}
  
























