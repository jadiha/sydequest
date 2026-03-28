"use client";
import NavBar from "@/components/NavBar";
import { motion } from "framer-motion";

const SUGGESTIONS = [
  { emoji: "🥯", title: "find the best bagel in KW",       category: "food",      diff: "easy"   },
  { emoji: "🛶", title: "rent a canoe on the Grand River",  category: "adventure", diff: "medium" },
  { emoji: "🎭", title: "crash a free campus event",        category: "social",    diff: "easy"   },
  { emoji: "🌙", title: "midnight snack run to Tim Hortons",category: "food",      diff: "easy"   },
  { emoji: "🏃", title: "run the Iron Horse Trail end to end", category: "adventure", diff: "hard" },
  { emoji: "📚", title: "study in every campus library",    category: "learning",  diff: "medium" },
  { emoji: "🎪", title: "go to every Kitchener farmers market this term", category: "adventure", diff: "medium" },
  { emoji: "🎨", title: "take a class at Cambridge Clay",   category: "learning",  diff: "easy"   },
  { emoji: "🌊", title: "swim in Laurel Creek after dark",  category: "wild",      diff: "legendary" },
  { emoji: "🧁", title: "bake something and bring it to SYDE floor", category: "social", diff: "easy" },
];

const CAT_COLORS: Record<string, string> = {
  adventure: "text-cobalt border-cobalt/40 bg-cobalt/5",
  food:      "text-amber border-amber/40 bg-amber/5",
  social:    "text-rose border-rose/40 bg-rose/5",
  learning:  "text-teal border-teal/40 bg-teal/5",
  wild:      "text-violet border-violet/40 bg-violet/5",
};

export default function ExplorePage() {
  return (
    <main className="min-h-screen flex flex-col items-center gap-5 px-4 py-6 pb-16">
      <NavBar />

      <div className="w-full max-w-md">
        <div className="paper paper-tape rounded-2xl px-6 py-5 shadow-lg relative mb-4">
          <p className="font-marker text-teal text-2xl">explore ✦</p>
          <p className="font-caveat text-gray-400 text-[17px]">KW quest ideas for your 3A summer</p>
        </div>

        <div className="flex flex-col gap-3">
          {SUGGESTIONS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="paper rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm border border-white/60 cursor-pointer group hover:shadow-md transition-shadow"
            >
              <span className="text-2xl float" style={{ animationDelay: `${i * 0.2}s` }}>{s.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-kalam font-bold text-[17px] text-gray-700 leading-snug">{s.title}</p>
                <div className="flex gap-1.5 mt-1">
                  <span className={`font-hand text-[11px] px-2 py-0.5 rounded-full border ${CAT_COLORS[s.category]}`}>
                    {s.category}
                  </span>
                  <span className="font-hand text-[11px] px-2 py-0.5 rounded-full border border-gray-200 text-gray-400">
                    {s.diff}
                  </span>
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 font-kalam text-[13px] text-rose border border-rose/40 rounded-lg px-2 py-1 transition-opacity flex-shrink-0">
                + add
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
