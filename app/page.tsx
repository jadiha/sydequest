"use client";
import { useState, useCallback } from "react";
import NavBar        from "@/components/NavBar";
import QuestPaper    from "@/components/QuestPaper";
import AddQuestModal from "@/components/AddQuestModal";
import Toast         from "@/components/Toast";
import ScrapbookTitle from "@/components/ScrapbookTitle";
import { motion }    from "framer-motion";
import type { Quest } from "@/lib/types";
import { SEED_QUESTS, SEED_FRIENDS } from "@/lib/store";

const COMPLETE_TOASTS: Record<string, string> = {
  q1: "🎉 PJ GANG ACTIVATED!!",
  q2: "🌿 market girlies!!",
  q3: "🚲 Tour de Waterloo!!",
  q4: "👵 GRANNY GANG RISE UP",
  q5: "🌅 golden hour unlocked",
  q6: "🎨 we are artists now",
};

function makeId() { return Math.random().toString(36).slice(2, 9); }

const PF  = { fontFamily: "'Playfair Display', serif", fontStyle: "italic" as const };
const SE  = { fontFamily: "'Special Elite', cursive" };
const OSW = { fontFamily: "'Oswald', sans-serif" };
const CAV = { fontFamily: "'Caveat', cursive" };

export default function Home() {
  const [quests, setQuests] = useState<Quest[]>(SEED_QUESTS);
  const [friends]           = useState(SEED_FRIENDS);
  const [toast,  setToast]  = useState<string | null>(null);
  const [modal,  setModal]  = useState(false);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  }

  const toggleComplete = useCallback((id: string) => {
    setQuests(prev => prev.map(q => {
      if (q.id !== id) return q;
      const nowDone = !q.completed;
      if (nowDone) showToast(COMPLETE_TOASTS[id] ?? "✨ quest done!!");
      return { ...q, completed: nowDone, completedAt: nowDone ? new Date().toISOString() : undefined };
    }));
  }, []);

  const deleteQuest = useCallback((id: string) => {
    setQuests(prev => prev.filter(q => q.id !== id));
  }, []);

  const addQuest = useCallback((data: Omit<Quest, "id" | "createdAt" | "completed" | "interestedFriendIds">) => {
    setQuests(prev => [...prev, {
      ...data, id: makeId(), completed: false,
      interestedFriendIds: [], createdAt: new Date().toISOString(),
    }]);
    showToast("✦ quest added!!");
  }, []);

  const done  = quests.filter(q => q.completed).length;
  const total = quests.length;

  return (
    <main className="min-h-screen px-4 pt-5 pb-28 flex flex-col items-center gap-4">

      <NavBar />

      {/* ── Hero title ───────────────────────────────── */}
      <div className="text-center w-full max-w-md mt-2">
        <ScrapbookTitle text="SydeQuest" className="mb-2" />
        <p style={SE} className="text-white/70 text-[12px] tracking-[4px] uppercase mt-1">
          jadiha&apos;s 3A · summer 2026
        </p>
      </div>

      {/* ── Scrapbook stack ──────────────────────────── */}
      {/* Container has extra padding so backing papers can peek out */}
      <div
        className="relative w-full"
        style={{ maxWidth: "440px", padding: "10px 16px 24px" }}
      >

        {/* Backing paper A — rose, rotates right, peeks behind main */}
        <div
          className="absolute rounded-sm"
          style={{
            top: 14, left: 20, right: -10, bottom: 10,
            background: "#ffd0e0",
            transform: "rotate(2.8deg)",
            boxShadow: "2px 4px 12px rgba(0,0,0,0.10)",
            zIndex: 1,
          }}
        >
          {/* small label bottom-right */}
          <div className="absolute bottom-5 right-5 text-right opacity-60">
            <p style={SE} className="text-[9px] text-rose-900 uppercase tracking-wider">SYDE · 3A</p>
            <p style={{ ...PF, fontWeight: 700 }} className="text-[14px] text-rose-900">Summer 2026</p>
          </div>
          {/* washi strip */}
          <div className="absolute top-3 right-3 w-8 h-3 rounded-sm rotate-[20deg]"
            style={{ background: "rgba(255,220,80,0.5)" }} />
        </div>

        {/* Backing paper B — sage green, rotates left */}
        <div
          className="absolute rounded-sm"
          style={{
            top: 8, left: -10, right: 12, bottom: 16,
            background: "#cceacc",
            transform: "rotate(-2.2deg)",
            boxShadow: "2px 4px 12px rgba(0,0,0,0.10)",
            zIndex: 2,
          }}
        >
          {/* small content top-left */}
          <div className="absolute top-5 left-5 opacity-60">
            <p style={OSW} className="text-[18px] font-bold text-green-900 leading-none">SYDE</p>
            <p style={SE} className="text-[9px] text-green-800 mt-0.5">Waterloo, ON</p>
          </div>
          {/* safety pin */}
          <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[13px] opacity-40 rotate-[-10deg]">📎</span>
        </div>

        {/* Backing paper C — sky blue, small, rotates more */}
        <div
          className="absolute rounded-sm"
          style={{
            top: 20, left: 14, right: -6, bottom: 22,
            background: "#c8dff8",
            transform: "rotate(-1deg) translateX(6px)",
            boxShadow: "1px 3px 10px rgba(0,0,0,0.08)",
            zIndex: 3,
          }}
        />

        {/* ── Main quest paper ── */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <QuestPaper
            quests={quests}
            friends={friends}
            userName="jadiha"
            termLabel="3A Summer 2026"
            onToggleComplete={toggleComplete}
            onDelete={deleteQuest}
          />
        </div>

        {/* Stickers on top of the whole stack */}
        {[
          { e: "⭐", top: -14, right: -10, delay: 0,   rot: "-15deg", size: "26px", zIndex: 20 },
          { e: "🎀", bottom: -14, left: -8, delay: 0.6, rot: "8deg",  size: "24px", zIndex: 20 },
          { e: "💖", top: "40%", right: -16, delay: 1,   rot: "12deg", size: "22px", zIndex: 20 },
          { e: "✨", bottom: "25%", left: -14, delay: 0.3, rot: "-8deg", size: "20px", zIndex: 20 },
          { e: "🌸", top: -10, left: "30%", delay: 1.4, rot: "5deg",  size: "20px", zIndex: 20 },
        ].map(({ e, delay, rot, size, zIndex, ...pos }, i) => (
          <span
            key={i}
            className="absolute pointer-events-none float select-none"
            style={{ ...pos, fontSize: size, zIndex, animationDelay: `${delay}s`, transform: `rotate(${rot})` } as React.CSSProperties}
          >
            {e}
          </span>
        ))}
      </div>

      {/* ── Stats strip — looks like a receipt tear-off ──────── */}
      <div
        className="w-full"
        style={{
          maxWidth: "340px",
          background: "#fffcf0",
          border: "1px dashed #e8c8a0",
          borderRadius: "4px",
          padding: "10px 16px",
          transform: "rotate(-0.5deg)",
          boxShadow: "1px 2px 8px rgba(0,0,0,0.07)",
        }}
      >
        <p style={SE} className="text-[11px] text-gray-400 text-center uppercase tracking-widest mb-1">
          quest log
        </p>
        <div className="flex justify-between items-center">
          <span style={CAV} className="text-[15px] text-gray-600 font-bold">
            {done} / {total} done
          </span>
          <span style={SE} className="text-[11px] text-gray-400">
            {total - done > 0 ? `${total - done} to go ✦` : "ALL DONE!! 🎉"}
          </span>
          <span style={CAV} className="text-[15px] text-gray-600 font-bold">
            3A summer
          </span>
        </div>
        {/* receipt barcode line */}
        <div className="mt-2 flex gap-px justify-center">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-300 rounded-full"
              style={{ width: i % 3 === 0 ? "3px" : "1px", height: "12px" }}
            />
          ))}
        </div>
      </div>

      {/* ── Floating add button ── */}
      <motion.button
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.03, rotate: -1 }}
        onClick={() => setModal(true)}
        style={{ ...SE, color: "#8b1a1a" }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 text-[16px] border-[2px] border-dashed border-[#c46a6a] rounded-xl px-7 py-3 bg-[#fffcf5]/92 backdrop-blur-sm shadow-lg"
      >
        ✦ add a new quest ✦
      </motion.button>

      <AddQuestModal open={modal} onClose={() => setModal(false)} onAdd={addQuest} />
      <Toast message={toast} />
    </main>
  );
}
