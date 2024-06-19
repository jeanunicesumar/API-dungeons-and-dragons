import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './schema/character.schema';
import { GeminiService } from '../gemini/gemini.service';
import { CrudService } from '../crud/crud.service';
import { CharacterRepository } from './character.repository';
import CharacterAdapter from './character.adapter';

@Injectable()
export class CharacterService extends CrudService<
  Character,
  CreateCharacterDto,
  UpdateCharacterDto
>
{
  constructor(
    protected readonly characterRepository: CharacterRepository,
    protected readonly adapter: CharacterAdapter,
    protected readonly geminiService: GeminiService
  ) {
    super(characterRepository, adapter);
  }

  public async create(body: CreateCharacterDto): Promise<void> {
    const entity: Character = this.adapter.createToEntity(body);
    this.repository.create(entity);
  }

//   getRandomItem<T>(items: T[]): T | null {
//     if (!items || items.length === 0) {
//       return null;
//     }
//     return items[Math.floor(Math.random() * items.length)];
//   }

  

//   async getRandomRace(): Promise<Race> {
//     const races = await this.fetchRace();
//     const race = this.getRandomItem<Race>(races);
//     console.log('get random race', race)
//     return race;
//   }

//   async getRandomSubrace(race: Race): Promise<string | null> {
//   const raceDetails = await this.fetchRaceDetails(race)
//   if (!raceDetails.subraces || raceDetails.subraces.length === 0) {
//     return null;
//   }
//     const subrace = this.getRandomItem(raceDetails.subraces);
//     console.log('subrace name', subrace.name)
//   return subrace ? subrace.name : null;
//   }

//   async getRandomClass(): Promise<Classes>{
//     const classes = await this.fetchClass();
//     const randomicClass = this.getRandomItem<Classes>(classes);
//     console.log("random class", randomicClass)
//     return randomicClass;
//   }

//   async getRandomAbility() {
//     const abilities = await this.fetchAbility();
//     const randomAbility = this.getRandomItem<AbilityScore>(abilities);
//     console.log('random ability', randomAbility)
//     return randomAbility;
// }

//   async createRandomCharacter(): Promise<CreateCharacterDto> {
//       const [randomRace, classResult, randomAbility] = await Promise.all([
//         this.getRandomRace(),
//         this.getRandomClass(),
//         this.getRandomAbility(),
//       ]);
  
//       const randomSubrace = await this.getRandomSubrace(randomRace);
//       const raceDetails = await this.fetchRaceDetails(randomRace);
//       const classDetails = await this.fetchClassDetails(classResult);
//       const abilityDetails = await this.fetchAbilityDetails(randomAbility);
//       const randomLevel = Math.floor(Math.random() * 20) + 1;
//       const createCharacterDto: CreateCharacterDto = {
//         name: `DDCharacter${Math.floor(Math.random() * 1000)}`,
//         race: randomRace.name,
//         subrace: randomSubrace || '',
//         class: classResult.name,
//         level: randomLevel,
//         ability: abilityDetails.full_name,
//         ability_bonuses: raceDetails.ability_bonuses,
//         alignment: raceDetails.alignment,
//         skill: classDetails.proficiencies ? classDetails.proficiencies.map( proficiency => proficiency.name ): [],
//         equipment: classDetails.starting_equipment ? classDetails.starting_equipment.map(equip => equip.equipment.name) : [],
//         feat: '',
//         spell: raceDetails.language_desc
//       };
//     await this.create(createCharacterDto);
//     return createCharacterDto;
//   }
  
  public async generateBackground(id: string): Promise<string> {
    return this.geminiService.createBackground(id);
  }

  // public async generateAdventure(): Promise<string> {
  //   const promises = [];
  //   for (let i = 0; i < 3; i++) {
  //     promises.push(this.createRandomCharacter());
  //   }

  //   const createdCharacters = await Promise.all(promises);
  //   return this.geminiService.createAdventure(createdCharacters);
  // }
}
