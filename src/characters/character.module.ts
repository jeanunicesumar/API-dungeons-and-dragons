import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { Character, CharacterSchema } from './schema/character.schema';
import { GeminiService } from 'src/gemini/gemini.service';
import { CharacterRepository } from './character.repository';
import CharacterAdapter from './character.adapter';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
    ]),
  ],
  controllers: [CharacterController],
  providers: [
    CharacterService,
    CharacterRepository,
    CharacterAdapter,
    GeminiService,
  ],
  exports: [CharacterService, CharacterRepository],
})
export class CharacterModule {}
