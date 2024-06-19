import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { AbilityBonus } from '../interface/abilityBonus';

export type CharacterDocument = HydratedDocument<Character>;

@Schema({ timestamps: true })
export class Character {
  @Prop({ type: SchemaTypes.ObjectId })
  id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  race: string;

  @Prop()
  subrace?: string;

  @Prop({ required: true })
  class: string;

  @Prop({ required: true, min: 1, max: 20 })
  level: number;

  @Prop()
  ability: string;

  @Prop()
  ability_bonuses: AbilityBonus[];
  
  @Prop()
  feat: string;

  @Prop()
  spell: string;

  @Prop()
  alignment: string;

  @Prop([String])
  skill: string[];

  @Prop([String])
  equipment: string[];
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
