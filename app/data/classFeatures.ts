export interface ClassFeature {
  name: string;
  description: string;
}

export interface LevelEntry {
  level: number;
  profBonus: number;
  features: ClassFeature[];
}

const p = (lvl: number) =>
  lvl < 5 ? 2 : lvl < 9 ? 3 : lvl < 13 ? 4 : lvl < 17 ? 5 : 6;

const asi = { name: "ASI / Feat", description: "Increase one ability score by 2, increase two scores by 1 each, or choose a feat." };

function entry(level: number, features: ClassFeature[]): LevelEntry {
  return { level, profBonus: p(level), features };
}

export const CLASS_PROGRESSIONS: Record<string, LevelEntry[]> = {
  Barbarian: [
    entry(1, [
      { name: "Rage (2/day, +2 dmg)", description: "Bonus action to enter a rage for 1 minute: advantage on STR checks/saves, +2 bonus damage, resistance to bludgeoning/piercing/slashing. Ends if you haven't attacked or taken damage this turn, or fall unconscious." },
      { name: "Unarmored Defense", description: "While not wearing armor your AC = 10 + DEX modifier + CON modifier. You can use a shield and still benefit." },
    ]),
    entry(2, [
      { name: "Reckless Attack", description: "Before making your first attack on your turn, declare reckless to gain advantage on all STR melee attacks this turn — but all attack rolls against you also have advantage until your next turn." },
      { name: "Danger Sense", description: "Advantage on DEX saving throws against effects you can see (traps, spells, etc.), as long as you aren't blinded, deafened, or incapacitated." },
    ]),
    entry(3, [
      { name: "Primal Path (Subclass)", description: "Choose your Primal Path (e.g., Berserker, Totem Warrior). This subclass grants additional features at levels 3, 6, 10, and 14." },
      { name: "Rage (3/day)", description: "You can now rage 3 times per long rest." },
    ]),
    entry(4, [asi]),
    entry(5, [
      { name: "Extra Attack", description: "Attack twice, instead of once, when you take the Attack action on your turn." },
      { name: "Fast Movement", description: "Your speed increases by 10 ft while you aren't wearing heavy armor." },
    ]),
    entry(6, [
      { name: "Path Feature", description: "Your Primal Path grants an additional feature." },
      { name: "Rage (4/day)", description: "You can now rage 4 times per long rest." },
    ]),
    entry(7, [
      { name: "Feral Instinct", description: "Advantage on Initiative rolls. If surprised at the start of combat, you can still act on your first turn as long as you enter a rage." },
    ]),
    entry(8, [asi]),
    entry(9, [
      { name: "Brutal Critical (1 die)", description: "Roll one additional weapon damage die when you score a critical hit with a melee attack." },
      { name: "Rage Damage +3", description: "Your rage damage bonus increases to +3." },
    ]),
    entry(10, [
      { name: "Path Feature", description: "Your Primal Path grants an additional feature." },
    ]),
    entry(11, [
      { name: "Relentless Rage", description: "When reduced to 0 HP while raging, make a CON save (DC 10, +5 per use per rest) to drop to 1 HP instead." },
    ]),
    entry(12, [
      asi,
      { name: "Rage (5/day)", description: "You can now rage 5 times per long rest." },
    ]),
    entry(13, [
      { name: "Brutal Critical (2 dice)", description: "Roll two additional weapon damage dice on a critical hit." },
    ]),
    entry(14, [
      { name: "Path Feature", description: "Your Primal Path grants its capstone feature." },
      { name: "Rage Damage +4", description: "Your rage damage bonus increases to +4." },
    ]),
    entry(15, [
      { name: "Persistent Rage", description: "Your rage no longer ends early from lack of attacking or taking damage — only unconsciousness or your choice ends it." },
    ]),
    entry(16, [asi]),
    entry(17, [
      { name: "Brutal Critical (3 dice)", description: "Roll three additional weapon damage dice on a critical hit." },
      { name: "Rage (6/day)", description: "You can now rage 6 times per long rest." },
    ]),
    entry(18, [
      { name: "Indomitable Might", description: "If your total for a Strength check is less than your Strength score, you can use your Strength score instead." },
    ]),
    entry(19, [asi]),
    entry(20, [
      { name: "Primal Champion", description: "Your Strength and Constitution scores each increase by 4, and their maximums each increase by 4." },
      { name: "Unlimited Rages", description: "You have an unlimited number of rages." },
    ]),
  ],

  Bard: [
    entry(1, [
      { name: "Spellcasting (CHA)", description: "Cast bard spells using Charisma. You know 2 cantrips and 4 spells, using a musical instrument as a focus." },
      { name: "Bardic Inspiration (d6)", description: "Bonus action: grant one creature within 60 ft a d6 Bardic Inspiration die to add to one ability check, attack roll, or saving throw within the next 10 minutes. You have CHA modifier uses, refreshed on long rest." },
    ]),
    entry(2, [
      { name: "Jack of All Trades", description: "Add half your proficiency bonus (round down) to any ability check you're not already proficient in." },
      { name: "Song of Rest (d6)", description: "Creatures that hear you perform during a short rest can each roll a d6 and add it to HP regained from spending Hit Dice." },
    ]),
    entry(3, [
      { name: "Bard College (Subclass)", description: "Join a Bard College (e.g., Lore, Valor), granting features now and at levels 6 and 14." },
      { name: "Expertise", description: "Choose 2 skill proficiencies or your thieves' tools; your proficiency bonus is doubled for checks with those tools." },
    ]),
    entry(4, [asi]),
    entry(5, [
      { name: "Bardic Inspiration (d8)", description: "Your Bardic Inspiration die improves to a d8." },
      { name: "Font of Inspiration", description: "You now regain all expended Bardic Inspiration uses when you finish a short or long rest." },
    ]),
    entry(6, [
      { name: "Countercharm", description: "As an action, begin a performance lasting until end of next turn that gives friendly creatures within 30 ft who can hear you advantage on saves against being charmed or frightened." },
      { name: "College Feature", description: "Your Bard College grants an additional feature." },
    ]),
    entry(7, [
      { name: "Spell Progression", description: "Gain new spells known and higher-level spell slots." },
    ]),
    entry(8, [asi]),
    entry(9, [
      { name: "Song of Rest (d8)", description: "Your Song of Rest die improves to a d8." },
    ]),
    entry(10, [
      { name: "Bardic Inspiration (d10)", description: "Your Bardic Inspiration die improves to a d10." },
      { name: "Expertise (2 more)", description: "Choose 2 more skill proficiencies to double your proficiency bonus with." },
      { name: "Magical Secrets", description: "Learn 2 spells of your choice from any class's spell list; they count as bard spells for you." },
    ]),
    entry(11, [
      { name: "Spell Progression", description: "Gain access to 6th-level spell slots." },
    ]),
    entry(12, [asi]),
    entry(13, [
      { name: "Song of Rest (d10)", description: "Your Song of Rest die improves to a d10." },
    ]),
    entry(14, [
      { name: "Magical Secrets", description: "Learn 2 more spells from any class spell list." },
      { name: "College Feature", description: "Your Bard College grants its capstone feature." },
    ]),
    entry(15, [
      { name: "Bardic Inspiration (d12)", description: "Your Bardic Inspiration die improves to a d12." },
    ]),
    entry(16, [asi]),
    entry(17, [
      { name: "Song of Rest (d12)", description: "Your Song of Rest die improves to a d12." },
    ]),
    entry(18, [
      { name: "Magical Secrets", description: "Learn 2 more spells from any class spell list." },
    ]),
    entry(19, [asi]),
    entry(20, [
      { name: "Superior Inspiration", description: "When you roll initiative and have no Bardic Inspiration uses, you regain one use." },
    ]),
  ],

  Cleric: [
    entry(1, [
      { name: "Spellcasting (WIS)", description: "Prepare and cast cleric spells using Wisdom; you prepare WIS modifier + cleric level spells each long rest from the entire cleric list." },
      { name: "Divine Domain (Subclass)", description: "Choose a Divine Domain (e.g., Life, Light, War, Knowledge). Domains grant bonus spells, always prepared, plus features at levels 1, 2, 6, 8, and 17." },
    ]),
    entry(2, [
      { name: "Channel Divinity (1/rest)", description: "Harness divine energy for special effects. Recharge on short or long rest." },
      { name: "Turn Undead", description: "Channel Divinity option: each undead within 30 ft that fails a WIS save is turned for 1 minute — it must flee and can't willingly move closer to you." },
      { name: "Domain Feature", description: "Your Divine Domain grants an additional feature." },
    ]),
    entry(3, [
      { name: "Spell Progression", description: "Gain access to 2nd-level spell slots." },
    ]),
    entry(4, [asi]),
    entry(5, [
      { name: "Destroy Undead (CR 1/2)", description: "When you Turn Undead, any undead of CR 1/2 or lower is automatically destroyed rather than merely turned." },
    ]),
    entry(6, [
      { name: "Channel Divinity (2/rest)", description: "You can now use Channel Divinity twice per short or long rest." },
      { name: "Domain Feature", description: "Your Divine Domain grants an additional feature." },
    ]),
    entry(7, [
      { name: "Spell Progression", description: "Gain access to 4th-level spell slots." },
    ]),
    entry(8, [
      asi,
      { name: "Destroy Undead (CR 1)", description: "Automatically destroy undead of CR 1 or lower when you Turn Undead." },
      { name: "Domain Feature", description: "Divine Strike (once per turn, +1d8 damage on weapon attack, type varies by domain) or Potent Spellcasting (add WIS mod to cleric cantrip damage)." },
    ]),
    entry(9, [
      { name: "Spell Progression", description: "Gain access to 5th-level spell slots." },
    ]),
    entry(10, [
      { name: "Divine Intervention", description: "Call on your deity for miraculous aid: roll d100 — it succeeds if the result ≤ your cleric level. On success, the DM determines the effect. Once you use it successfully, you must finish a long rest before using it again." },
    ]),
    entry(11, [
      { name: "Destroy Undead (CR 2)", description: "Automatically destroy undead of CR 2 or lower when you Turn Undead." },
    ]),
    entry(12, [asi]),
    entry(13, [
      { name: "Destroy Undead (CR 3)", description: "Automatically destroy undead of CR 3 or lower when you Turn Undead." },
    ]),
    entry(14, [
      { name: "Destroy Undead (CR 4)", description: "Automatically destroy undead of CR 4 or lower when you Turn Undead." },
      { name: "Domain Feature", description: "Your Divine Domain grants a powerful capstone feature." },
    ]),
    entry(15, [
      { name: "Spell Progression", description: "Gain access to 8th-level spell slots." },
    ]),
    entry(16, [asi]),
    entry(17, [
      { name: "Destroy Undead (CR 4+)", description: "Automatically destroy undead of CR 4 or lower (unchanged), but your domain capstone grants major new powers." },
      { name: "Domain Feature (17th)", description: "Your Divine Domain grants its final and most powerful feature." },
    ]),
    entry(18, [
      { name: "Channel Divinity (3/rest)", description: "You can now use Channel Divinity three times per short or long rest." },
    ]),
    entry(19, [asi]),
    entry(20, [
      { name: "Divine Intervention (Improved)", description: "Your Divine Intervention call now automatically succeeds — no roll required." },
    ]),
  ],

  Druid: [
    entry(1, [
      { name: "Druidic", description: "You know Druidic, a secret language used only by druids, and can leave hidden messages in nature that only druids can read." },
      { name: "Spellcasting (WIS)", description: "Prepare and cast druid spells using Wisdom; prepare WIS modifier + druid level spells from the druid list after each long rest." },
    ]),
    entry(2, [
      { name: "Wild Shape (2/rest, CR ≤ 1/4)", description: "Bonus action to magically transform into a beast you've seen (CR 1/4 max, no flying or swimming speed). Lasts 2× druid level hours. Recharges on short or long rest." },
      { name: "Druid Circle (Subclass)", description: "Join a Druid Circle (e.g., Circle of the Land, Circle of the Moon), granting features now and at levels 6, 10, and 14." },
    ]),
    entry(3, [
      { name: "Spell Progression", description: "Gain access to 2nd-level spell slots." },
    ]),
    entry(4, [
      asi,
      { name: "Wild Shape Improvement (CR ≤ 1/2)", description: "Wild Shape now allows beasts up to CR 1/2, though still no flying speed." },
    ]),
    entry(5, [
      { name: "Spell Progression", description: "Gain access to 3rd-level spell slots." },
    ]),
    entry(6, [
      { name: "Circle Feature", description: "Your Druid Circle grants an additional feature." },
      { name: "Wild Shape Improvement (CR ≤ 1)", description: "Wild Shape now allows beasts up to CR 1, and you can transform into beasts with a swimming speed." },
    ]),
    entry(7, [
      { name: "Spell Progression", description: "Gain access to 4th-level spell slots." },
    ]),
    entry(8, [
      asi,
      { name: "Wild Shape Improvement (CR ≤ 2)", description: "Wild Shape now allows beasts up to CR 2." },
    ]),
    entry(9, [
      { name: "Spell Progression", description: "Gain access to 5th-level spell slots." },
    ]),
    entry(10, [
      { name: "Circle Feature", description: "Your Druid Circle grants an additional feature." },
      { name: "Wild Shape (CR ≤ 3)", description: "Wild Shape now allows beasts up to CR 3." },
    ]),
    entry(11, [
      { name: "Spell Progression", description: "Gain access to 6th-level spell slots." },
    ]),
    entry(12, [asi]),
    entry(13, [
      { name: "Spell Progression", description: "Gain access to 7th-level spell slots." },
    ]),
    entry(14, [
      { name: "Circle Feature", description: "Your Druid Circle grants a powerful capstone feature." },
      { name: "Wild Shape (CR ≤ 4)", description: "Wild Shape now allows beasts up to CR 4, and you can take the form of a beast with a flying speed." },
    ]),
    entry(15, [
      { name: "Spell Progression", description: "Gain access to 8th-level spell slots." },
    ]),
    entry(16, [asi]),
    entry(17, [
      { name: "Spell Progression", description: "Gain access to 9th-level spell slots." },
    ]),
    entry(18, [
      { name: "Timeless Body", description: "For every 10 years that pass, your body ages only 1 year. You are also immune to magic aging effects." },
      { name: "Beast Spells", description: "While in Wild Shape form, you can cast druid spells that don't require material components, and you can maintain concentration on them." },
    ]),
    entry(19, [asi]),
    entry(20, [
      { name: "Archdruid", description: "You can use Wild Shape an unlimited number of times." },
    ]),
  ],

  Fighter: [
    entry(1, [
      { name: "Fighting Style", description: "Choose a fighting style specialization: Archery (+2 ranged attack rolls), Defense (+1 AC in armor), Dueling (+2 damage with one-handed weapon), Great Weapon Fighting (reroll 1s and 2s on two-handed weapon damage), Protection (reaction to impose disadvantage on attack targeting adjacent ally), or Two-Weapon Fighting (add ability mod to off-hand damage)." },
      { name: "Second Wind", description: "Bonus action: regain 1d10 + fighter level HP. Recharges on short or long rest." },
    ]),
    entry(2, [
      { name: "Action Surge (1/rest)", description: "On your turn, take one additional action on top of your regular action and possible bonus action. Recharges on short or long rest." },
    ]),
    entry(3, [
      { name: "Martial Archetype (Subclass)", description: "Choose a Martial Archetype (e.g., Champion, Battle Master, Eldritch Knight), granting features now and at levels 7, 10, 15, and 18." },
    ]),
    entry(4, [asi]),
    entry(5, [
      { name: "Extra Attack (×2)", description: "Attack twice when you take the Attack action." },
    ]),
    entry(6, [asi]),
    entry(7, [
      { name: "Archetype Feature", description: "Your Martial Archetype grants an additional feature." },
    ]),
    entry(8, [asi]),
    entry(9, [
      { name: "Indomitable (1/long rest)", description: "Reroll a saving throw you fail. You must use the new result. Once per long rest." },
    ]),
    entry(10, [
      { name: "Archetype Feature", description: "Your Martial Archetype grants an additional feature." },
    ]),
    entry(11, [
      { name: "Extra Attack (×3)", description: "Attack three times when you take the Attack action." },
    ]),
    entry(12, [asi]),
    entry(13, [
      { name: "Indomitable (2/long rest)", description: "You can now use Indomitable twice per long rest." },
    ]),
    entry(14, [asi]),
    entry(15, [
      { name: "Archetype Feature", description: "Your Martial Archetype grants an additional feature." },
    ]),
    entry(16, [asi]),
    entry(17, [
      { name: "Action Surge (2/rest)", description: "You can now use Action Surge twice per short or long rest." },
      { name: "Indomitable (3/long rest)", description: "You can now use Indomitable three times per long rest." },
    ]),
    entry(18, [
      { name: "Archetype Feature", description: "Your Martial Archetype grants its capstone feature." },
    ]),
    entry(19, [asi]),
    entry(20, [
      { name: "Extra Attack (×4)", description: "Attack four times when you take the Attack action." },
    ]),
  ],

  Monk: [
    entry(1, [
      { name: "Unarmored Defense", description: "While not wearing armor or shield, AC = 10 + DEX modifier + WIS modifier." },
      { name: "Martial Arts (d4)", description: "Use DEX instead of STR for unarmed strikes and monk weapons. Unarmed strike deals 1d4 damage. After taking the Attack action with unarmed/monk weapon, make one unarmed strike as a bonus action." },
    ]),
    entry(2, [
      { name: "Ki (= level pts, short rest)", description: "Spend Ki points to fuel special abilities. Points equal your monk level; regain all on short or long rest." },
      { name: "Flurry of Blows (2 ki)", description: "After the Attack action: spend 2 ki to make 2 unarmed strikes as a bonus action." },
      { name: "Patient Defense (1 ki)", description: "Spend 1 ki to take the Dodge action as a bonus action." },
      { name: "Step of the Wind (1 ki)", description: "Spend 1 ki to take the Disengage or Dash action as a bonus action; your jump distance doubles." },
      { name: "Unarmored Movement (+10 ft)", description: "Speed increases by 10 ft while not wearing armor or wielding a shield." },
    ]),
    entry(3, [
      { name: "Monastic Tradition (Subclass)", description: "Choose a Monastic Tradition (e.g., Way of the Open Hand, Shadow, Four Elements), granting features now and at levels 6, 11, and 17." },
      { name: "Deflect Missiles", description: "Reaction: reduce ranged weapon attack damage by 1d10 + DEX mod + monk level. If reduced to 0, catch the missile; spend 1 ki to throw it as a ranged attack (proficient, 20/60 ft, 1d6 + DEX)." },
    ]),
    entry(4, [
      asi,
      { name: "Slow Fall", description: "Reaction: reduce fall damage taken by 5 × monk level." },
    ]),
    entry(5, [
      { name: "Extra Attack", description: "Attack twice when you take the Attack action." },
      { name: "Stunning Strike (1 ki)", description: "When you hit a creature with a melee attack, spend 1 ki to force it to make a CON save (DC = 8 + prof + WIS mod) or be stunned until end of your next turn." },
      { name: "Martial Arts (d6)", description: "Your Martial Arts die improves to a d6." },
    ]),
    entry(6, [
      { name: "Ki-Empowered Strikes", description: "Unarmed strikes count as magical for overcoming resistance/immunity to non-magical damage." },
      { name: "Tradition Feature", description: "Your Monastic Tradition grants an additional feature." },
      { name: "Unarmored Movement (+15 ft)", description: "Speed bonus improves to +15 ft." },
    ]),
    entry(7, [
      { name: "Evasion", description: "When subjected to a DEX save for half damage, take no damage on success and only half on failure." },
      { name: "Stillness of Mind", description: "Action: end one effect causing you to be charmed or frightened." },
    ]),
    entry(8, [asi]),
    entry(9, [
      { name: "Unarmored Movement (wall/water)", description: "You can run up vertical surfaces and across liquids on your turn without falling, provided you end your movement on solid ground." },
      { name: "Martial Arts (d6)", description: "Martial Arts die remains d6 (improves to d8 at level 11)." },
    ]),
    entry(10, [
      { name: "Purity of Body", description: "You are immune to disease and poison." },
      { name: "Tradition Feature", description: "Your Monastic Tradition grants an additional feature." },
      { name: "Unarmored Movement (+20 ft)", description: "Speed bonus improves to +20 ft." },
    ]),
    entry(11, [
      { name: "Tradition Feature", description: "Your Monastic Tradition grants an additional feature." },
      { name: "Martial Arts (d8)", description: "Your Martial Arts die improves to a d8." },
    ]),
    entry(12, [asi]),
    entry(13, [
      { name: "Tongue of the Sun and Moon", description: "You can communicate with any creature that knows at least one language." },
    ]),
    entry(14, [
      { name: "Diamond Soul", description: "You gain proficiency in all saving throws. Spend 1 ki to reroll a saving throw you fail." },
      { name: "Unarmored Movement (+25 ft)", description: "Speed bonus improves to +25 ft." },
    ]),
    entry(15, [
      { name: "Timeless Body", description: "You no longer suffer the effects of aging; you can't be aged magically. You still die of old age." },
      { name: "Empty Body (4 ki)", description: "Spend 4 ki to become invisible for 1 minute and gain resistance to all damage except force damage. You can additionally spend 8 ki (total) to cast Astral Projection." },
    ]),
    entry(16, [asi]),
    entry(17, [
      { name: "Tradition Feature", description: "Your Monastic Tradition grants its capstone feature." },
      { name: "Martial Arts (d10)", description: "Your Martial Arts die improves to a d10." },
    ]),
    entry(18, [
      { name: "Empty Body (Improved)", description: "Empty Body now also grants resistance to all damage while invisible." },
      { name: "Unarmored Movement (+30 ft)", description: "Speed bonus improves to +30 ft." },
    ]),
    entry(19, [asi]),
    entry(20, [
      { name: "Perfect Self", description: "When you roll initiative and have no Ki points remaining, you regain 4 ki points." },
      { name: "Martial Arts (d10)", description: "Martial Arts die remains d10." },
    ]),
  ],

  Paladin: [
    entry(1, [
      { name: "Divine Sense", description: "Action: know the location of any celestial, fiend, or undead within 60 ft (not behind total cover). Lasts until end of next turn. Uses = 1 + CHA modifier per long rest." },
      { name: "Lay on Hands", description: "Pool of healing = 5 × paladin level. Action: restore any number of HP to a touched creature, or expend 5 HP to cure a disease or neutralize a poison. Refreshes on long rest." },
    ]),
    entry(2, [
      { name: "Fighting Style", description: "Choose a fighting style: Defense, Dueling, Great Weapon Fighting, or Protection." },
      { name: "Spellcasting (CHA)", description: "Prepare and cast paladin spells using Charisma; you prepare CHA mod + half paladin level spells (rounded down) per long rest." },
      { name: "Divine Smite", description: "When you hit with a melee weapon attack, expend a spell slot to deal extra radiant damage: 2d8 for a 1st-level slot + 1d8 per slot level above 1st (max 5d8). +1d8 if target is undead or fiend." },
    ]),
    entry(3, [
      { name: "Sacred Oath (Subclass)", description: "Take your Sacred Oath (e.g., Devotion, Ancients, Vengeance), gaining bonus spells, Channel Divinity options, and features at levels 3, 7, 15, and 20." },
      { name: "Divine Health", description: "The divine magic flowing through you makes you immune to disease." },
      { name: "Channel Divinity (1/rest)", description: "Use your Sacred Oath's Channel Divinity options. Recharges on short or long rest." },
    ]),
    entry(4, [asi]),
    entry(5, [
      { name: "Extra Attack", description: "Attack twice when you take the Attack action." },
    ]),
    entry(6, [
      { name: "Aura of Protection (10 ft)", description: "You and friendly creatures within 10 ft of you add your Charisma modifier (min +1) to all saving throws, as long as you're conscious." },
    ]),
    entry(7, [
      { name: "Sacred Oath Feature", description: "Your Sacred Oath grants an additional feature." },
    ]),
    entry(8, [asi]),
    entry(9, [
      { name: "Spell Progression", description: "Gain access to 3rd-level spell slots (half-caster progression)." },
    ]),
    entry(10, [
      { name: "Aura of Courage (10 ft)", description: "You and friendly creatures within 10 ft can't be frightened while you're conscious." },
    ]),
    entry(11, [
      { name: "Improved Divine Smite", description: "Your melee weapon attacks deal an extra 1d8 radiant damage on every hit (in addition to any Divine Smite you use)." },
    ]),
    entry(12, [asi]),
    entry(13, [
      { name: "Spell Progression", description: "Gain access to 4th-level spell slots." },
    ]),
    entry(14, [
      { name: "Cleansing Touch", description: "Action: end one spell on yourself or a willing touched creature. Uses = CHA modifier (min 1) per long rest." },
    ]),
    entry(15, [
      { name: "Sacred Oath Feature", description: "Your Sacred Oath grants an additional feature." },
    ]),
    entry(16, [asi]),
    entry(17, [
      { name: "Spell Progression", description: "Gain access to 5th-level spell slots." },
    ]),
    entry(18, [
      { name: "Aura Improvements (30 ft)", description: "Aura of Protection and Aura of Courage both now extend to 30 ft." },
    ]),
    entry(19, [asi]),
    entry(20, [
      { name: "Sacred Oath Capstone", description: "Your Sacred Oath grants its ultimate feature, often a powerful transformation or permanent buff." },
    ]),
  ],

  Ranger: [
    entry(1, [
      { name: "Favored Enemy", description: "Choose a type of favored enemy (e.g., beasts, humanoids, undead). Advantage on Survival checks to track them and INT checks to recall info about them. You learn one language they speak." },
      { name: "Natural Explorer", description: "Choose a favored terrain type. While traveling through it: difficult terrain doesn't slow you, you can't become lost by non-magical means, group is Alert while you forage, move stealthily at normal pace, find double food while foraging, and locate more creatures while tracking." },
    ]),
    entry(2, [
      { name: "Fighting Style", description: "Choose a fighting style: Archery, Defense, Dueling, or Two-Weapon Fighting." },
      { name: "Spellcasting (WIS)", description: "Cast ranger spells using Wisdom; you know a limited number of spells from the ranger list (not the full list), which are always prepared." },
    ]),
    entry(3, [
      { name: "Ranger Archetype (Subclass)", description: "Choose a Ranger Archetype (e.g., Hunter, Beast Master), granting features now and at levels 7, 11, and 15." },
      { name: "Primeval Awareness", description: "Expend one spell slot to sense whether aberrations, celestials, dragons, elementals, fey, fiends, or undead are present within 1 mile (6 miles in favored terrain). You don't learn direction or number." },
    ]),
    entry(4, [asi]),
    entry(5, [
      { name: "Extra Attack", description: "Attack twice when you take the Attack action." },
    ]),
    entry(6, [
      { name: "Favored Enemy (2nd)", description: "Choose one more favored enemy type and one additional language." },
      { name: "Natural Explorer (2nd)", description: "Choose one more favored terrain type." },
    ]),
    entry(7, [
      { name: "Archetype Feature", description: "Your Ranger Archetype grants an additional feature." },
    ]),
    entry(8, [
      asi,
      { name: "Land's Stride", description: "Moving through non-magical difficult terrain costs no extra movement. Can also pass through non-magical plants without being slowed or taking damage. Advantage on saves against magically created or manipulated plants." },
    ]),
    entry(9, [
      { name: "Spell Progression", description: "Gain access to 3rd-level spell slots." },
    ]),
    entry(10, [
      { name: "Natural Explorer (3rd)", description: "Choose one more favored terrain type." },
      { name: "Hide in Plain Sight", description: "Spend 1 minute camouflaging yourself in natural surroundings to gain a +10 bonus to DEX (Stealth) checks as long as you remain still." },
    ]),
    entry(11, [
      { name: "Archetype Feature", description: "Your Ranger Archetype grants an additional feature." },
    ]),
    entry(12, [asi]),
    entry(13, [
      { name: "Spell Progression", description: "Gain access to 4th-level spell slots." },
    ]),
    entry(14, [
      { name: "Vanish", description: "You can use the Hide action as a bonus action, and you can't be tracked by non-magical means unless you choose to leave a trail." },
    ]),
    entry(15, [
      { name: "Archetype Feature", description: "Your Ranger Archetype grants its capstone feature." },
    ]),
    entry(16, [asi]),
    entry(17, [
      { name: "Spell Progression", description: "Gain access to 5th-level spell slots." },
    ]),
    entry(18, [
      { name: "Feral Senses", description: "Gain preternatural senses: no disadvantage attacking invisible creatures you can hear, and you are aware of any invisible creature within 30 ft (provided the creature isn't hidden)." },
    ]),
    entry(19, [asi]),
    entry(20, [
      { name: "Foe Slayer", description: "Once per turn, add your WIS modifier to the attack roll or damage roll of an attack made against a favored enemy." },
    ]),
  ],

  Rogue: [
    entry(1, [
      { name: "Expertise", description: "Choose 2 of your skill proficiencies or your thieves' tools proficiency; your proficiency bonus is doubled for checks using those tools." },
      { name: "Sneak Attack (1d6)", description: "Once per turn, deal +1d6 damage to a target you hit with a finesse or ranged weapon if you have advantage on the attack, or if an ally is adjacent to the target and you don't have disadvantage." },
      { name: "Thieves' Cant", description: "A secret mix of dialect, jargon, and code that rogues use to communicate; only other rogues and thieves understand it." },
    ]),
    entry(2, [
      { name: "Cunning Action", description: "Bonus action on every turn: Dash, Disengage, or Hide." },
    ]),
    entry(3, [
      { name: "Roguish Archetype (Subclass)", description: "Choose a Roguish Archetype (e.g., Thief, Assassin, Arcane Trickster), granting features at levels 3, 9, 13, and 17." },
      { name: "Sneak Attack (2d6)", description: "Sneak Attack damage increases to 2d6." },
    ]),
    entry(4, [asi]),
    entry(5, [
      { name: "Uncanny Dodge", description: "When an attacker you can see hits you, use your reaction to halve the attack's damage." },
      { name: "Sneak Attack (3d6)", description: "Sneak Attack damage increases to 3d6." },
    ]),
    entry(6, [
      { name: "Expertise (2 more)", description: "Choose 2 more skill or tool proficiencies to double your proficiency bonus with." },
      { name: "Sneak Attack (3d6)", description: "Sneak Attack damage remains 3d6 (increases at 7)." },
    ]),
    entry(7, [
      { name: "Evasion", description: "When subjected to a DEX save for half damage, take no damage on success and only half on failure." },
      { name: "Sneak Attack (4d6)", description: "Sneak Attack damage increases to 4d6." },
    ]),
    entry(8, [asi]),
    entry(9, [
      { name: "Archetype Feature", description: "Your Roguish Archetype grants an additional feature." },
      { name: "Sneak Attack (5d6)", description: "Sneak Attack damage increases to 5d6." },
    ]),
    entry(10, [
      asi,
      { name: "Sneak Attack (5d6)", description: "Sneak Attack damage remains 5d6 (increases at 11)." },
    ]),
    entry(11, [
      { name: "Reliable Talent", description: "Whenever you make an ability check using a skill or tool you're proficient in, treat any d20 roll of 9 or lower as a 10." },
      { name: "Sneak Attack (6d6)", description: "Sneak Attack damage increases to 6d6." },
    ]),
    entry(12, [asi]),
    entry(13, [
      { name: "Archetype Feature", description: "Your Roguish Archetype grants an additional feature." },
      { name: "Sneak Attack (7d6)", description: "Sneak Attack damage increases to 7d6." },
    ]),
    entry(14, [
      { name: "Blindsense", description: "If you can hear, you are aware of the location of any hidden or invisible creature within 10 ft." },
      { name: "Sneak Attack (7d6)", description: "Sneak Attack damage remains 7d6 (increases at 15)." },
    ]),
    entry(15, [
      { name: "Slippery Mind", description: "You gain proficiency in WIS saving throws." },
      { name: "Sneak Attack (8d6)", description: "Sneak Attack damage increases to 8d6." },
    ]),
    entry(16, [asi]),
    entry(17, [
      { name: "Archetype Feature", description: "Your Roguish Archetype grants its capstone feature." },
      { name: "Sneak Attack (9d6)", description: "Sneak Attack damage increases to 9d6." },
    ]),
    entry(18, [
      { name: "Elusive", description: "No attack roll has advantage against you while you aren't incapacitated." },
      { name: "Sneak Attack (9d6)", description: "Sneak Attack damage remains 9d6 (increases at 19)." },
    ]),
    entry(19, [
      asi,
      { name: "Sneak Attack (10d6)", description: "Sneak Attack damage increases to 10d6." },
    ]),
    entry(20, [
      { name: "Stroke of Luck", description: "Once per short or long rest: if you miss an attack, turn it into a hit; or if you fail an ability check, treat your d20 roll as a 20." },
    ]),
  ],

  Sorcerer: [
    entry(1, [
      { name: "Spellcasting (CHA)", description: "Cast sorcerer spells using Charisma; you know a limited number of spells that are always available (no preparation needed)." },
      { name: "Sorcerous Origin (Subclass)", description: "Choose a Sorcerous Origin (e.g., Draconic Bloodline, Wild Magic), granting features now and at levels 6, 14, and 18." },
    ]),
    entry(2, [
      { name: "Font of Magic (sorcery points = level)", description: "You have sorcery points equal to your sorcerer level. Spend 2 points to create a 1st-level slot (scaling up), or convert spell slots into points (1 point per slot level). Recharge on long rest." },
    ]),
    entry(3, [
      { name: "Metamagic (choose 2)", description: "Learn 2 Metamagic options to alter your spells: Careful (protect allies from AoE), Distant (double range), Empowered (reroll damage dice, costs 1 pt), Extended (double duration), Heightened (target has disadvantage on first save, costs 3 pts), Quickened (cast as bonus action, costs 2 pts), Subtle (no verbal/somatic components), Twinned (target two creatures, costs 1-spell-level pts)." },
    ]),
    entry(4, [asi]),
    entry(5, [
      { name: "Spell Progression", description: "Gain access to 3rd-level spell slots." },
    ]),
    entry(6, [
      { name: "Origin Feature", description: "Your Sorcerous Origin grants an additional feature." },
    ]),
    entry(7, [
      { name: "Spell Progression", description: "Gain access to 4th-level spell slots." },
    ]),
    entry(8, [asi]),
    entry(9, [
      { name: "Spell Progression", description: "Gain access to 5th-level spell slots." },
    ]),
    entry(10, [
      { name: "Metamagic (3rd option)", description: "Learn one additional Metamagic option." },
    ]),
    entry(11, [
      { name: "Spell Progression", description: "Gain access to 6th-level spell slots." },
    ]),
    entry(12, [asi]),
    entry(13, [
      { name: "Spell Progression", description: "Gain access to 7th-level spell slots." },
    ]),
    entry(14, [
      { name: "Origin Feature", description: "Your Sorcerous Origin grants a powerful additional feature." },
    ]),
    entry(15, [
      { name: "Spell Progression", description: "Gain access to 8th-level spell slots." },
    ]),
    entry(16, [asi]),
    entry(17, [
      { name: "Metamagic (4th option)", description: "Learn one additional Metamagic option." },
      { name: "Spell Progression", description: "Gain access to 9th-level spell slots." },
    ]),
    entry(18, [
      { name: "Origin Feature", description: "Your Sorcerous Origin grants its capstone feature." },
    ]),
    entry(19, [asi]),
    entry(20, [
      { name: "Sorcerous Restoration", description: "Regain 4 expended sorcery points when you finish a short rest." },
    ]),
  ],

  Warlock: [
    entry(1, [
      { name: "Otherworldly Patron (Subclass)", description: "Strike a pact with a patron (e.g., The Archfey, The Fiend, The Great Old One), granting expanded spells and features at levels 1, 6, 10, and 14." },
      { name: "Pact Magic (CHA)", description: "Cast warlock spells using CHA. You have very few spell slots (1 at level 1) but they are always your highest level. All slots refresh on a short or long rest." },
    ]),
    entry(2, [
      { name: "Eldritch Invocations (2)", description: "Learn 2 Eldritch Invocations — permanent magical abilities or enhancements. Examples: Agonizing Blast (+CHA to Eldritch Blast damage), Devil's Sight (see in magical darkness 120 ft), Mask of Many Faces (cast Disguise Self at will), Thirsting Blade (attack twice with pact weapon)." },
    ]),
    entry(3, [
      { name: "Pact Boon", description: "Choose a Pact Boon: Pact of the Chain (familiar with unique options), Pact of the Blade (summon pact weapon, use CHA for attacks), or Pact of the Tome (Book of Shadows with 3 bonus cantrips from any list)." },
      { name: "Eldritch Invocations (3)", description: "Learn one more Eldritch Invocation (3 total). Some invocations require reaching this level." },
    ]),
    entry(4, [asi]),
    entry(5, [
      { name: "Eldritch Invocations (4)", description: "Learn one more invocation (4 total). 3rd-level invocations (like Mire the Mind, Sign of Ill Omen) unlock at this level." },
    ]),
    entry(6, [
      { name: "Patron Feature", description: "Your Otherworldly Patron grants an additional feature." },
    ]),
    entry(7, [
      { name: "Eldritch Invocations (5)", description: "Learn one more invocation (5 total). 4th-level invocations unlock at this level." },
    ]),
    entry(8, [asi]),
    entry(9, [
      { name: "Eldritch Invocations (6)", description: "Learn one more invocation (6 total). 5th-level invocations unlock at this level." },
    ]),
    entry(10, [
      { name: "Patron Feature", description: "Your Otherworldly Patron grants an additional feature." },
    ]),
    entry(11, [
      { name: "Mystic Arcanum (6th)", description: "Choose one 6th-level spell from the warlock list as a Mystic Arcanum. You can cast it once per long rest without expending a spell slot." },
      { name: "Eldritch Invocations (7)", description: "Learn one more invocation (7 total)." },
    ]),
    entry(12, [
      asi,
      { name: "Eldritch Invocations (8)", description: "Learn one more invocation (8 total)." },
    ]),
    entry(13, [
      { name: "Mystic Arcanum (7th)", description: "Choose one 7th-level spell as a Mystic Arcanum. Cast once per long rest without a slot." },
    ]),
    entry(14, [
      { name: "Patron Feature", description: "Your Otherworldly Patron grants a powerful capstone feature." },
    ]),
    entry(15, [
      { name: "Mystic Arcanum (8th)", description: "Choose one 8th-level spell as a Mystic Arcanum. Cast once per long rest without a slot." },
    ]),
    entry(16, [asi]),
    entry(17, [
      { name: "Mystic Arcanum (9th)", description: "Choose one 9th-level spell as a Mystic Arcanum. Cast once per long rest without a slot." },
      { name: "Eldritch Invocations (9)", description: "Learn one more invocation (9 total)." },
    ]),
    entry(18, [
      { name: "Eldritch Invocations (10)", description: "Learn one more invocation (10 total)." },
    ]),
    entry(19, [asi]),
    entry(20, [
      { name: "Eldritch Master", description: "Spend 1 minute entreating your patron to regain all expended Pact Magic spell slots. Once per long rest." },
    ]),
  ],

  Wizard: [
    entry(1, [
      { name: "Spellcasting (INT)", description: "Prepare and cast wizard spells using Intelligence from your spellbook. Prepare INT modifier + wizard level spells per long rest. Spellbook starts with 6 first-level spells; you can copy new spells you find." },
      { name: "Arcane Recovery", description: "Once per day after a short rest, recover spell slots with total levels ≤ half your wizard level (rounded up). Each slot recovered must be 5th level or lower." },
    ]),
    entry(2, [
      { name: "Arcane Tradition (Subclass)", description: "Choose an Arcane Tradition (e.g., School of Evocation, Conjuration, Abjuration, Divination), granting features now and at levels 6, 10, and 14." },
    ]),
    entry(3, [
      { name: "Spell Progression", description: "Gain access to 2nd-level spell slots." },
    ]),
    entry(4, [asi]),
    entry(5, [
      { name: "Spell Progression", description: "Gain access to 3rd-level spell slots." },
    ]),
    entry(6, [
      { name: "Tradition Feature", description: "Your Arcane Tradition grants an additional feature." },
    ]),
    entry(7, [
      { name: "Spell Progression", description: "Gain access to 4th-level spell slots." },
    ]),
    entry(8, [asi]),
    entry(9, [
      { name: "Spell Progression", description: "Gain access to 5th-level spell slots." },
    ]),
    entry(10, [
      { name: "Tradition Feature", description: "Your Arcane Tradition grants an additional feature." },
    ]),
    entry(11, [
      { name: "Spell Progression", description: "Gain access to 6th-level spell slots." },
    ]),
    entry(12, [asi]),
    entry(13, [
      { name: "Spell Progression", description: "Gain access to 7th-level spell slots." },
    ]),
    entry(14, [
      { name: "Tradition Feature", description: "Your Arcane Tradition grants a powerful capstone feature." },
    ]),
    entry(15, [
      { name: "Spell Progression", description: "Gain access to 8th-level spell slots." },
    ]),
    entry(16, [asi]),
    entry(17, [
      { name: "Spell Progression", description: "Gain access to 9th-level spell slots." },
    ]),
    entry(18, [
      { name: "Spell Mastery", description: "Choose one 1st-level and one 2nd-level wizard spell. You can cast each at their lowest level without expending a spell slot, as often as you want." },
    ]),
    entry(19, [asi]),
    entry(20, [
      { name: "Signature Spells", description: "Choose two 3rd-level wizard spells as signature spells. They are always prepared (don't count against your limit) and you can cast each once without a spell slot per short rest." },
    ]),
  ],
};

// Normalise class name to look up the right progression
export function findClassProgression(className: string): LevelEntry[] | null {
  const normalized = className.toLowerCase().trim();
  // Exact match first
  for (const key of Object.keys(CLASS_PROGRESSIONS)) {
    if (key.toLowerCase() === normalized) return CLASS_PROGRESSIONS[key];
  }
  // Partial match — does the character's class contain a standard class name?
  for (const key of Object.keys(CLASS_PROGRESSIONS)) {
    if (normalized.includes(key.toLowerCase())) return CLASS_PROGRESSIONS[key];
  }
  return null;
}
