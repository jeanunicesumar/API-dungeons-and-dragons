import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Character } from './schema/character.schema';
import { CrudRepository } from '../crud/crud.repository';
import { Model } from 'mongoose';

@Injectable()
export class CharacterRepository extends CrudRepository<Character> {
  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<Character>,
  ) {
    super(characterModel);
  }
}
