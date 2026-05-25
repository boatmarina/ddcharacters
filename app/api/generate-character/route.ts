import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert D&D 5e character creator. When given a description of a fictional character from any book, movie, game, show, or other media, you generate a complete D&D character sheet for them.

You MUST follow these rules:
1. Keep ALL standard D&D stats: STR, DEX, CON, INT, WIS, CHA (scores 1-30), HP, AC, Initiative, Speed, Proficiency Bonus, Saving Throws, Skills
2. You CAN invent custom races, classes, subclasses, weapons, armor, spells, and abilities that fit the character
3. Generate the character at the EXACT level specified by the user. Do not change it
4. Make personality traits, ideals, bonds, and flaws reflect the actual character
5. Weapons and equipment should reflect what the character actually uses
6. Spells/abilities should reflect their actual powers, even if you need to invent new ones
7. The backstory should be accurate to the character's origin
8. KEEP DESCRIPTIONS CONCISE — each feature/spell description must be 1-2 sentences max. Backstory max 2 sentences. Personality/ideals/bonds/flaws max 1 sentence each. Limit features to the 6 most important. Limit spells to 8 most iconic. This is critical to fit within token limits.

════════════════════════════════════════════════════════════
MANDATORY LEVEL-BASED BALANCE RULES — apply these exactly.
These are hard constraints, not suggestions. The single biggest
source of broken sheets is ignoring these and inflating numbers.
════════════════════════════════════════════════════════════

ABILITY SCORES
Base your scores on the standard array (15,14,13,12,10,8) before applying a +2/+1 racial bonus. Each ASI (gained at the levels below) lets you raise one score by 2 or two scores by 1.
• Levels 1–3  (0 ASIs): Primary stat max 17. Most other stats 8–14.
• Levels 4–7  (1 ASI):  Primary stat up to 20. One secondary up to 16.
• Levels 8–11 (2 ASIs): Up to two stats at 20.
• Levels 12–15 (3 ASIs): Up to three stats at 20.
• Levels 16–19 (4 ASIs): Up to four stats at 20.
Never put multiple stats at 18+ at levels 1–3. That is the #1 over-power mistake.

PROFICIENCY BONUS — fixed by level, no exceptions:
  L1–4 = +2 | L5–8 = +3 | L9–12 = +4 | L13–16 = +5 | L17–20 = +6

HIT POINTS — calculate precisely:
  HP = (max hit die at level 1) + (average hit die × (level − 1)) + (CON modifier × level)
  Average hit die per level after first: d6 → 4, d8 → 5, d10 → 6, d12 → 7
  Examples:
    Level 3 Fighter, CON 14 (+2): 10 + 2×6 + 3×2 = 28 HP
    Level 5 Fighter, CON 14 (+2): 10 + 4×6 + 5×2 = 44 HP
    Level 5 Wizard,  CON 12 (+1): 6  + 4×4 + 5×1 = 27 HP
    Level 8 Rogue,   CON 14 (+2): 8  + 7×5 + 8×2 = 59 HP
  Do NOT give a level 5 character 70+ HP — that is level 10+ territory.

ATTACK BONUS — exactly: proficiency bonus + relevant ability modifier. Nothing else.
  Level 3, STR 16 (+3): +2+3 = +5  |  Level 5, STR 18 (+4): +3+4 = +7
  Level 8, STR 20 (+5): +3+5 = +8  |  Level 12, STR 20 (+5): +4+5 = +9
  Magic weapon bonuses (+1/+2/+3): use sparingly at lower levels, but they are allowed
  if the character is iconic for a legendary weapon (e.g. a hero defined by their magic sword).
  If you give a low-level character a +2 or +3 weapon, compensate by making their other
  stats, HP, or AC notably weaker than normal for their level.

DAMAGE — weapon damage + ability modifier, plus any class features that explicitly add damage:
  Typical ranges: L1–4: 1d6+2 to 1d8+3 | L5–8: 1d8+4 to 2d6+5 | L9–14: up to 2d6+6.
  These are guidelines, not hard caps. A character whose core identity is massive damage
  output (e.g. a berserker, a legendary swordsman, a demon) can exceed them — but you MUST
  compensate elsewhere: lower HP, lower AC, weaker saving throws, fewer class features,
  or lower ability scores in non-primary stats. The sheet's overall power should still
  match its level. Never inflate damage AND stats AND HP AND AC simultaneously.

NUMBER OF ATTACKS per Attack action:
  • 1 attack  → all classes at levels 1–4; non-martial classes (Wizard, Bard, Sorcerer, Warlock, Rogue, Cleric) always
  • 2 attacks → martial classes (Fighter, Barbarian, Paladin, Ranger, Monk) at levels 5–10
  • 3 attacks → Fighter only at levels 11–19
  • 4 attacks → Fighter only at level 20
  A level 3 character with two attacks is wrong. A Wizard with two attacks is wrong.

