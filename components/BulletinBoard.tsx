"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const letterSpring = { type: "spring" as const, stiffness: 380, damping: 16 };
import type { Quest, Friend } from "@/lib/types";

interface Props {
  quests: Quest[];
  friends: Friend[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <div style={{
      width: "clamp(14px, 1.6vw, 24px)",
      height: "clamp(14px, 1.6vw, 24px)",
      border: "2px solid #3a1a1a",
      borderRadius: "2px",
      flexShrink: 0,
      marginRight: "clamp(8px, 0.8vw, 14px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: checked ? "#3a1a1a" : "transparent",
    }}>
      {checked && (
        <svg viewBox="0 0 12 10" width="65%" height="65%">
          <polyline points="1,5 4.5,9 11,1" fill="none" stroke="#fffcf0"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

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
    <div style={{
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      backgroundImage: "url('/figma/bg-cork.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* ── Letters — centered together, each letter interactive ── */}
      <div className="w-full flex justify-center items-end flex-shrink-0"
        style={{ paddingTop: "1vw", gap: "3vw" }}>
        <div className="flex items-end" style={{ gap: "0.15vw" }}>
          {LETTERS_LEFT.map((l, i) => (
            <motion.div key={i} style={{ cursor: "pointer" }}
              whileHover={{ scale: 1.18, rotate: i % 2 === 0 ? 10 : -10, y: -6 }}
              transition={letterSpring}>
              <Image src={l.src} alt="" width={200} height={200} priority
                style={{ height: `${l.hvw}vw`, width: "auto", objectFit: "contain", display: "block" }} />
            </motion.div>
          ))}
        </div>
        <div className="flex items-end" style={{ gap: "0.15vw" }}>
          {LETTERS_RIGHT.map((l, i) => (
            <motion.div key={i} style={{ cursor: "pointer" }}
              whileHover={{ scale: 1.18, rotate: i % 2 === 0 ? -10 : 10, y: -6 }}
              transition={letterSpring}>
              <Image src={l.src} alt="" width={200} height={200} priority
                style={{ height: `${l.hvw}vw`, width: "auto", objectFit: "contain", display: "block" }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Board area: fills remaining height ── */}
      <div className="relative flex-1 flex items-center justify-center"
        style={{ padding: "1.5vw 0 3vw" }}>

        {/* Flowers */}
        <motion.div
          className="absolute"
          style={{ left: "0%", top: "0%", width: "13%" }}
          whileHover={{ rotate: 8, scale: 1.06 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
        >
          <Image src="/figma/sticker-e.png" alt="" width={206} height={500}
            style={{ width: "100%", height: "auto", display: "block" }} />
        </motion.div>

        {/* Spiderman */}
        <motion.div
          className="absolute"
          style={{ right: "0%", top: "5%", width: "19%" }}
          whileHover={{ rotate: -5, scale: 1.06 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
        >
          <Image src="/figma/sticker-c.png" alt="" width={352} height={400}
            style={{ width: "100%", height: "auto", display: "block" }} />
        </motion.div>

        {/* Ticket */}
        <motion.div
          className="absolute"
          style={{ left: "2%", bottom: "4%", width: "14%" }}
          initial={{ rotate: -15, scale: 1 }}
          whileHover={{ rotate: -8, scale: 1.08 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
        >
          <Image src="/figma/sticker-photo.png" alt="" width={246} height={160}
            style={{ width: "100%", height: "auto", display: "block" }} />
        </motion.div>

        {/* Lips */}
        <motion.div
          className="absolute"
          style={{ right: "6%", bottom: "3%", width: "12%" }}
          initial={{ rotate: 8, scale: 1 }}
          whileHover={{ rotate: 16, scale: 1.08 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
        >
          <Image src="/figma/sticker-a.png" alt="" width={200} height={160}
            style={{ width: "100%", height: "auto", display: "block" }} />
        </motion.div>

        {/* ── Lined paper — fixed height, no scroll ── */}
        <div style={{
          width: "min(63.4vw, 86vw)",
          height: "100%",
          backgroundImage: "url('/figma/paper-lined.png')",
          backgroundSize: "cover",
          backgroundPosition: "top left",
          boxShadow: "0 4px 24px rgba(0,0,0,0.28)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          zIndex: 10,
        }}>
          {/* 3A Summerloo — baseline on the header rule */}
          <div style={{ paddingTop: "9.8%", textAlign: "center", flexShrink: 0 }}>
            <p style={{
              fontFamily: "var(--font-special-elite), 'Special Elite', monospace",
              fontSize: "clamp(14px, 1.8vw, 28px)",
              color: "#3a1a1a",
              margin: 0,
              letterSpacing: "0.08em",
              lineHeight: 1,
            }}>
              3A Summerloo
            </p>
          </div>

          {/* Quest list — items spread across paper lines */}
          <ul style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            paddingLeft: "20%",
            paddingRight: "6%",
            paddingTop: "1.6vw",
            paddingBottom: "3vw",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}>
            {quests.map((quest) => (
              <li
                key={quest.id}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  height: "2.42vw",
                }}
              >
                <button
                  onClick={() => onToggleComplete(quest.id)}
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer",
                    display: "flex", alignItems: "flex-end" }}
                >
                  <Checkbox checked={quest.completed} />
                  <span style={{
                    fontFamily: "var(--font-special-elite), 'Special Elite', monospace",
                    fontSize: "clamp(15px, 2.1vw, 32px)",
                    color: "#1a1a1a",
                    textDecoration: quest.completed ? "line-through" : "none",
                    opacity: quest.completed ? 0.45 : 1,
                    whiteSpace: "nowrap",
                    lineHeight: 1,
                    letterSpacing: "0.03em",
                  }}>
                    {quest.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
