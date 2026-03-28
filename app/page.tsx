"use client";
import { useState, useCallback } from "react";
import NavBar        from "@/components/NavBar";
import WorkMeter     from "@/components/WorkMeter";
import QuestPaper    from "@/components/QuestPaper";
import FriendsCard   from "@/components/FriendsCard";
import AddQuestModal from "@/components/AddQuestModal";
import Toast         from "@/components/Toast";
import { motion }    from "framer-motion";
import type { Quest } from "@/lib/types";
import { SEED_QUESTS, SEED_FRIENDS, SEED_WORKDAY } from "@/lib/store";

const COMPLETE_TOASTS: Record<string, string> = {
  q1: "🎉 PJ GANG ACTIVATED!!",
  q2: "🌿 market girlies!!",
  q3: "🚲 Tour de Waterloo!!",
  q4: "👵 GRANNY GANG RISE UP",
  q5: "🌅 golden hour unlocked",
  q6: "🎨 we are artists now",
};

// Background floating stickers for the whole page
const PAGE_STICKERS = [
  { e: "⭐", top: "8%",  left: "4%",  delay: 0,   size: "28px", rot: "-15deg" },
  { e: "💖", top: "15%", right: "6%", delay: 0.5, size: "22px", rot: "10deg"  },
  { e: "✨", top: "35%", left: "2%",  delay: 1,   size: "20px", rot: "5deg"   },
  { e: "🌸", top: "55%", right: "3%", delay: 1.5, size: "26px", rot: "-8deg"  },
  { e: "⭐", top: "72%", left: "5%",  delay: 0.8, size: "18px", rot: "12deg"  },
  { e: "💫", top: "88%", right: "7%", delay: 1.2, size: "22px", rot: "-5deg"  },
];

function makeId() { return Math.random().toString(36).slice(2, 9); }

export default function Home() {
  const [quests,  setQuests]  = useState<Quest[]>(SEED_QUESTS);
  const [friends] = useState(SEED_FRIENDS);
  const [workDay] = useState(SEED_WORKDAY);
  const [toast,   setToast]   = useState<string | null>(null);
  const [modal,   setModal]   = useState(false);

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

  const deleteQuest  = useCallback((id: string) => {
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

  const toggleInterest = useCallback((questId: string, friendId: string) => {
    setQuests(prev => prev.map(q => {
      if (q.id !== questId) return q;
      const already = q.interestedFriendIds.includes(friendId);
      return {
        ...q,
        interestedFriendIds: already
          ? q.interestedFriendIds.filter(f => f !== friendId)
          : [...q.interestedFriendIds, friendId],
      };
    }));
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center gap-5 px-4 py-6 pb-28 z-10">
      {/* page-level floating stickers */}
      {PAGE_STICKERS.map(({ e, delay, size, rot, ...pos }, i) => (
        <span
          key={i}
          className="fixed pointer-events-none float select-none z-0"
          style={{ ...pos, fontSize: size, animationDelay: `${delay}s`, transform: `rotate(${rot})`, opacity: 0.5 } as React.CSSProperties}
        >
          {e}
        </span>
      ))}

      <NavBar />
      <WorkMeter workDay={workDay} />
      <QuestPaper
        quests={quests}
        friends={friends}
        userName="jadiha"
        termLabel="3A Summer 2026"
        onToggleComplete={toggleComplete}
        onDelete={deleteQuest}
      />
      <FriendsCard
        friends={friends}
        quests={quests}
        onToggleInterest={toggleInterest}
      />

      {/* floating add button */}
      <motion.button
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.04 }}
        onClick={() => setModal(true)}
        style={{ fontFamily: "'Kalam', cursive" }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 font-bold text-pink-500 text-[18px] border-[3px] border-dashed border-pink-400 rounded-2xl px-8 py-3 bg-white/85 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
      >
        ✦ add a new quest ✦
      </motion.button>

      <AddQuestModal open={modal} onClose={() => setModal(false)} onAdd={addQuest} />
      <Toast message={toast} />
    </main>
  );
}
