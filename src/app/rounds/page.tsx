"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import { soundFx } from "@/lib/sound";
import {
  Lock,
  Unlock,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Sparkles,
  GitBranch,
  Cpu,
  Boxes,
  RotateCcw,
  Award,
} from "lucide-react";

export default function RoundsPage() {
  const router = useRouter();
  const { student, isLoading, resetQuizSession } = useQuiz();
  const [shakingCard, setShakingCard] = useState<number | null>(null);
  const [tooltipText, setTooltipText] = useState<string | null>(null);

  React.useEffect(() => {
    if (!isLoading && !student) {
      router.push("/register");
    }
  }, [student, isLoading, router]);

  if (isLoading || !student) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 gap-3 min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#ff9100] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-[#fff1d1]">Loading quiz dashboard...</span>
      </div>
    );
  }

  const roundsConfig = [
    {
      id: "round-1",
      num: 1,
      unit: "Unit 3",
      title: "Trees & Applications",
      description:
        "Rooted trees, binary search trees, prefix codes, Huffman coding, game trees (Nim, Tic-Tac-Toe).",
      icon: GitBranch,
      cardBg: "from-[#0a282c]/90 via-[#1f0b0a]/90 to-[#0a282c]/50",
      borderColor: "border-[#00b7cd]/50 hover:border-[#00b7cd]",
      accentColor: "text-[#00b7cd]",
      iconBg: "bg-[#00b7cd]/20 text-[#26cce0] border-[#00b7cd]/40",
      isUnlocked: true,
      isDone: student.round1Done,
      score: student.round1Score,
      totalQuestions: 15,
      maxPoints: 15,
    },
    {
      id: "round-2",
      num: 2,
      unit: "Unit 4",
      title: "Boolean Algebra",
      description:
        "Duality principle, SOP/POS, functional completeness, Karnaugh maps, Quine-McCluskey minimization.",
      icon: Cpu,
      cardBg: "from-[#381e05]/90 via-[#1f0b0a]/90 to-[#381e05]/50",
      borderColor: "border-[#ff9100]/50 hover:border-[#ff9100]",
      accentColor: "text-[#ff9100]",
      iconBg: "bg-[#ff9100]/20 text-[#ffa726] border-[#ff9100]/40",
      isUnlocked: student.round1Done,
      isDone: student.round2Done,
      score: student.round2Score,
      totalQuestions: 15,
      maxPoints: 15,
    },
    {
      id: "round-3",
      num: 3,
      unit: "Unit 5",
      title: "Algebraic Structures",
      description:
        "Semigroups, monoids, groups, cosets, Lagrange's theorem, permutations, and isomorphisms.",
      icon: Boxes,
      cardBg: "from-[#3d0e0a]/90 via-[#1f0b0a]/90 to-[#3d0e0a]/50",
      borderColor: "border-[#df301c]/50 hover:border-[#df301c]",
      accentColor: "text-[#df301c]",
      iconBg: "bg-[#df301c]/20 text-[#f04835] border-[#df301c]/40",
      isUnlocked: student.round2Done,
      isDone: student.round3Done,
      score: student.round3Score,
      totalQuestions: 15,
      maxPoints: 15,
    },
  ];

  const handleCardClick = (round: typeof roundsConfig[0]) => {
    if (!round.isUnlocked) {
      soundFx.playWrong();
      setShakingCard(round.num);
      setTooltipText(`Complete Round ${round.num - 1} to unlock this round!`);
      setTimeout(() => {
        setShakingCard(null);
        setTooltipText(null);
      }, 2500);
      return;
    }

    soundFx.playClick();
    router.push(`/quiz/${round.id}`);
  };

  const allCompleted = student.round1Done && student.round2Done && student.round3Done;

  return (
    <div className="flex-1 flex flex-col items-center justify-start px-4 py-6 md:py-10 max-w-6xl mx-auto w-full">
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

      {/* Header Info */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#240c0a]/80 border border-[#ff9100]/40 text-xs font-mono font-bold text-[#ff9100] shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#fff1d1]" />
          <span>26PMAG101 • ROUND SELECTION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Challenge Dashboard
        </h2>
        <p className="text-sm text-[#fff1d1]/70 max-w-xl mx-auto">
          Complete each syllabus round sequentially. Earn speed bonuses to climb the leaderboard rank!
        </p>
      </div>

      {/* Floating Locked Tooltip */}
      <AnimatePresence>
        {tooltipText && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 px-4 py-2 rounded-xl bg-[#df301c]/20 border border-[#df301c]/50 text-[#f04835] text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg"
          >
            <Lock className="w-4 h-4 text-[#df301c]" />
            <span>{tooltipText}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3 Large Round Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
        {roundsConfig.map((round, idx) => {
          const Icon = round.icon;
          const isShaking = shakingCard === round.num;

          return (
            <motion.div
              key={round.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                x: isShaking ? [-8, 8, -6, 6, -3, 3, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                delay: idx * 0.15,
                x: { duration: 0.4 },
              }}
              onClick={() => handleCardClick(round)}
              className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden border bg-gradient-to-b ${
                round.isUnlocked
                  ? `${round.cardBg} ${round.borderColor} shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:scale-[1.02] active:scale-[0.99]`
                  : "from-[#160706]/60 to-[#0e0403]/60 border-[#df301c]/30 opacity-60 hover:opacity-75"
              }`}
            >
              {/* Top Row: Unit Tag + Status Badge */}
              <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
                    round.isUnlocked
                      ? "bg-[#240c0a]/80 border-[#ff9100]/40 text-[#fff1d1]"
                      : "bg-black/30 border-white/5 text-slate-500"
                  }`}
                >
                  {round.unit}
                </span>

                {round.isDone ? (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[#00b7cd] bg-[#00b7cd]/20 border border-[#00b7cd]/40 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00b7cd]" />
                    <span>Done</span>
                  </span>
                ) : round.isUnlocked ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-[#ff9100] bg-[#ff9100]/20 border border-[#ff9100]/40 px-2.5 py-1 rounded-full">
                    <Unlock className="w-3.5 h-3.5 text-[#ff9100]" />
                    <span>Active</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-bold text-[#df301c] bg-[#240c0a]/80 border border-[#df301c]/40 px-2.5 py-1 rounded-full">
                    <Lock className="w-3.5 h-3.5 text-[#df301c]" />
                    <span>Locked</span>
                  </span>
                )}
              </div>

              {/* Center: Round Icon & Titles */}
              <div className="space-y-3 my-2 relative z-10">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner ${
                    round.isUnlocked
                      ? round.iconBg
                      : "bg-[#240c0a]/40 border-[#df301c]/40 text-[#df301c]/60"
                  }`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ff9100]">
                    Round {round.num}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {round.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#fff1d1]/70 line-clamp-3 leading-relaxed">
                  {round.description}
                </p>
              </div>

              {/* Bottom: Score & Action */}
              <div className="pt-6 mt-4 border-t border-white/10 relative z-10 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono text-[#fff1d1]">
                    {round.totalQuestions} Questions (15 Marks)
                  </div>
                  {round.isDone && (
                    <div className="text-xs font-bold text-[#ff9100] flex items-center gap-1 mt-0.5">
                      <Trophy className="w-3.5 h-3.5 text-[#ff9100]" />
                      <span>Score: {round.score} / 15 marks</span>
                    </div>
                  )}
                </div>

                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform ${
                    round.isUnlocked
                      ? "bg-[#ff9100]/20 border border-[#ff9100]/40 text-[#ffa726] hover:bg-[#ff9100]/30 hover:translate-x-1"
                      : "bg-[#240c0a]/40 text-[#df301c]/60"
                  }`}
                >
                  {round.isUnlocked ? (
                    <ArrowRight className="w-5 h-5 text-[#ff9100]" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {allCompleted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full bg-gradient-to-r from-[#381e05]/90 via-[#240c0a]/90 to-[#0a282c]/90 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#ff9100]/40 shadow-2xl"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#ff9100]/20 border border-[#ff9100]/50 flex items-center justify-center text-[#ff9100] shrink-0">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-black text-white">
                All 3 Rounds Completed! 🎉
              </h4>
              <p className="text-xs sm:text-sm text-[#fff1d1]">
                Total Score: <strong className="text-[#00b7cd] font-mono text-base">{student.totalScore} Points</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundFx.playClick();
                router.push("/final-result");
              }}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#ff9100] via-[#ffa726] to-[#fff1d1] hover:from-[#ffa726] hover:to-[#fff8e6] text-[#160706] font-black text-sm transition-all shadow-[0_0_20px_rgba(255,145,0,0.4)] flex items-center gap-2"
            >
              <span>View Final Scorecard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="flex items-center justify-between w-full max-w-4xl text-xs text-[#00b7cd]/80 pt-4 border-t border-white/10">
          <span>Logged in: <strong className="text-white">{student.name} ({student.rollNo})</strong></span>
          <button
            onClick={() => {
              if (confirm("Reset current student session and start fresh?")) {
                resetQuizSession();
                router.push("/register");
              }
            }}
            className="hover:text-[#ff9100] flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Switch Student</span>
          </button>
        </div>
      )}
    </div>
  );
}
