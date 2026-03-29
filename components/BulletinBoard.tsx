"use client";
import Image from "next/image";
import type { Quest, Friend } from "@/lib/types";

interface Props {
  quests: Quest[];
  friends: Friend[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

// Checkbox matching Figma — square, dark border, checkmark when done
function Checkbox({ checked }: { checked: boolean }) {
  return (
    <div
      style={{
        width: "clamp(16px, 1.8vw, 26px)",
        height: "clamp(16px, 1.8vw, 26px)",
        border: "2px solid #3a1a1a",
        borderRadius: "2px",
        flexShrink: 0,
        marginRight: "clamp(8px, 1vw, 14px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: checked ? "#3a1a1a" : "transparent",
      }}
    >
      {checked && (
        <svg viewBox="0 0 12 10" width="65%" height="65%">
          <polyline
            points="1,5 4.5,9 11,1"
            fill="none"
            stroke="#fffcf0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

// Board letters — reduced sizes so T doesn't clip
const LETTERS_LEFT = [
  { src: "/figma/letter-S1.png", hvw: 9.5 },
  { src: "/figma/letter-Y.png",  hvw: 6.8 },
  { src: "/figma/letter-D.png",  hvw: 7.1 },
  { src: "/figma/letter-E1.png", hvw: 6.9 },
];
const LETTERS_RIGHT = [
  { src: "/figma/letter-Q.png",  hvw: 9.8 },
  { src: "/figma/letter-U.png",  hvw: 6.8 },
  { src: "/figma/letter-E2.png", hvw: 5.7 },
  { src: "/figma/letter-S2.png", hvw: 6.9 },
  { src: "/figma/letter-T.png",  hvw: 8.5 },
];

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
      <div
        className="w-full flex items-end"
        style={{ paddingTop: "1vw", paddingLeft: "0.3vw", paddingRight: "0.3vw" }}
      >
        <div className="flex items-end" style={{ gap: "0.15vw" }}>
          {LETTERS_LEFT.map((l, i) => (
            <Image key={i} src={l.src} alt="" width={200} height={200}
              style={{ height: `${l.hvw}vw`, width: "auto", objectFit: "contain", display: "block" }}
              priority />
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div className="flex items-end" style={{ gap: "0.15vw" }}>
          {LETTERS_RIGHT.map((l, i) => (
            <Image key={i} src={l.src} alt="" width={200} height={200}
              style={{ height: `${l.hvw}vw`, width: "auto", objectFit: "contain", display: "block" }}
              priority />
          ))}
        </div>
      </div>

      {/* ── Main board area ── */}
      <div className="relative w-full flex justify-center" style={{ paddingTop: "2vw", paddingBottom: "10vw" }}>

        {/* Flowers — left of board */}
        <div className="absolute" style={{ left: "0%", top: "0%", width: "13.6%" }}>
          <Image src="/figma/sticker-e.png" alt="" width={206} height={500}
            style={{ width: "100%", height: "auto", display: "block" }} />
        </div>

        {/* Spiderman — right of board */}
        <div className="absolute" style={{ right: "0%", top: "0%", width: "21%" }}>
          <Image src="/figma/sticker-c.png" alt="" width={352} height={400}
            style={{ width: "100%", height: "auto", display: "block" }} />
        </div>

        {/* ── Lined paper ── */}
        <div
          className="relative z-10"
          style={{
            width: "min(63.4vw, 88vw)",
            minHeight: "calc(min(63.4vw, 88vw) * 1.415)",
            backgroundImage: "url('/figma/paper-lined.png')",
            backgroundSize: "cover",
            backgroundPosition: "top left",
            boxShadow: "0 4px 24px rgba(0,0,0,0.28)",
            paddingBottom: "5%",
          }}
        >
          {/* "3A Summerloo" — centered across full paper width */}
          <div style={{ paddingTop: "2.8%", textAlign: "center" }}>
            <p style={{
              fontFamily: "'Irish Grover', cursive",
              fontSize: "clamp(13px, 1.8vw, 28px)",
              color: "#000",
              margin: 0,
            }}>
              3A Summerloo
            </p>
          </div>

          {/* Quest list — left-padded to clear the star decorations in the paper image */}
          <ul style={{
            listStyle: "none",
            margin: 0,
            paddingTop: "4%",
            paddingLeft: "20%",
            paddingRight: "4%",
          }}>
            {quests.map((quest) => (
              <li
                key={quest.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "clamp(12px, 4.5vw, 68px)",
                }}
              >
                <button
                  onClick={() => onToggleComplete(quest.id)}
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer",
                    display: "flex", alignItems: "center" }}
                >
                  <Checkbox checked={quest.completed} />
                  <span style={{
                    fontFamily: "'Irish Grover', cursive",
                    fontSize: "clamp(13px, 2vw, 30px)",
                    color: "#000",
                    textDecoration: quest.completed ? "line-through" : "none",
                    opacity: quest.completed ? 0.5 : 1,
                    textAlign: "left",
                    whiteSpace: "nowrap",
                  }}>
                    {quest.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Ticket — bottom left */}
        <div className="absolute" style={{ left: "3.6%", bottom: "4%", width: "16.3%", transform: "rotate(-15deg)" }}>
          <Image src="/figma/sticker-photo.png" alt="" width={246} height={160}
            style={{ width: "100%", height: "auto", display: "block" }} />
        </div>

        {/* Lips — bottom right */}
        <div className="absolute" style={{ right: "8%", bottom: "3%", width: "13.2%", transform: "rotate(8deg)" }}>
          <Image src="/figma/sticker-a.png" alt="" width={200} height={160}
            style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      </div>
    </div>
  );
}
