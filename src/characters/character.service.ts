import { ClassDetails } from './interface/classes';
import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './schema/character.schema';
import { GeminiService } from '../gemini/gemini.service';
import { CrudService } from '../crud/crud.service';
import { CharacterRepository } from './character.repository';
import CharacterAdapter from './character.adapter';
import { AbilityDetails, AbilityScore, Race, RaceDetails } from './interface/race';
import { Classes } from 'src/characters/interface/classes';

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

  async fetchJson<T>(url: string) : Promise<T> {
    const response = await fetch(url);
    if(response) return response.json();
  }

  getRandomItem<T>(items: T[]): T | null {
    if (!items || items.length === 0) {
      return null;
    }
    return items[Math.floor(Math.random() * items.length)];
  }

  async fetchRace(): Promise<Race[]> {
    const racesData = await this.fetchJson<{ results: Race[] }>(`https://www.dnd5eapi.co/api/races`);
    console.log("race Datas", racesData.results)
    return racesData.results;
  }

  async fetchRaceDetails(race: Race): Promise<RaceDetails> {
    const result = await this.fetchJson<RaceDetails>(`https://www.dnd5eapi.co${race.url}`);

    console.log("result race", result)
    return result;
  }
  
  async fetchClass(): Promise<Classes[]>{
    const classesData = await this.fetchJson<{ results: Classes[] }>(`https://www.dnd5eapi.co/api/classes`);
    console.log("classes Datas", classesData.results)
    return classesData.results;
  }

  async fetchClassDetails(randomicClass: Classes): Promise<ClassDetails>{
    const result = await this.fetchJson<ClassDetails>(`https://www.dnd5eapi.co${randomicClass.url}`);
    console.log('fetch class details', result)
    return result;
  }

  async fetchAbility(): Promise<AbilityScore[]>{
    const abilities = await this.fetchJson<{ results: AbilityScore[] }>(`https://www.dnd5eapi.co/api/ability-scores`); 
    console.log('fetch abilities', abilities.results)
    return abilities.results;
  }

  async fetchAbilityDetails(ability: AbilityScore): Promise<AbilityDetails>{
    const results = await this.fetchJson<AbilityDetails>(`https://www.dnd5eapi.co${ability.url}`)
    console.log('fetch ability details', results)
    return results
  }

  async getRandomRace(): Promise<Race> {
    const races = await this.fetchRace();
    const race = this.getRandomItem<Race>(races);
    console.log('get random race', race)
    return race;
  }

  async getRandomSubrace(race: Race): Promise<string | null> {
  const raceDetails = await this.fetchRaceDetails(race)
  if (!raceDetails.subraces || raceDetails.subraces.length === 0) {
    return null;
  }
    const subrace = this.getRandomItem(raceDetails.subraces);
    console.log('subrace name', subrace.name)
  return subrace ? subrace.name : null;
  }

  async getRandomClass(): Promise<Classes>{
    const classes = await this.fetchClass();
    const randomicClass = this.getRandomItem<Classes>(classes);
    console.log("random class", randomicClass)
    return randomicClass;
  }

  async getRandomAbility() {
    const abilities = await this.fetchAbility();
    const randomAbility = this.getRandomItem<AbilityScore>(abilities);
    console.log('random ability', randomAbility)
    return randomAbility;
}

  async createRandomCharacter(): Promise<CreateCharacterDto> {
      const [randomRace, classResult, randomAbility] = await Promise.all([
        this.getRandomRace(),
        this.getRandomClass(),
        this.getRandomAbility(),
      ]);
  
      const randomSubrace = await this.getRandomSubrace(randomRace);
      const raceDetails = await this.fetchRaceDetails(randomRace);
      const classDetails = await this.fetchClassDetails(classResult);
      const abilityDetails = await this.fetchAbilityDetails(randomAbility);
      const randomLevel = Math.floor(Math.random() * 20) + 1;
      const createCharacterDto: CreateCharacterDto = {
        name: `DDCharacter${Math.floor(Math.random() * 1000)}`,
        race: randomRace.name,
        subrace: randomSubrace || '',
        class: classResult.name,
        level: randomLevel,
        ability: abilityDetails.full_name,
        ability_bonuses: raceDetails.ability_bonuses,
        alignment: raceDetails.alignment,
        skill: classDetails.proficiencies ? classDetails.proficiencies.map( proficiency => proficiency.name ): [],
        equipment: classDetails.starting_equipment ? classDetails.starting_equipment.map(equip => equip.equipment.name) : [],
        feat: '',
        spell: raceDetails.language_desc
      };
    await this.create(createCharacterDto);
    return createCharacterDto;
  }
  
  async generateBackground(id: string): Promise<string> {
    return this.geminiService.createBackground(id);
  }

  async generateAdventure(): Promise<string> {
    let promises = [];
      for (let i = 0; i < 3; i++) {
        promises.push(this.createRandomCharacter());
    }
    const createdCharacters = await Promise.all(promises);
    return this.geminiService.createAdventure(createdCharacters);
  }
}
