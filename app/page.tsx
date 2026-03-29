"use client";
import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplashScreen  from "@/components/SplashScreen";
import BulletinBoard from "@/components/BulletinBoard";
import type { Quest } from "@/lib/types";
import { SEED_QUESTS, SEED_FRIENDS } from "@/lib/store";

export default function Home() {
  const [phase,  setPhase]  = useState<"splash" | "board">("splash");
  const [quests, setQuests] = useState<Quest[]>(SEED_QUESTS);
  const [friends]           = useState(SEED_FRIENDS);

  const toggleComplete = useCallback((id: string) => {
    setQuests(prev => prev.map(q => {
      if (q.id !== id) return q;
      const nowDone = !q.completed;
      return { ...q, completed: nowDone, completedAt: nowDone ? new Date().toISOString() : undefined };
    }));
  }, []);

  const deleteQuest = useCallback((id: string) => {
    setQuests(prev => prev.filter(q => q.id !== id));
  }, []);

  return (
    <AnimatePresence mode="wait">
      {phase === "splash" ? (
        <motion.div
          key="splash"
          exit={{
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
          style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
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
  );
}
