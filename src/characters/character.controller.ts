import { Controller, Post, Param, Body, Patch, UseGuards } from '@nestjs/common';
import { CharacterService } from './character.service';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './schema/character.schema';
import { CreateCharacterDto } from './dto/create-character.dto';
import { CrudController } from 'src/crud/crud.controller';
import { JwtAuthGuard } from 'src/common/utils/guards/jwt.guard';

@Controller('characters')
export class CharacterController extends CrudController<Character, CreateCharacterDto, UpdateCharacterDto> {

  constructor(protected readonly service: CharacterService) {
    super(service);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateCharacterDto): Promise<void> {
    await this.service.create(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() update: UpdateCharacterDto): Promise<void> {
    await this.service.update(id, update);
  }

  @Post(':id/background')
  @UseGuards(JwtAuthGuard)
  async generateBackground(@Param('id') id: string) {
    return this.service.generateBackground(id);
  }

  @Post('adventure')
  @UseGuards(JwtAuthGuard)
  async generateAdventure() {
    return this.service.generateAdventure();
  }
  
}
