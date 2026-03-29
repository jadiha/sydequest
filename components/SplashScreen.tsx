"use client";
import SydeQuestHero from "./SydeQuestHero";

interface Props { onPlay: () => void; }

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
        background: "#8b1a2a",
        flexShrink: 0,
      }}
    />
  );
}

export default function SplashScreen({ onPlay }: Props) {
  return (
    <div className="crumpled-paper min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">

      {/* Stars — top left */}
      <div className="absolute top-14 left-8 flex items-end gap-1.5">
        <Star size={32} rot={-8} />
        <Star size={20} rot={12} opacity={0.75} />
      </div>

      {/* Stars — bottom right */}
      <div className="absolute bottom-20 right-10 flex items-start gap-1">
        <Star size={18} rot={5} opacity={0.6} />
        <Star size={26} rot={-12} />
      </div>

      {/* Cut-out title */}
      <div className="relative z-10 px-4">
        <SydeQuestHero />
      </div>

      {/* PLAY button */}
      <button
        onClick={onPlay}
        className="play-btn mt-14"
        style={{ fontFamily: "'Special Elite', cursive" }}
      >
        PLAY
      </button>
    </div>
  );
}
