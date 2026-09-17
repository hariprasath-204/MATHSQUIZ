"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import { soundFx } from "@/lib/sound";
import {
  User,
  Hash,
  ArrowRight,
  Sparkles,
  AlertCircle,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { registerStudent, isLoading, student } = useQuiz();

  const [name, setName] = useState<string>(student?.name || "");
  const [rollNo, setRollNo] = useState<string>(student?.rollNo || "");
  const [error, setError] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      soundFx.playWrong();
      return;
    }

    if (!rollNo.trim()) {
      setError("Please enter your college roll number.");
      soundFx.playWrong();
      return;
    }

    setSubmitting(true);
    const success = await registerStudent(name, rollNo);
    if (success) {
      soundFx.playCorrect();
      router.push("/rounds");
    } else {
      setError("Could not register session. Please check your network and try again.");
      setSubmitting(false);
      soundFx.playWrong();
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-3 sm:px-4 py-6 sm:py-10 max-w-lg mx-auto w-full">
      {/* College & Department Top Name */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-1 mb-5 sm:mb-6"
      >
        <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-white tracking-wide uppercase drop-shadow-md px-2 leading-tight">
          AYYA NADAR JANAKI AMMAL COLLEGE
        </h1>
        <h2 className="text-[11px] sm:text-sm md:text-base font-bold text-[#ff9100] uppercase tracking-wider px-2">
          DEPARTMENT OF COMPUTER APPLICATION (PG)
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full bg-[#240c0a]/90 rounded-2xl sm:rounded-3xl p-5 sm:p-9 border border-[#ff9100]/35 shadow-[0_10px_35px_rgba(0,0,0,0.6)] relative overflow-hidden"
      >
        {/* Top Glow Highlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-[#ff9100] to-transparent shadow-[0_0_15px_#ff9100]" />

        {/* Card Header */}
        <div className="text-center space-y-1.5 sm:space-y-2 mb-6 sm:mb-7">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3d1808]/80 border border-[#ff9100]/40 text-[#ff9100] text-[10px] sm:text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#fff1d1] shrink-0" />
            <span>26PMAG101 • STUDENT REGISTRATION</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
            Enter Quiz Arena
          </h2>
          <p className="text-xs sm:text-sm text-[#fff1d1]/70 max-w-sm mx-auto leading-relaxed">
            Record your student name and roll number to claim your rank on the live Firebase leaderboard.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-5 p-3 rounded-xl bg-[#df301c]/20 border border-[#df301c]/50 text-[#f04835] text-xs sm:text-sm flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-[#df301c]" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#fff1d1] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#00b7cd] shrink-0" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. S. HARI PRASATH"
              className="w-full px-4 py-3 rounded-xl bg-[#160706] border border-[#df301c]/40 focus:border-[#ff9100] focus:ring-2 focus:ring-[#ff9100]/20 outline-none text-white placeholder-[#fff1d1]/30 text-base sm:text-sm font-semibold transition-all"
            />
          </div>

          {/* Roll Number Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#fff1d1] flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-[#ff9100] shrink-0" />
              <span>Roll Number</span>
            </label>
            <input
              type="text"
              required
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value.toUpperCase())}
              placeholder="e.g. 26PCA135"
              className="w-full px-4 py-3 rounded-xl bg-[#160706] border border-[#df301c]/40 focus:border-[#00b7cd] focus:ring-2 focus:ring-[#00b7cd]/20 outline-none text-white placeholder-[#fff1d1]/30 text-base sm:text-sm font-mono font-bold uppercase tracking-wider transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting || isLoading}
            className="w-full mt-3 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#ff9100] via-[#ffa726] to-[#fff1d1] hover:from-[#ffa726] hover:to-[#fff8e6] text-[#160706] font-black text-sm transition-all shadow-[0_0_20px_rgba(255,145,0,0.35)] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#160706] border-t-transparent rounded-full animate-spin" />
                Connecting...
              </span>
            ) : (
              <>
                <span>Enter Rounds Arena</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
