"use client";
import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplashScreen   from "@/components/SplashScreen";
import BulletinBoard  from "@/components/BulletinBoard";
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

export default function Home() {
  const [phase,   setPhase]  = useState<"splash" | "board">("splash");
  const [quests,  setQuests] = useState<Quest[]>(SEED_QUESTS);
  const [friends]            = useState(SEED_FRIENDS);
  const [toast,   setToast]  = useState<string | null>(null);

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
    <>
      <AnimatePresence mode="wait">
        {phase === "splash" ? (
          <motion.div
            key="splash"
            exit={{
              // crumple: hold → slight bulge → rapid scrunch and throw upward
              scale:   [1, 1.04, 0.04],
              rotate:  [0, -2,   22],
              y:       [0, 0,    -320],
              opacity: [1, 1,    0],
              transition: {
                duration: 0.65,
                times: [0, 0.12, 1],
                ease: "easeIn",
              },
            }}
            style={{ transformOrigin: "center center" }}
          >
            <SplashScreen onPlay={() => setPhase("board")} />
          </motion.div>
        ) : (
          <motion.div
            key="board"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
          >
            <BulletinBoard
              quests={quests}
              friends={friends}
              onToggleComplete={toggleComplete}
              onDelete={deleteQuest}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Toast message={toast} />
    </>
  );
}
