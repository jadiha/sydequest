"use client";
import { motion } from "framer-motion";
import type { Quest, Friend } from "@/lib/types";

interface Props {
  friends: Friend[];
  quests: Quest[];
  onToggleInterest: (questId: string, friendId: string) => void;
}

export default function FriendsCard({ friends, quests, onToggleInterest }: Props) {
  return (
    <div
      className="paper w-full max-w-md rounded-lg px-5 py-4 relative overflow-hidden"
      style={{
        transform: "rotate(-0.4deg)",
        background: "#e8f4ff",  // sticky note blue
        boxShadow: "2px 3px 0 #b8d8f0, 4px 6px 0 #98c0e0",
        border: "1px solid #b8d8f0",
      }}
    >
      <p
        style={{ fontFamily: "'Kalam', cursive", fontWeight: 700 }}
        className="text-[18px] text-blue-800 mb-3"
      >
        👯 who&apos;s down
      </p>

      <div className="flex flex-col gap-3">
        {friends.map(friend => {
          const theirQuests = quests.filter(q => q.interestedFriendIds.includes(friend.id));
          return (
            <div key={friend.id} className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xl flex-shrink-0 border-2 border-white shadow-sm"
                style={{ background: friend.color }}
              >
                {friend.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: "'Kalam', cursive", fontWeight: 700 }} className="text-[15px] text-gray-700 mb-1">
                  {friend.name}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {theirQuests.length === 0 && (
                    <span style={{ fontFamily: "'Caveat', cursive" }} className="text-[13px] text-gray-300 italic">nothing yet</span>
                  )}
                  {theirQuests.map(q => (
                    <motion.button
                      key={q.id}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onToggleInterest(q.id, friend.id)}
                      style={{ fontFamily: "'Patrick Hand', cursive" }}
                      className="text-[11px] px-2 py-0.5 rounded-full border border-pink-300 text-pink-600 bg-pink-50 hover:bg-pink-100 transition-colors"
                    >
                      {q.emoji} {q.title.length > 18 ? q.title.slice(0, 18) + "…" : q.title}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ fontFamily: "'Patrick Hand', cursive" }} className="text-[11px] text-gray-400/70 text-center mt-4 pt-3 border-t border-dashed border-blue-200">
        tap a quest tag to toggle interest ✦ they&apos;ll see it instantly
      </p>
    </div>
  );
}
