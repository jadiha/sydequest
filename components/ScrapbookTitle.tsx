"use client";

// Fonts that genuinely look like physical magazine/newspaper cut-outs
const FONTS = [
  "'Special Elite', cursive",           // typewriter ink bleed
  "'Oswald', sans-serif",               // condensed tabloid headline
  "'Abril Fatface', serif",             // 19th-century broadsheet display
  "'Courier Prime', monospace",         // typed document feel
  "'Anton', sans-serif",                // thick poster condensed
  "'Libre Baskerville', serif",         // editorial book/magazine
  "'Playfair Display', serif",          // high-contrast magazine serif
  "'UnifrakturMaguntia', cursive",      // gothic blackletter (old broadsheet)
];

// Warm, muted paper chip backgrounds — like real magazine pages, not digital neons
const CHIP_BG = [
  "#f5e642", // newspaper yellow
  "#e8c4c4", // faded pink paper
  "#c4dce8", // pale blue newsprint
  "#c8e8c4", // mint magazine page
  "#f0d0b0", // kraft paper
  "#e8d4f0", // lavender clipping
  "#f0c8a8", // peach page
  "#c4c8e8", // periwinkle
  "#f5f0d0", // cream newsprint
  "#e8b4b8", // dusty rose
];

// Printed ink colors — not glowing, not pastel
const LETTER_COLORS = [
  "#1a1a1a", // near-black newspaper ink
  "#8b1a1a", // dark red masthead
  "#1a2f5e", // navy headline
  "#2c4a1e", // dark forest green
  "#5c2d00", // dark brown ink
  "#1a1a5e", // deep navy
  "#4a0a2a", // dark maroon
  "#2a2a2a", // charcoal
];

const SIZES   = [30, 36, 26, 38, 28, 32, 24, 34, 30, 28];
const RADII   = ["2px", "3px", "1px", "4px", "2px", "0px", "3px", "2px"];
const WEIGHTS = [700, 400, 700, 400, 700, 700, 400, 700];

interface Props {
  text: string;
  className?: string;
}

export default function ScrapbookTitle({ text, className = "" }: Props) {
  return (
    <div
      className={`flex flex-wrap items-end justify-center gap-[4px] leading-none ${className}`}
      aria-label={text}
    >
      {text.split("").map((char, i) => {
        if (char === " ") return <span key={i} className="w-3" aria-hidden="true" />;

        const font      = FONTS[i % FONTS.length];
        const chipBg    = CHIP_BG[i % CHIP_BG.length];
        const color     = LETTER_COLORS[i % LETTER_COLORS.length];
        const size      = SIZES[i % SIZES.length];
        const radius    = RADII[i % RADII.length];
        const weight    = WEIGHTS[i % WEIGHTS.length];
        const rotation  = Math.sin(i * 1.7) * 5;
        const finalSize = size + (i % 3 === 0 ? 4 : 0);

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
              padding: i % 5 === 0 ? "4px 6px" : i % 5 === 1 ? "3px 5px" : "3px 4px",
              outline: i % 4 === 0 ? "1.5px solid rgba(0,0,0,0.1)" : "none",
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
