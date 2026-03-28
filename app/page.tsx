"use client";
import { useState, useCallback } from "react";
import QuestPaper     from "@/components/QuestPaper";
import Toast          from "@/components/Toast";
import type { Quest } from "@/lib/types";
import { SEED_QUESTS, SEED_FRIENDS } from "@/lib/store";

const COMPLETE_TOASTS: Record<string, string> = {
  q1: "PJ GANG ACTIVATED!!",
  q2: "market girlies!!",
  q3: "Tour de Waterloo!!",
  q4: "GRANNY GANG RISE UP",
  q5: "golden hour unlocked",
  q6: "we are artists now",
};

const SE  = { fontFamily: "'Special Elite', cursive" };
const OSW = { fontFamily: "'Oswald', sans-serif" };
const PF  = { fontFamily: "'Playfair Display', serif", fontStyle: "italic" as const, fontWeight: 700 };

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
      if (nowDone) showToast(COMPLETE_TOASTS[id] ?? "quest done!!");
      return { ...q, completed: nowDone, completedAt: nowDone ? new Date().toISOString() : undefined };
    }));
  }, []);

  const deleteQuest = useCallback((id: string) => {
    setQuests(prev => prev.filter(q => q.id !== id));
  }, []);

  return (
    <main className="min-h-screen px-4 pt-5 pb-16 flex flex-col items-center gap-5">

      {/* Scrapbook board */}
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
            <p style={PF} className="text-[13px] text-rose-900">Summer 2026</p>
          </div>
          {/* washi tape strip */}
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

        {/* CSS star decorations — no emoji */}
        {[
          { top: -12, right: -8,  rot: "-15deg", zIndex: 20 },
          { bottom: -12, left: -6, rot: "8deg",  zIndex: 20 },
          { top: "38%", right: -14, rot: "12deg", zIndex: 20 },
        ].map((pos, i) => (
          <span
            key={i}
            className="absolute pointer-events-none float select-none text-white/80"
            style={{
              ...pos,
              fontSize: "20px",
              animationDelay: `${i * 0.5}s`,
              transform: `rotate(${pos.rot})`,
              fontFamily: "'Special Elite', cursive",
            } as React.CSSProperties}
          >
            ✦
          </span>
        ))}
      </div>

      <Toast message={toast} />
    </main>
  );
}
