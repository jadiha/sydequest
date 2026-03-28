"use client";
import { useState, useCallback } from "react";
import NavBar        from "@/components/NavBar";
import QuestPaper    from "@/components/QuestPaper";
import AddQuestModal from "@/components/AddQuestModal";
import Toast         from "@/components/Toast";
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

// Scattered stickers on the gingham background
const PAGE_STICKERS = [
  { e: "⭐", top: "6%",  left: "3%",  delay: 0,   size: "30px", rot: "-12deg" },
  { e: "🎀", top: "18%", right: "5%", delay: 0.6, size: "26px", rot: "8deg"   },
  { e: "💖", top: "40%", left: "2%",  delay: 1.1, size: "22px", rot: "15deg"  },
  { e: "✨", top: "58%", right: "4%", delay: 0.3, size: "20px", rot: "-6deg"  },
  { e: "🌸", top: "76%", left: "4%",  delay: 1.4, size: "28px", rot: "10deg"  },
  { e: "⭐", top: "88%", right: "6%", delay: 0.8, size: "20px", rot: "-14deg" },
];

function makeId() { return Math.random().toString(36).slice(2, 9); }

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
      ...data,
      id: makeId(),
      completed: false,
      interestedFriendIds: [],
      createdAt: new Date().toISOString(),
    }]);
    showToast("✦ quest added!!");
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center gap-6 px-4 py-6 pb-28 z-10">
      {/* gingham background stickers */}
      {PAGE_STICKERS.map(({ e, delay, size, rot, ...pos }, i) => (
        <span
          key={i}
          className="fixed pointer-events-none float select-none z-0"
          style={{ ...pos, fontSize: size, animationDelay: `${delay}s`, transform: `rotate(${rot})`, opacity: 0.55 } as React.CSSProperties}
        >
          {e}
        </span>
      ))}

      <NavBar />

      <QuestPaper
        quests={quests}
        friends={friends}
        userName="jadiha"
        termLabel="3A Summer 2026"
        onToggleComplete={toggleComplete}
        onDelete={deleteQuest}
      />

      {/* floating add button */}
      <motion.button
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.03 }}
        onClick={() => setModal(true)}
        style={{ fontFamily: "'Special Elite', cursive" }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 text-[#8b1a1a] text-[17px] border-[2.5px] border-dashed border-[#c46a6a] rounded-2xl px-8 py-3 bg-[#fffcf5]/90 backdrop-blur-sm shadow-lg hover:bg-[#fffcf5] transition-colors"
      >
        ✦ add a new quest ✦
      </motion.button>

      <AddQuestModal open={modal} onClose={() => setModal(false)} onAdd={addQuest} />
      <Toast message={toast} />
    </main>
  );
}
