import CommonRequest from "../common-request/common-request";
import { HttpException, HttpStatus } from "@nestjs/common";
import { CreateCharacterDto } from "../dto/create-character.dto";
import { Character } from "../schema/character.schema";
import { CharacterValidate } from "./interfaces/character.validate";
import { RaceDetails } from "../interface/raceDetails";

export default class ValidateSubRace implements CharacterValidate {

    private readonly request: CommonRequest;
    private readonly next: CharacterValidate;

    constructor(next: CharacterValidate, request: CommonRequest) {
        this.next = next;
        this.request = request;
    }

    public async validate(createCharacter: CreateCharacterDto): Promise<void> {

        const race: RaceDetails = await this.request.fetchRaceDetailsByName(createCharacter.race.toLowerCase());
        
        if (!race) {
            throw new HttpException("Race not found", HttpStatus.NOT_FOUND);
        }

        if (!createCharacter.subrace) {
            await this.next?.validate(createCharacter);
            return;
        }

        const subRaceNotIsValid = !race.subraces.map(race => race.name).includes(createCharacter.subrace);
        if (subRaceNotIsValid) {
            throw new HttpException(`Invalid subRace ${createCharacter.subrace}`, HttpStatus.BAD_REQUEST);
        }

        await this.next?.validate(createCharacter);

    }
}