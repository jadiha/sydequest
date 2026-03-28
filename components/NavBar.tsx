"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ScrapbookTitle from "./ScrapbookTitle";

const LINKS = [
  { href: "/",        label: "quests" },
  { href: "/friends", label: "friends" },
  { href: "/explore", label: "explore" },
];

export default function NavBar() {
  const path = usePathname();

  return (
    <nav className="w-full max-w-md flex items-center justify-between px-1">
      <ScrapbookTitle text="SydeQuest" />

      <div className="flex gap-2">
        {LINKS.map(({ href, label }) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              style={{ fontFamily: "'Caveat', cursive", fontWeight: active ? 700 : 400 }}
              className={`text-[15px] px-3 py-1.5 rounded-full border-2 transition-all duration-150
                ${active
                  ? "bg-white text-purple-700 border-white shadow-sm"
                  : "bg-white/30 text-white border-white/40 hover:bg-white/50 backdrop-blur-sm"
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
