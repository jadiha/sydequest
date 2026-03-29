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
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
      {/* Cork board always lives at the base — becomes visible as splash crumples away */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "url('/figma/bg-cork.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }} />

      <AnimatePresence mode="wait">
        {phase === "splash" ? (
          <motion.div
            key="splash"
            style={{ position: "absolute", inset: 0, zIndex: 10 }}
            exit={{
              /* crumple: paper squishes, tumbles, shrinks to a ball, disappears */
              scale:        [1,    1.03, 0.86, 0.42,  0.05],
              rotate:       [0,    -1.5,    7,   22,    40],
              y:            [0,    -6,    14,   -8,   -60],
              borderRadius: ["0%", "0%", "6%", "28%", "50%"],
              filter: [
                "brightness(1)",
                "brightness(1.02)",
                "brightness(0.86)",
                "brightness(0.52)",
                "brightness(0.05)",
              ],
              transition: {
                duration: 1.0,
                times: [0, 0.1, 0.36, 0.65, 1],
                ease: "easeIn",
              },
            }}
          >
            <SplashScreen onPlay={() => setPhase("board")} />
          </motion.div>
        ) : (
          <motion.div
            key="board"
            style={{ position: "absolute", inset: 0, zIndex: 5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
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
    </div>
  );
}
