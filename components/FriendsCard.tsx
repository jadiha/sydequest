"use client";
import { motion } from "framer-motion";
import type { Quest, Friend } from "@/lib/types";

interface Props {
  friends: Friend[];
  quests: Quest[];
  onToggleInterest: (questId: string, friendId: string) => void;
}

export default function FriendsCard({ friends, quests, onToggleInterest }: Props) {
  // For each friend, find which quests they're interested in
  return (
    <div className="paper paper-tape w-full max-w-md rounded-2xl px-5 py-4 shadow-[3px_3px_0_#b4d4ff,6px_6px_0_#90bce8] border-2 border-[#b4d4ff] relative overflow-hidden">
      <p className="font-marker text-cobalt text-lg mb-3">👯 who&apos;s down</p>

      <div className="flex flex-col gap-3">
        {friends.map(friend => {
          const theirQuests = quests.filter(q => q.interestedFriendIds.includes(friend.id));
          return (
            <div key={friend.id} className="flex items-start gap-3">
              {/* avatar */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xl flex-shrink-0 border-2 border-white shadow-sm"
                style={{ background: friend.color }}
              >
                {friend.avatar}
              </div>

              {/* name + quest tags */}
              <div className="flex-1 min-w-0">
                <p className="font-kalam font-bold text-[16px] text-gray-700 mb-1">{friend.name}</p>
                <div className="flex flex-wrap gap-1.5">
                  {theirQuests.length === 0 && (
                    <span className="font-hand text-[12px] text-gray-300 italic">nothing yet</span>
                  )}
                  {theirQuests.map(q => (
                    <motion.button
                      key={q.id}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onToggleInterest(q.id, friend.id)}
                      className="font-hand text-[11px] px-2 py-0.5 rounded-full border-[1.5px] border-rose/50 text-rose bg-rose/5 hover:bg-rose/10 transition-colors"
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

      <p className="font-hand text-[12px] text-gray-300 text-center mt-4 pt-3 border-t-2 border-dashed border-blue-100">
        tap a quest tag to toggle interest ✦ they&apos;ll see it instantly
      </p>
    </div>
  );
}
