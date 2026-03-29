"use client";
import Image from "next/image";
import SydeQuestHero from "./SydeQuestHero";

interface Props { onPlay: () => void; }

export default function SplashScreen({ onPlay }: Props) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('/figma/bg-crumpled.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Stars sticker: left=2.8%, top=7.3%, width=17.1% */}
      <div
        className="absolute"
        style={{ left: "2.8%", top: "7.3%", width: "17.1%" }}
      >
        <Image
          src="/figma/sticker-b.png"
          alt=""
          width={260}
          height={260}
          style={{ width: "100%", height: "auto", display: "block" }}
          priority
        />
      </div>

      {/* Fairy mouse sticker: left=74.5%, top=3.4%, width=25.9% (clips right edge intentionally) */}
      <div
        className="absolute"
        style={{ left: "74.5%", top: "3.4%", width: "25.9%" }}
      >
        <Image
          src="/figma/sticker-d.png"
          alt=""
          width={392}
          height={392}
          style={{ width: "100%", height: "auto", display: "block" }}
          priority
        />
      </div>

      {/* Letter rows: Row1 at ~25% from top, Row2 at ~53% from top, both centered */}
      {/* Row 1: SYDE — centered, top=25% */}
      <div
        className="absolute left-0 right-0 flex justify-center"
        style={{ top: "25%" }}
      >
        <div className="flex items-end" style={{ gap: "0.5vw" }}>
          {[
            { src: "/figma/letter-S1.png", hvh: 18.3 },
            { src: "/figma/letter-Y.png",  hvh: 14.7 },
            { src: "/figma/letter-D.png",  hvh: 20.4 },
            { src: "/figma/letter-E1.png", hvh: 20.2 },
          ].map((l, i) => (
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

      {/* Row 2: QUEST — centered, top=53% */}
      <div
        className="absolute left-0 right-0 flex justify-center"
        style={{ top: "53%" }}
      >
        <div className="flex items-end" style={{ gap: "0.5vw" }}>
          {[
            { src: "/figma/letter-Q.png",  hvh: 18.8 },
            { src: "/figma/letter-U.png",  hvh: 13.0 },
            { src: "/figma/letter-E2.png", hvh: 17.4 },
            { src: "/figma/letter-S2.png", hvh: 20.6 },
            { src: "/figma/letter-T.png",  hvh: 23.3 },
          ].map((l, i) => (
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

      {/* PLAY button: centered horizontally, top=82.6%, width=19.4% (min 160px) */}
      <div
        className="absolute left-0 right-0 flex justify-center"
        style={{ top: "82.6%" }}
      >
        <button
          onClick={onPlay}
          className="cursor-pointer active:scale-95 transition-transform"
          aria-label="Play"
          style={{ width: "max(19.4vw, 160px)" }}
        >
          <Image
            src="/figma/sticker-stars.png"
            alt="PLAY"
            width={294}
            height={100}
            style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
            priority
          />
        </button>
      </div>
    </div>
  );
}
