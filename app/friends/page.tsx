"use client";
import NavBar from "@/components/NavBar";

export default function FriendsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center gap-5 px-4 py-6">
      <NavBar />
      <div className="paper paper-tape w-full max-w-md rounded-2xl px-6 py-8 shadow-lg relative">
        <p className="font-marker text-violet text-3xl mb-2">friends 👯</p>
        <p className="font-caveat text-gray-400 text-xl mb-6">see what your crew is questing</p>

        <div className="font-kalam text-gray-400 text-center py-10 text-[22px]">
          invite your friends to join ✦
          <br />
          <span className="font-hand text-[14px] text-gray-300">
            share the link and start questing together
          </span>
        </div>

        <button className="w-full font-kalam font-bold text-[18px] text-white bg-violet rounded-2xl py-3">
          copy invite link ✦
        </button>
      </div>
    </main>
  );
}
