"use client";
import { useState, useCallback } from "react";
import NavBar       from "@/components/NavBar";
import WorkMeter    from "@/components/WorkMeter";
import QuestPaper   from "@/components/QuestPaper";
import FriendsCard  from "@/components/FriendsCard";
import AddQuestModal from "@/components/AddQuestModal";
import Toast        from "@/components/Toast";
import { motion }   from "framer-motion";
import type { Quest } from "@/lib/types";
import {
  SEED_QUESTS,
  SEED_FRIENDS,
  SEED_WORKDAY,
} from "@/lib/store";

const COMPLETE_TOASTS: Record<string, string> = {
  q1: "🎉 PJ GANG ACTIVATED!!",
  q2: "🌿 market girlies!!",
  q3: "🚲 Tour de Waterloo!!",
  q4: "👵 GRANNY GANG RISE UP",
  q5: "🌅 golden hour unlocked",
  q6: "🎨 we are artists now",
};

function makeId() {
  return Math.random().toString(36).slice(2, 9);
}

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
    setQuests(prev =>
      prev.map(q => {
        if (q.id !== id) return q;
        const nowDone = !q.completed;
        if (nowDone) showToast(COMPLETE_TOASTS[id] ?? "✨ quest done!!");
        return { ...q, completed: nowDone, completedAt: nowDone ? new Date().toISOString() : undefined };
      })
    );
  }, []);

  const deleteQuest = useCallback((id: string) => {
    setQuests(prev => prev.filter(q => q.id !== id));
  }, []);

  const addQuest = useCallback((data: Omit<Quest, "id" | "createdAt" | "completed" | "interestedFriendIds">) => {
    const newQ: Quest = {
      ...data,
      id: makeId(),
      completed: false,
      interestedFriendIds: [],
      createdAt: new Date().toISOString(),
    };
    setQuests(prev => [...prev, newQ]);
    showToast("✦ quest added!!");
  }, []);

  const toggleInterest = useCallback((questId: string, friendId: string) => {
    setQuests(prev =>
      prev.map(q => {
        if (q.id !== questId) return q;
        const already = q.interestedFriendIds.includes(friendId);
        return {
          ...q,
          interestedFriendIds: already
            ? q.interestedFriendIds.filter(f => f !== friendId)
            : [...q.interestedFriendIds, friendId],
        };
      })
    );
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center gap-5 px-4 py-6 pb-28">
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
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 font-kalam font-bold text-rose text-[18px] border-[3px] border-dashed border-rose rounded-2xl px-8 py-3 bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
      >
        ✦ add a new quest ✦
      </motion.button>

      <AddQuestModal open={modal} onClose={() => setModal(false)} onAdd={addQuest} />
      <Toast message={toast} />
    </main>
  );
}