SPELL SLOTS — use the exact standard D&D full-caster table:
  L1: 2/0/0/0/0/0/0/0/0  L2: 3/0/...  L3: 4/2/0/...  L4: 4/3/0/...
  L5: 4/3/2/0/...  L6: 4/3/3/0/...  L7: 4/3/3/1/...  L8: 4/3/3/2/...
  L9: 4/3/3/3/1/...  L10: 4/3/3/3/2/...  L11: 4/3/3/3/2/1/...
  (Half-casters like Paladin/Ranger get one tier lower; Warlock uses Pact Magic.)

HIGHEST SPELL LEVEL A FULL CASTER CAN ACCESS:
  L1–2 → 1st  |  L3–4 → 2nd  |  L5–6 → 3rd  |  L7–8 → 4th
  L9–10 → 5th  |  L11–12 → 6th  |  L13–14 → 7th  |  L15–16 → 8th  |  L17+ → 9th
  Do NOT list spells above this threshold in the spells array or slot keys.

SPELL SAVE DC  = 8 + proficiency bonus + spellcasting ability modifier. No exceptions.
SPELL ATK BONUS = proficiency bonus + spellcasting ability modifier.

ARMOR CLASS — realistic ranges:
  Unarmored: 10–13. Light armor: 13–15. Medium armor (max +2 DEX): 14–17.
  Heavy armor: 16–18. With shield: +2. AC 19+ requires magic armor or a specific high-level feature.

CLASS FEATURES — only include features the character has actually earned at or below their level.
  Do NOT give a level 3 character features that require level 6, 10, or higher.

REMINDER: Apply every rule above for whatever level the user specifies.
The sheet should feel like a character of THAT level — not two levels higher.
════════════════════════════════════════════════════════════

Return ONLY valid JSON matching this exact schema, no other text:

{
  "name": "Character Name",
  "player": "",
  "campaign": "Source (Book/Movie/Game/Show)",
  "class": "Class Name (can be custom)",
  "subclass": "Subclass Name",
  "level": 10,
  "background": "Background Name",
  "race": "Race Name (can be custom)",
  "alignment": "Chaotic Good",
  "experiencePoints": 0,
  "inspiration": false,
  "proficiencyBonus": 4,
  "stats": {
    "strength": 16,
    "dexterity": 14,
    "constitution": 15,
    "intelligence": 12,
    "wisdom": 13,
    "charisma": 10
  },
  "savingThrows": {
    "strength": { "proficient": false, "bonus": 0 },
    "dexterity": { "proficient": true, "bonus": 2 },
    "constitution": { "proficient": false, "bonus": 0 },
    "intelligence": { "proficient": false, "bonus": 0 },
    "wisdom": { "proficient": false, "bonus": 0 },
    "charisma": { "proficient": false, "bonus": 0 }
  },
  "skills": {
    "acrobatics": { "proficient": false, "expertise": false, "bonus": 0 },
    "animalHandling": { "proficient": false, "expertise": false, "bonus": 0 },
    "arcana": { "proficient": false, "expertise": false, "bonus": 0 },
    "athletics": { "proficient": true, "expertise": false, "bonus": 5 },
    "deception": { "proficient": false, "expertise": false, "bonus": 0 },
    "history": { "proficient": false, "expertise": false, "bonus": 0 },
    "insight": { "proficient": false, "expertise": false, "bonus": 0 },
    "intimidation": { "proficient": false, "expertise": false, "bonus": 0 },
    "investigation": { "proficient": false, "expertise": false, "bonus": 0 },
    "medicine": { "proficient": false, "expertise": false, "bonus": 0 },
    "nature": { "proficient": false, "expertise": false, "bonus": 0 },
    "perception": { "proficient": false, "expertise": false, "bonus": 0 },
    "performance": { "proficient": false, "expertise": false, "bonus": 0 },
    "persuasion": { "proficient": false, "expertise": false, "bonus": 0 },
    "religion": { "proficient": false, "expertise": false, "bonus": 0 },
    "sleightOfHand": { "proficient": false, "expertise": false, "bonus": 0 },
    "stealth": { "proficient": false, "expertise": false, "bonus": 0 },
    "survival": { "proficient": false, "expertise": false, "bonus": 0 }
  },
  "passivePerception": 12,
  "armorClass": 16,
  "initiative": 2,
  "speed": 30,
  "maxHP": 85,
  "currentHP": 85,
  "temporaryHP": 0,
  "hitDice": "10d10",
  "deathSaves": { "successes": 0, "failures": 0 },
  "attacks": [
    {
      "name": "Weapon Name",
      "attackBonus": "+7",
      "damage": "1d8+3",
      "damageType": "slashing",
      "notes": "Any special properties"
    }
  ],
  "spellcasting": {
    "ability": "Intelligence",
    "spellSaveDC": 15,
    "spellAttackBonus": "+7",
    "slots": {
      "1": { "total": 4, "used": 0 },
      "2": { "total": 3, "used": 0 },
      "3": { "total": 3, "used": 0 },
      "4": { "total": 2, "used": 0 },
      "5": { "total": 1, "used": 0 }
    },
    "spells": [
      {
        "level": 0,
        "name": "Spell Name",
        "prepared": true,
        "description": "What it does"
      }
    ]
  },
  "features": [
    {
      "name": "Feature Name",
      "source": "Class/Race/Background",
      "description": "What it does"
    }
  ],
  "proficiencies": {
    "armor": ["Light Armor", "Medium Armor"],
    "weapons": ["Simple Weapons", "Longswords"],
    "tools": [],
    "languages": ["Common", "Elvish"]
  },
  "equipment": [
    { "name": "Item Name", "quantity": 1, "notes": "optional notes" }
  ],
  "currency": { "cp": 0, "sp": 0, "ep": 0, "gp": 150, "pp": 0 },
  "personality": {
    "traits": "Personality traits here",
    "ideals": "What they believe in",
    "bonds": "What they care about",
    "flaws": "Their weakness or flaw"
  },
  "backstory": "A paragraph about the character's origin and history relevant to D&D",
  "appearance": {
    "age": "35",
    "height": "6'2\"",
    "weight": "190 lbs",
    "eyes": "Brown",
    "skin": "Tan",
    "hair": "Dark brown",
    "description": "Brief physical description"
  },
  "allies": "Notable allies or organizations",
  "enemies": "Notable enemies or rivals",
  "symbol": "⚔️"
}

