import { findClassProgression } from "../data/classFeatures";

const LEVEL_DATA = [
  { level: 1,  xp: 0,       prof: 2, slots: [2,0,0,0,0,0,0,0,0] },
  { level: 2,  xp: 300,     prof: 2, slots: [3,0,0,0,0,0,0,0,0] },
  { level: 3,  xp: 900,     prof: 2, slots: [4,2,0,0,0,0,0,0,0] },
  { level: 4,  xp: 2700,    prof: 2, slots: [4,3,0,0,0,0,0,0,0] },
  { level: 5,  xp: 6500,    prof: 3, slots: [4,3,2,0,0,0,0,0,0] },
  { level: 6,  xp: 14000,   prof: 3, slots: [4,3,3,0,0,0,0,0,0] },
  { level: 7,  xp: 23000,   prof: 3, slots: [4,3,3,1,0,0,0,0,0] },
  { level: 8,  xp: 34000,   prof: 3, slots: [4,3,3,2,0,0,0,0,0] },
  { level: 9,  xp: 48000,   prof: 4, slots: [4,3,3,3,1,0,0,0,0] },
  { level: 10, xp: 64000,   prof: 4, slots: [4,3,3,3,2,0,0,0,0] },
  { level: 11, xp: 85000,   prof: 4, slots: [4,3,3,3,2,1,0,0,0] },
  { level: 12, xp: 100000,  prof: 4, slots: [4,3,3,3,2,1,0,0,0] },
  { level: 13, xp: 120000,  prof: 5, slots: [4,3,3,3,2,1,1,0,0] },
  { level: 14, xp: 140000,  prof: 5, slots: [4,3,3,3,2,1,1,0,0] },
  { level: 15, xp: 165000,  prof: 5, slots: [4,3,3,3,2,1,1,1,0] },
  { level: 16, xp: 195000,  prof: 5, slots: [4,3,3,3,2,1,1,1,0] },
  { level: 17, xp: 225000,  prof: 6, slots: [4,3,3,3,2,1,1,1,1] },
  { level: 18, xp: 265000,  prof: 6, slots: [4,3,3,3,3,1,1,1,1] },
  { level: 19, xp: 305000,  prof: 6, slots: [4,3,3,3,3,2,1,1,1] },
  { level: 20, xp: 355000,  prof: 6, slots: [4,3,3,3,3,2,2,1,1] },
];

const ASI_LEVELS = new Set([4, 8, 12, 16, 19]);
const ordinal = (n: number) =>
  n === 1 ? "1st" : n === 2 ? "2nd" : n === 3 ? "3rd" : `${n}th`;

interface LevelingGuideProps {
  characterClass: string;
  currentLevel: number;
  subclass?: string;
}

