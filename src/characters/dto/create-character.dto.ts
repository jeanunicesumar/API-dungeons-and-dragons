import { IsArray, IsNotEmpty, IsString, Max } from 'class-validator';
import { AbilityBonus } from '../interface/abilityBonus';

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  race: string;

  @IsString()
  subrace: string;

  @IsString()
  @IsNotEmpty()
  class: string;

  @Max(20)
  @IsNotEmpty()
  level: number;

  @IsString()
  @IsNotEmpty()
  ability: string;

  ability_bonuses: AbilityBonus[];
  
  @IsString()
  feat: string;

  @IsString()
  spell: string;

  @IsString()
  alignment: string;

  @IsArray()
  skill: string[];

  @IsArray()
  equipment: string[];
}
