import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { Character, CharacterSchema } from './schema/character.schema';
import { GeminiService } from 'src/gemini/gemini.service';
import { CharacterRepository } from './character.repository';
import CharacterAdapter from './character.adapter';
import CommonRequest from './common-request/common-request';
import CharacterValidate from './validate/character.validate';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
    ]),
  ],
  controllers: [CharacterController],
  providers: [CharacterService, CharacterRepository, CharacterAdapter, GeminiService, CommonRequest, CharacterValidate],
  exports: [CharacterService, CharacterRepository]
})
export class CharacterModule {}
