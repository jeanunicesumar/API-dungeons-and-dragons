export interface ClassDetails {
    index: string;
    name: string;
    hit_die: number;
    proficiencies: {
        index: string,
        name: string,
        url: string
    }[];
    starting_equipment: {
        equipment: {
            index: string,
            name: string
        }
    }[];

}