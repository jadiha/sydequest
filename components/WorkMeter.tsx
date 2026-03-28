"use client";
import { motion } from "framer-motion";
import type { WorkDay } from "@/lib/types";

interface Props { workDay: WorkDay; }

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
  work:  "bg-purple-300 text-white",
  quest: "bg-pink-400 text-white",
  free:  "bg-emerald-300 text-white",
  dim:   "bg-gray-200 text-gray-400",
};

export default function WorkMeter({ workDay }: Props) {
  const pct = Math.min((workDay.hoursWorked / workDay.dailyGoal) * 100, 100);
  const remaining = workDay.dailyGoal - workDay.hoursWorked;

  return (
    <div
      className="paper w-full max-w-md rounded-lg px-5 py-4 relative overflow-hidden"
      style={{
        transform: "rotate(0.6deg)",
        background: "#fff9c4",  // sticky note yellow
        boxShadow: "2px 3px 0 #e8d870, 4px 6px 0 #d4c460",
        border: "1px solid #e8d870",
      }}
    >
      <p style={{ fontFamily: "'Caveat', cursive" }} className="text-[11px] text-yellow-700/60 uppercase tracking-widest mb-1">
        ⚡ brain fuel tracker
      </p>
      <p style={{ fontFamily: "'Kalam', cursive", fontWeight: 700 }} className="text-[18px] text-yellow-900 mb-3">
        {workDay.questWindowReady
          ? "goal hit — time to QUEST!! 🎉"
          : `${workDay.hoursWorked}h in · ${remaining.toFixed(1)}h to go`}
      </p>

      {/* bar */}
      <div className="bg-yellow-100 rounded-full h-3.5 border border-yellow-300 overflow-hidden mb-1.5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #f9a8d4, #c084fc, #93c5fd)" }}
        />
      </div>
      <div className="flex justify-between mb-3" style={{ fontFamily: "'Patrick Hand', cursive" }}>
        <span className="text-[11px] text-yellow-700/60">0h</span>
        <span className="text-[12px] font-bold text-yellow-800">{Math.round(pct)}% done</span>
        <span className="text-[11px] text-yellow-700/60">{workDay.dailyGoal}h</span>
      </div>

      {/* day slots */}
      <div className="flex gap-1.5 items-center flex-wrap mb-3">
        <span style={{ fontFamily: "'Patrick Hand', cursive" }} className="text-[11px] text-yellow-700/60">today:</span>
        {DAY_SLOTS.map((s, i) => (
          <div key={i} className={`w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-bold ${DOT_COLORS[s.type]}`}>
            {s.label}
          </div>
        ))}
        <span style={{ fontFamily: "'Patrick Hand', cursive" }} className="text-[11px] text-pink-500 ml-1">
          → <strong>quest @ {workDay.questWindowLabel}</strong>
        </span>
      </div>

      <motion.button
        whileTap={{ scale: 0.93 }}
        className="wiggle bg-pink-400 text-white rounded-full px-4 py-2 text-[14px] font-bold border-2 border-pink-300 cursor-pointer"
        style={{ fontFamily: "'Kalam', cursive" }}
      >
        🌟 GO QUEST →
      </motion.button>
    </div>
  );
}
