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

// Exact match only — no fuzzy fallback
export function findClassProgression(className: string): LevelEntry[] | null {
  const normalized = className.toLowerCase().trim();
  for (const key of Object.keys(CLASS_PROGRESSIONS)) {
    if (key.toLowerCase() === normalized) return CLASS_PROGRESSIONS[key];
  }
  return null;
}

// ─── Custom class progression generator ────────────────────────────────────
// Takes the character's actual features and manufactures a believable
// level 1-20 progression, using those features as seeds and inventing
// appropriate upgrades and milestones in between.

interface CharFeat {
  name: string;
  source: string;
  description: string;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Does the description explicitly mention limited uses (per rest, charges, etc.)? */
function mentionsUsage(desc: string): boolean {
  return /\bper (long |short )?(rest|day)\b|once per\b|\bcharges?\b|\buse[sd]?\b.{0,30}\bper\b/i.test(desc);
}

/** Does the description mention a timed duration? */
function mentionsDuration(desc: string): boolean {
  return /\b\d+ (minute|hour|round|turn)s?\b|lasts? for\b|\bduration\b/i.test(desc);
}

/** First sentence of a description (for concise references). */
function firstSentence(desc: string): string {
  const m = desc.match(/^.+?[.!?](?:\s|$)/);
  return m ? m[0].trim() : desc;
}

/** First 1–2 words of a feature name (for building sub-names). */
function shortName(feat: CharFeat): string {
  return feat.name.split(/\s+/).slice(0, 2).join(" ");
}

/**
 * Generate an "Improved X" description that actually makes sense for
 * the ability's type — passive abilities don't get "use it more / lasts longer".
 */
function improvedDesc(feat: CharFeat): string {
  const { name, description: desc } = feat;
  const hasUsage = mentionsUsage(desc);
  const hasDur = mentionsDuration(desc);

  if (!hasUsage && !hasDur) {
    // Passive ability — expand scope and depth, never mention actions or limits
    return `Your ${name} grows in depth and precision. ${desc} You now notice hidden connections, implied meanings, and subtle details that others miss entirely — and you can articulate exactly what you observe with enough clarity that allies benefit from your analysis even second-hand.`;
  }
  if (hasUsage && hasDur) {
    return `Your ${name} intensifies: ${firstSentence(desc)} You can use it one additional time per rest and its duration doubles.`;
  }
  if (hasUsage) {
    return `Your ${name} grows more accessible: ${firstSentence(desc)} You can use it one additional time per rest and each use is noticeably more potent.`;
  }
  // Duration only
  return `Your ${name} becomes more sustained: ${firstSentence(desc)} Its duration doubles, and while active the effect is significantly stronger.`;
}

/**
 * Generate an "Advanced X" description appropriate for the ability type.
 */
function advancedDesc(feat: CharFeat): string {
  const { name, description: desc } = feat;
  const hasUsage = mentionsUsage(desc);
  const hasDur = mentionsDuration(desc);

  if (!hasUsage && !hasDur) {
    return `Your mastery of ${name} reaches a new level. ${desc} You can now extend the benefits of this ability to one willing ally within 30 feet — describing what you perceive with enough precision that they gain the same advantage on related checks as you do.`;
  }
  if (hasUsage) {
    return `Your mastery of ${name} deepens: ${firstSentence(desc)} The number of uses doubles, its area of effect or number of targets increases by one, and the power of each use is meaningfully greater.`;
  }
  return `Your mastery of ${name} deepens: ${firstSentence(desc)} Its duration doubles and its area of effect or number of targets increases, making it significantly more impactful in any situation.`;
}

/**
 * Generate a "Perfect X" description appropriate for the ability type.
 */
function perfectDesc(feat: CharFeat): string {
  const { name, description: desc } = feat;
  const hasUsage = mentionsUsage(desc);
  const hasDur = mentionsDuration(desc);

  if (!hasUsage && !hasDur) {
    return `You have achieved perfect mastery of ${name}. ${desc} This ability now operates flawlessly even under extreme stress or magical interference — and you can extend its benefits to up to two willing allies within 30 feet who are observing the same thing you are.`;
  }
  if (hasUsage) {
    return `You have perfected ${name}: ${firstSentence(desc)} It now activates as a bonus action, its power is dramatically greater than before, and all uses recharge on a short rest.`;
  }
  return `You have perfected ${name}: ${firstSentence(desc)} Its effects become permanent while you are conscious, the power is dramatically amplified, and allies within 30 feet share a portion of the benefit.`;
}

/**
 * Invent a specific Level 6 path feature based on the character's features.
 * References a real ability by name and gives it concrete D&D mechanics.
 */
function makePathFeature6(
  pathLabel: string,
  features: CharFeat[]
): ClassFeature {
  const src = features[1] ?? features[2] ?? features[0];
  if (!src) {
    return {
      name: `${pathLabel}: Signature Technique`,
      description: `Your path unlocks a signature technique. Once per short rest, you can take 1 minute to perfectly analyze a creature, object, or scene you can observe — you automatically succeed on one related ability check of your choice and learn one piece of information the DM would normally require a higher DC to reveal.`,
    };
  }
  return {
    name: `${pathLabel}: Empowered ${shortName(src)}`,
    description: `Your ${pathLabel} training amplifies your ${src.name}. ${firstSentence(src.description)} When you apply this ability in a high-stakes situation, you automatically succeed on one relevant check per short rest, and you can reveal one detail that would normally require a DC 5 higher to discover.`,
  };
}

/**
 * Invent a specific Level 10 path feature — a synergy between two abilities.
 */
function makePathFeature10(
  pathLabel: string,
  features: CharFeat[]
): ClassFeature {
  const src1 = features[2] ?? features[1] ?? features[0];
  const src2 = features[3] ?? features[0];
  if (!src1) {
    return {
      name: `${pathLabel}: Heightened Insight`,
      description: `Once per long rest, you can ask the DM one yes/no question about any creature or situation you've directly observed and receive a truthful answer. Additionally, you automatically sense when any creature within 30 feet is lying to you.`,
    };
  }
  const refTwo =
    src2 && src2.name !== src1.name
      ? `your ${src1.name} and your ${src2.name}`
      : `your ${src1.name}`;
  return {
    name: `${pathLabel}: ${shortName(src1)} Synergy`,
    description: `Your path reveals the deep connection between ${refTwo}. Once per long rest you can combine them for a powerful effect: you gain advantage on all ability checks and saving throws for 1 minute, and during this time you automatically know if any creature within 30 feet is attempting to deceive, hide from, or ambush you.`,
  };
}

/**
 * Invent a specific Level 14 path capstone based on a key character feature.
 */
function makePathCapstone(
  pathLabel: string,
  features: CharFeat[]
): ClassFeature {
  const src = features[4] ?? features[3] ?? features[1] ?? features[0];
  if (!src) {
    return {
      name: `${pathLabel}: Legendary Technique`,
      description: `The pinnacle of your path grants a legendary ability: once per long rest, you automatically succeed on any single ability check, attack roll, or saving throw related to your core skills — treating the d20 roll as a natural 20.`,
    };
  }
  return {
    name: `${pathLabel}: ${shortName(src)} Perfection`,
    description: `Your ${pathLabel} path culminates in the transcendent expression of ${src.name}. ${firstSentence(src.description)} Once per long rest, push this ability to its absolute limit: it affects all valid targets within 60 feet simultaneously, persists for 1 hour, and cannot be countered or dispelled by any means short of a Wish spell.`,
  };
}

export function generateCustomProgression(
  className: string,
  characterFeatures: CharFeat[],
  isSpellcaster: boolean,
  subclass?: string
): LevelEntry[] {
  const ASI_LEVELS = new Set([4, 8, 12, 16, 19]);
  const asiFeature: ClassFeature = {
    name: "ASI / Feat",
    description: "Increase one ability score by 2, or two scores by 1 each, or choose a feat.",
  };
  const pathLabel = subclass ?? `${className} Path`;

  const featureMap: Map<number, ClassFeature[]> = new Map();
  const add = (level: number, f: ClassFeature) => {
    if (!featureMap.has(level)) featureMap.set(level, []);
    featureMap.get(level)!.push(f);
  };

  const f = (i: number) => characterFeatures[i];
  const asFeature = (feat: CharFeat): ClassFeature => ({
    name: feat.name,
    description: feat.description,
  });

  // ── Level 1: first 1–2 features (core class identity) ──────────────────
  if (f(0)) add(1, asFeature(f(0)));
  if (f(1)) add(1, asFeature(f(1)));

  // ── Level 2: third feature or generated ────────────────────────────────
  if (f(2)) {
    add(2, asFeature(f(2)));
  } else {
    add(2, {
      name: isSpellcaster ? "Arcane Focus" : "Combat Discipline",
      description: isSpellcaster
        ? `Your magical training deepens — you gain a bonus cantrip and can spend 10 minutes to recover one expended spell slot of 1st level after a short rest.`
        : `Your ${className.toLowerCase()} training sharpens your instincts: you can add your proficiency bonus to initiative rolls, and once per short rest you can make one additional attack as a bonus action.`,
    });
  }

  // ── Level 3: subclass choice ────────────────────────────────────────────
  add(3, {
    name: subclass ? `${className} Path: ${subclass}` : `${className} Path (Subclass)`,
    description: `Choose your ${className} specialization${subclass ? ` — ${subclass}` : ""}, defining your unique style. This path grants features at levels 6, 10, and 14.`,
  });
  if (f(3)) add(3, asFeature(f(3)));

  // ── Level 5: power spike + 5th feature ─────────────────────────────────
  if (!isSpellcaster) {
    add(5, {
      name: "Extra Attack",
      description: "You attack twice instead of once when you take the Attack action on your turn.",
    });
  } else {
    add(5, {
      name: "Empowered Casting",
      description: `Once per turn when you deal damage with a spell or ability, you can add your primary ability modifier to the damage roll. Your spell save DC also improves by 1.`,
    });
  }
  if (f(4)) add(5, asFeature(f(4)));

  // ── Level 6: specific invented path feature + improved feature[0] ──────
  add(6, makePathFeature6(pathLabel, characterFeatures));
  if (f(0)) {
    add(6, {
      name: `Improved ${f(0).name}`,
      description: improvedDesc(f(0)),
    });
  }

  // ── Level 7: 6th character feature or invented technique ───────────────
  if (f(5)) {
    add(7, asFeature(f(5)));
  } else {
    add(7, {
      name: `${className} Technique`,
      description: `Your training yields a signature technique — a powerful maneuver or ability unique to your path that you can use once per short rest.`,
    });
  }

  // ── Level 9: resilience milestone ──────────────────────────────────────
  add(9, {
    name: isSpellcaster ? "Arcane Resilience" : "Unbreakable",
    description: isSpellcaster
      ? `Concentration saves now use your full spellcasting modifier, and you have advantage on saving throws against spells and magical effects.`
      : `When you would be reduced to 0 HP, you can use your reaction to drop to 1 HP instead. Usable once per long rest. You also gain proficiency in one saving throw of your choice.`,
  });

  // ── Level 10: specific invented path feature + 7th character feature ───
  add(10, makePathFeature10(pathLabel, characterFeatures));
  if (f(6)) add(10, asFeature(f(6)));

  // ── Level 11: attack or magic power spike ──────────────────────────────
  if (!isSpellcaster) {
    add(11, {
      name: "Superior Strike",
      description: `You attack three times instead of twice when you take the Attack action. In addition, your attacks score a critical hit on a roll of 19 or 20.`,
    });
  } else {
    add(11, {
      name: "Greater Power",
      description: `Once per turn when you cast a spell or use an ability that deals damage, you may reroll any number of damage dice and use either result. Your abilities now affect a wider area or more targets than before.`,
    });
  }

  // ── Level 13: advanced version of feature[1] ───────────────────────────
  const advSource = f(1) ?? f(0);
  if (advSource) {
    add(13, {
      name: `Advanced ${advSource.name}`,
      description: advancedDesc(advSource),
    });
  } else {
    add(13, {
      name: `${className} Expertise`,
      description: `Decades of training grant you unparalleled expertise. Double your proficiency bonus on any ${className.toLowerCase()}-related check, and you cannot have disadvantage on such checks.`,
    });
  }

  // ── Level 14: specific invented path capstone + 8th character feature ──
  add(14, makePathCapstone(pathLabel, characterFeatures));
  if (f(7)) add(14, asFeature(f(7)));

  // ── Level 15: endurance milestone ──────────────────────────────────────
  add(15, {
    name: isSpellcaster ? "Spell Endurance" : "Indomitable Will",
    description: isSpellcaster
      ? `You can maintain concentration on two spells simultaneously. Additionally, you can cast one spell of 5th level or lower without expending a spell slot once per long rest.`
      : `When you fail a saving throw, you can use your reaction to reroll it and take the new result. You may do this twice per long rest. You also gain resistance to one damage type of your choice.`,
  });

  // ── Level 17: perfect version of feature[2] ────────────────────────────
  const perfSource = f(2) ?? f(1) ?? f(0);
  if (perfSource) {
    add(17, {
      name: `Perfect ${perfSource.name}`,
      description: perfectDesc(perfSource),
    });
  }
  if (f(8)) add(17, asFeature(f(8)));

  // ── Level 18: legendary milestone ──────────────────────────────────────
  const leg0 = f(0);
  add(18, {
    name: isSpellcaster ? "Legendary Spellcraft" : `Legendary ${leg0?.name ?? className}`,
    description: isSpellcaster
      ? `Your magic transcends mortal limits. Once per long rest, cast any spell you know at maximum effect without expending a spell slot and without requiring concentration. Enemies have disadvantage on saving throws against your abilities.`
      : leg0
      ? `Your ${leg0.name} transcends all normal limits. ${firstSentence(leg0.description)} Once per long rest, push it to its absolute peak: it is overwhelming in power, affects every valid target within 60 feet, and all affected creatures must succeed on a Wisdom save (DC 8 + prof + your primary ability mod) or be stunned until the end of your next turn.`
      : `Your ${className.toLowerCase()} power becomes legendary. You are immune to being charmed or frightened, and your abilities are treated as magical and cannot be blocked by non-magical means.`,
  });

  // ── Level 20: paragon capstone ──────────────────────────────────────────
  add(20, {
    name: `${className} Paragon`,
    description: `You embody the pinnacle of the ${className.toLowerCase()} arts. Once per long rest, enter a legendary state for 1 minute: all ability checks, attack rolls, and saving throws are made with advantage; your damage rolls deal maximum damage; and you regain 20 HP at the start of each of your turns.`,
  });

  // ── ASIs at standard levels ─────────────────────────────────────────────
  for (const lvl of ASI_LEVELS) {
    const existing = featureMap.get(lvl) ?? [];
    featureMap.set(lvl, [asiFeature, ...existing]);
  }

  // ── Fill any remaining empty levels with generic flavored content ───────
  const genericFeature = (level: number): ClassFeature => ({
    name: `${className} Advancement`,
    description: `Your ${className.toLowerCase()} experience at level ${level} deepens an existing ability — the scope and precision of one of your core features increases noticeably, and you gain a minor but useful utility unique to your specialization.`,
  });

  return Array.from({ length: 20 }, (_, i) => {
    const level = i + 1;
    const features = featureMap.get(level) ?? [genericFeature(level)];
    return { level, profBonus: p(level), features };
  });
}
