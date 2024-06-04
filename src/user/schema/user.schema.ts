import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User {
  @Prop({ type: SchemaTypes.ObjectId})
  id: Types.ObjectId;

  @Prop({ required: true, unique: true})
  username: string;

  @Prop({ required: true})
  email: string;

  @Prop({required: true})
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
