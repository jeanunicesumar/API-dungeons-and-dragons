import { CreateCharacterDto } from '../../dto/create-character.dto';

export interface CharacterValidate {
  validate(createCharacter: CreateCharacterDto): Promise<void>;
}
