"use client";
import Image from "next/image";
import type { Quest, Friend } from "@/lib/types";
import QuestPaper from "./QuestPaper";
import SydeQuestHero from "./SydeQuestHero";

interface Props {
  quests: Quest[];
  friends: Friend[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function BulletinBoard({ quests, friends, onToggleComplete, onDelete }: Props) {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center pt-8 pb-16 px-4 overflow-y-auto gap-6"
      style={{
        backgroundImage: "url('/figma/bg-cork.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Title */}
      <div className="relative z-10 w-full max-w-md">
        <SydeQuestHero />
      </div>

      {/* Quest paper pinned to cork */}
      <div className="relative w-full max-w-md z-10">

        {/* Spiderman photo — top right, taped */}
        <div
          className="absolute -top-4 -right-8 z-20"
          style={{ transform: "rotate(8deg)" }}
        >
          <Image src="/figma/sticker-c.png" alt="" width={80} height={80}
            style={{ filter: "drop-shadow(2px 3px 8px rgba(0,0,0,0.3))" }} />
        </div>

        {/* Stars patch — top left */}
        <div
          className="absolute -top-6 -left-6 z-20"
          style={{ transform: "rotate(-12deg)" }}
        >
          <Image src="/figma/sticker-b.png" alt="" width={80} height={80}
            style={{ filter: "drop-shadow(1px 2px 5px rgba(0,0,0,0.2))" }} />
        </div>

        {/* The lined paper with quest list */}
        <div
          className="relative rounded-sm overflow-hidden"
          style={{
            backgroundImage: "url('/figma/paper-lined.png')",
            backgroundSize: "cover",
            backgroundPosition: "top center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          }}
        >
          <QuestPaper
            quests={quests}
            friends={friends}
            termLabel="3A Summer 2026"
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
          />
        </div>

        {/* HOW LUCKY ARE WE ticket — bottom left */}
        <div
          className="absolute -bottom-6 -left-8 z-20"
          style={{ transform: "rotate(-15deg)" }}
        >
          <Image src="/figma/sticker-photo.png" alt="" width={110} height={70}
            style={{ filter: "drop-shadow(2px 3px 6px rgba(0,0,0,0.25))" }} />
        </div>

        {/* Lips — bottom right */}
        <div
          className="absolute -bottom-8 -right-6 z-20"
          style={{ transform: "rotate(10deg)" }}
        >
          <Image src="/figma/sticker-a.png" alt="" width={90} height={75}
            style={{ filter: "drop-shadow(1px 2px 5px rgba(0,0,0,0.2))" }} />
        </div>
      </div>

      {/* Fairy mouse — bottom decoration */}
      <div
        className="relative z-10 self-end mr-4"
        style={{ transform: "rotate(-5deg)" }}
      >
        <Image src="/figma/sticker-d.png" alt="" width={90} height={90}
          style={{ filter: "drop-shadow(2px 3px 8px rgba(0,0,0,0.2))" }} />
      </div>
    </div>
  );
}
