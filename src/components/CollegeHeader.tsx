"use client";

import React from "react";
import Link from "next/link";
import { useQuiz } from "@/context/QuizContext";
import { soundFx } from "@/lib/sound";

export const CollegeHeader: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { student } = useQuiz();

  return (
    <div className={`w-full text-center py-4 px-4 select-none ${className}`}>
      <Link
        href={student ? "/rounds" : "/"}
        onClick={() => soundFx.playClick()}
        className="inline-block group"
      >
        <h2 className="text-xs sm:text-sm md:text-base font-black text-white tracking-wider uppercase group-hover:text-rosegold-300 transition-colors">
          AYYA NADAR JANAKI AMMAL COLLEGE
        </h2>
        <p className="text-[10px] sm:text-[11px] font-mono font-bold text-rosegold-400 uppercase tracking-widest mt-0.5 group-hover:text-rosegold-300 transition-colors">
          DEPARTMENT OF COMPUTER APPLICATION (PG)
        </p>
      </Link>
    </div>
  );
};
