"use client";

// ── Design system tokens ──────────────────────────────────────────────────────
// Each token set is the source of truth for the ransom-note cut-out aesthetic.
// To retheme: change values here, nothing else needs to touch.

// Fonts: each feels cut from a different printed source
export const CUT_FONTS = [
  "'Rye', serif",                   // wood-type Western broadside
  "'Kranky', cursive",              // wobbly hand-lettered ad
  "'Abril Fatface', serif",         // heavy 1970s magazine headline
  "'Special Elite', cursive",       // typewriter ink-bleed clipping
  "'Oswald', sans-serif",           // condensed tabloid headline
  "'Anton', sans-serif",            // thick poster type
  "'Libre Baskerville', serif",     // editorial book serif
  "'UnifrakturMaguntia', cursive",  // gothic broadsheet
];

// Chip backgrounds: vivid, saturated — like the reference image
export const CUT_CHIP_BG = [
  "#f72585", // hot pink
  "#f9c74f", // vivid yellow
  "#43aa8b", // teal green
  "#f4442e", // tomato red
  "#4361ee", // bright blue
  "#ff6b35", // orange
  "#7209b7", // deep purple
  "#06d6a0", // mint
  "#ffd166", // golden yellow
  "#ef476f", // coral pink
  "#118ab2", // ocean blue
  "#8ecae6", // sky
  "#a8dadc", // seafoam
  "#e9c46a", // sand yellow
  "#2dc653", // grass green
  "#ff99c8", // bubblegum
];

// Letter colors: pair with chip — light on dark, dark on light
// Index-matched to CHIP_BG so contrast is always intentional
export const CUT_LETTER_COLORS = [
  "#ffffff",  // white on hot pink
  "#1a1a1a",  // black on yellow
  "#ffffff",  // white on teal
  "#ffffff",  // white on red
  "#ffffff",  // white on blue
  "#1a1a1a",  // black on orange
  "#ffd166",  // yellow on purple
  "#1a1a1a",  // black on mint
  "#1a1a1a",  // black on golden yellow
  "#ffffff",  // white on coral
  "#ffffff",  // white on ocean blue
  "#1a1a2e",  // navy on sky
  "#1a1a1a",  // black on seafoam
  "#5c2d00",  // brown on sand
  "#ffffff",  // white on green
  "#7209b7",  // purple on bubblegum
];

export const CUT_SIZES_LG = [38, 44, 32, 48, 36, 42, 30, 46, 38, 36];
export const CUT_SIZES_SM = [24, 28, 20, 30, 22, 26, 18, 28, 24, 22];
export const CUT_RADII    = ["2px", "3px", "1px", "4px", "2px", "0px", "3px", "2px"];
export const CUT_WEIGHTS  = [700, 400, 700, 400, 700, 700, 400, 700];

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  text: string;
  className?: string;
  size?: "lg" | "sm";
}

export default function ScrapbookTitle({ text, className = "", size = "lg" }: Props) {
  const SIZES = size === "lg" ? CUT_SIZES_LG : CUT_SIZES_SM;

  return (
    <div
      className={`flex flex-wrap items-end justify-center gap-[4px] leading-none ${className}`}
      aria-label={text}
    >
      {text.split("").map((char, i) => {
        if (char === " ") return <span key={i} className="w-3" aria-hidden="true" />;

        const font      = CUT_FONTS[i % CUT_FONTS.length];
        const chipBg    = CUT_CHIP_BG[i % CUT_CHIP_BG.length];
        const color     = CUT_LETTER_COLORS[i % CUT_LETTER_COLORS.length];
        const baseSize  = SIZES[i % SIZES.length];
        const radius    = CUT_RADII[i % CUT_RADII.length];
        const weight    = CUT_WEIGHTS[i % CUT_WEIGHTS.length];
        const rotation  = Math.sin(i * 1.7) * 5;
        const finalSize = baseSize + (i % 3 === 0 ? 4 : 0);
        // Vary chip padding to feel hand-cut (not uniform)
        const pad = ["4px 8px", "3px 5px", "5px 6px", "3px 7px", "4px 5px"][i % 5];

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
              padding: pad,
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}
