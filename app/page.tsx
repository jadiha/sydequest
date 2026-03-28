"use client";
import { useState, useCallback } from "react";
import NavBar         from "@/components/NavBar";
import QuestPaper     from "@/components/QuestPaper";
import ScrapbookTitle from "@/components/ScrapbookTitle";
import Toast          from "@/components/Toast";
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

const SE  = { fontFamily: "'Special Elite', cursive" };
const OSW = { fontFamily: "'Oswald', sans-serif" };

export default function Home() {
  const [quests, setQuests] = useState<Quest[]>(SEED_QUESTS);
  const [friends]           = useState(SEED_FRIENDS);
  const [toast,  setToast]  = useState<string | null>(null);

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

  return (
    <main className="min-h-screen px-4 pt-5 pb-16 flex flex-col items-center gap-5">

      <NavBar />

      {/* ── Hero title — big magazine cut-out letters ── */}
      <div className="text-center w-full max-w-md mt-1">
        <ScrapbookTitle text="SydeQuest" size="lg" />
      </div>

      {/* ── Scrapbook board ── */}
      <div
        className="relative w-full"
        style={{ maxWidth: "440px", padding: "10px 16px 24px" }}
      >
        {/* Backing paper — rose, right tilt */}
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
          <div className="absolute bottom-5 right-5 text-right opacity-55">
            <p style={SE} className="text-[9px] text-rose-900 uppercase tracking-wider">SYDE · 3A</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 700 }} className="text-[13px] text-rose-900">Summer 2026</p>
          </div>
          <div className="absolute top-3 right-3 w-8 h-3 rounded-sm rotate-[20deg]"
            style={{ background: "rgba(255,220,80,0.5)" }} />
        </div>

        {/* Backing paper — sage green, left tilt */}
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
          <div className="absolute top-5 left-5 opacity-55">
            <p style={OSW} className="text-[16px] font-bold text-green-900 leading-none">SYDE</p>
            <p style={SE} className="text-[9px] text-green-800 mt-0.5">Waterloo, ON</p>
          </div>
          <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[13px] opacity-35 rotate-[-10deg]">📎</span>
        </div>

        {/* Backing paper — sky blue */}
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

        {/* Main quest paper */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <QuestPaper
            quests={quests}
            friends={friends}
            termLabel="3A Summer 2026"
            onToggleComplete={toggleComplete}
            onDelete={deleteQuest}
          />
        </div>

        {/* Corner stickers */}
        {[
          { e: "⭐", top: -14, right: -10, delay: 0,   rot: "-15deg", size: "26px" },
          { e: "🎀", bottom: -14, left: -8, delay: 0.6, rot: "8deg",  size: "24px" },
          { e: "💖", top: "40%", right: -16, delay: 1,   rot: "12deg", size: "20px" },
          { e: "✨", bottom: "25%", left: -14, delay: 0.3, rot: "-8deg", size: "18px" },
          { e: "🌸", top: -10, left: "30%", delay: 1.4, rot: "5deg",  size: "18px" },
        ].map(({ e, delay, rot, size, ...pos }, i) => (
          <span
            key={i}
            className="absolute pointer-events-none float select-none"
            style={{ ...pos, fontSize: size, zIndex: 20, animationDelay: `${delay}s`, transform: `rotate(${rot})` } as React.CSSProperties}
          >
            {e}
          </span>
        ))}
      </div>

      <Toast message={toast} />
    </main>
  );
}
