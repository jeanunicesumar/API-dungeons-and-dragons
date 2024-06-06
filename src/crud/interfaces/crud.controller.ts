
export default interface ICrudController<T, CreateDTO, UpdateDTO> {

    findAll(): Promise<T[]>;

    findById(id: string): Promise<T>;

    create(body: CreateDTO): Promise<void>;

    update(id: string, body: UpdateDTO): Promise<void>;

    delete(id: string): Promise<void>;

} 