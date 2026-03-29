"use client";
import Image from "next/image";
import type { Quest, Friend } from "@/lib/types";

interface Props {
  quests: Quest[];
  friends: Friend[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

// CSS star shape via clip-path
function StarBullet() {
  return (
    <span
      style={{
        display: "inline-block",
        flexShrink: 0,
        width: 18,
        height: 18,
        backgroundColor: "#6b1220",
        clipPath:
          "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
        marginRight: 8,
        marginTop: 2,
      }}
      aria-hidden="true"
    />
  );
}

export default function BulletinBoard({ quests, friends, onToggleComplete, onDelete }: Props) {
  return (
    <div
      className="relative overflow-y-auto"
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundImage: "url('/figma/bg-cork.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* ── Letters across the top ── */}
      <div className="w-full" style={{ paddingTop: "1.5vw" }}>
        <div className="w-full flex items-end" style={{ paddingLeft: "0.5vw", paddingRight: "0.5vw" }}>
          {/* Group 1: SydE — starts near left */}
          <div className="flex items-end" style={{ gap: "0.2vw" }}>
            {[
              { src: "/figma/letter-S1.png", hvw: 11.9 },
              { src: "/figma/letter-Y.png",  hvw:  8.5 },
              { src: "/figma/letter-D.png",  hvw:  8.9 },
              { src: "/figma/letter-E1.png", hvw:  8.6 },
            ].map((l, i) => (
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
          {/* Spacer so Group 2 starts ~44% from left */}
          <div style={{ flex: 1 }} />
          {/* Group 2: QuESt */}
          <div className="flex items-end" style={{ gap: "0.2vw" }}>
            {[
              { src: "/figma/letter-Q.png",  hvw: 12.2 },
              { src: "/figma/letter-U.png",  hvw:  8.5 },
              { src: "/figma/letter-E2.png", hvw:  7.1 },
              { src: "/figma/letter-S2.png", hvw:  8.7 },
              { src: "/figma/letter-T.png",  hvw: 10.7 },
            ].map((l, i) => (
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
      </div>

      {/* ── Main content area ── */}
      <div className="relative w-full flex justify-center" style={{ paddingTop: "2vw", paddingBottom: "8vw" }}>

        {/* Flowers sticker: left=0%, top=30%, width=13.6% — positioned absolute relative to board */}
        <div
          className="absolute"
          style={{ left: "0%", top: "0%", width: "13.6%" }}
        >
          <Image
            src="/figma/sticker-e.png"
            alt=""
            width={206}
            height={500}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* Spiderman photo: right=0%, top=0% (relative to this section), width=23.3% */}
        <div
          className="absolute"
          style={{ right: "0%", top: "0%", width: "23.3%" }}
        >
          <Image
            src="/figma/sticker-c.png"
            alt=""
            width={352}
            height={400}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* Lined paper: centered, width=63.4% desktop / 88% mobile */}
        <div
          className="relative z-10"
          style={{
            width: "min(63.4%, 88vw)",
          }}
        >
          <div
            style={{
              backgroundImage: "url('/figma/paper-lined.png')",
              backgroundSize: "cover",
              backgroundPosition: "top",
              boxShadow: "0 4px 24px rgba(0,0,0,0.28)",
              padding: "clamp(16px, 3vw, 40px) clamp(20px, 4vw, 60px)",
            }}
          >
            {/* Header */}
            <p
              style={{
                fontFamily: "'Irish Grover', cursive",
                fontSize: "clamp(12px, 1.2vw, 16px)",
                color: "#000",
                marginBottom: "clamp(8px, 1.5vw, 20px)",
                marginTop: 0,
              }}
            >
              3A Summerloo
            </p>

            {/* Quest items */}
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {quests.map((quest) => (
                <li
                  key={quest.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: "clamp(10px, 1.8vw, 26px)",
                  }}
                >
                  <StarBullet />
                  <button
                    onClick={() => onToggleComplete(quest.id)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      fontFamily: "'Irish Grover', cursive",
                      fontSize: "clamp(14px, 1.4vw, 20px)",
                      color: "#000",
                      textAlign: "left",
                      textDecoration: quest.completed ? "line-through" : "none",
                      opacity: quest.completed ? 0.5 : 1,
                      lineHeight: 1.3,
                    }}
                  >
                    {quest.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ticket stub: left=3.6%, bottom ~5%, width=16.3%, rotate(-15deg) */}
        <div
          className="absolute"
          style={{
            left: "3.6%",
            bottom: "5%",
            width: "16.3%",
            transform: "rotate(-15deg)",
          }}
        >
          <Image
            src="/figma/sticker-photo.png"
            alt=""
            width={246}
            height={160}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* Lips sticker: right=8%, bottom ~3%, width=13.2%, rotate(8deg) */}
        <div
          className="absolute"
          style={{
            right: "8%",
            bottom: "3%",
            width: "13.2%",
            transform: "rotate(8deg)",
          }}
        >
          <Image
            src="/figma/sticker-a.png"
            alt=""
            width={200}
            height={160}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}
