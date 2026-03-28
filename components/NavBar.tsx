"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/",        label: "my quests" },
  { href: "/friends", label: "friends"   },
  { href: "/explore", label: "explore"   },
];

export default function NavBar() {
  const path = usePathname();

  return (
    <nav className="w-full max-w-md flex items-center justify-between px-1">
      {/* Logo */}
      <span className="font-marker text-white text-2xl drop-shadow-sm select-none">
        Syde<span className="text-yellow-200">Quest</span>
      </span>

      {/* Pills */}
      <div className="flex gap-2">
        {LINKS.map(({ href, label }) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              className={`font-hand text-[13px] px-3 py-1 rounded-full border-2 transition-all duration-150
                ${active
                  ? "bg-white text-violet border-white font-bold"
                  : "bg-white/25 text-white border-white/40 hover:bg-white/40 backdrop-blur-sm"
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
