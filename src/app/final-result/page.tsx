"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useQuiz } from "@/context/QuizContext";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { soundFx } from "@/lib/sound";
import {
  Trophy,
  Award,
  RotateCcw,
  Download,
  GraduationCap,
} from "lucide-react";

export default function FinalResultPage() {
  const router = useRouter();
  const { student, isLoading, resetQuizSession } = useQuiz();
  const [rank, setRank] = useState<number | null>(null);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [displayedScore, setDisplayedScore] = useState<number>(0);

  useEffect(() => {
    if (isLoading) return;
    if (!student) {
      router.push("/register");
      return;
    }

    // Sound fanfare
    soundFx.playFanfare();

    // Fireworks confetti effect with 4-color palette
    try {
      const end = Date.now() + 2.5 * 1000;
      const colors = ["#df301c", "#ff9100", "#fff1d1", "#00b7cd"];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch {
      // Ignore
    }

    // Animated count up for total score
    const target = student.totalScore || 0;
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setDisplayedScore(target);
        clearInterval(timer);
      } else {
        setDisplayedScore(Math.round(start));
      }
    }, stepTime);

    // Compute leaderboard rank
    async function calculateRank() {
      if (!db || !student) return;
      try {
        const q = query(collection(db, "results"), orderBy("totalScore", "desc"));
        const snapshot = await getDocs(q);
        setTotalStudents(snapshot.size);

        let studentRank = 1;
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.studentId === student.id || data.rollNo === student.rollNo) {
            setRank(studentRank);
          }
          studentRank++;
        });
      } catch (err) {
        console.warn("Could not compute live rank:", err);
      }
    }
    calculateRank();

    return () => clearInterval(timer);
  }, [student, router]);

  if (!student) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-8 h-8 border-4 border-[#ff9100] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 md:py-10 max-w-3xl mx-auto w-full">
      {/* College & Department Top Name */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-1 mb-5"
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-wide uppercase drop-shadow-md">
          AYYA NADAR JANAKI AMMAL COLLEGE
        </h1>
        <h2 className="text-xs sm:text-sm md:text-base font-bold text-[#ff9100] uppercase tracking-wider">
          DEPARTMENT OF COMPUTER APPLICATION (PG)
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full bg-[#240c0a]/95 rounded-3xl p-6 sm:p-10 border border-[#ff9100]/40 relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.7)] text-center"
      >
        {/* Header Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff9100]/20 border border-[#ff9100]/40 text-[#ff9100] text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <Award className="w-4 h-4 text-[#ff9100]" />
          <span>OFFICIAL QUIZ SCORECARD</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Quiz Completed! 🌟
        </h2>
        <p className="text-xs sm:text-sm font-mono text-[#00b7cd] font-bold mt-1">
          26PMAG101 — MATHEMATICAL FOUNDATION
        </p>

        {/* Student Credential Badge */}
        <div className="my-5 inline-flex flex-col sm:flex-row items-center gap-3 bg-[#160706] border border-[#df301c]/40 px-5 py-2.5 rounded-2xl shadow-lg">
          <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-white">
            <GraduationCap className="w-4 h-4 text-[#00b7cd]" />
            <span>{student.name}</span>
          </div>
          <span className="hidden sm:inline text-[#df301c]">•</span>
          <div className="text-xs sm:text-sm font-mono font-bold text-[#fff1d1] bg-[#ff9100]/15 px-3 py-1 rounded-lg border border-[#ff9100]/30">
            Roll No: {student.rollNo}
          </div>
        </div>

        {/* Total Score Display Box */}
        <div className="my-3 py-5 px-6 rounded-2xl bg-gradient-to-b from-[#ff9100]/15 via-[#3d1808]/40 to-transparent border border-[#ff9100]/30 max-w-sm mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#fff1d1] block mb-1">
            Total Marks Secured
          </span>
          <div className="text-5xl sm:text-6xl font-mono font-black text-[#ff9100]">
            {displayedScore} <span className="text-2xl text-[#fff1d1]/80">/ 45</span>
          </div>
          <span className="text-[11px] font-mono text-[#00b7cd] block mt-1">
            (1 Mark per Question • 45 Total Syllabus Questions)
          </span>
        </div>

        {/* Leaderboard Standing Rank */}
        {rank !== null && (
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#00b7cd] bg-[#00b7cd]/15 border border-[#00b7cd]/30 px-4 py-1 rounded-full mb-6">
            <Trophy className="w-4 h-4 text-[#ff9100]" />
            <span>Current Standing: Ranked #{rank} of {totalStudents} student{totalStudents === 1 ? "" : "s"}</span>
          </div>
        )}

        {/* 3 Rounds Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-5 text-left">
          {/* Round 1 */}
          <div className="bg-[#160706] p-4 rounded-2xl border border-[#00b7cd]/35 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono font-bold text-[#00b7cd] uppercase">Round 1 • Unit 3</div>
              <div className="text-sm font-bold text-white">Trees & Applications</div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#fff1d1]">Marks</span>
              <span className="font-mono font-black text-base text-[#00b7cd]">
                {student.round1Score} / 15
              </span>
            </div>
          </div>

          {/* Round 2 */}
          <div className="bg-[#160706] p-4 rounded-2xl border border-[#ff9100]/35 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono font-bold text-[#ff9100] uppercase">Round 2 • Unit 4</div>
              <div className="text-sm font-bold text-white">Boolean Algebra</div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#fff1d1]">Marks</span>
              <span className="font-mono font-black text-base text-[#ff9100]">
                {student.round2Score} / 15
              </span>
            </div>
          </div>

          {/* Round 3 */}
          <div className="bg-[#160706] p-4 rounded-2xl border border-[#df301c]/35 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono font-bold text-[#df301c] uppercase">Round 3 • Unit 5</div>
              <div className="text-sm font-bold text-white">Algebraic Structures</div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#fff1d1]">Marks</span>
              <span className="font-mono font-black text-base text-[#f04835]">
                {student.round3Score} / 15
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-4 border-t border-white/10">
          <button
            onClick={() => {
              soundFx.playClick();
              router.push("/leaderboard");
            }}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-[#ff9100] via-[#ffa726] to-[#fff1d1] hover:from-[#ffa726] hover:to-[#fff8e6] text-[#160706] font-black text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Trophy className="w-4 h-4" />
            <span>Open Leaderboard</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              window.print();
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#160706]/70 hover:bg-[#33110e]/80 border border-[#df301c]/40 text-xs sm:text-sm font-bold text-[#fff1d1] hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-[#00b7cd]" />
            <span>Print Scorecard</span>
          </button>

          <button
            onClick={() => {
              if (confirm("Reset current session to attempt the quiz again?")) {
                resetQuizSession();
                router.push("/register");
              }
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#160706]/70 hover:bg-[#33110e]/80 border border-[#df301c]/40 text-xs sm:text-sm font-bold text-[#f04835] hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
