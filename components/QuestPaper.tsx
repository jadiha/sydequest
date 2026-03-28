"use client";
import type { Quest, Friend } from "@/lib/types";
import QuestItem from "./QuestItem";
import ScrapbookTitle from "./ScrapbookTitle";

interface Props {
  quests: Quest[];
  friends: Friend[];
  userName: string;
  termLabel: string;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

// Scattered background stickers
const BG_STICKERS = [
  { e: "⭐", top: "14px",   right: "14px",  delay: 0,   size: "22px" },
  { e: "💜", top: "85px",   right: "6px",   delay: 0.4, size: "17px" },
  { e: "✨", top: "180px",  right: "10px",  delay: 0.8, size: "19px" },
  { e: "🌸", bottom: "100px", left: "8px", delay: 1.2, size: "16px" },
  { e: "⭐", bottom: "50px",  right: "12px", delay: 1.6, size: "20px" },
  { e: "💫", top: "260px",  right: "7px",   delay: 2.0, size: "15px" },
  { e: "🎀", top: "340px",  right: "9px",   delay: 0.6, size: "16px" },
];

export default function QuestPaper({ quests, friends, userName, termLabel, onToggleComplete, onDelete }: Props) {
  const done  = quests.filter(q => q.completed).length;
  const total = quests.length;

  return (
    <div
      className="paper paper-lined washi-tape w-full max-w-md rounded-sm px-6 pt-10 pb-10 relative overflow-visible"
      style={{
        transform: "rotate(-0.8deg)",
        boxShadow: "0 4px 6px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.13)",
      }}
    >
      {/* background stickers */}
      {BG_STICKERS.map(({ e, delay, size, ...pos }, i) => (
        <span
          key={i}
          className="absolute pointer-events-none float select-none"
          style={{ ...pos, fontSize: size, animationDelay: `${delay}s`, opacity: 0.65 } as React.CSSProperties}
        >
          {e}
        </span>
      ))}

      {/* header */}
      <div className="text-center mb-6 relative z-10">
        {/* subtitle: username in small caveat */}
        <p style={{ fontFamily: "'Caveat', cursive" }} className="text-[14px] text-violet-400 tracking-[3px] mb-2">
          ✦ {userName}&apos;s ✦
        </p>

        {/* THE RANSOM NOTE TITLE */}
        <ScrapbookTitle text="Quest List" className="mb-2" />

        {/* term in handwriting */}
        <p
          style={{ fontFamily: "'Caveat', cursive", fontWeight: 700 }}
          className="text-[20px] text-pink-500 mt-2"
        >
          {termLabel} ☀️
        </p>

        {/* deco line */}
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
            no quests yet... add one! ✦
          </li>
        )}
      </ul>

      {/* progress footer */}
      <div className="relative z-10 mt-5 pl-8">
        <p style={{ fontFamily: "'Caveat', cursive" }} className="text-[13px] text-gray-300">
          {done === 0
            ? `0 / ${total} ✦ let's gooo!!`
            : done === total && total > 0
              ? `${total} / ${total} ✦ SYDE QUEST COMPLETE 🎉`
              : `${done} / ${total} completed ✦ keep going!!`}
        </p>
      </div>

      {/* friend interest summary */}
      {friends.some(f => quests.some(q => q.interestedFriendIds.includes(f.id))) && (
        <div className="relative z-10 mt-3 pt-3 border-t border-dashed border-pink-100 pl-8">
          <p style={{ fontFamily: "'Patrick Hand', cursive" }} className="text-[12px] text-gray-400 mb-1.5">
            who&apos;s interested:
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {friends.map(f => {
              const count = quests.filter(q => q.interestedFriendIds.includes(f.id)).length;
              if (!count) return null;
              return (
                <span
                  key={f.id}
                  style={{ fontFamily: "'Patrick Hand', cursive" }}
                  className="text-[12px] px-2 py-0.5 rounded-full border border-violet-200 text-violet-500 bg-violet-50"
                >
                  {f.avatar} {f.name} · {count}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
