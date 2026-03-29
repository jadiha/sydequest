"use client";
import Image from "next/image";
import SydeQuestHero from "./SydeQuestHero";

interface Props { onPlay: () => void; }

export default function SplashScreen({ onPlay }: Props) {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/figma/bg-crumpled.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Red star patch — top left */}
      <div className="absolute top-10 left-6" style={{ transform: "rotate(-8deg)" }}>
        <Image src="/figma/sticker-b.png" alt="" width={90} height={90}
          style={{ filter: "drop-shadow(2px 3px 6px rgba(0,0,0,0.25))" }} />
      </div>

      {/* Cut-out title */}
      <div className="relative z-10 px-4">
        <SydeQuestHero />
      </div>

      {/* Pixel PLAY button */}
      <button
        onClick={onPlay}
        className="mt-12 relative z-10 cursor-pointer active:scale-95 transition-transform"
        aria-label="Play"
      >
        <Image
          src="/figma/sticker-stars.png"
          alt="PLAY"
          width={180}
          height={60}
          style={{ objectFit: "contain" }}
        />
      </button>
    </div>
  );
}
