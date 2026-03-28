"use client";
import { motion, AnimatePresence } from "framer-motion";
import type { Quest } from "@/lib/types";

interface Props {
  quest: Quest;
  index: number;
  onToggleComplete: () => void;
  onDelete: () => void;
}

// Each item gets ONE of these variants based on index
type Variant = "plain" | "highlight" | "underline" | "tilted";

const VARIANTS: Variant[] = ["plain", "highlight", "underline", "tilted", "plain", "highlight"];

// Font per item — alternates between handwriting fonts
const ITEM_FONTS = [
  "'Kalam', cursive",
  "'Caveat', cursive",
  "'Patrick Hand', cursive",
  "'Kalam', cursive",
  "'Caveat', cursive",
  "'Patrick Hand', cursive",
];

// Color per item (text colors)
const ITEM_COLORS = [
  "#5a2d6e", // deep violet
  "#8b1a3a", // dark rose
  "#1a4060", // navy
  "#3a6030", // forest green
  "#7a3800", // burnt amber
  "#1a4050", // teal
  "#6e2d5a", // plum
  "#4a3000", // brown
];

const ITEM_SIZES = ["22px", "19px", "25px", "20px", "23px", "18px", "24px", "21px"];

// Sticker per item
const STICKERS = ["🎬", "🌻", "🚲", "👵", "🌅", "🏺", "🎨", "🎭", "🌙", "🎪"];

export default function QuestItem({ quest, index, onToggleComplete, onDelete }: Props) {
  const variant   = VARIANTS[index % VARIANTS.length];
  const font      = ITEM_FONTS[index % ITEM_FONTS.length];
  const color     = ITEM_COLORS[index % ITEM_COLORS.length];
  const size      = ITEM_SIZES[index % ITEM_SIZES.length];
  const sticker   = STICKERS[index % STICKERS.length];
  const tiltDeg   = variant === "tilted" ? (index % 2 === 0 ? -0.8 : 0.8) : 0;
  const fontWeight = index % 3 === 0 ? 700 : 400;

  // Format completion date
  const completedDate = quest.completedAt
    ? new Date(quest.completedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : null;

  return (
    <AnimatePresence>
      <motion.li
        layout
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-start gap-2 py-1 group relative"
        style={{ transform: `rotate(${tiltDeg}deg)` }}
      >
        {/* number */}
        <span
          style={{ fontFamily: "'Caveat', cursive" }}
          className="text-gray-300 text-[15px] min-w-[20px] pt-1.5 flex-shrink-0 select-none font-bold"
        >
          {index + 1}.
        </span>

        {/* main text area */}
        <div className="flex-1 relative">
          <button
            onClick={onToggleComplete}
            className="text-left w-full cursor-pointer leading-snug"
            style={{
              fontFamily: font,
              fontSize: size,
              fontWeight,
              color: quest.completed ? "#bbb" : color,
              textDecoration: quest.completed ? "line-through" : "none",
              textDecorationColor: "rgba(180,0,60,0.4)",
              textDecorationThickness: "2.5px",
              transition: "all 0.25s ease",
            }}
          >
            {/* highlight variant wraps key word */}
            {variant === "highlight" && !quest.completed ? (
              <span className="quest-highlight">
                <mark>{quest.title.split(" ")[0]}</mark>
                {" " + quest.title.split(" ").slice(1).join(" ")}
              </span>
            ) : (
              quest.title
            )}
          </button>

          {/* underline variant: wavy line below */}
          {variant === "underline" && !quest.completed && (
            <div
              className="absolute bottom-0 left-0 right-4 h-[2px] rounded-full"
              style={{ background: color, opacity: 0.3 }}
            />
          )}

          {/* completion memory: date + heart */}
          {quest.completed && completedDate && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontFamily: "'Caveat', cursive" }}
              className="text-[12px] text-pink-400 mt-0.5"
            >
              ♡ done {completedDate}
            </motion.p>
          )}

          {/* pink overlay on completion */}
          {quest.completed && (
            <div className="completion-overlay" />
          )}
        </div>

        {/* sticker + delete */}
        <div className="flex items-center gap-1 pt-1 flex-shrink-0">
          <span
            className="text-[18px] float"
            style={{ animationDelay: `${index * 0.22}s` }}
          >
            {quest.emoji || sticker}
          </span>
          <button
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-30 hover:!opacity-70 text-gray-400 text-xs transition-opacity"
            aria-label="delete"
          >
            ✕
          </button>
        </div>
      </motion.li>
    </AnimatePresence>
  );
}
