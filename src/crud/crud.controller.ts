import { Get, Post, Body, Patch, Param, Delete, Controller, UseGuards } from '@nestjs/common';
import { CrudService } from './crud.service';
import ICrudController from './interfaces/crud.controller';
import { JwtAuthGuard } from '../common/utils/guards/jwt.guard';

@Controller()
export class CrudController<T, CreateDTO, UpdateDTO> implements ICrudController<T, CreateDTO, UpdateDTO> {

  constructor(
    protected readonly service: CrudService<T, CreateDTO, UpdateDTO>,
  ) { }

  @Post()
  create(@Body() body: CreateDTO): Promise<void> {
    return this.service.create(body);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  async findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string): Promise<T> {
    return this.service.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() update: UpdateDTO): Promise<void> {
    this.service.update(id, update);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<void> {
    this.service.delete(id);
  }
  
}
