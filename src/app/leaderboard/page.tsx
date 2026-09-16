"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { soundFx } from "@/lib/sound";
import {
  Trophy,
  ArrowLeft,
  Crown,
  Search,
  Play,
} from "lucide-react";

interface LeaderboardEntry {
  id?: string;
  studentId: string;
  name: string;
  rollNo: string;
  round1Score: number;
  round2Score: number;
  round3Score: number;
  totalScore: number;
  updatedAt?: any;
}

export default function LeaderboardPage() {
  const { student } = useQuiz();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    try {
      const q = query(collection(db, "results"), orderBy("totalScore", "desc"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const list: LeaderboardEntry[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data() as LeaderboardEntry;
            list.push({ ...data, id: doc.id });
          });
          setEntries(list);
          setLoading(false);
        },
        (error) => {
          console.error("Leaderboard realtime error:", error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error("Leaderboard query error:", error);
      setLoading(false);
    }
  }, []);

  const filteredEntries = entries.filter(
    (e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const top3 = entries.slice(0, 3);

  return (
    <div className="flex-1 flex flex-col items-center justify-start px-4 py-6 md:py-10 max-w-5xl mx-auto w-full">
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

      {/* Top Navigation Row */}
      <div className="w-full flex items-center justify-between gap-4 mb-6">
        <Link
          href="/"
          onClick={() => soundFx.playClick()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#240c0a] hover:bg-[#381410] border border-[#ff9100]/40 text-xs sm:text-sm font-semibold text-[#fff1d1] hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-mono text-[#00b7cd] bg-[#00b7cd]/15 border border-[#00b7cd]/40 px-3.5 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#00b7cd] animate-pulse" />
          <span>Firebase Real-Time Leaderboard</span>
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ff9100]/10 border border-[#ff9100]/30 text-[#ff9100] text-xs font-bold uppercase tracking-wider">
          <Trophy className="w-4 h-4 text-[#ff9100]" />
          <span>ANJAC MCA OFFICIAL RANKING</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Live Leaderboard
        </h2>
        <p className="text-xs sm:text-sm font-mono text-[#00b7cd] font-bold">
          26PMAG101 — MATHEMATICAL FOUNDATION
        </p>
        <p className="text-xs sm:text-sm text-[#fff1d1]/80 max-w-lg mx-auto">
          🎓 <strong className="text-white">{entries.length} student{entries.length === 1 ? "" : "s"}</strong> recorded in Firebase Firestore.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center p-12 gap-3">
          <div className="w-8 h-8 border-4 border-[#ff9100] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-[#fff1d1]">Connecting to Firebase Firestore...</span>
        </div>
      )}

      {/* Top 3 Podium */}
      {!loading && top3.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8 items-end">
          {/* Rank 2 (Cyan) */}
          {top3[1] ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#240c0a]/90 rounded-2xl p-5 border border-[#00b7cd]/40 flex flex-col items-center text-center relative md:order-1 shadow-lg"
            >
              <div className="w-11 h-11 rounded-xl bg-[#00b7cd]/20 border border-[#00b7cd]/40 flex items-center justify-center text-[#00b7cd] mb-2 font-mono font-black text-base">
                #2
              </div>
              <div className="text-sm font-bold text-white">{top3[1].name}</div>
              <div className="text-xs font-mono text-[#fff1d1]/80">{top3[1].rollNo}</div>
              <div className="mt-3 font-mono font-black text-xl text-[#00b7cd]">
                {top3[1].totalScore} / 45 <span className="text-xs font-normal">marks</span>
              </div>
              <div className="text-[10px] text-[#fff1d1]/70 font-mono mt-1">
                R1: {top3[1].round1Score}/15 | R2: {top3[1].round2Score}/15 | R3: {top3[1].round3Score}/15
              </div>
            </motion.div>
          ) : (
            <div className="hidden md:block md:order-1" />
          )}

          {/* Rank 1 (Solar Orange & Ivory) */}
          {top3[0] && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#381410]/95 rounded-2xl p-6 border-2 border-[#ff9100]/70 flex flex-col items-center text-center relative md:order-2 md:-translate-y-2 shadow-[0_0_35px_rgba(255,145,0,0.3)]"
            >
              <div className="absolute -top-3.5 bg-gradient-to-r from-[#ff9100] to-[#ffa726] text-[#160706] px-3 py-0.5 rounded-full text-xs font-black font-mono flex items-center gap-1 shadow-md">
                <Crown className="w-3.5 h-3.5 fill-current" />
                <span>CHAMPION</span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#ff9100]/20 border border-[#ff9100]/60 flex items-center justify-center text-[#ff9100] mb-2 font-mono font-black text-2xl mt-1">
                👑 #1
              </div>
              <div className="text-base font-extrabold text-white">{top3[0].name}</div>
              <div className="text-xs font-mono text-[#00b7cd] font-bold">{top3[0].rollNo}</div>
              <div className="mt-3 font-mono font-black text-3xl text-[#ff9100]">
                {top3[0].totalScore} / 45 <span className="text-sm font-bold text-[#fff1d1]">marks</span>
              </div>
              <div className="text-[11px] text-[#fff1d1]/80 font-mono mt-1">
                R1: {top3[0].round1Score}/15 | R2: {top3[0].round2Score}/15 | R3: {top3[0].round3Score}/15
              </div>
            </motion.div>
          )}

          {/* Rank 3 (Flame Red) */}
          {top3[2] ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#240c0a]/90 rounded-2xl p-5 border border-[#df301c]/45 flex flex-col items-center text-center relative md:order-3 shadow-lg"
            >
              <div className="w-11 h-11 rounded-xl bg-[#df301c]/20 border border-[#df301c]/40 flex items-center justify-center text-[#f04835] mb-2 font-mono font-black text-base">
                #3
              </div>
              <div className="text-sm font-bold text-white">{top3[2].name}</div>
              <div className="text-xs font-mono text-[#fff1d1]/80">{top3[2].rollNo}</div>
              <div className="mt-3 font-mono font-black text-xl text-[#f04835]">
                {top3[2].totalScore} / 45 <span className="text-xs font-normal">marks</span>
              </div>
              <div className="text-[10px] text-[#fff1d1]/70 font-mono mt-1">
                R1: {top3[2].round1Score}/15 | R2: {top3[2].round2Score}/15 | R3: {top3[2].round3Score}/15
              </div>
            </motion.div>
          ) : (
            <div className="hidden md:block md:order-3" />
          )}
        </div>
      )}

      {/* Search Input Filter */}
      {!loading && entries.length > 0 && (
        <div className="w-full relative mb-6">
          <Search className="w-4 h-4 text-[#fff1d1]/60 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name or roll number..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#160706]/90 border border-[#df301c]/40 focus:border-[#ff9100] focus:ring-1 focus:ring-[#ff9100] outline-none text-white placeholder-[#fff1d1]/30 text-sm"
          />
        </div>
      )}

      {/* Leaderboard Table List or Empty State */}
      {!loading && (
        <div className="w-full bg-[#240c0a]/90 rounded-2xl border border-[#ff9100]/25 overflow-hidden shadow-xl">
          {entries.length === 0 ? (
            <div className="p-10 text-center space-y-4">
              <Trophy className="w-12 h-12 text-[#df301c]/60 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">No Quiz Attempts Recorded Yet</h3>
                <p className="text-xs text-[#fff1d1]/70 max-w-sm mx-auto">
                  Be the first student to complete the 3 rounds and claim the #1 rank in the Firebase Leaderboard!
                </p>
              </div>
              <Link
                href="/register"
                onClick={() => soundFx.playClick()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff9100] to-[#fff1d1] text-[#160706] font-black text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start First Attempt</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#ff9100]">
                    <th className="py-3 px-4 text-center w-16">Rank</th>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4 hidden sm:table-cell text-center">Round 1 (U3)</th>
                    <th className="py-3 px-4 hidden sm:table-cell text-center">Round 2 (U4)</th>
                    <th className="py-3 px-4 hidden sm:table-cell text-center">Round 3 (U5)</th>
                    <th className="py-3 px-4 text-right">Total Marks (45)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-sm">
                  {filteredEntries.map((item, index) => {
                    const isCurrentStudent =
                      student &&
                      (item.studentId === student.id || item.rollNo === student.rollNo);

                    return (
                      <tr
                        key={item.id || item.studentId || index}
                        className={`transition-colors duration-150 ${
                          isCurrentStudent
                            ? "bg-[#ff9100]/20 font-bold border-l-4 border-l-[#ff9100]"
                            : "hover:bg-white/5"
                        }`}
                      >
                        {/* Rank Badge */}
                        <td className="py-3.5 px-4 text-center">
                          {index === 0 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#ff9100] text-[#160706] font-mono font-black text-xs">
                              1
                            </span>
                          ) : index === 1 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#00b7cd] text-[#160706] font-mono font-black text-xs">
                              2
                            </span>
                          ) : index === 2 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#df301c] text-white font-mono font-black text-xs">
                              3
                            </span>
                          ) : (
                            <span className="font-mono font-bold text-[#fff1d1]/80 text-xs">
                              #{index + 1}
                            </span>
                          )}
                        </td>

                        {/* Student Info */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="font-bold text-white flex items-center gap-2">
                                <span>{item.name}</span>
                                {isCurrentStudent && (
                                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#ff9100] text-[#160706] font-black">
                                    YOU
                                  </span>
                                )}
                              </div>
                              <div className="text-xs font-mono text-[#00b7cd]">
                                {item.rollNo}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 hidden sm:table-cell text-center font-mono text-[#00b7cd]">
                          {item.round1Score} / 15
                        </td>

                        <td className="py-3.5 px-4 hidden sm:table-cell text-center font-mono text-[#ff9100]">
                          {item.round2Score} / 15
                        </td>

                        <td className="py-3.5 px-4 hidden sm:table-cell text-center font-mono text-[#f04835]">
                          {item.round3Score} / 15
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <span className="font-mono font-black text-base text-[#ff9100]">
                            {item.totalScore}
                          </span>
                          <span className="text-xs text-[#fff1d1] ml-1 font-mono">/ 45</span>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredEntries.length === 0 && entries.length > 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-[#fff1d1] font-mono text-sm">
                        No student found matching &quot;{searchQuery}&quot;.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
