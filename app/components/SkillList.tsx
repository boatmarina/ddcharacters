"use client";

import { Skill } from "../types/character";

interface SkillListProps {
  skills: Record<string, Skill>;
  savingThrows: Record<string, { proficient: boolean; bonus: number }>;
}

const SKILL_LABELS: Record<string, string> = {
  acrobatics: "Acrobatics (Dex)",
  animalHandling: "Animal Handling (Wis)",
  arcana: "Arcana (Int)",
  athletics: "Athletics (Str)",
  deception: "Deception (Cha)",
  history: "History (Int)",
  insight: "Insight (Wis)",
  intimidation: "Intimidation (Cha)",
  investigation: "Investigation (Int)",
  medicine: "Medicine (Wis)",
  nature: "Nature (Int)",
  perception: "Perception (Wis)",
  performance: "Performance (Cha)",
  persuasion: "Persuasion (Cha)",
  religion: "Religion (Int)",
  sleightOfHand: "Sleight of Hand (Dex)",
  stealth: "Stealth (Dex)",
  survival: "Survival (Wis)",
};

const STAT_LABELS: Record<string, string> = {
  strength: "Strength",
  dexterity: "Dexterity",
  constitution: "Constitution",
  intelligence: "Intelligence",
  wisdom: "Wisdom",
  charisma: "Charisma",
};

function ProficiencyDot({
  proficient,
  expertise,
}: {
  proficient: boolean;
  expertise: boolean;
}) {
  if (expertise) {
    return (
      <span className="w-3 h-3 rounded-full bg-[#8B0000] border border-[#8B0000] inline-block mr-1 flex-shrink-0" />
    );
  }
  if (proficient) {
    return (
      <span className="w-3 h-3 rounded-full bg-[#8B0000] border border-[#8B0000] inline-block mr-1 flex-shrink-0" />
    );
  }
  return (
    <span className="w-3 h-3 rounded-full border border-[#8B0000] inline-block mr-1 flex-shrink-0" />
  );
}

export default function SkillList({ skills, savingThrows }: SkillListProps) {
  return (
    <div className="space-y-0">
      {/* Saving Throws */}
      <div className="mb-3 border border-[#8B0000] rounded p-2 bg-[#FDF6E3]">
        <h3 className="text-[10px] font-bold uppercase text-[#8B0000] text-center mb-1">
          Saving Throws
        </h3>
        {Object.entries(savingThrows).map(([key, save]) => (
          <div key={key} className="flex items-center gap-1 py-[1px]">
            <ProficiencyDot
              proficient={save.proficient}
              expertise={false}
            />
            <span className="text-[11px] flex-1 text-[#1a1a1a]">
              {STAT_LABELS[key]}
            </span>
            <span className="text-[11px] font-bold w-6 text-right text-[#1a1a1a]">
              {save.bonus >= 0 ? `+${save.bonus}` : save.bonus}
            </span>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="border border-[#8B0000] rounded p-2 bg-[#FDF6E3]">
        <h3 className="text-[10px] font-bold uppercase text-[#8B0000] text-center mb-1">
          Skills
        </h3>
        {Object.entries(skills).map(([key, skill]) => (
          <div key={key} className="flex items-center gap-1 py-[1px]">
            <ProficiencyDot
              proficient={skill.proficient}
              expertise={skill.expertise}
            />
            <span className="text-[11px] flex-1 text-[#1a1a1a]">
              {SKILL_LABELS[key] || key}
            </span>
            <span className="text-[11px] font-bold w-6 text-right text-[#1a1a1a]">
              {skill.bonus >= 0 ? `+${skill.bonus}` : skill.bonus}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
