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
    ability: string;

    @Prop()
    feat: string;

    @Prop()
    spell: string;
    
    @Prop()
    alignment: string;

    @Prop()
    skill: string;

    @Prop()
    equipment: string;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);

