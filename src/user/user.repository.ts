import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.schema";
import { CrudRepository } from "src/crud/crud.repository";
import { Model } from "mongoose";

@Injectable()
export class UserRepository extends CrudRepository<User> {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
        super(userModel);
    }
}