import { Controller, Post, Param, Body, Patch } from '@nestjs/common';
import { CharacterService } from './character.service';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './schema/character.schema';
import { CreateCharacterDto } from './dto/create-character.dto';
import { CrudController } from 'src/crud/crud.controller';
import { GeminiAPIError } from 'src/exceptions/gemini-error.exception';
import { DDAPIError } from 'src/exceptions/dd-error.exception';

@Controller('characters')
export class CharacterController extends CrudController<
  Character,
  CreateCharacterDto,
  UpdateCharacterDto
> {
  constructor(protected readonly service: CharacterService) {
    super(service);
  }

  @Post()
  async create(@Body() body: CreateCharacterDto): Promise<void> {
    try {
      await this.service.create(body);
    } catch (error) {
      throw new DDAPIError();
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() update: UpdateCharacterDto,
  ): Promise<void> {
    try {
      await this.service.update(id, update);
    } catch (error) {
      throw new DDAPIError();
    }
  }

  @Post(':id/background')
  // @UseGuards(JwtAuthGuard)
  async generateBackground(@Param('id') id: string) {
    try {
      return await this.service.generateBackground(id);
    } catch (error) {
      throw new GeminiAPIError();
    }
  }

  @Post('adventure')
  // @UseGuards(JwtAuthGuard)
  async generateAdventure() {
    try {
      return await this.service.generateAdventure();
    } catch (error) {
      throw new GeminiAPIError();
    }
  }
}
