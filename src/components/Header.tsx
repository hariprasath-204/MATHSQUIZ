"use client";

import React from "react";
import Link from "next/link";
import { useQuiz } from "@/context/QuizContext";
import { soundFx } from "@/lib/sound";

export const Header: React.FC = () => {
  const { student } = useQuiz();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0e0517]/85 border-b border-rose-500/20 px-4 lg:px-8 py-3.5 transition-all duration-300 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Clean College & Department Brand Logo Lockup */}
        <Link
          href={student ? "/rounds" : "/"}
          onClick={() => soundFx.playClick()}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rosegold-400 via-purple-500 to-sunset-amber p-[1.5px] shadow-lg shadow-rose-500/15 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#18092a] rounded-[10px] flex items-center justify-center">
              <span className="font-mono font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-rosegold-300 via-pink-200 to-amber-300">
                ∑π
              </span>
            </div>
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black text-white tracking-tight leading-snug group-hover:text-rosegold-300 transition-colors">
              AYYA NADAR JANAKI AMMAL COLLEGE
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono font-bold text-rosegold-400 uppercase tracking-wide">
              DEPARTMENT OF COMPUTER APPLICATION (PG)
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};
