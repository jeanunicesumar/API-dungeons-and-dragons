import { HttpException, HttpStatus } from "@nestjs/common";
import CommonRequest from "../common-request/common-request";
import { CreateCharacterDto } from "../dto/create-character.dto";
import { ClassDetails } from "../interface/classDetails";
import { Character } from "../schema/character.schema";
import { CharacterValidate } from "./interfaces/character.validate";

export default class ValidateSubClasse implements CharacterValidate {

    private readonly request: CommonRequest;

    private readonly next: CharacterValidate;

    constructor(next: CharacterValidate) {
        this.next = next;
    }

    public async validate(createCharacter: CreateCharacterDto, character: Character): Promise<void> {

        const classe: ClassDetails = await this.request.fetchClassDetailsByName(createCharacter.class.toLowerCase());
        if (!classe) {
            throw new HttpException("Class not found", HttpStatus.NOT_FOUND);
        }

        if (!createCharacter.subClass) {
            this.next?.validate(createCharacter, character);
        }

        const subClassNotIsValid = !classe.subclasses.map(classe => classe.name).includes(createCharacter.subClass);
        if (subClassNotIsValid) {
            throw new HttpException(`Invalid subClass ${createCharacter.subClass}`, HttpStatus.BAD_REQUEST);
        }

        this.next?.validate(createCharacter, character);

    }
}