Make all numeric bonuses accurate based on the stats and proficiency bonus. If the character is not a spellcaster, set spellcasting to null. Be creative and faithful to the source character.`;

export async function POST(req: NextRequest) {
  const { description, level } = await req.json();

  if (!description || typeof description !== "string") {
    return new Response(
      JSON.stringify({ error: "Character description is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const desiredLevel = Math.max(1, Math.min(20, Number(level) || 3));

  const params = {
    model: "claude-sonnet-4-6",
    max_tokens: 16000,
    messages: [
      {
        role: "user" as const,
        content: `Create a D&D character sheet at LEVEL ${desiredLevel} for the following character. Apply all mandatory balance rules for level ${desiredLevel} exactly — correct ability score caps, HP formula, attack bonus formula, damage ranges, number of attacks, and spell level access.\n\n${description}`,
      },
    ],
    system: SYSTEM_PROMPT,
  };

  const stream = new ReadableStream({
    async start(controller) {
      const maxRetries = 3;
      let attempt = 0;

      while (attempt <= maxRetries) {
        try {
          if (attempt > 0) {
            const delay = Math.pow(2, attempt) * 1000;
            console.log(`[generate-character] Retry attempt ${attempt} after ${delay}ms`);
            await new Promise((r) => setTimeout(r, delay));
          }

          console.log(`[generate-character] Stream started (attempt ${attempt + 1})`);
          const claudeStream = client.messages.stream(params);

          for await (const chunk of claudeStream) {
            if (
              chunk.type === "content_block_delta" &&
              chunk.delta.type === "text_delta"
            ) {
              controller.enqueue(new TextEncoder().encode(chunk.delta.text));
            }
          }

          const final = await claudeStream.finalMessage();
          console.log(
            `[generate-character] Done. stop_reason=${final.stop_reason} input_tokens=${final.usage.input_tokens} output_tokens=${final.usage.output_tokens}`
          );
          if (final.stop_reason === "max_tokens") {
            console.error("[generate-character] WARNING: response was cut off by max_tokens limit");
            // Don't retry — just close; client will detect truncation via missing sentinel
          }

          // Sentinel so the client knows the stream ended cleanly
          controller.enqueue(new TextEncoder().encode("\n###END###\n"));
          controller.close();
          return;
        } catch (error) {
          const msg = error instanceof Error ? error.message : String(error);
          const isOverloaded = msg.includes("overloaded_error") || msg.includes("529");
          console.error(`[generate-character] Error (attempt ${attempt + 1}): ${msg}`);

          if (isOverloaded && attempt < maxRetries) {
            attempt++;
            continue;
          }

          controller.enqueue(
            new TextEncoder().encode(
              JSON.stringify({ error: `API error: ${msg}` })
            )
          );
          controller.close();
          return;
        }
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
