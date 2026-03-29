"use client";
import Image from "next/image";

// Splash screen: heights in vh
const SPLASH_ROW1 = [
  { src: "/figma/letter-S1.png", hvh: 18.3 },
  { src: "/figma/letter-Y.png",  hvh: 14.7 },
  { src: "/figma/letter-D.png",  hvh: 20.4 },
  { src: "/figma/letter-E1.png", hvh: 20.2 },
];
const SPLASH_ROW2 = [
  { src: "/figma/letter-Q.png",  hvh: 18.8 },
  { src: "/figma/letter-U.png",  hvh: 13.0 },
  { src: "/figma/letter-E2.png", hvh: 17.4 },
  { src: "/figma/letter-S2.png", hvh: 20.6 },
  { src: "/figma/letter-T.png",  hvh: 23.3 },
];

// Cork board: heights in vw
const BOARD_ROW1 = [
  { src: "/figma/letter-S1.png", hvw: 11.9 },
  { src: "/figma/letter-Y.png",  hvw:  8.5 },
  { src: "/figma/letter-D.png",  hvw:  8.9 },
  { src: "/figma/letter-E1.png", hvw:  8.6 },
];
const BOARD_ROW2 = [
  { src: "/figma/letter-Q.png",  hvw: 12.2 },
  { src: "/figma/letter-U.png",  hvw:  8.5 },
  { src: "/figma/letter-E2.png", hvw:  7.1 },
  { src: "/figma/letter-S2.png", hvw:  8.7 },
  { src: "/figma/letter-T.png",  hvw: 10.7 },
];

interface SplashHeroProps { variant: "splash" }
interface BoardHeroProps  { variant: "board" }
type Props = SplashHeroProps | BoardHeroProps;

export default function SydeQuestHero({ variant }: Props) {
  if (variant === "splash") {
    return (
      <div className="flex flex-col items-center select-none" aria-label="SydeQuest" style={{ gap: "1vh" }}>
        {/* Row 1: SYDE */}
        <div className="flex items-end justify-center" style={{ gap: "0.5vw" }}>
          {SPLASH_ROW1.map((l, i) => (
            <Image
              key={i}
              src={l.src}
              alt=""
              width={200}
              height={200}
              style={{ height: `${l.hvh}vh`, width: "auto", objectFit: "contain", display: "block" }}
              priority
            />
          ))}
        </div>
        {/* Row 2: QUEST */}
        <div className="flex items-end justify-center" style={{ gap: "0.5vw" }}>
          {SPLASH_ROW2.map((l, i) => (
            <Image
              key={i}
              src={l.src}
              alt=""
              width={200}
              height={200}
              style={{ height: `${l.hvh}vh`, width: "auto", objectFit: "contain", display: "block" }}
              priority
            />
          ))}
        </div>
      </div>
    );
  }

  // board variant — two groups on one line spanning full width
  return (
    <div
      className="w-full flex items-end select-none"
      aria-label="SydeQuest"
      style={{ paddingLeft: "0.5vw" }}
    >
      {/* Group 1: SydE — tightly packed, starts near left */}
      <div className="flex items-end" style={{ gap: "0.2vw" }}>
        {BOARD_ROW1.map((l, i) => (
          <Image
            key={i}
            src={l.src}
            alt=""
            width={200}
            height={200}
            style={{ height: `${l.hvw}vw`, width: "auto", objectFit: "contain", display: "block" }}
            priority
          />
        ))}
      </div>
      {/* spacer gap ~44% from left minus group1 width */}
      <div style={{ flex: 1 }} />
      {/* Group 2: QuESt */}
      <div className="flex items-end" style={{ gap: "0.2vw", marginRight: "0.5vw" }}>
        {BOARD_ROW2.map((l, i) => (
          <Image
            key={i}
            src={l.src}
            alt=""
            width={200}
            height={200}
            style={{ height: `${l.hvw}vw`, width: "auto", objectFit: "contain", display: "block" }}
            priority
          />
        ))}
      </div>
    </div>
  );
}
