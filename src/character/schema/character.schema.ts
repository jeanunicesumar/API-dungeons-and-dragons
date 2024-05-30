import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CharacterDocument = HydratedDocument<Character>;

@Schema()
export class Character {
    @Prop()
    name: string;

    @Prop()
    race: string;

    @Prop()
    subrace: string;
   
    @Prop()
    class: string;
    
    @Prop()
    level: number;

    @Prop()
    attribute: number;

    @Prop()
    feat: string;
    
    @Prop()
    alignment: string;

    @Prop()
    ability: string;

    @Prop()
    skill: string;

    @Prop()
    equipment: string;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);

