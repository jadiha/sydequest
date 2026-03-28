"use client";
import { motion, AnimatePresence } from "framer-motion";
import type { Quest } from "@/lib/types";
import { QUEST_STYLES } from "@/lib/types";

interface Props {
  quest: Quest;
  index: number;
  onToggleComplete: () => void;
  onDelete: () => void;
}

const DIFF_LABELS: Record<Quest["difficulty"], string> = {
  easy:      "☁️",
  medium:    "⭐",
  hard:      "🔥",
  legendary: "💀",
};

export default function QuestItem({ quest, index, onToggleComplete, onDelete }: Props) {
  const style = QUEST_STYLES[index % QUEST_STYLES.length];

  return (
    <AnimatePresence>
      <motion.li
        layout
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20, height: 0 }}
        transition={{ duration: 0.22 }}
        className="flex items-start gap-2 py-1.5 group"
      >
        {/* number */}
        <span className="font-marker text-gray-300 text-base min-w-[20px] pt-1 flex-shrink-0 select-none">
          {index + 1}
        </span>

        {/* checkbox ring */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={onToggleComplete}
          className="w-5 h-5 rounded-full border-[2.5px] flex-shrink-0 mt-[6px] flex items-center justify-center transition-colors duration-200"
          style={{
            borderColor: style.color,
            backgroundColor: quest.completed ? style.color : "transparent",
          }}
          aria-label={quest.completed ? "mark incomplete" : "mark complete"}
        >
          {quest.completed && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-white text-[10px] font-bold leading-none"
            >
              ✓
            </motion.span>
          )}
        </motion.button>

        {/* text */}
        <button
          onClick={onToggleComplete}
          className="flex-1 text-left leading-snug cursor-pointer"
          style={{
            fontFamily: index % 2 === 0 ? "var(--font-kalam)" : "var(--font-caveat)",
            fontSize: style.size,
            fontWeight: style.weight,
            fontStyle: style.italic ? "italic" : "normal",
            color: style.color,
            textDecoration: quest.completed ? "line-through" : "none",
            textDecorationThickness: "2.5px",
            opacity: quest.completed ? 0.4 : 1,
            transition: "opacity 0.2s",
          }}
        >
          {quest.title}
        </button>

        {/* right side: emoji + diff + delete */}
        <div className="flex items-center gap-1.5 flex-shrink-0 pt-1">
          <span
            className="text-lg float"
            style={{ animationDelay: `${index * 0.25}s` }}
          >
            {quest.emoji}
          </span>
          <span className="text-sm opacity-60">{DIFF_LABELS[quest.difficulty]}</span>
          <button
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-40 hover:!opacity-80 text-gray-400 text-sm transition-opacity duration-150 ml-0.5"
            aria-label="delete quest"
          >
            ✕
          </button>
        </div>
      </motion.li>
    </AnimatePresence>
  );
}
