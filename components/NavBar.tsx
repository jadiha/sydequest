"use client";

// Nav is just the logo — no links
export default function NavBar() {
  return (
    <nav className="w-full max-w-md flex items-center justify-center px-1">
      <span
        className="text-white text-3xl select-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontStyle: "italic",
          textShadow: "1px 2px 6px rgba(0,0,0,0.18)",
          letterSpacing: "-0.5px",
        }}
      >
        SydeQuest
      </span>
    </nav>
  );
}
