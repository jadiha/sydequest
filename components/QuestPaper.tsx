"use client";
import type { Quest, Friend } from "@/lib/types";
import QuestItem from "./QuestItem";
import ScrapbookTitle from "./ScrapbookTitle";

interface Props {
  quests: Quest[];
  friends: Friend[];
  termLabel: string;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

// Stickers inside the paper
const BG_STICKERS = [
  { e: "💜", top: "80px",    right: "8px",  delay: 0.4, size: "16px" },
  { e: "✨", top: "180px",   right: "10px", delay: 0.8, size: "17px" },
  { e: "🌸", bottom: "80px", left: "10px",  delay: 1.2, size: "15px" },
  { e: "💫", top: "260px",   right: "8px",  delay: 2.0, size: "14px" },
];

export default function QuestPaper({ quests, termLabel, onToggleComplete, onDelete }: Props) {
  const done  = quests.filter(q => q.completed).length;
  const total = quests.length;

  return (
    <div
      className="paper paper-lined washi-tape w-full rounded-sm px-6 pt-10 pb-8 relative overflow-visible"
      style={{
        transform: "rotate(-0.5deg)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.10)",
      }}
    >
      {/* paper stickers */}
      {BG_STICKERS.map(({ e, delay, size, ...pos }, i) => (
        <span
          key={i}
          className="absolute pointer-events-none float select-none"
          style={{ ...pos, fontSize: size, animationDelay: `${delay}s`, opacity: 0.6 } as React.CSSProperties}
        >
          {e}
        </span>
      ))}

      {/* header */}
      <div className="text-center mb-5 relative z-10">
        <ScrapbookTitle text="Quest List" size="sm" className="mb-2" />
        <p
          style={{ fontFamily: "'Caveat', cursive", fontWeight: 700 }}
          className="text-[18px] text-pink-400 mt-1"
        >
          {termLabel} ☀️
        </p>
        <div className="mt-2 mx-auto w-4/5 border-t-2 border-dashed border-pink-200" />
      </div>

      {/* quest list */}
      <ul className="relative z-10 space-y-0.5">
        {quests.map((quest, i) => (
          <QuestItem
            key={quest.id}
            quest={quest}
            index={i}
            onToggleComplete={() => onToggleComplete(quest.id)}
            onDelete={() => onDelete(quest.id)}
          />
        ))}
        {quests.length === 0 && (
          <li
            style={{ fontFamily: "'Caveat', cursive" }}
            className="text-center text-gray-300 py-10 text-xl"
          >
            no quests yet ✦
          </li>
        )}
      </ul>

      {/* progress */}
      <div className="relative z-10 mt-4 pl-8">
        <p style={{ fontFamily: "'Special Elite', cursive" }} className="text-[12px] text-gray-300">
          {done === 0
            ? `0 / ${total} ✦ let's gooo!!`
            : done === total && total > 0
              ? `${total} / ${total} ✦ SYDE QUEST COMPLETE 🎉`
              : `${done} / ${total} completed ✦ keep going!!`}
        </p>
      </div>
    </div>
  );
}
