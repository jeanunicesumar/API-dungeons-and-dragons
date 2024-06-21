import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Race } from "../interface/race";
import { RaceDetails } from "../interface/raceDetails";
import { Classes } from "../interface/classes";
import { ClassDetails } from "../interface/classDetails";
import { AbilityScore } from "../interface/abilityScore";

@Injectable()
export default class CommonRequest {

    private readonly URL: string = this.configService.get<string>('URL_DD', 'https://www.dnd5eapi.co');

    constructor(private readonly configService: ConfigService) {}

    public async fetchRace(): Promise<Race[]> {
        return (await this.fetchJson<{ results: Race[] }>(`${this.URL}/api/races`)).results;
    }

    public async fetchRaceDetails(race: Race): Promise<RaceDetails> {
        return this.fetchJson<RaceDetails>(`${this.URL + race.url}`);
    }

    public async fetchRaceDetailsByName(name: string): Promise<RaceDetails> {
        return this.fetchJson<RaceDetails>(`${this.URL}/api/races/${name}`);
    }

    public async fetchClass(): Promise<Classes[]> {
        const classesData = await this.fetchJson<{ results: Classes[] }>(`${this.URL}/api/classes`);
        return classesData.results;
        
    }

    public async fetchClassDetails(randomicClass: Classes): Promise<ClassDetails> {
        return this.fetchJson<ClassDetails>(`${this.URL + randomicClass.url}`);
    }

    public async fetchClassDetailsByName(name: string): Promise<ClassDetails> {
        return this.fetchJson<ClassDetails>(`${this.URL}/api/classes/${name}`);
    }

    public async fetchAbility(): Promise<AbilityScore[]>{
        return (await this.fetchJson<{ results: AbilityScore[] }>(`${this.URL}/api/ability-scores`)).results; 
    }

    public async fetchAbilityDetails(ability: AbilityScore): Promise<any>{
        return this.fetchJson<any>(`${this.URL + ability.url}`);
    }

    private async fetchJson<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if(response) return response.json();
    }

    public async fetchFeatures(classes: string, level: number): Promise<any> {
        return this.fetchJson<any>(`${this.URL}/api/classes/${classes}/levels/${level}/features`);
    }
}