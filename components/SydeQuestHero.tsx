"use client";
import Image from "next/image";

// Figma-sourced letter PNGs — exact assets from the design file
// S Y D E  /  Q U E S T
const ROW1 = [
  { src: "/figma/letter-S1.png", h: 82, rot: -6  },
  { src: "/figma/letter-Y.png",  h: 72, rot:  4  },
  { src: "/figma/letter-D.png",  h: 68, rot: -3  },
  { src: "/figma/letter-E1.png", h: 80, rot:  5  },
];
const ROW2 = [
  { src: "/figma/letter-Q.png",  h: 76, rot: -4  },
  { src: "/figma/letter-U.png",  h: 66, rot:  3  },
  { src: "/figma/letter-E2.png", h: 78, rot: -5  },
  { src: "/figma/letter-S2.png", h: 80, rot:  6  },
  { src: "/figma/letter-T.png",  h: 70, rot: -3  },
];

function LetterRow({ letters }: { letters: typeof ROW1 }) {
  return (
    <div className="flex items-end justify-center gap-1.5">
      {letters.map((l, i) => (
        <div
          key={i}
          style={{
            transform: `rotate(${l.rot}deg)`,
            filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.3))",
            flexShrink: 0,
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
    <div className="flex flex-col items-center gap-2 select-none" aria-label="SydeQuest">
      <LetterRow letters={ROW1} />
      <LetterRow letters={ROW2} />
    </div>
  );
}
