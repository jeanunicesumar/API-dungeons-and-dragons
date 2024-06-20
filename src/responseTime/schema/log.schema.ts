import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type LogDocument = HydratedDocument<Log>;

@Schema({ timestamps: true })
export class Log {
  @Prop({ type: SchemaTypes.ObjectId })
  id: Types.ObjectId;

  @Prop({ required: true })
  route: string;

  @Prop({ required: true })
  method: string;

  @Prop({ required: true})
  responseTime: string
}

export const LogSchema = SchemaFactory.createForClass(Log);
