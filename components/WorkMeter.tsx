"use client";
import { motion } from "framer-motion";
import type { WorkDay } from "@/lib/types";

interface Props {
  workDay: WorkDay;
}

const DAY_SLOTS = [
  { type: "work",  label: "W" },
  { type: "work",  label: "W" },
  { type: "work",  label: "W" },
  { type: "quest", label: "✦" },
  { type: "free",  label: "~" },
  { type: "dim",   label: "·" },
  { type: "dim",   label: "·" },
  { type: "dim",   label: "·" },
];

const DOT_COLORS: Record<string, string> = {
  work:  "bg-violet/70 text-white",
  quest: "bg-rose/70 text-white",
  free:  "bg-teal/60 text-white",
  dim:   "bg-gray-200 text-gray-400",
};

export default function WorkMeter({ workDay }: Props) {
  const pct = Math.min((workDay.hoursWorked / workDay.dailyGoal) * 100, 100);
  const remaining = workDay.dailyGoal - workDay.hoursWorked;

  return (
    <div className="paper paper-tape w-full max-w-md rounded-2xl px-5 py-4 shadow-[3px_3px_0_#e8a0b4,6px_6px_0_#d490a4] border-2 border-[#e8a0b4] relative overflow-hidden">
      {/* header */}
      <p className="font-hand text-[11px] text-gray-400 uppercase tracking-widest mb-1">
        ⚡ brain fuel tracker
      </p>
      <p className="font-kalam font-bold text-[18px] text-violet mb-3">
        {workDay.questWindowReady
          ? "you've hit your goal — time to QUEST! 🎉"
          : `you've worked ${workDay.hoursWorked}h — ${remaining.toFixed(1)}h left`}
      </p>

      {/* bar */}
      <div className="bg-purple-100 rounded-full h-4 border-2 border-violet/30 overflow-hidden mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full relative"
          style={{ background: "linear-gradient(90deg, #b4d4ff, #c8b4e8, #ffb3c6)" }}
        >
          <span className="absolute top-1 left-2 right-2 h-1.5 bg-white/40 rounded-full" />
        </motion.div>
      </div>

      {/* bar labels */}
      <div className="flex justify-between font-hand text-[12px] text-gray-400 mb-3">
        <span>0h</span>
        <span className="font-kalam font-bold text-violet">{Math.round(pct)}% done</span>
        <span>{workDay.dailyGoal}h</span>
      </div>

      {/* day slots */}
      <div className="flex gap-1.5 items-center flex-wrap mb-3">
        <span className="font-hand text-[12px] text-gray-400">today:</span>
        {DAY_SLOTS.map((s, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-bold ${DOT_COLORS[s.type]}`}
          >
            {s.label}
          </div>
        ))}
        <span className="font-hand text-[12px] text-rose ml-1">
          → <strong>quest window @ {workDay.questWindowLabel}</strong>
        </span>
      </div>

      {/* CTA */}
      <div className="flex gap-3 items-center">
        <motion.button
          whileTap={{ scale: 0.94 }}
          className="wiggle bg-[#7ed9a0] text-white font-kalam font-bold text-[14px] px-4 py-2 rounded-full border-2 border-[#5cc088] cursor-pointer"
        >
          🌟 GO QUEST →
        </motion.button>
        <span className="font-hand text-[11px] text-gray-400">synced with your schedule</span>
      </div>
    </div>
  );
}
