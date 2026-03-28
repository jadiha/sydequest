"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Quest, QuestCategory } from "@/lib/types";
import ScrapbookTitle from "./ScrapbookTitle";

const EMOJIS = ["🎬","🌻","🚲","👵","🌅","🏺","🎨","🎭","🧁","🏕️","🌊","🎪","🎯","🛼","🌙","🪩","🎸","🌿","🎠","✨"];
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
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/25 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 flex justify-center"
          >
            <div
              className="paper washi-tape w-full max-w-md rounded-t-3xl px-6 pt-12 pb-10"
              style={{ boxShadow: "0 -8px 40px rgba(0,0,0,0.14)" }}
            >
              <div className="mb-4">
                <ScrapbookTitle text="new quest" className="justify-start mb-1" />
                <p style={{ fontFamily: "'Caveat', cursive" }} className="text-gray-400 text-[17px]">
                  what&apos;s the plan?
                </p>
              </div>

              <form onSubmit={submit} className="flex flex-col gap-4">
                {/* emoji */}
                <div>
                  <p style={{ fontFamily: "'Caveat', cursive" }} className="text-gray-500 text-[14px] font-bold mb-1">pick a vibe</p>
                  <div className="flex flex-wrap gap-1.5">
                    {EMOJIS.map(e => (
                      <button
                        key={e} type="button" onClick={() => setEmoji(e)}
                        className={`text-xl w-9 h-9 rounded-xl transition-all ${emoji === e ? "bg-pink-100 scale-115 ring-2 ring-pink-400" : "hover:bg-gray-100"}`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>

                {/* title — looks like diary writing */}
                <div className="border-b-2 border-pink-200 pb-1">
                  <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="wear PJs to the movies..."
                    style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                    className="w-full text-[22px] text-[#5a1d6e] bg-transparent outline-none placeholder:text-gray-200"
                    autoFocus
                  />
                </div>

                {/* category */}
                <div>
                  <p style={{ fontFamily: "'Caveat', cursive" }} className="text-gray-500 text-[13px] font-bold mb-1">category</p>
                  <div className="flex gap-2 flex-wrap">
                    {CATEGORIES.map(c => (
                      <button
                        key={c} type="button" onClick={() => setCategory(c)}
                        style={{ fontFamily: "'Patrick Hand', cursive" }}
                        className={`text-[13px] px-3 py-1 rounded-full border-2 transition-all
                          ${category === c ? "bg-purple-600 text-white border-purple-600" : "border-purple-300 text-purple-600 hover:border-purple-500"}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* difficulty */}
                <div>
                  <p style={{ fontFamily: "'Caveat', cursive" }} className="text-gray-500 text-[13px] font-bold mb-1">difficulty</p>
                  <div className="flex gap-2">
                    {DIFFICULTIES.map(d => (
                      <button
                        key={d} type="button" onClick={() => setDifficulty(d)}
                        style={{ fontFamily: "'Patrick Hand', cursive" }}
                        className={`text-[13px] px-3 py-1 rounded-full border-2 transition-all
                          ${difficulty === d ? "bg-pink-500 text-white border-pink-500" : "border-pink-300 text-pink-600 hover:border-pink-500"}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  disabled={!title.trim()}
                  style={{ fontFamily: "'Kalam', cursive" }}
                  className="w-full font-bold text-[20px] text-white bg-pink-500 rounded-2xl py-3 mt-1 disabled:opacity-40 transition-opacity shadow-md"
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
