import { HttpException, HttpStatus } from "@nestjs/common";
import CommonRequest from "../common-request/common-request";
import { CreateCharacterDto } from "../dto/create-character.dto";
import { ClassDetails } from "../interface/classDetails";
import { CharacterValidate } from "./interfaces/character.validate";

export default class ValidateSubClasse implements CharacterValidate {
  private readonly request: CommonRequest;

    private readonly request: CommonRequest;
    private readonly next: CharacterValidate;

    constructor(next: CharacterValidate, request: CommonRequest) {
        this.next = next;
        this.request = request;
    }

    public async validate(createCharacter: CreateCharacterDto): Promise<void> {

        const classe: ClassDetails = await this.request.fetchClassDetailsByName(createCharacter.class.toLowerCase());
        if (!classe) {
            throw new HttpException("Class not found", HttpStatus.NOT_FOUND);
        }

        if (!createCharacter.subClass) {
            await this.next?.validate(createCharacter);
            return;
        }

        const subClassNotIsValid = !classe.subclasses.map(classe => classe.name).includes(createCharacter.subClass);
        if (subClassNotIsValid) {
            throw new HttpException(`Invalid subClass ${createCharacter.subClass}`, HttpStatus.BAD_REQUEST);
        }

        await this.next?.validate(createCharacter);

    }

    const subClassNotIsValid = !classe.subclasses
      .map((classe) => classe.name)
      .includes(createCharacter.subClass);
    if (subClassNotIsValid) {
      throw new HttpException(
        `Invalid subClass ${createCharacter.subClass}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.next?.validate(createCharacter, character);
  }
}
