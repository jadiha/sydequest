"use client";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  message: string | null;
}

export default function Toast({ message }: Props) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key={message}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0,  opacity: 1 }}
          exit={{   y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#3d2b6b] text-white font-kalam font-bold text-[18px] px-6 py-3 rounded-full shadow-xl whitespace-nowrap pointer-events-none"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
