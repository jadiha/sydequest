"use client";

// Pool of display fonts that look like cut-out magazine letters
const FONTS = [
  "'Abril Fatface', serif",
  "'Boogaloo', sans-serif",
  "'Fredoka One', cursive",
  "'Fugaz One', sans-serif",
  "'Lilita One', sans-serif",
  "'Lobster', cursive",
  "'Oswald', sans-serif",
  "'Playfair Display', serif",
  "'Righteous', sans-serif",
  "'Titan One', sans-serif",
  "'Ultra', serif",
];

// Colored paper chip backgrounds (the "cut out" piece)
const CHIP_BG = [
  "#FFE566", "#FF9CC2", "#C4AAFF", "#A8E6CF",
  "#FFB996", "#A8D8EA", "#FF8FA3", "#B5D5A3",
  "#FFD4A3", "#D4AAFF", "#A3D4FF", "#FFD4D4",
];

// Letter text colors (dark enough to read on chips)
const LETTER_COLORS = [
  "#4A1D6E", "#8B1A1A", "#1A2F5E", "#1A4A2E",
  "#7A3000", "#5B0050", "#2C1A4A", "#1A5050",
  "#6B3A00", "#3D1A6E",
];

// Size variation: base size + offset per letter
const SIZES = [28, 32, 26, 34, 28, 30, 36, 26, 32, 28];

interface Props {
  text: string;
  className?: string;
}

export default function ScrapbookTitle({ text, className = "" }: Props) {
  return (
    <div className={`flex flex-wrap items-end justify-center gap-[3px] ${className}`} aria-label={text}>
      {text.split("").map((char, i) => {
        if (char === " ") return <span key={i} className="w-2" aria-hidden="true" />;

        const font     = FONTS[i % FONTS.length];
        const chipBg   = CHIP_BG[i % CHIP_BG.length];
        const color    = LETTER_COLORS[i % LETTER_COLORS.length];
        const size     = SIZES[i % SIZES.length];
        // deterministic rotation: sine wave so it feels organic
        const rotation = Math.round(Math.sin(i * 1.3) * 4);
        // slight size variance
        const actualSize = size + (i % 3 === 0 ? 4 : i % 3 === 1 ? -2 : 0);

        return (
          <span
            key={i}
            aria-hidden="true"
            className="letter-chip"
            style={{
              fontFamily: font,
              background: chipBg,
              color,
              fontSize: `${actualSize}px`,
              transform: `rotate(${rotation}deg)`,
              // slight box shadow like a real cut-out
              boxShadow: "1px 2px 4px rgba(0,0,0,0.18)",
              // vary padding slightly
              padding: i % 4 === 0 ? "3px 5px" : i % 4 === 1 ? "2px 4px" : "4px 4px",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}
