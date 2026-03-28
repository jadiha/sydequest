"use client";
import type { Quest, Friend } from "@/lib/types";
import QuestItem from "./QuestItem";

interface Props {
  quests: Quest[];
  friends: Friend[];
  userName: string;
  termLabel: string;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function QuestPaper({ quests, friends, userName, termLabel, onToggleComplete, onDelete }: Props) {
  const done = quests.filter(q => q.completed).length;
  const total = quests.length;

  return (
    <div className="paper paper-tape w-full max-w-md rounded-sm px-6 pt-8 pb-10 relative shadow-[0_2px_4px_rgba(0,0,0,0.08),0_10px_30px_rgba(0,0,0,0.14)]">

      {/* scattered deco stickers */}
      {[
        { top: "12px",  right: "16px", e: "⭐", delay: 0   },
        { top: "80px",  right: "6px",  e: "💜", delay: 0.4 },
        { top: "150px", right: "8px",  e: "✨", delay: 0.8 },
        { bottom:"90px",left: "8px",   e: "🌸", delay: 1.2 },
        { bottom:"40px",right: "12px", e: "⭐", delay: 1.6 },
      ].map(({ e, delay, ...pos }, i) => (
        <span
          key={i}
          className="absolute pointer-events-none float text-xl opacity-70 select-none"
          style={{ ...pos, animationDelay: `${delay}s` } as React.CSSProperties}
        >
          {e}
        </span>
      ))}

      {/* header */}
      <div className="text-center mb-5 relative">
        <p className="font-caveat text-sm text-violet/60 tracking-[3px] mb-0.5">✦ {userName}&apos;s ✦</p>
        <h1 className="font-marker text-[36px] text-[#3d2b6b] leading-none" style={{ textShadow: "3px 3px 0 rgba(200,180,232,0.35)" }}>
          Quest List
        </h1>
        <p className="font-caveat font-bold text-[20px] text-rose mt-0.5">{termLabel} ☀️</p>
        <div className="border-t-2 border-dashed border-pink-200 mt-2 w-4/5 mx-auto" />
      </div>

      {/* list */}
      <ul className="pl-0 space-y-0.5">
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
          <li className="font-caveat text-gray-300 text-center py-8 text-xl">
            no quests yet... add one! ✦
          </li>
        )}
      </ul>

      {/* progress footer */}
      <div className="mt-4 pl-[34px]">
        <p className="font-caveat text-[13px] text-gray-300">
          {done === 0
            ? `0 / ${total} ✦ let's gooo!!`
            : done === total
              ? `${total} / ${total} ✦ SYDE QUEST COMPLETE 🎉`
              : `${done} / ${total} completed ✦ keep going!!`}
        </p>
      </div>

      {/* friend interest summary */}
      {friends.length > 0 && (
        <div className="mt-4 pt-3 border-t border-dashed border-pink-100 pl-[34px]">
          <p className="font-hand text-[12px] text-gray-400 mb-2">who&apos;s interested:</p>
          <div className="flex gap-1.5 flex-wrap">
            {friends.map(f => {
              const count = quests.filter(q => q.interestedFriendIds.includes(f.id)).length;
              if (count === 0) return null;
              return (
                <span
                  key={f.id}
                  className="font-hand text-[12px] px-2 py-0.5 rounded-full border border-violet/20 text-violet bg-violet/5"
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
