import { Injectable } from "@nestjs/common";
import ValidateSubClasse from "./validate.subclasse";
import ValidateSubRace from "./validate.subrace";
import { CreateCharacterDto } from "../dto/create-character.dto";
import CommonRequest from "../common-request/common-request";

@Injectable()
export default class CharacterValidate {

    constructor(private readonly commonRequest: CommonRequest) {}

    public async validate(createCharacter: CreateCharacterDto): Promise<void> {

        const validate = new ValidateSubClasse(new ValidateSubRace(null, this.commonRequest), this.commonRequest);
        await validate.validate(createCharacter);
    }
    
}