"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/",        label: "quests"  },
  { href: "/friends", label: "friends" },
  { href: "/explore", label: "explore" },
];

export default function NavBar() {
  const path = usePathname();

  return (
    <nav className="w-full max-w-md flex items-center justify-between px-1 flex-nowrap">
      {/* Logo — one line, no wrapping */}
      <span
        className="text-white text-2xl flex-shrink-0 select-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontStyle: "italic",
          textShadow: "1px 2px 4px rgba(0,0,0,0.15)",
          letterSpacing: "-0.5px",
        }}
      >
        SydeQuest
      </span>

      {/* Nav pills */}
      <div className="flex gap-1.5 flex-shrink-0">
        {LINKS.map(({ href, label }) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              style={{ fontFamily: "'Special Elite', cursive" }}
              className={`text-[13px] px-3 py-1.5 rounded-full border-2 transition-all duration-150 whitespace-nowrap
                ${active
                  ? "bg-white text-[#5a1d6e] border-white shadow-sm font-bold"
                  : "bg-white/30 text-white border-white/50 hover:bg-white/50"
                }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
