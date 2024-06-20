import { AbilityBonus } from './abilityBonus';

export interface RaceDetails {
  index: string;
  name: string;
  speed: number;
  ability_bonuses: AbilityBonus[];
  alignment: string;
  language_desc: string;
  subraces: { name: string }[];
}
