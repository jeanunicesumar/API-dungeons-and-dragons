import { Controller, Post, Param, Body } from '@nestjs/common';
import { CharacterService } from './character.service';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './schema/character.schema';
import { CreateCharacterDto } from './dto/create-character.dto';
import { CrudController } from 'src/crud/crud.controller';

@Controller('characters')
export class CharacterController extends CrudController<Character, CreateCharacterDto, UpdateCharacterDto> {

  constructor(protected readonly service: CharacterService) {
    super(service);
  }

  @Post()
  async create(@Body() body: CreateCharacterDto): Promise<void> {
    await this.service.create(body);
  }

  @Post(':id/background')
  // @UseGuards(JwtAuthGuard)
  async generateBackground(@Param('id') id: string) {
    return this.service.generateBackground(id);
  }

  @Post('adventure')
  // @UseGuards(JwtAuthGuard)
  async generateAdventure() {
    return this.service.generateAdventure();
  }
  
}
