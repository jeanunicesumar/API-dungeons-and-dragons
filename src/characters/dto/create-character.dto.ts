import { IsArray, IsNotEmpty, IsString, Max } from 'class-validator';
import { AbilityBonus } from '../interface/abilityBonus';
import { AbilityScoreName } from '../interface/abilityScoreName';

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

  @IsArray()
  ability_bonuses: AbilityBonus[];

  @IsString()
  spell: string;

  @IsString()
  alignment: string;

  @IsArray()
  proficiencies: string[];

  @IsArray()
  equipment: string[];
}
