import { Injectable, NotFoundException } from '@nestjs/common';
import ICrudService from './interfaces/crud.service';
import { CrudRepository } from './crud.repository';
import Adapter from 'src/common/adapter/adapter';

@Injectable()
export class CrudService<T, CreateDTO, UpdateDTO> implements ICrudService<T, CreateDTO, UpdateDTO> {

  constructor(
    private readonly repository: CrudRepository<T>,
    private readonly adapter: Adapter<T, CreateDTO, UpdateDTO>,
  ) {}

  public async findAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  public async findById(id: string): Promise<T> {
    return this.find(id);
  }

  public async create(body: CreateDTO): Promise<void> {
    const entity: T = this.adapter.toEntity(body);
    this.repository.create(entity);
  }

  public async update(id: string, body: UpdateDTO): Promise<void> {
    const entity: T = this.adapter.toEntity(body);
    this.repository.update(id, entity);
  }

  public async delete(id: string): Promise<void> {
    this.repository.delete(id);
  }

  private async find(id: string): Promise<T> {
 
    const entity: T = await this.repository.findById(id)

    if (!entity) {
      throw new NotFoundException(`Entity ${id} not found.`)
    }

    return entity;
  }
}