import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert D&D 5e character creator. When given a description of a fictional character from any book, movie, game, show, or other media, you generate a complete D&D character sheet for them.

You MUST follow these rules:
1. Keep ALL standard D&D stats: STR, DEX, CON, INT, WIS, CHA (scores 1-30), HP, AC, Initiative, Speed, Proficiency Bonus, Saving Throws, Skills
2. You CAN invent custom races, classes, subclasses, weapons, armor, spells, and abilities that fit the character
3. Balance the character appropriately — choose a level (1-20) that fits their power level
4. Make personality traits, ideals, bonds, and flaws reflect the actual character
5. Weapons and equipment should reflect what the character actually uses
6. Spells/abilities should reflect their actual powers, even if you need to invent new ones
7. The backstory should be accurate to the character's origin

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
  const { description } = await req.json();

  if (!description || typeof description !== "string") {
    return NextResponse.json(
      { error: "Character description is required" },
      { status: 400 }
    );
  }

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const claudeStream = client.messages.stream({
          model: "claude-sonnet-4-6",
          max_tokens: 4096,
          messages: [
            {
              role: "user",
              content: `Create a D&D character sheet for the following character:\n\n${description}`,
            },
          ],
          system: SYSTEM_PROMPT,
        });

        for await (const chunk of claudeStream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            controller.enqueue(new TextEncoder().encode(chunk.delta.text));
          }
        }
        controller.close();
      } catch (error) {
        console.error("Error generating character:", error);
        controller.enqueue(
          new TextEncoder().encode(
            JSON.stringify({ error: "Failed to generate character. Please try again." })
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
