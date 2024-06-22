import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbilityBonus } from '../interface/abilityBonus';

export type CharacterDocument = HydratedDocument<Character>;

@Schema({ timestamps: true })
export class Character {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  race: string;

  @Prop()
  subrace?: string;

  @Prop({ required: true })
  class: string;

  @Prop()
  subclass: string;

  @Prop({ required: true, min: 1, max: 20 })
  level: number;

  @Prop()
  ability: string;

  @Prop([Object])
  ability_bonuses: AbilityBonus[];
  
  @Prop()
  spell: string;

  @Prop([String])
  features: string[];
  
  @Prop()
  alignment: string;

  @Prop([String])
  proficiencies: string[];

  @Prop([String])
  equipment: string[];
  
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
