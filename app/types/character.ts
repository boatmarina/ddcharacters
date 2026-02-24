export interface Skill {
  proficient: boolean;
  expertise: boolean;
  bonus: number;
}

export interface SavingThrow {
  proficient: boolean;
  bonus: number;
}

export interface Attack {
  name: string;
  attackBonus: string;
  damage: string;
  damageType: string;
  notes?: string;
}

export interface Spell {
  level: number;
  name: string;
  prepared: boolean;
  description: string;
}

export interface SpellSlot {
  total: number;
  used: number;
}

export interface Spellcasting {
  ability: string;
  spellSaveDC: number;
  spellAttackBonus: string;
  slots: Record<string, SpellSlot>;
  spells: Spell[];
}

export interface Feature {
  name: string;
  source: string;
  description: string;
}

export interface Equipment {
  name: string;
  quantity: number;
  notes?: string;
}

export interface Character {
  name: string;
  player: string;
  campaign: string;
  class: string;
  subclass: string;
  level: number;
  background: string;
  race: string;
  alignment: string;
  experiencePoints: number;
  inspiration: boolean;
  proficiencyBonus: number;
  stats: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  savingThrows: Record<string, SavingThrow>;
  skills: Record<string, Skill>;
  passivePerception: number;
  armorClass: number;
  initiative: number;
  speed: number;
  maxHP: number;
  currentHP: number;
  temporaryHP: number;
  hitDice: string;
  deathSaves: { successes: number; failures: number };
  attacks: Attack[];
  spellcasting: Spellcasting | null;
  features: Feature[];
  proficiencies: {
    armor: string[];
    weapons: string[];
    tools: string[];
    languages: string[];
  };
  equipment: Equipment[];
  currency: { cp: number; sp: number; ep: number; gp: number; pp: number };
  personality: {
    traits: string;
    ideals: string;
    bonds: string;
    flaws: string;
  };
  backstory: string;
  appearance: {
    age: string;
    height: string;
    weight: string;
    eyes: string;
    skin: string;
    hair: string;
    description: string;
  };
  allies: string;
  enemies: string;
  symbol: string;
}
