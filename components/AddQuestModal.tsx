"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Quest, QuestCategory } from "@/lib/types";

const EMOJIS = ["🎬","🌻","🚲","👵","🌅","🏺","🎨","🎭","🧁","🏕️","🌊","🎪","🎯","🛼","🌙","🪩","🧃","🎸","🌿","🎠"];
const CATEGORIES: QuestCategory[] = ["adventure","food","social","learning","wild"];
const DIFFICULTIES = ["easy","medium","hard","legendary"] as const;

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (q: Omit<Quest, "id" | "createdAt" | "completed" | "interestedFriendIds">) => void;
}

export default function AddQuestModal({ open, onClose, onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("🌟");
  const [category, setCategory] = useState<QuestCategory>("adventure");
  const [difficulty, setDifficulty] = useState<Quest["difficulty"]>("easy");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), emoji, category, difficulty, addedBy: "jadiha" });
    setTitle(""); setEmoji("🌟");
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* sheet */}
          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed bottom-0 left-0 right-0 z-50 flex justify-center"
          >
            <div className="paper paper-tape w-full max-w-md rounded-t-3xl px-6 pt-10 pb-10 shadow-2xl">
              <p className="font-marker text-violet text-2xl mb-1">new quest ✦</p>
              <p className="font-hand text-gray-400 text-sm mb-5">what's the plan?</p>

              <form onSubmit={submit} className="flex flex-col gap-4">
                {/* emoji picker */}
                <div>
                  <p className="font-caveat font-bold text-gray-500 text-sm mb-1">pick a vibe</p>
                  <div className="flex flex-wrap gap-2">
                    {EMOJIS.map(e => (
                      <button
                        key={e} type="button"
                        onClick={() => setEmoji(e)}
                        className={`text-xl w-9 h-9 rounded-xl transition-all duration-100 ${emoji === e ? "bg-rose/20 scale-110 ring-2 ring-rose" : "hover:bg-gray-100"}`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>

                {/* title */}
                <div>
                  <p className="font-caveat font-bold text-gray-500 text-sm mb-1">quest name</p>
                  <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="dress up as grannies and..."
                    className="w-full font-kalam text-[18px] text-violet bg-white/60 border-b-2 border-violet/40 outline-none px-1 py-1 placeholder:text-gray-300"
                    autoFocus
                  />
                </div>

                {/* category */}
                <div>
                  <p className="font-caveat font-bold text-gray-500 text-sm mb-1">category</p>
                  <div className="flex gap-2 flex-wrap">
                    {CATEGORIES.map(c => (
                      <button
                        key={c} type="button"
                        onClick={() => setCategory(c)}
                        className={`font-hand text-[13px] px-3 py-1 rounded-full border-2 transition-all
                          ${category === c ? "bg-violet text-white border-violet" : "border-violet/30 text-violet hover:border-violet/60"}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* difficulty */}
                <div>
                  <p className="font-caveat font-bold text-gray-500 text-sm mb-1">difficulty</p>
                  <div className="flex gap-2">
                    {DIFFICULTIES.map(d => (
                      <button
                        key={d} type="button"
                        onClick={() => setDifficulty(d)}
                        className={`font-hand text-[13px] px-3 py-1 rounded-full border-2 transition-all
                          ${difficulty === d ? "bg-rose text-white border-rose" : "border-rose/30 text-rose hover:border-rose/60"}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* submit */}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  disabled={!title.trim()}
                  className="w-full font-kalam font-bold text-[20px] text-white bg-rose rounded-2xl py-3 mt-1 disabled:opacity-40 transition-opacity"
                >
                  add to quest list ✦
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
