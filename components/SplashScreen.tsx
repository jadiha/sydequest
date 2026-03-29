"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface Props { onPlay: () => void; }

const SYDE = [
  { src: "/figma/letter-S1.png", hvh: 18.3, initRot: -18, initX: -12 },
  { src: "/figma/letter-Y.png",  hvh: 14.7, initRot:  12, initX:   8 },
  { src: "/figma/letter-D.png",  hvh: 20.4, initRot: -10, initX: -10 },
  { src: "/figma/letter-E1.png", hvh: 20.2, initRot:  15, initX:  14 },
];

const QUEST = [
  { src: "/figma/letter-Q.png",  hvh: 18.8, initRot: -14, initX: -10 },
  { src: "/figma/letter-U.png",  hvh: 13.0, initRot:   9, initX:   6 },
  { src: "/figma/letter-E2.png", hvh: 17.4, initRot: -12, initX:  -8 },
  { src: "/figma/letter-S2.png", hvh: 20.6, initRot:  16, initX:  12 },
  { src: "/figma/letter-T.png",  hvh: 23.3, initRot:  -8, initX: -14 },
];

const spring = { type: "spring" as const, stiffness: 380, damping: 18 };

export default function SplashScreen({ onPlay }: Props) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('/figma/bg-crumpled.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Stars sticker — interactive */}
      <motion.div
        className="absolute"
        style={{ left: "2.8%", top: "7.3%", width: "17.1%", cursor: "pointer" }}
        whileHover={{ rotate: 18, scale: 1.1, y: -6 }}
        transition={spring}
      >
        <Image src="/figma/sticker-b.png" alt="" width={260} height={260}
          style={{ width: "100%", height: "auto", display: "block" }} priority />
      </motion.div>

      {/* Fairy mouse sticker — interactive */}
      <motion.div
        className="absolute"
        style={{ left: "74.5%", top: "3.4%", width: "25.9%", cursor: "pointer" }}
        whileHover={{ rotate: -6, scale: 1.08, y: -8 }}
        transition={spring}
      >
        <Image src="/figma/sticker-d.png" alt="" width={392} height={392}
          style={{ width: "100%", height: "auto", display: "block" }} priority />
      </motion.div>

      {/* Row 1: SYDE — letters pop in one by one */}
      <div className="absolute left-0 right-0 flex justify-center" style={{ top: "25%" }}>
        <div className="flex items-end" style={{ gap: "0.5vw" }}>
          {SYDE.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.25, rotate: l.initRot, y: -50, x: l.initX }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0, x: 0 }}
              transition={{ ...spring, delay: 0.08 + i * 0.1 }}
              whileHover={{ scale: 1.15, rotate: i % 2 === 0 ? 8 : -8, y: -8 }}
              style={{ cursor: "pointer" }}
            >
              <Image src={l.src} alt="" width={200} height={200} priority
                style={{ height: `${l.hvh}vh`, width: "auto", objectFit: "contain", display: "block" }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Row 2: QUEST — letters pop in after SYDE */}
      <div className="absolute left-0 right-0 flex justify-center" style={{ top: "53%" }}>
        <div className="flex items-end" style={{ gap: "0.5vw" }}>
          {QUEST.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.25, rotate: l.initRot, y: -50, x: l.initX }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0, x: 0 }}
              transition={{ ...spring, delay: 0.52 + i * 0.1 }}
              whileHover={{ scale: 1.15, rotate: i % 2 === 0 ? -8 : 8, y: -8 }}
              style={{ cursor: "pointer" }}
            >
              <Image src={l.src} alt="" width={200} height={200} priority
                style={{ height: `${l.hvh}vh`, width: "auto", objectFit: "contain", display: "block" }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* PLAY button */}
      <div className="absolute left-0 right-0 flex justify-center" style={{ top: "82.6%" }}>
        <motion.button
          onClick={onPlay}
          aria-label="Play"
          style={{ width: "max(19.4vw, 160px)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 1.1 }}
          whileHover={{ scale: 1.08, y: -4 }}
          whileTap={{ scale: 0.93 }}
        >
          <Image src="/figma/sticker-stars.png" alt="PLAY" width={294} height={100}
            style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }} priority />
        </motion.button>
      </div>
    </div>
  );
}
