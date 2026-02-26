const LEVEL_DATA = [
  { level: 1,  xp: 0,       prof: 2, slots: [2,0,0,0,0,0,0,0,0], asi: false, notes: "Class features" },
  { level: 2,  xp: 300,     prof: 2, slots: [3,0,0,0,0,0,0,0,0], asi: false, notes: "Class features" },
  { level: 3,  xp: 900,     prof: 2, slots: [4,2,0,0,0,0,0,0,0], asi: false, notes: "Subclass choice (most classes)" },
  { level: 4,  xp: 2700,    prof: 2, slots: [4,3,0,0,0,0,0,0,0], asi: true,  notes: "Ability Score Improvement / Feat" },
  { level: 5,  xp: 6500,    prof: 3, slots: [4,3,2,0,0,0,0,0,0], asi: false, notes: "Extra Attack (martials), 3rd-level spells" },
  { level: 6,  xp: 14000,   prof: 3, slots: [4,3,3,0,0,0,0,0,0], asi: false, notes: "Subclass feature" },
  { level: 7,  xp: 23000,   prof: 3, slots: [4,3,3,1,0,0,0,0,0], asi: false, notes: "Class feature, 4th-level spells" },
  { level: 8,  xp: 34000,   prof: 3, slots: [4,3,3,2,0,0,0,0,0], asi: true,  notes: "Ability Score Improvement / Feat" },
  { level: 9,  xp: 48000,   prof: 4, slots: [4,3,3,3,1,0,0,0,0], asi: false, notes: "5th-level spells" },
  { level: 10, xp: 64000,   prof: 4, slots: [4,3,3,3,2,0,0,0,0], asi: false, notes: "Subclass feature, class milestone" },
  { level: 11, xp: 85000,   prof: 4, slots: [4,3,3,3,2,1,0,0,0], asi: false, notes: "6th-level spells" },
  { level: 12, xp: 100000,  prof: 4, slots: [4,3,3,3,2,1,0,0,0], asi: true,  notes: "Ability Score Improvement / Feat" },
  { level: 13, xp: 120000,  prof: 5, slots: [4,3,3,3,2,1,1,0,0], asi: false, notes: "7th-level spells" },
  { level: 14, xp: 140000,  prof: 5, slots: [4,3,3,3,2,1,1,0,0], asi: false, notes: "Subclass capstone" },
  { level: 15, xp: 165000,  prof: 5, slots: [4,3,3,3,2,1,1,1,0], asi: false, notes: "8th-level spells" },
  { level: 16, xp: 195000,  prof: 5, slots: [4,3,3,3,2,1,1,1,0], asi: true,  notes: "Ability Score Improvement / Feat" },
  { level: 17, xp: 225000,  prof: 6, slots: [4,3,3,3,2,1,1,1,1], asi: false, notes: "9th-level spells" },
  { level: 18, xp: 265000,  prof: 6, slots: [4,3,3,3,3,1,1,1,1], asi: false, notes: "Class feature" },
  { level: 19, xp: 305000,  prof: 6, slots: [4,3,3,3,3,2,1,1,1], asi: true,  notes: "Ability Score Improvement / Feat" },
  { level: 20, xp: 355000,  prof: 6, slots: [4,3,3,3,3,2,2,1,1], asi: false, notes: "Class capstone" },
];

const HALF_CASTER_SLOTS = [
  [0,0,0,0,0,0,0,0,0],
  [2,0,0,0,0,0,0,0,0],
  [3,0,0,0,0,0,0,0,0],
  [3,0,0,0,0,0,0,0,0],
  [4,2,0,0,0,0,0,0,0],
  [4,2,0,0,0,0,0,0,0],
  [4,3,0,0,0,0,0,0,0],
  [4,3,0,0,0,0,0,0,0],
  [4,3,2,0,0,0,0,0,0],
  [4,3,2,0,0,0,0,0,0],
  [4,3,3,0,0,0,0,0,0],
  [4,3,3,0,0,0,0,0,0],
  [4,3,3,1,0,0,0,0,0],
  [4,3,3,1,0,0,0,0,0],
  [4,3,3,2,0,0,0,0,0],
  [4,3,3,2,0,0,0,0,0],
  [4,3,3,3,1,0,0,0,0],
  [4,3,3,3,1,0,0,0,0],
  [4,3,3,3,2,0,0,0,0],
  [4,3,3,3,2,0,0,0,0],
];

