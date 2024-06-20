import { ClassDetails } from './interface/classDetails';
import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './schema/character.schema';
import { GeminiService } from '../gemini/gemini.service';
import { CrudService } from '../crud/crud.service';
import { CharacterRepository } from './character.repository';
import CharacterAdapter from './character.adapter';
import { Race } from './interface/race';
import { RaceDetails } from './interface/raceDetails';
import { Classes } from 'src/characters/interface/classes';
import { AbilityScore } from './interface/abilityScore';
import { AbilityDetails } from './interface/abilityDetails';
import { ConfigService } from '@nestjs/config';
import { AbilityScoreName } from './interface/abilityScoreName';


@Injectable()
export class CharacterService extends CrudService<
  Character,
  CreateCharacterDto,
  UpdateCharacterDto
>
{
  private readonly apiUrl: string;
  constructor(
    protected readonly characterRepository: CharacterRepository,
    protected readonly adapter: CharacterAdapter,
    protected readonly geminiService: GeminiService,
    protected readonly configService: ConfigService
  ) {
    super(characterRepository, adapter);
    this.apiUrl = this.configService.get<string>('API_URL');
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
    const racesData = await this.fetchJson<{ results: Race[] }>(`${this.apiUrl}/api/races`);
    return racesData.results;
  }

  async fetchRaceDetails(race: Race): Promise<RaceDetails> {
    const result = await this.fetchJson<RaceDetails>(`${this.apiUrl}${race.url}`);
    return result;
  }
  
  async fetchClass(): Promise<Classes[]>{
    const classesData = await this.fetchJson<{ results: Classes[] }>(`${this.apiUrl}/api/classes`);
    return classesData.results;
  }

  async fetchClassDetails(randomicClass: Classes): Promise<ClassDetails>{
    const result = await this.fetchJson<ClassDetails>(`${this.apiUrl}${randomicClass.url}`);
    return result;
  }

  async fetchAbility(): Promise<AbilityScore[]>{
    const abilities = await this.fetchJson<{ results: AbilityScore[] }>(`${this.apiUrl}/api/ability-scores`); 
    return abilities.results;
  }

  async fetchAbilityDetails(ability: AbilityScore): Promise<AbilityDetails>{
    const results = await this.fetchJson<AbilityDetails>(`${this.apiUrl}${ability.url}`)
    return results
  }

  async getRandomRace(): Promise<Race> {
    const races = await this.fetchRace();
    const race = this.getRandomItem<Race>(races);
    return race;
  }

  async getRandomSubrace(race: Race): Promise<string | null> {
  const raceDetails = await this.fetchRaceDetails(race)
  if (!raceDetails.subraces || raceDetails.subraces.length === 0) {
    return null;
  }
    const subrace = this.getRandomItem(raceDetails.subraces);
  return subrace ? subrace.name : null;
  }

  async getRandomClass(): Promise<Classes>{
    const classes = await this.fetchClass();
    const randomicClass = this.getRandomItem<Classes>(classes);
    return randomicClass;
  }

  async getRandomAbility() {
    const abilities = await this.fetchAbility();
    const randomAbility = this.getRandomItem<AbilityScore>(abilities);
    return randomAbility;
  }
  
  mapAbilityBonuses(raceDetails: RaceDetails): any {
    const abilityBonuses: AbilityScoreName[] = raceDetails.ability_bonuses.map(ability => ({
      ability_score: ability.ability_score.name,
      bonus: ability.bonus
    }));
    
    return abilityBonuses;
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
        ability_bonuses: this.mapAbilityBonuses(raceDetails),
        alignment: raceDetails.alignment,
        proficiencies: classDetails.proficiencies ? classDetails.proficiencies.map(proficiency => proficiency.name) : [],
        equipment: classDetails.starting_equipment ? classDetails.starting_equipment.map(equip => equip.equipment.name) : [],
        spell: raceDetails.language_desc,
    };
    console.log(createCharacterDto)
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
