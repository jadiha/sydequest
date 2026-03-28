"use client";
import { motion, AnimatePresence } from "framer-motion";
import type { Quest } from "@/lib/types";

interface Props {
  quest: Quest;
  index: number;
  onToggleComplete: () => void;
  onDelete: () => void;
}

type Variant = "plain" | "highlight" | "underline" | "tilted";
const VARIANTS: Variant[] = ["highlight", "plain", "underline", "plain", "tilted", "plain"];

// Playfair Display italic is the editorial anchor for the whole list.
// Vary only weight and size — not the font family. Consistency > chaos here.
const ITEM_STYLES = [
  { size: "23px", weight: 700, italic: true  },
  { size: "19px", weight: 400, italic: true  },
  { size: "25px", weight: 400, italic: true  },
  { size: "20px", weight: 700, italic: true  },
  { size: "22px", weight: 400, italic: true  },
  { size: "21px", weight: 700, italic: true  },
  { size: "24px", weight: 400, italic: true  },
  { size: "20px", weight: 700, italic: true  },
];

// Deep editorial ink colors — like a printed magazine, not pastel
const ITEM_COLORS = [
  "#5a1d6e",
  "#7a1a2a",
  "#1a3a60",
  "#3a5020",
  "#6a3000",
  "#1a4040",
  "#5a2040",
  "#3a2800",
];

const STICKERS = ["🎬", "🌻", "🚲", "👵", "🌅", "🏺", "🎨", "🎭", "🌙", "🎪"];

export default function QuestItem({ quest, index, onToggleComplete, onDelete }: Props) {
  const variant = VARIANTS[index % VARIANTS.length];
  const style   = ITEM_STYLES[index % ITEM_STYLES.length];
  const color   = ITEM_COLORS[index % ITEM_COLORS.length];
  const sticker = STICKERS[index % STICKERS.length];
  const tiltDeg = variant === "tilted" ? (index % 2 === 0 ? -0.6 : 0.6) : 0;

  const completedDate = quest.completedAt
    ? new Date(quest.completedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : null;

  return (
    <AnimatePresence>
      <motion.li
        layout
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-start gap-2.5 py-1.5 group relative"
        style={{ transform: `rotate(${tiltDeg}deg)` }}
      >
        {/* number */}
        <span
          style={{ fontFamily: "'Special Elite', cursive" }}
          className="text-gray-300 text-[14px] min-w-[20px] pt-1.5 flex-shrink-0 select-none"
        >
          {index + 1}.
        </span>

        {/* text block */}
        <div className="flex-1 relative min-w-0">
          <button
            onClick={onToggleComplete}
            className="text-left w-full cursor-pointer leading-snug focus:outline-none"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: style.size,
              fontWeight: style.weight,
              fontStyle: "italic",
              color: quest.completed ? "#ccc" : color,
              textDecoration: quest.completed ? "line-through" : "none",
              textDecorationColor: "rgba(160,40,60,0.35)",
              textDecorationThickness: "2px",
              transition: "color 0.2s",
            }}
          >
            {variant === "highlight" && !quest.completed ? (
              <span className="quest-highlight">
                <mark>{quest.title.split(" ")[0]}</mark>
                {" " + quest.title.split(" ").slice(1).join(" ")}
              </span>
            ) : (
              quest.title
            )}
          </button>

          {/* underline variant */}
          {variant === "underline" && !quest.completed && (
            <div
              className="absolute -bottom-0.5 left-0 right-6 h-[1.5px] rounded-full"
              style={{ background: color, opacity: 0.2 }}
            />
          )}

          {/* completion memory */}
          {quest.completed && completedDate && (
            <motion.p
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontFamily: "'Special Elite', cursive" }}
              className="text-[11px] text-rose-400 mt-0.5"
            >
              ♡ done {completedDate}
            </motion.p>
          )}

          {quest.completed && <div className="completion-overlay" />}
        </div>

        {/* emoji + delete */}
        <div className="flex items-center gap-1.5 pt-1.5 flex-shrink-0">
          <span className="text-[17px] float" style={{ animationDelay: `${index * 0.2}s` }}>
            {quest.emoji || sticker}
          </span>
          <button
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-25 hover:!opacity-60 text-gray-500 text-xs transition-opacity focus:outline-none"
            aria-label="delete"
          >
            ✕
          </button>
        </div>
      </motion.li>
    </AnimatePresence>
  );
}
