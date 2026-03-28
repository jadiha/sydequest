"use client";

// These fonts genuinely look like they were cut from different printed sources
const FONTS = [
  "'Rye', serif",                     // wood-type Western poster — looks ripped from a broadside
  "'Kranky', cursive",                // wobbly hand-drawn — looks like a hand-lettered ad
  "'Abril Fatface', serif",           // heavy ink-trap — 1970s magazine headline
  "'Special Elite', cursive",         // typewriter ink bleed — newspaper clipping
  "'Oswald', sans-serif",             // condensed tabloid headline
  "'Anton', sans-serif",              // thick poster type
  "'Libre Baskerville', serif",       // editorial book serif
  "'UnifrakturMaguntia', cursive",    // gothic blackletter — old broadsheet
];

// Warm muted paper chip backgrounds — like real physical pages
const CHIP_BG = [
  "#f5e642", "#e8c4c4", "#c4dce8", "#c8e8c4",
  "#f0d0b0", "#e8d4f0", "#f0c8a8", "#c4c8e8",
  "#f5f0d0", "#e8b4b8", "#d8e8c0", "#f0e0c0",
];

// Deep printed ink colors
const LETTER_COLORS = [
  "#1a1a1a", "#8b1a1a", "#1a2f5e", "#2c4a1e",
  "#5c2d00", "#1a1a5e", "#4a0a2a", "#2a2a2a",
];

// Bigger sizes for large display use
const SIZES_LG = [38, 44, 32, 48, 36, 42, 30, 46, 38, 36];
// Smaller for in-paper use
const SIZES_SM = [24, 28, 20, 30, 22, 26, 18, 28, 24, 22];

const RADII   = ["2px", "3px", "1px", "4px", "2px", "0px", "3px", "2px"];
const WEIGHTS = [700, 400, 700, 400, 700, 700, 400, 700];

interface Props {
  text: string;
  className?: string;
  size?: "lg" | "sm";
}

export default function ScrapbookTitle({ text, className = "", size = "lg" }: Props) {
  const SIZES = size === "lg" ? SIZES_LG : SIZES_SM;

  return (
    <div
      className={`flex flex-wrap items-end justify-center gap-[4px] leading-none ${className}`}
      aria-label={text}
    >
      {text.split("").map((char, i) => {
        if (char === " ") return <span key={i} className="w-3" aria-hidden="true" />;

        const font     = FONTS[i % FONTS.length];
        const chipBg   = CHIP_BG[i % CHIP_BG.length];
        const color    = LETTER_COLORS[i % LETTER_COLORS.length];
        const baseSize = SIZES[i % SIZES.length];
        const radius   = RADII[i % RADII.length];
        const weight   = WEIGHTS[i % WEIGHTS.length];
        const rotation = Math.sin(i * 1.7) * 5;
        const finalSize = baseSize + (i % 3 === 0 ? 4 : 0);

        return (
          <span
            key={i}
            aria-hidden="true"
            className="letter-chip"
            style={{
              fontFamily: font,
              background: chipBg,
              color,
              fontSize: `${finalSize}px`,
              fontWeight: weight,
              transform: `rotate(${rotation}deg)`,
              borderRadius: radius,
              padding: i % 5 === 0 ? "4px 7px" : i % 5 === 1 ? "3px 5px" : "3px 5px",
              outline: i % 4 === 0 ? "1.5px solid rgba(0,0,0,0.10)" : "none",
              outlineOffset: "1px",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}
