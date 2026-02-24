"use client";

interface StatBlockProps {
  label: string;
  value: number;
}

function getModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export default function StatBlock({ label, value }: StatBlockProps) {
  const mod = getModifier(value);

  return (
    <div className="stat-block flex flex-col items-center border-2 border-[#8B0000] rounded-lg p-2 bg-[#FDF6E3] min-w-[80px]">
      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B0000] leading-tight text-center">
        {label}
      </span>
      <div className="modifier-circle w-10 h-10 rounded-full border-2 border-[#8B0000] flex items-center justify-center bg-white mt-1">
        <span className="text-lg font-bold text-[#1a1a1a]">
          {formatModifier(mod)}
        </span>
      </div>
      <div className="score-box w-10 border border-[#8B0000] text-center bg-white mt-1 rounded">
        <span className="text-sm font-semibold text-[#1a1a1a]">{value}</span>
      </div>
    </div>
  );
}