const WARLOCK_SLOTS: Record<number, { slots: number; level: number }> = {
  1:  { slots: 1, level: 1 },
  2:  { slots: 2, level: 1 },
  3:  { slots: 2, level: 2 },
  4:  { slots: 2, level: 2 },
  5:  { slots: 2, level: 3 },
  6:  { slots: 2, level: 3 },
  7:  { slots: 2, level: 4 },
  8:  { slots: 2, level: 4 },
  9:  { slots: 2, level: 5 },
  10: { slots: 2, level: 5 },
  11: { slots: 3, level: 5 },
  12: { slots: 3, level: 5 },
  13: { slots: 3, level: 5 },
  14: { slots: 3, level: 5 },
  15: { slots: 3, level: 5 },
  16: { slots: 3, level: 5 },
  17: { slots: 4, level: 5 },
  18: { slots: 4, level: 5 },
  19: { slots: 4, level: 5 },
  20: { slots: 4, level: 5 },
};

const ordinal = (n: number) =>
  n === 1 ? "1st" : n === 2 ? "2nd" : n === 3 ? "3rd" : `${n}th`;

export default function LevelingGuide() {
  return (
    <div
      className="leveling-guide bg-[#FFF8E7] text-[#1a1a1a] font-serif"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      <div
        style={{
          backgroundImage: "radial-gradient(ellipse at center, #FFF8E7 0%, #F5E6C8 100%)",
        }}
      >
        {/* Guide Header */}
        <div className="border-b-4 border-[#8B0000] p-4 bg-[#8B0000]">
          <div className="text-white">
            <div className="text-2xl font-bold tracking-wider">📖 Leveling Reference — D&D 5e</div>
            <div className="text-sm opacity-90 mt-1">
              Experience thresholds, proficiency bonuses, spell slots, and milestones for levels 1–20
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Full Caster Table */}
          <div className="border-2 border-[#8B0000] rounded-lg bg-[#FDF6E3]">
            <div className="bg-[#8B0000] text-white text-[11px] font-bold uppercase text-center py-1 rounded-t-lg">
              Full Caster Spell Slots (Bard · Cleric · Druid · Sorcerer · Wizard)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px]">
                <thead>
                  <tr className="border-b border-[#d4b896]">
                    <th className="p-1.5 text-left font-bold text-[#8B0000] uppercase">Lvl</th>
                    <th className="p-1.5 text-right font-bold text-[#8B0000] uppercase">XP</th>
                    <th className="p-1.5 text-center font-bold text-[#8B0000] uppercase">Prof</th>
                    {[1,2,3,4,5,6,7,8,9].map(n => (
                      <th key={n} className="p-1.5 text-center font-bold text-[#8B0000] uppercase w-7">
                        {ordinal(n)}
                      </th>
                    ))}
                    <th className="p-1.5 text-left font-bold text-[#8B0000] uppercase">Milestones</th>
                  </tr>
                </thead>
                <tbody>
                  {LEVEL_DATA.map(({ level, xp, prof, slots, asi, notes }) => (
                    <tr
                      key={level}
                      className={`border-b border-[#e8d9c0] ${asi ? "bg-[#fff3cd]" : level % 2 === 0 ? "bg-[#FDF6E3]" : "bg-[#FFF8E7]"}`}
                    >
                      <td className="p-1.5 font-bold text-[#8B0000]">{level}</td>
                      <td className="p-1.5 text-right text-gray-700">{xp.toLocaleString()}</td>
                      <td className="p-1.5 text-center font-bold">+{prof}</td>
                      {slots.map((s, i) => (
                        <td key={i} className="p-1.5 text-center">
                          {s > 0 ? <span className="font-semibold">{s}</span> : <span className="text-gray-300">—</span>}
                        </td>
                      ))}
                      <td className="p-1.5 text-gray-700">
                        {asi && <span className="font-bold text-[#8B6914] mr-1">★ ASI/Feat</span>}
                        {notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Half Caster + Warlock side by side */}
          <div className="grid grid-cols-2 gap-4">
            {/* Half Caster */}
            <div className="border-2 border-[#8B0000] rounded-lg bg-[#FDF6E3]">
              <div className="bg-[#8B0000] text-white text-[11px] font-bold uppercase text-center py-1 rounded-t-lg">
                Half Caster Slots (Paladin · Ranger)
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead>
                    <tr className="border-b border-[#d4b896]">
                      <th className="p-1.5 text-left font-bold text-[#8B0000]">Lvl</th>
                      {[1,2,3,4,5].map(n => (
                        <th key={n} className="p-1.5 text-center font-bold text-[#8B0000] w-8">{ordinal(n)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {HALF_CASTER_SLOTS.map((slots, idx) => {
                      const level = idx + 1;
                      const hasSpells = slots.some(s => s > 0);
                      return (
                        <tr key={level} className={`border-b border-[#e8d9c0] ${level % 2 === 0 ? "bg-[#FDF6E3]" : "bg-[#FFF8E7]"}`}>
                          <td className="p-1.5 font-bold text-[#8B0000]">{level}</td>
                          {slots.slice(0,5).map((s, i) => (
                            <td key={i} className="p-1.5 text-center">
                              {s > 0 ? <span className="font-semibold">{s}</span> : <span className="text-gray-300">—</span>}
                            </td>
                          ))}
                          {!hasSpells && <td className="p-1.5 text-gray-400 italic" colSpan={5}>No spells yet</td>}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Warlock */}
            <div className="border-2 border-[#8B0000] rounded-lg bg-[#FDF6E3]">
              <div className="bg-[#8B0000] text-white text-[11px] font-bold uppercase text-center py-1 rounded-t-lg">
                Warlock Pact Slots (reset on Short Rest)
              </div>
              <table className="w-full text-[10px]">
                <thead>
                  <tr className="border-b border-[#d4b896]">
                    <th className="p-1.5 text-left font-bold text-[#8B0000]">Lvl</th>
                    <th className="p-1.5 text-center font-bold text-[#8B0000]">Slots</th>
                    <th className="p-1.5 text-center font-bold text-[#8B0000]">Slot Level</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(WARLOCK_SLOTS).map(([lvl, { slots, level: slotLvl }]) => {
                    const l = Number(lvl);
                    return (
                      <tr key={l} className={`border-b border-[#e8d9c0] ${l % 2 === 0 ? "bg-[#FDF6E3]" : "bg-[#FFF8E7]"}`}>
                        <td className="p-1.5 font-bold text-[#8B0000]">{l}</td>
                        <td className="p-1.5 text-center font-semibold">{slots}</td>
                        <td className="p-1.5 text-center">{ordinal(slotLvl)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Reference Notes */}
          <div className="grid grid-cols-3 gap-4">
            <div className="border-2 border-[#8B0000] rounded-lg bg-[#FDF6E3]">
              <div className="bg-[#8B0000] text-white text-[11px] font-bold uppercase text-center py-1 rounded-t-lg">
                Proficiency Bonus
              </div>
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
              <div className="bg-[#8B0000] text-white text-[11px] font-bold uppercase text-center py-1 rounded-t-lg">
                ASI / Feat Levels ★
              </div>
              <div className="p-2 space-y-1 text-[11px]">
                <p className="font-bold text-[#8B6914]">Most classes: 4, 8, 12, 16, 19</p>
                <p className="text-gray-600">Fighter extra: 6, 14</p>
                <p className="text-gray-600">Rogue extra: 10</p>
                <p className="mt-2">Each ASI gives +2 to one stat, or +1/+1 to two stats, <em>or</em> a Feat instead.</p>
              </div>
            </div>

            <div className="border-2 border-[#8B0000] rounded-lg bg-[#FDF6E3]">
              <div className="bg-[#8B0000] text-white text-[11px] font-bold uppercase text-center py-1 rounded-t-lg">
                Milestone Leveling (Optional)
              </div>
              <div className="p-2 text-[11px] space-y-1">
                <p>Instead of tracking XP, the DM awards levels at story milestones.</p>
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
