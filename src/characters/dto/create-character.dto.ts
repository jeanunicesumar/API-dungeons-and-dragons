import { IsEnum, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { Races } from '../enums/races';
import { Classes } from '../enums/classes';

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Races)
  @IsNotEmpty()
  race: string;

  subrace: string;

  @IsEnum(Classes)
  @IsNotEmpty()
  class: string;

  subclass: string;

  @Max(20)
  @Min(0)
  @IsNotEmpty()
  level: number;
}
