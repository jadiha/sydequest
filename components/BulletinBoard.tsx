"use client";
import type { Quest, Friend } from "@/lib/types";
import QuestPaper from "./QuestPaper";
import SydeQuestHero from "./SydeQuestHero";

interface Props {
  quests: Quest[];
  friends: Friend[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

function Star({ size, rot, opacity = 1 }: { size: number; rot: number; opacity?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `rotate(${rot}deg)`,
        opacity,
        clipPath:
          "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
        background: "#6b1220",
        flexShrink: 0,
      }}
    />
  );
}

function PushPin({ color = "#c0c0c0" }: { color?: string }) {
  return (
    <div
      className="push-pin"
      style={{ background: `radial-gradient(circle at 35% 35%, #eee, ${color})` }}
    />
  );
}

export default function BulletinBoard({ quests, friends, onToggleComplete, onDelete }: Props) {
  return (
    <div className="cork-board min-h-screen w-full flex flex-col items-center pt-6 pb-12 px-4 overflow-y-auto gap-5">

      {/* Title pinned across top */}
      <div className="relative w-full max-w-lg flex flex-col items-center">
        <SydeQuestHero />
      </div>

      {/* Quest paper — pinned to cork */}
      <div className="relative w-full max-w-md">

        {/* Push pin top-center */}
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-20">
          <PushPin color="#aaa" />
        </div>

        {/* Corner stars */}
        <div className="absolute -top-5 left-2 z-10 flex gap-1 items-end">
          <Star size={20} rot={-8} />
          <Star size={13} rot={10} opacity={0.7} />
        </div>
        <div className="absolute -top-5 right-2 z-10">
          <Star size={22} rot={12} />
        </div>

        <QuestPaper
          quests={quests}
          friends={friends}
          termLabel="3A Summer 2026"
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />

        {/* Ticket stub sticker — bottom left */}
        <div
          className="absolute -bottom-4 -left-6 rotate-[-18deg] z-20 px-2 py-1 rounded-sm"
          style={{
            background: "#e8e4d8",
            border: "1px solid #c8c0a8",
            boxShadow: "1px 2px 6px rgba(0,0,0,0.2)",
            fontFamily: "'Special Elite', cursive",
            fontSize: "8px",
            color: "#3a3020",
            letterSpacing: "0.5px",
            whiteSpace: "nowrap",
          }}
        >
          HOW LUCKY ARE WE?
        </div>

        {/* Small star cluster bottom right */}
        <div className="absolute -bottom-2 -right-4 z-10 flex gap-0.5 items-start">
          <Star size={13} rot={6} opacity={0.6} />
          <Star size={18} rot={-10} />
          <Star size={11} rot={15} opacity={0.5} />
        </div>
      </div>

      {/* Syde · 3A label nailed to cork */}
      <p
        style={{ fontFamily: "'Special Elite', cursive" }}
        className="text-[10px] tracking-widest uppercase text-amber-900/50 mt-2"
      >
        SYDE · 3A · Waterloo, ON
      </p>
    </div>
  );
}
