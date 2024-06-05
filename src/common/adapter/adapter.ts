
export default interface Adapter<Entity, CreateDTO, UpdateDTO> {

    toEntity(dto: CreateDTO): Entity;

    toEntity(dto: UpdateDTO): Entity;

}