"use client";
import Image from "next/image";

// Each entry: the image src, display height, and rotation for that letter
const LETTERS: { src: string; h: number; rot: number }[] = [
  { src: "/letters/S_1.png", h: 88,  rot: -6  }, // S — orange 3D retro
  { src: "/letters/Y_1.png", h: 80,  rot:  4  }, // Y — yellow/black
  { src: "/letters/D_1.png", h: 72,  rot: -3  }, // D — gold on brown
  { src: "/letters/E_1.png", h: 90,  rot:  5  }, // E — blue/yellow bold
  { src: "/letters/Q_1.png", h: 84,  rot: -4  }, // Q — pink/black
  { src: "/letters/U_1.png", h: 78,  rot:  3  }, // U — retro stripe
  { src: "/letters/E_2.png", h: 82,  rot: -5  }, // E — purple neon
  { src: "/letters/S_2.png", h: 86,  rot:  6  }, // S — bold red
  { src: "/letters/T_1.png", h: 76,  rot: -3  }, // T — retro space
];

// Split into two rows: SydE | QuESt
const ROW1 = LETTERS.slice(0, 4); // S Y D E
const ROW2 = LETTERS.slice(4);    // Q U E S t

function LetterRow({ letters }: { letters: typeof LETTERS }) {
  return (
    <div className="flex items-end justify-center gap-2">
      {letters.map((l, i) => (
        <div
          key={i}
          className="relative flex-shrink-0"
          style={{
            transform: `rotate(${l.rot}deg)`,
            filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.25))",
          }}
        >
          <Image
            src={l.src}
            alt=""
            width={l.h}
            height={l.h}
            style={{ height: l.h, width: "auto", objectFit: "contain" }}
            priority
          />
        </div>
      ))}
    </div>
  );
}

export default function SydeQuestHero() {
  return (
    <div className="flex flex-col items-center gap-3 select-none" aria-label="SydeQuest">
      <LetterRow letters={ROW1} />
      <LetterRow letters={ROW2} />
    </div>
  );
}