export default function LevelingGuide({
  characterClass,
  currentLevel,
  subclass,
}: LevelingGuideProps) {
  const progression = findClassProgression(characterClass);

  return (
    <div
      className="leveling-guide bg-[#FFF8E7] text-[#1a1a1a] font-serif"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      <div style={{ backgroundImage: "radial-gradient(ellipse at center, #FFF8E7 0%, #F5E6C8 100%)" }}>

        {/* Page header */}
        <div className="border-b-4 border-[#8B0000] p-4 bg-[#8B0000]">
          <div className="text-white">
            <div className="text-2xl font-bold tracking-wider">
              📖 {characterClass} Progression — Levels 1–20
            </div>
            {subclass && (
              <div className="text-sm opacity-90 mt-0.5">
                Subclass: {subclass}
              </div>
            )}
            <div className="text-sm opacity-80 mt-0.5">
              Current level highlighted · ★ = Ability Score Improvement / Feat available
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">

          {/* ── Class ability progression ── */}
          {progression ? (
            <div className="border-2 border-[#8B0000] rounded-lg overflow-hidden">
              <div className="bg-[#8B0000] text-white text-[11px] font-bold uppercase text-center py-1">
                {characterClass} Class Features by Level
              </div>
              <table className="w-full text-[10px]">
                <thead>
                  <tr className="border-b-2 border-[#8B0000] bg-[#FDF6E3]">
                    <th className="p-1.5 text-left font-bold text-[#8B0000] uppercase w-8">Lvl</th>
                    <th className="p-1.5 text-right font-bold text-[#8B0000] uppercase w-20">XP</th>
                    <th className="p-1.5 text-center font-bold text-[#8B0000] uppercase w-12">Prof</th>
                    <th className="p-1.5 text-left font-bold text-[#8B0000] uppercase">Features Gained</th>
                  </tr>
                </thead>
                <tbody>
                  {progression.map(({ level, profBonus, features }) => {
                    const xpRow = LEVEL_DATA.find(d => d.level === level);
                    const isCurrent = level === currentLevel;
                    const isASI = ASI_LEVELS.has(level);
                    const isPast = level <= currentLevel;

                    return (
                      <tr
                        key={level}
                        className={`border-b border-[#e8d9c0] ${
                          isCurrent
                            ? "bg-[#fff3cd] border-l-4 border-l-[#D4AF37]"
                            : isASI
                            ? "bg-[#fdf0e0]"
                            : level % 2 === 0
                            ? "bg-[#FDF6E3]"
                            : "bg-[#FFF8E7]"
                        } ${isPast && !isCurrent ? "opacity-70" : ""}`}
                      >
                        <td className={`p-1.5 font-bold ${isCurrent ? "text-[#8B6914] text-sm" : "text-[#8B0000]"}`}>
                          {level}
                          {isCurrent && <span className="text-[9px] ml-0.5">◄</span>}
                        </td>
                        <td className="p-1.5 text-right text-gray-600 tabular-nums">
                          {xpRow ? xpRow.xp.toLocaleString() : "—"}
                        </td>
                        <td className="p-1.5 text-center font-bold text-[#1a1a1a]">
                          +{profBonus}
                        </td>
                        <td className="p-1.5">
                          {features.map((f, i) => (
                            <div key={i} className={i > 0 ? "mt-1.5 pt-1.5 border-t border-[#e8d9c0]" : ""}>
                              <span className={`font-bold ${isCurrent ? "text-[#8B6914]" : "text-[#8B0000]"}`}>
                                {f.name}
                              </span>
                              {isASI && f.name.startsWith("ASI") && (
                                <span className="text-[#8B6914] ml-1 font-bold">★</span>
                              )}
                              <span className="text-gray-700"> — {f.description}</span>
                            </div>
                          ))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* Fallback for custom/unrecognised classes */
            <div className="border-2 border-[#8B0000] rounded-lg bg-[#FDF6E3]">
              <div className="bg-[#8B0000] text-white text-[11px] font-bold uppercase text-center py-1 rounded-t-lg">
                {characterClass} — General Progression
              </div>
              <div className="p-3 text-[11px] text-gray-700">
                <p className="italic mb-2">
                  No standard progression found for "{characterClass}". Use the tables below as a general reference.
                </p>
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="border-b border-[#d4b896]">
                      <th className="p-1.5 text-left text-[#8B0000] uppercase font-bold">Lvl</th>
                      <th className="p-1.5 text-right text-[#8B0000] uppercase font-bold">XP</th>
                      <th className="p-1.5 text-center text-[#8B0000] uppercase font-bold">Prof</th>
                      <th className="p-1.5 text-left text-[#8B0000] uppercase font-bold">Milestones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LEVEL_DATA.map(({ level, xp, prof }) => {
                      const isCurrent = level === currentLevel;
                      const isASI = ASI_LEVELS.has(level);
                      return (
                        <tr key={level} className={`border-b border-[#e8d9c0] ${isCurrent ? "bg-[#fff3cd]" : level % 2 === 0 ? "bg-[#FDF6E3]" : "bg-[#FFF8E7]"}`}>
                          <td className={`p-1.5 font-bold ${isCurrent ? "text-[#8B6914]" : "text-[#8B0000]"}`}>{level}{isCurrent && "◄"}</td>
                          <td className="p-1.5 text-right text-gray-600">{xp.toLocaleString()}</td>
                          <td className="p-1.5 text-center font-bold">+{prof}</td>
                          <td className="p-1.5 text-gray-700">{isASI ? "★ ASI / Feat" : "Class features"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Spell slot reference (full caster) ── */}
          <div className="border-2 border-[#8B0000] rounded-lg bg-[#FDF6E3]">
            <div className="bg-[#8B0000] text-white text-[11px] font-bold uppercase text-center py-1 rounded-t-lg">
              Full Caster Spell Slots Reference (Bard · Cleric · Druid · Sorcerer · Wizard)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px]">
                <thead>
                  <tr className="border-b border-[#d4b896]">
                    <th className="p-1.5 text-left font-bold text-[#8B0000] uppercase">Lvl</th>
                    {[1,2,3,4,5,6,7,8,9].map(n => (
                      <th key={n} className="p-1.5 text-center font-bold text-[#8B0000] uppercase w-7">{ordinal(n)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LEVEL_DATA.map(({ level, slots }) => (
                    <tr key={level} className={`border-b border-[#e8d9c0] ${level === currentLevel ? "bg-[#fff3cd]" : level % 2 === 0 ? "bg-[#FDF6E3]" : "bg-[#FFF8E7]"}`}>
                      <td className={`p-1.5 font-bold ${level === currentLevel ? "text-[#8B6914]" : "text-[#8B0000]"}`}>{level}</td>
                      {slots.map((s, i) => (
                        <td key={i} className="p-1.5 text-center">
                          {s > 0 ? <span className="font-semibold">{s}</span> : <span className="text-gray-300">—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Quick reference cards ── */}
          <div className="grid grid-cols-3 gap-4">
            <div className="border-2 border-[#8B0000] rounded-lg bg-[#FDF6E3]">
              <div className="bg-[#8B0000] text-white text-[11px] font-bold uppercase text-center py-1 rounded-t-lg">Proficiency Bonus</div>
              <table className="w-full text-[11px]">
                <tbody>
                  {[[1,4,"+2"],[5,8,"+3"],[9,12,"+4"],[13,16,"+5"],[17,20,"+6"]].map(([a,b,bonus]) => (
                    <tr key={String(a)} className="border-b border-[#e8d9c0]">
                      <td className="p-1.5 text-[#8B0000] font-bold">Levels {a}–{b}</td>
                      <td className="p-1.5 text-center font-bold text-lg">{bonus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-2 border-[#8B0000] rounded-lg bg-[#FDF6E3]">
              <div className="bg-[#8B0000] text-white text-[11px] font-bold uppercase text-center py-1 rounded-t-lg">ASI / Feat Levels ★</div>
              <div className="p-2 space-y-1 text-[11px]">
                <p className="font-bold text-[#8B6914]">Most classes: 4, 8, 12, 16, 19</p>
                <p className="text-gray-600">Fighter extra: 6, 14</p>
                <p className="text-gray-600">Rogue extra: 10</p>
                <p className="mt-1">Each ASI gives +2 to one stat, or +1/+1 to two stats, <em>or</em> a Feat.</p>
              </div>
            </div>

            <div className="border-2 border-[#8B0000] rounded-lg bg-[#FDF6E3]">
              <div className="bg-[#8B0000] text-white text-[11px] font-bold uppercase text-center py-1 rounded-t-lg">Milestone Leveling</div>
              <div className="p-2 text-[11px] space-y-1">
                <p>DM awards levels at story milestones instead of XP tracking.</p>
                <p className="mt-1 font-bold text-[#8B0000]">Suggested pacing:</p>
                <p>Levels 1–3: 1–2 sessions each</p>
                <p>Levels 4–10: 2–4 sessions each</p>
                <p>Levels 11–16: 3–6 sessions each</p>
                <p>Levels 17–20: 4–8 sessions each</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
