"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import { soundFx } from "@/lib/sound";
import {
  Play,
  Trophy,
  Sparkles,
  Zap,
  Clock,
  ShieldCheck,
  ChevronRight,
  GitBranch,
  Cpu,
  Boxes,
  BookOpen,
} from "lucide-react";

export default function LandingPage() {
  const { student } = useQuiz();

  const units = [
    {
      num: 1,
      unit: "Unit 3",
      title: "Trees & Applications",
      topics: "BST, Prefix Codes, Huffman, Game Trees (Nim & Tic-Tac-Toe)",
      icon: GitBranch,
      color: "from-[#0a282c]/90 via-[#1f0b0a]/90 to-[#0a282c]/50",
      borderColor: "border-[#00b7cd]/50 hover:border-[#00b7cd]",
      accent: "text-[#00b7cd]",
      badgeColor: "bg-[#00b7cd]/20 text-[#26cce0] border-[#00b7cd]/40",
      badge: "Round 1",
    },
    {
      num: 2,
      unit: "Unit 4",
      title: "Boolean Algebra",
      topics: "Duality, K-Maps, SOP/POS, Quine-McCluskey Minimization",
      icon: Cpu,
      color: "from-[#381e05]/90 via-[#1f0b0a]/90 to-[#381e05]/50",
      borderColor: "border-[#ff9100]/50 hover:border-[#ff9100]",
      accent: "text-[#ff9100]",
      badgeColor: "bg-[#ff9100]/20 text-[#ffa726] border-[#ff9100]/40",
      badge: "Round 2",
    },
    {
      num: 3,
      unit: "Unit 5",
      title: "Algebraic Structures",
      topics: "Groups, Subgroups, Cosets, Lagrange's Theorem, Permutations",
      icon: Boxes,
      color: "from-[#3d0e0a]/90 via-[#1f0b0a]/90 to-[#3d0e0a]/50",
      borderColor: "border-[#df301c]/50 hover:border-[#df301c]",
      accent: "text-[#df301c]",
      badgeColor: "bg-[#df301c]/20 text-[#f04835] border-[#df301c]/40",
      badge: "Round 3",
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-between px-4 py-8 md:py-12 max-w-6xl mx-auto w-full">
      {/* Top Academic Hierarchy Banner */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-2 mb-4 w-full"
      >
        {/* 1. College Name (Big) */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-wide uppercase drop-shadow-lg">
          AYYA NADAR JANAKI AMMAL COLLEGE
        </h1>

        {/* 2. Department Name (Little smaller than College) */}
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#ff9100] uppercase tracking-wider">
          DEPARTMENT OF COMPUTER APPLICATION (PG)
        </h2>

        {/* 3. Course Code & Title (Little smaller than Dept) */}
        <div className="pt-1">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#240c0a]/90 border border-[#ff9100]/40 text-xs sm:text-sm font-mono font-bold text-[#fff1d1] shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#ff9100]" />
            <span>26PMAG101 — MATHEMATICAL FOUNDATION</span>
          </div>
        </div>

        {/* Creator Spotlight */}
        <div className="pt-3 flex justify-center">
          <div className="inline-flex items-center gap-3 bg-[#240c0a]/70 border border-[#00b7cd]/30 px-4 py-1.5 rounded-2xl shadow-xl">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#df301c] via-[#ff9100] to-[#00b7cd] flex items-center justify-center font-black text-[11px] text-white">
              HP
            </div>
            <div className="text-left text-xs">
              <span className="text-[#fff1d1]/80 block text-[9px] font-mono">Created by</span>
              <strong className="text-white font-bold">S. HARI PRASATH</strong>{" "}
              <span className="text-[#00b7cd] font-mono font-bold">(26PCA135)</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row items-center gap-3.5 w-full max-w-md justify-center my-8"
      >
        <Link
          href={student ? "/rounds" : "/register"}
          onClick={() => soundFx.playClick()}
          className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-extrabold text-sm sm:text-base text-[#160706] bg-gradient-to-r from-[#ff9100] via-[#ffa726] to-[#fff1d1] hover:from-[#ffa726] hover:to-[#fff8e6] transition-all duration-200 shadow-[0_0_25px_rgba(255,145,0,0.35)] active:scale-[0.98]"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{student ? "Resume Quiz Dashboard" : "Start Quiz Challenge"}</span>
          <ChevronRight className="w-4 h-4" />
        </Link>

        <Link
          href="/leaderboard"
          onClick={() => soundFx.playClick()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-[#fff1d1] bg-[#2e100d]/80 hover:bg-[#401612]/90 border border-[#00b7cd]/50 hover:border-[#00b7cd] transition-all duration-200 active:scale-[0.98]"
        >
          <Trophy className="w-4 h-4 text-[#ff9100]" />
          <span>Leaderboard</span>
        </Link>
      </motion.div>

      {/* 3 Unit Syllabus Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl my-2"
      >
        {units.map((u) => {
          const Icon = u.icon;
          return (
            <div
              key={u.num}
              className={`p-5 rounded-2xl bg-gradient-to-b ${u.color} border ${u.borderColor} transition-all duration-200 flex flex-col justify-between shadow-xl`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${u.badgeColor}`}>
                    {u.badge} • {u.unit}
                  </span>
                  <Icon className={`w-5 h-5 ${u.accent}`} />
                </div>
                <h3 className="text-base font-bold text-white mb-1">{u.title}</h3>
                <p className="text-xs text-[#fff1d1]/75 leading-relaxed">{u.topics}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#fff1d1]/80 font-mono">
                <span>15 Questions</span>
                <span className="text-[#ff9100] font-bold">15s Timer</span>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Feature Highlights Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 pt-6 border-t border-white/10 w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-center"
      >
        <div className="p-2.5 rounded-xl bg-[#240c0a]/60 border border-[#00b7cd]/20">
          <Clock className="w-4 h-4 mx-auto text-[#00b7cd] mb-1" />
          <div className="text-xs font-bold text-[#fff1d1]">15s Timer</div>
          <div className="text-[10px] text-[#00b7cd]/80">Pulse alert under 5s</div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#240c0a]/60 border border-[#ff9100]/20">
          <Zap className="w-4 h-4 mx-auto text-[#ff9100] mb-1" />
          <div className="text-xs font-bold text-[#fff1d1]">1 Point / Question</div>
          <div className="text-[10px] text-[#ff9100]/80">45 Total Marks</div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#240c0a]/60 border border-[#df301c]/20">
          <ShieldCheck className="w-4 h-4 mx-auto text-[#df301c] mb-1" />
          <div className="text-xs font-bold text-[#fff1d1]">Round Lock</div>
          <div className="text-[10px] text-[#df301c]/80">Sequential unlock</div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#240c0a]/60 border border-[#00b7cd]/20">
          <BookOpen className="w-4 h-4 mx-auto text-[#26cce0] mb-1" />
          <div className="text-xs font-bold text-[#fff1d1]">Kenneth Rosen</div>
          <div className="text-[10px] text-[#26cce0]/80">Discrete Mathematics</div>
        </div>
      </motion.div>

      {/* Subtle Bottom Footer */}
      <div className="mt-8 text-center text-[11px] text-[#00b7cd]/70 font-mono">
        Ayya Nadar Janaki Ammal College (Autonomous) • MCA Department
      </div>
    </div>
  );
}
