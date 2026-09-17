"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useQuiz } from "@/context/QuizContext";
import { soundFx } from "@/lib/sound";
import {
  Trophy,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function RoundResultPage() {
  const params = useParams();
  const router = useRouter();
  const roundId = params.roundId as string;
  const { student, isLoading } = useQuiz();

  const roundNum = roundId === "round-1" ? 1 : roundId === "round-2" ? 2 : 3;

  useEffect(() => {
    if (!isLoading && !student) {
      router.push("/register");
    }
  }, [student, isLoading, router]);

  useEffect(() => {
    // Fire confetti celebration using new 4-color palette
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#df301c", "#ff9100", "#fff1d1", "#00b7cd"],
      });
    } catch {
      // Ignore
    }
    soundFx.playFanfare();
  }, []);

  if (isLoading || !student) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 gap-3 min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#ff9100] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-[#fff1d1]">Loading results...</span>
      </div>
    );
  }

  const isFinalRound = roundNum === 3;
  const nextRoundPath =
    roundNum === 1
      ? "/quiz/round-2"
      : roundNum === 2
      ? "/quiz/round-3"
      : "/final-result";

  const currentRoundScore =
    roundNum === 1
      ? student.round1Score
      : roundNum === 2
      ? student.round2Score
      : student.round3Score;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 py-4 sm:py-6 max-w-2xl mx-auto">
      {/* 1. Academic Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center space-y-1 mb-3"
      >
        <h1 className="text-xs sm:text-base md:text-lg font-black text-white tracking-widest uppercase px-2 leading-tight">
          AYYA NADAR JANAKI AMMAL COLLEGE
        </h1>
        <h2 className="text-[10px] sm:text-xs font-mono font-bold text-[#ff9100] uppercase tracking-wider px-2">
          DEPARTMENT OF COMPUTER APPLICATION (PG) • 26PMAG101
        </h2>
      </motion.div>

      {/* 2. Celebration Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="w-full bg-[#1e0a08]/95 rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-[#ff9100]/40 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl"
      >
        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#ff9100]/15 border border-[#ff9100]/40 text-[#ff9100] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-2.5 sm:mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#fff1d1] shrink-0" />
          <span>ROUND {roundNum} COMPLETED</span>
        </div>

        {/* Trophy & Heading */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-2">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 15 }}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#df301c] via-[#ff9100] to-[#00b7cd] p-0.5 shadow-[0_0_20px_rgba(255,145,0,0.4)] shrink-0"
          >
            <div className="w-full h-full bg-[#160706] rounded-[10px] flex items-center justify-center">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff9100]" />
            </div>
          </motion.div>
          <div className="text-left">
            <h2 className="text-lg sm:text-2xl font-black text-white leading-tight">
              Outstanding Work! 🎉
            </h2>
            <p className="text-[11px] sm:text-xs text-[#fff1d1]/80 font-mono">
              Round {roundNum} successfully cleared
            </p>
          </div>
        </div>

        {/* Score Display Card */}
        <div className="p-3 sm:p-4 rounded-2xl bg-[#120504] border border-[#ff9100]/30 my-2.5 sm:my-3 shadow-inner">
          <div className="text-[10px] sm:text-[11px] font-mono font-bold text-[#ff9100] uppercase tracking-wider mb-0.5">
            Round {roundNum} Score
          </div>
          <div className="text-3xl sm:text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#ff9100] via-[#ffa726] to-[#fff1d1]">
            {currentRoundScore} / 15{" "}
            <span className="text-lg sm:text-xl font-bold text-[#ff9100]">marks</span>
          </div>
        </div>

        {/* Student Identification Banner */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#290d0b] px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#ff9100]/30 mb-3 sm:mb-4 text-xs sm:text-sm">
          <span className="text-white font-bold">{student.name}</span>
          <span className="text-[#00b7cd] font-mono font-bold">({student.rollNo})</span>
        </div>

        {/* Primary Action Button */}
        <div className="space-y-2 sm:space-y-2.5">
          <button
            onClick={() => {
              soundFx.playClick();
              router.push(nextRoundPath);
            }}
            className="w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-[#ff9100] via-[#ffa726] to-[#fff1d1] hover:brightness-110 text-[#160706] font-black text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,145,0,0.4)] transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>
              {isFinalRound ? "View Final Leaderboard & Rank 🏆" : `Proceed to Round ${roundNum + 1} →`}
            </span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          </button>

          {/* Secondary Links */}
          <div className="flex items-center justify-center gap-4 text-xs font-mono pt-1">
            <Link
              href="/rounds"
              onClick={() => soundFx.playClick()}
              className="text-[#fff1d1]/80 hover:text-white transition-colors py-1"
            >
              Dashboard
            </Link>
            <span className="text-[#df301c]">•</span>
            <Link
              href="/leaderboard"
              onClick={() => soundFx.playClick()}
              className="text-[#00b7cd] hover:text-[#26cce0] transition-colors flex items-center gap-1 font-bold py-1"
            >
              <Trophy className="w-3.5 h-3.5 text-[#ff9100] shrink-0" />
              <span>Leaderboard</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
