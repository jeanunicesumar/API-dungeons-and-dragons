import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Character } from './schema/character.schema';
import { CreateCharacterDto } from './dto/create-character.dto';
import { CrudController } from 'src/crud/crud.controller';

@Controller('characters')
export class CharacterController extends CrudController<
  Character,
  CreateCharacterDto,
  UpdateCharacterDto
> {
  constructor(protected readonly service: CharacterService) {
    super(service);
  }

  // @Post('random')
  // // @UseGuards(JwtAuthGuard)
  // async createRandomCharacter() {
  //   return this.service.createRandomCharacter();
  // }

  @Post(':id/background')
  // @UseGuards(JwtAuthGuard)
  async generateBackground(id: string) {
    return this.service.generateBackground(id);
  }

  @Post('adventure')
  // @UseGuards(JwtAuthGuard)
  async generateAdventure() {
    return this.service.generateAdventure();
  }
}
