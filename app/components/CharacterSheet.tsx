"use client";

import { Character } from "../types/character";
import StatBlock from "./StatBlock";
import SkillList from "./SkillList";
import LevelingGuide from "./LevelingGuide";

interface CharacterSheetProps {
  character: Character;
}

function Box({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-[#8B0000] rounded bg-[#FDF6E3] ${className}`}
    >
      <div className="p-2">{children}</div>
      <div className="border-t border-[#8B0000] bg-[#8B0000] text-white text-[9px] font-bold uppercase text-center py-0.5 rounded-b">
        {label}
      </div>
    </div>
  );
}

function BigBox({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string | number;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center border-2 border-[#8B0000] rounded-lg p-2 bg-[#FDF6E3] ${className}`}
    >
      <span className="text-2xl font-bold text-[#1a1a1a]">{value}</span>
      <span className="text-[9px] font-bold uppercase text-[#8B0000] text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

export default function CharacterSheet({ character }: CharacterSheetProps) {
  const spellsByLevel = character.spellcasting?.spells.reduce(
    (acc, spell) => {
      if (!acc[spell.level]) acc[spell.level] = [];
      acc[spell.level].push(spell);
      return acc;
    },
    {} as Record<number, typeof character.spellcasting.spells>
  );

  return (
    <>
    <div
      className="character-sheet bg-[#FFF8E7] text-[#1a1a1a] font-serif"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* Parchment texture overlay */}
      <div
        className="relative"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, #FFF8E7 0%, #F5E6C8 100%)",
          minHeight: "100%",
        }}
      >
        {/* Header */}
        <div className="border-b-4 border-[#8B0000] p-4 bg-[#8B0000]">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <div className="text-3xl font-bold tracking-wider">
                {character.symbol || "⚔️"} {character.name}
              </div>
              <div className="text-sm opacity-90 mt-1">
                {character.race} • {character.class}
                {character.subclass ? ` (${character.subclass})` : ""} • Level{" "}
                {character.level} • {character.alignment}
              </div>
            </div>
            <div className="text-right text-white text-sm opacity-80">
              <div className="font-bold">{character.campaign}</div>
              <div>{character.background} Background</div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-4 grid grid-cols-12 gap-3">
          {/* Column 1: Stats + Skills */}
          <div className="col-span-3 space-y-3">
            {/* Ability Scores */}
            <div className="grid grid-cols-2 gap-2">
              <StatBlock label="Strength" value={character.stats.strength} />
              <StatBlock label="Dexterity" value={character.stats.dexterity} />
              <StatBlock
                label="Constitution"
                value={character.stats.constitution}
              />
              <StatBlock
                label="Intelligence"
                value={character.stats.intelligence}
              />
              <StatBlock label="Wisdom" value={character.stats.wisdom} />
              <StatBlock label="Charisma" value={character.stats.charisma} />
            </div>

            {/* Inspiration + Proficiency */}
            <div className="grid grid-cols-2 gap-2">
              <Box label="Inspiration">
                <div className="text-center text-xl">
                  {character.inspiration ? "✦" : "○"}
                </div>
              </Box>
              <Box label="Prof. Bonus">
                <div className="text-center text-xl font-bold">
                  +{character.proficiencyBonus}
                </div>
              </Box>
            </div>

            {/* Saving Throws + Skills */}
            <SkillList
              skills={character.skills}
              savingThrows={character.savingThrows}
            />

            {/* Passive Perception */}
            <Box label="Passive Wisdom (Perception)">
              <div className="text-center text-2xl font-bold">
                {character.passivePerception}
              </div>
            </Box>
          </div>

          {/* Column 2: Combat + Attacks + Features */}
          <div className="col-span-5 space-y-3">
            {/* Combat Stats */}
            <div className="grid grid-cols-3 gap-2">
              <BigBox label="Armor Class" value={character.armorClass} />
              <BigBox
                label="Initiative"
                value={
                  character.initiative >= 0
                    ? `+${character.initiative}`
                    : character.initiative
                }
              />
              <BigBox label="Speed" value={`${character.speed} ft`} />
            </div>

            {/* HP */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-3 border-2 border-[#8B0000] rounded-lg p-3 bg-[#FDF6E3]">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-2xl font-bold">{character.maxHP}</div>
                    <div className="text-[9px] uppercase font-bold text-[#8B0000]">
                      Max HP
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {character.currentHP}
                    </div>
                    <div className="text-[9px] uppercase font-bold text-[#8B0000]">
                      Current HP
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {character.temporaryHP || 0}
                    </div>
                    <div className="text-[9px] uppercase font-bold text-[#8B0000]">
                      Temp HP
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hit Dice + Death Saves */}
            <div className="grid grid-cols-2 gap-2">
              <Box label="Hit Dice">
                <div className="text-center font-bold">{character.hitDice}</div>
              </Box>
              <Box label="Death Saves">
                <div className="flex justify-center gap-3">
                  <div className="text-center">
                    <div className="text-[9px] text-[#8B0000] uppercase font-bold">
                      Successes
                    </div>
                    <div className="flex gap-1 mt-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className={`w-3 h-3 rounded-full border border-[#8B0000] inline-block ${i < character.deathSaves.successes ? "bg-[#8B0000]" : ""}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[9px] text-[#8B0000] uppercase font-bold">
                      Failures
                    </div>
                    <div className="flex gap-1 mt-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className={`w-3 h-3 rounded-full border border-[#8B0000] inline-block ${i < character.deathSaves.failures ? "bg-[#8B0000]" : ""}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Box>
            </div>

            {/* Attacks */}
            <div className="border-2 border-[#8B0000] rounded-lg bg-[#FDF6E3]">
              <div className="bg-[#8B0000] text-white text-[10px] font-bold uppercase text-center py-1 rounded-t-lg">
                Attacks & Spellcasting
              </div>
              <div className="p-2">
                <div className="grid grid-cols-3 gap-1 mb-1">
                  <div className="text-[9px] font-bold uppercase text-[#8B0000]">
                    Name
                  </div>
                  <div className="text-[9px] font-bold uppercase text-[#8B0000] text-center">
                    Atk Bonus
                  </div>
                  <div className="text-[9px] font-bold uppercase text-[#8B0000] text-center">
                    Damage/Type
                  </div>
                </div>
                {character.attacks.map((attack, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-3 gap-1 border-t border-[#d4b896] pt-1 mt-1"
                  >
                    <div className="text-[11px] font-semibold">
                      {attack.name}
                    </div>
                    <div className="text-[11px] text-center font-bold">
                      {attack.attackBonus}
                    </div>
                    <div className="text-[11px] text-center">
                      {attack.damage} {attack.damageType}
                    </div>
                    {attack.notes && (
                      <div className="col-span-3 text-[10px] italic text-gray-600">
                        {attack.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div className="border-2 border-[#8B0000] rounded-lg bg-[#FDF6E3]">
              <div className="bg-[#8B0000] text-white text-[10px] font-bold uppercase text-center py-1 rounded-t-lg">
                Equipment
              </div>
              <div className="p-2">
                <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                  {character.equipment.map((item, i) => (
                    <div key={i} className="text-[11px]">
                      {item.quantity > 1 && (
                        <span className="font-bold">{item.quantity}x </span>
                      )}
                      {item.name}
                      {item.notes && (
                        <span className="text-gray-500 italic">
                          {" "}
                          ({item.notes})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                {/* Currency */}
                <div className="flex gap-3 mt-2 pt-2 border-t border-[#d4b896]">
                  {Object.entries(character.currency).map(([type, amount]) => (
                    <div key={type} className="text-center">
                      <div className="text-[11px] font-bold">{amount}</div>
                      <div className="text-[9px] uppercase text-[#8B0000] font-bold">
                        {type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Proficiencies & Languages */}
            <div className="border-2 border-[#8B0000] rounded-lg bg-[#FDF6E3]">
              <div className="bg-[#8B0000] text-white text-[10px] font-bold uppercase text-center py-1 rounded-t-lg">
                Proficiencies & Languages
              </div>
              <div className="p-2 space-y-1">
                {character.proficiencies.armor.length > 0 && (
                  <div>
                    <span className="text-[9px] font-bold uppercase text-[#8B0000]">
                      Armor:{" "}
                    </span>
                    <span className="text-[11px]">
                      {character.proficiencies.armor.join(", ")}
                    </span>
                  </div>
                )}
                {character.proficiencies.weapons.length > 0 && (
                  <div>
                    <span className="text-[9px] font-bold uppercase text-[#8B0000]">
                      Weapons:{" "}
                    </span>
                    <span className="text-[11px]">
                      {character.proficiencies.weapons.join(", ")}
                    </span>
                  </div>
                )}
                {character.proficiencies.tools.length > 0 && (
                  <div>
                    <span className="text-[9px] font-bold uppercase text-[#8B0000]">
                      Tools:{" "}
                    </span>
                    <span className="text-[11px]">
                      {character.proficiencies.tools.join(", ")}
                    </span>
                  </div>
                )}
                {character.proficiencies.languages.length > 0 && (
                  <div>
                    <span className="text-[9px] font-bold uppercase text-[#8B0000]">
                      Languages:{" "}
                    </span>
                    <span className="text-[11px]">
                      {character.proficiencies.languages.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Column 3: Features + Personality + Spells */}
          <div className="col-span-4 space-y-3">
            {/* Appearance */}
            <div className="border-2 border-[#8B0000] rounded-lg bg-[#FDF6E3]">
              <div className="bg-[#8B0000] text-white text-[10px] font-bold uppercase text-center py-1 rounded-t-lg">
                Appearance
              </div>
              <div className="p-2 grid grid-cols-2 gap-x-2 gap-y-0.5">
                {[
                  ["Age", character.appearance?.age],
                  ["Height", character.appearance?.height],
                  ["Weight", character.appearance?.weight],
                  ["Eyes", character.appearance?.eyes],
                  ["Skin", character.appearance?.skin],
                  ["Hair", character.appearance?.hair],
                ].map(([label, val]) => (
                  <div key={label}>
                    <span className="text-[9px] font-bold text-[#8B0000] uppercase">
                      {label}:{" "}
                    </span>
                    <span className="text-[11px]">{val}</span>
                  </div>
                ))}
                {character.appearance?.description && (
                  <div className="col-span-2 text-[11px] italic mt-1">
                    {character.appearance.description}
                  </div>
                )}
              </div>
            </div>

            {/* Personality */}
            <div className="border-2 border-[#8B0000] rounded-lg bg-[#FDF6E3]">
              <div className="bg-[#8B0000] text-white text-[10px] font-bold uppercase text-center py-1 rounded-t-lg">
                Personality
              </div>
              <div className="p-2 space-y-2">
                {[
                  ["Traits", character.personality.traits],
                  ["Ideals", character.personality.ideals],
                  ["Bonds", character.personality.bonds],
                  ["Flaws", character.personality.flaws],
                ].map(([label, text]) => (
                  <div key={label}>
                    <div className="text-[9px] font-bold uppercase text-[#8B0000]">
                      {label}
                    </div>
                    <div className="text-[11px]">{text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features & Traits */}
            <div className="border-2 border-[#8B0000] rounded-lg bg-[#FDF6E3]">
              <div className="bg-[#8B0000] text-white text-[10px] font-bold uppercase text-center py-1 rounded-t-lg">
                Features & Traits
              </div>
              <div className="p-2 space-y-2 max-h-64 overflow-y-auto">
                {character.features.map((feature, i) => (
                  <div key={i} className="border-b border-[#d4b896] pb-1 last:border-0">
                    <div className="text-[11px] font-bold text-[#8B0000]">
                      {feature.name}{" "}
                      <span className="text-[9px] font-normal text-gray-500 italic">
                        ({feature.source})
                      </span>
                    </div>
                    <div className="text-[10px] mt-0.5">{feature.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backstory */}
            <div className="border-2 border-[#8B0000] rounded-lg bg-[#FDF6E3]">
              <div className="bg-[#8B0000] text-white text-[10px] font-bold uppercase text-center py-1 rounded-t-lg">
                Backstory
              </div>
              <div className="p-2">
                <p className="text-[11px] italic">{character.backstory}</p>
                {character.allies && (
                  <div className="mt-2">
                    <span className="text-[9px] font-bold text-[#8B0000] uppercase">
                      Allies:{" "}
                    </span>
                    <span className="text-[11px]">{character.allies}</span>
                  </div>
                )}
                {character.enemies && (
                  <div className="mt-1">
                    <span className="text-[9px] font-bold text-[#8B0000] uppercase">
                      Enemies:{" "}
                    </span>
                    <span className="text-[11px]">{character.enemies}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Spellcasting Section */}
        {character.spellcasting && (
          <div className="px-4 pb-4">
            <div className="border-2 border-[#8B0000] rounded-lg bg-[#FDF6E3]">
              <div className="bg-[#8B0000] text-white text-[11px] font-bold uppercase text-center py-1 rounded-t-lg">
                Spellcasting
              </div>
              <div className="p-3">
                {/* Spellcasting header */}
                <div className="flex gap-6 mb-3">
                  <div className="text-center">
                    <div className="text-[9px] font-bold uppercase text-[#8B0000]">
                      Spellcasting Ability
                    </div>
                    <div className="text-lg font-bold">
                      {character.spellcasting.ability}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[9px] font-bold uppercase text-[#8B0000]">
                      Spell Save DC
                    </div>
                    <div className="text-lg font-bold">
                      {character.spellcasting.spellSaveDC}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[9px] font-bold uppercase text-[#8B0000]">
                      Spell Attack Bonus
                    </div>
                    <div className="text-lg font-bold">
                      {character.spellcasting.spellAttackBonus}
                    </div>
                  </div>
                </div>

                {/* Spell Slots */}
                <div className="flex gap-2 mb-3 flex-wrap">
                  {Object.entries(character.spellcasting.slots)
                    .filter(([, slot]) => slot.total > 0)
                    .map(([level, slot]) => (
                      <div
                        key={level}
                        className="border border-[#8B0000] rounded p-1 text-center min-w-[50px]"
                      >
                        <div className="text-[9px] font-bold text-[#8B0000] uppercase">
                          {level === "0" ? "Cantrips" : `${level}${level === "1" ? "st" : level === "2" ? "nd" : level === "3" ? "rd" : "th"}`}
                        </div>
                        <div className="text-sm font-bold">
                          {slot.used}/{slot.total}
                        </div>
                      </div>
                    ))}
                </div>

                {/* Spells by level */}
                <div className="grid grid-cols-2 gap-3">
                  {spellsByLevel &&
                    Object.entries(spellsByLevel)
                      .sort(([a], [b]) => Number(a) - Number(b))
                      .map(([level, spells]) => (
                        <div key={level}>
                          <div className="text-[9px] font-bold uppercase text-[#8B0000] border-b border-[#d4b896] mb-1">
                            {level === "0" ? "Cantrips" : `Level ${level}`}
                          </div>
                          {spells.map((spell, i) => (
                            <div key={i} className="mb-1">
                              <div className="flex items-center gap-1">
                                <span
                                  className={`w-2 h-2 rounded-full border border-[#8B0000] inline-block flex-shrink-0 ${spell.prepared ? "bg-[#8B0000]" : ""}`}
                                />
                                <span className="text-[11px] font-semibold">
                                  {spell.name}
                                </span>
                              </div>
                              <p className="text-[10px] text-gray-600 italic ml-3">
                                {spell.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Leveling Guide — prints as page 2 */}
    <div className="leveling-guide-wrapper mt-4">
      <LevelingGuide
        characterClass={character.class}
        currentLevel={character.level}
        subclass={character.subclass}
        characterFeatures={character.features}
        isSpellcaster={!!character.spellcasting}
      />
    </div>
    </>
  );
}
