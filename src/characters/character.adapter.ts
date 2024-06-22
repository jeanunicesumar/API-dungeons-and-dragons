import Adapter from 'src/common/adapter/adapter';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './schema/character.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class CharacterAdapter implements Adapter<Character, CreateCharacterDto, UpdateCharacterDto> {

  updateToEntity(dto: UpdateCharacterDto): Character {
    return {
      name: dto.name,
      race: dto.race,
      subrace: dto.subrace,
      subclass: dto.subclass,
      class: dto.class,
      level: dto.level,
    } as Character;
  }

  createToEntity(dto: CreateCharacterDto): Character {
    return {
      name: dto.name,
      race: dto.race,
      subrace: dto.subrace,
      subclass: dto.subclass,
      class: dto.class,
      level: dto.level,
    } as Character;
  }

  updateToEntityConvert(dto: UpdateCharacterDto, character: Character): Character {
    return {
      name: dto?.name ? dto.name : character.name,
      race: dto?.race ? dto.race : character.race,
      subrace: dto?.subrace ? dto.subrace : null,
      subclass: dto?.subclass ? dto.subclass : null,
      class: dto?.class ? dto.class : character.class,
      level: dto?.level ? dto.level : character.level
    } as Character;
  }

  entityToCreate(character: Character): CreateCharacterDto {
    return {
      name: character.name,
      race: character.race,
      subrace: character.subrace,
      subclass: character.subclass,
      class: character.class,
      level: character.level 
    } as unknown as CreateCharacterDto;
  } 

}