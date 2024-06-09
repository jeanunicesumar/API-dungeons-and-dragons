import { ObjectId } from "mongoose"

export class CreateUserDto {

    email: string
    username: string
    password: string
}
