"use client";

import React from "react";
import Link from "next/link";
import { useQuiz } from "@/context/QuizContext";
import { soundFx } from "@/lib/sound";

export const Header: React.FC = () => {
  const { student } = useQuiz();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#160706]/90 border-b border-[#ff9100]/20 px-3 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Clean College & Department Brand Logo Lockup */}
        <Link
          href={student ? "/rounds" : "/"}
          onClick={() => soundFx.playClick()}
          className="flex items-center gap-2.5 sm:gap-3 group"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#df301c] via-[#ff9100] to-[#00b7cd] p-[1.5px] shadow-lg shadow-[#ff9100]/15 group-hover:scale-105 transition-transform shrink-0">
            <div className="w-full h-full bg-[#1e0a08] rounded-[10px] flex items-center justify-center">
              <span className="font-mono font-black text-sm sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#ff9100] via-[#ffa726] to-[#fff1d1]">
                ∑π
              </span>
            </div>
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black text-white tracking-tight leading-snug group-hover:text-[#ff9100] transition-colors">
              AYYA NADAR JANAKI AMMAL COLLEGE
            </div>
            <div className="text-[9px] sm:text-[11px] font-mono font-bold text-[#ff9100] uppercase tracking-wide">
              DEPARTMENT OF COMPUTER APPLICATION (PG)
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};
