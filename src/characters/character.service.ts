import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './schema/character.schema';
import { GeminiService } from '../gemini/gemini.service';
import { CrudService } from '../crud/crud.service';
import { CharacterRepository } from './character.repository';
import CharacterAdapter from './character.adapter';
import CommonRequest from './common-request/common-request';
import { Race } from './interface/race';
import { Classes } from './interface/classes';
import { AbilityScore } from './interface/abilityScore';
import { RaceDetails } from './interface/raceDetails';
import { AbilityScoreName } from './interface/abilityScoreName';

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
    protected readonly geminiService: GeminiService,
    private readonly commonRequest: CommonRequest

  ) {
    super(characterRepository, adapter);
  }

  public async create(body: CreateCharacterDto): Promise<void> {
    const entity: Character = this.adapter.createToEntity(body);
    this.repository.create(entity);
  }

  getRandomItem<T>(items: T[]): T | null {
    if (!items || items.length === 0) {
      return null;
    }
    return items[Math.floor(Math.random() * items.length)];
  }

  async getRandomRace(): Promise<Race> {
    const races = await this.commonRequest.fetchRace();
    const race = this.getRandomItem<Race>(races);
    return race;
  }

  async getRandomSubrace(race: Race): Promise<string | null> {
  const raceDetails = await this.commonRequest.fetchRaceDetails(race)
  if (!raceDetails.subraces || raceDetails.subraces.length === 0) {
    return null;
  }
    const subrace = this.getRandomItem(raceDetails.subraces);
  return subrace ? subrace.name : null;
  }

  async getRandomClass(): Promise<Classes>{
    const classes = await this.commonRequest.fetchClass();
    const randomicClass = this.getRandomItem<Classes>(classes);
    return randomicClass;
  }

  async getRandomAbility() {
    const abilities = await this.commonRequest.fetchAbility();
    const randomAbility = this.getRandomItem<AbilityScore>(abilities);
    return randomAbility;
  }
  getRandomLevel(): number {
    return Math.floor(Math.random() * 20) + 1; 
  }

  async getRandomSubclass() {
    const classes = await this.getRandomClass();
    const classDetails = this.commonRequest.fetchClassDetails(classes);
    const subclass = (await classDetails).subclasses.map(subClass => subClass.name);
    const randomSubclasses = this.getRandomItem<string>(subclass);
    return randomSubclasses;
  }

  async getFeatures(classes: string, level: number): Promise<any> {
    let allFeatures: string[] = [];
    for (let currentLevel = level; currentLevel >= 1; currentLevel--) {
      try {
        const fetchFeatures = await this.commonRequest.fetchFeatures(classes, currentLevel);
        const features = (await fetchFeatures).results.map((feature: { name: string; }) => feature.name);
        allFeatures = [...allFeatures, ...features];
      } catch (error) {
        console.log(error)
      }
    }
    return allFeatures;
}
  
  mapAbilityBonuses(raceDetails: RaceDetails): any {
    const abilityBonuses: AbilityScoreName[] = raceDetails.ability_bonuses.map(ability => ({
      ability_score: ability.ability_score.name,
      bonus: ability.bonus
    }));    
    return abilityBonuses;
  }
  
  async createRandomCharacter(): Promise<Character> {
      const [randomRace, classResult, randomAbility, subclass, level] = await Promise.all([
        this.getRandomRace(),
        this.getRandomClass(),
        this.getRandomAbility(),
        this.getRandomSubclass(),
        this.getRandomLevel()
      ]);
      const features = await this.getFeatures(classResult.index, level)
      const randomSubrace = await this.getRandomSubrace(randomRace);
      const raceDetails = await this.commonRequest.fetchRaceDetails(randomRace);
      const classDetails = await this.commonRequest.fetchClassDetails(classResult);
      const abilityDetails = await this.commonRequest.fetchAbilityDetails(randomAbility);
      
      const createCharacter: Character = {
        name: `DDCharacter${Math.floor(Math.random() * 1000)}`,
        race: randomRace.name,
        subrace: randomSubrace || '',
        class: classResult.name,
        subclass: subclass,
        level: level,
        ability: abilityDetails.full_name,
        ability_bonuses: this.mapAbilityBonuses(raceDetails),
        alignment: raceDetails.alignment,
        proficiencies: classDetails.proficiencies ? classDetails.proficiencies.map(proficiency => proficiency.name) : [],
        equipment: classDetails.starting_equipment ? classDetails.starting_equipment.map(equip => equip.equipment.name) : [],
        spell: raceDetails.language_desc,
        features: features
    };    
    await this.repository.create(createCharacter);
    return createCharacter;
  }
  
  public async generateBackground(id: string): Promise<string> {
    return this.geminiService.createBackground(id);
  }

  public async generateAdventure(): Promise<string> {
    const promises = [];
    for (let i = 0; i < 3; i++) {
      promises.push(this.createRandomCharacter());
    }

    const createdCharacters = await Promise.all(promises);
    return this.geminiService.createAdventure(createdCharacters);
  }
}
