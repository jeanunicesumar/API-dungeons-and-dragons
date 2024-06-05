
export default interface ICrudRepository<T> {

    findAll(): Promise<T[]>;

    findById(id: string): Promise<T>;

    create(body: T): Promise<void>;

    update(id: string, body: T): Promise<void>;

    delete(id: string): Promise<void>;

} 