import { Character } from 'src/characters/schema/character.schema';
import { CreateCharacterDto } from '../../dto/create-character.dto';

export interface CharacterValidate {
  validate(
    createCharacter: CreateCharacterDto,
    character: Character,
  ): Promise<void>;
}
