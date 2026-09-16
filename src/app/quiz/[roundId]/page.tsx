"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import { TimerRing } from "@/components/TimerRing";
import { fetchRoundQuestions, calculateScore } from "@/lib/firestoreQuestions";
import { Question } from "@/data/questionBank";
import { soundFx } from "@/lib/sound";
import {
  CheckCircle2,
  XCircle,
  Trophy,
  ArrowRight,
} from "lucide-react";

export default function QuizArenaPage() {
  const params = useParams();
  const router = useRouter();
  const roundId = params.roundId as string;

  const {
    student,
    isLoading,
    completeRound,
  } = useQuiz();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [roundScore, setRoundScore] = useState<number>(0);
  const [scoreGain, setScoreGain] = useState<number | null>(null);

  const roundNum = roundId === "round-1" ? 1 : roundId === "round-2" ? 2 : 3;
  const unitNum = roundNum === 1 ? 3 : roundNum === 2 ? 4 : 5;

  useEffect(() => {
    if (isLoading) return;

    if (!student) {
      router.push("/register");
      return;
    }

    if (roundNum === 2 && !student.round1Done) {
      router.push("/rounds");
      return;
    }
    if (roundNum === 3 && !student.round2Done) {
      router.push("/rounds");
      return;
    }

    async function loadQuestions() {
      try {
        const qList = await fetchRoundQuestions(roundNum as 1 | 2 | 3);
        setQuestions(qList);
      } catch (e) {
        console.error("Failed to load questions:", e);
      }
    }
    loadQuestions();
  }, [student, isLoading, roundNum, router]);

  const handleTimeOut = useCallback(() => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(-1);
    soundFx.playWrong();
  }, [isAnswered]);

  useEffect(() => {
    if (isAnswered || questions.length === 0) return;

    setTimeLeft(15);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnswered, questions.length, handleTimeOut]);

  const handleOptionSelect = (optionIdx: number) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedOption(optionIdx);

    const currentQ = questions[currentIndex];
    const isCorrect = optionIdx === currentQ.correctIndex;

    if (isCorrect) {
      const pointsEarned = calculateScore(true, timeLeft, currentQ.points);
      setRoundScore((prev) => prev + pointsEarned);
      setScoreGain(pointsEarned);
      soundFx.playCorrect();
    } else {
      soundFx.playWrong();
      setScoreGain(0);
    }
  };

  const handleNextQuestion = async () => {
    soundFx.playClick();
    setScoreGain(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(15);
    } else {
      await completeRound(roundNum, roundScore);
      router.push(`/round-result/${roundId}`);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 gap-3">
        <div className="w-9 h-9 border-4 border-[#ff9100] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono text-[#fff1d1]">Loading syllabus questions from Firebase...</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;
  const isCorrectAnswer = selectedOption === currentQ.correctIndex;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-4 md:py-6 max-w-6xl mx-auto">
      {/* 1. Top HUD Bar */}
      <div className="w-full flex items-center justify-between gap-4 mb-4 bg-[#1f0907]/90 px-5 py-3 rounded-2xl border border-[#ff9100]/30 backdrop-blur-md shadow-lg">
        {/* Left: Round & Unit Badge */}
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1 rounded-xl text-xs sm:text-sm font-mono font-bold text-[#00b7cd] uppercase bg-[#00b7cd]/15 border border-[#00b7cd]/50 shadow-[0_0_12px_rgba(0,183,205,0.2)]">
            Round {roundNum} • Unit {unitNum}
          </span>
          <span className="text-sm sm:text-base text-[#fff1d1] font-mono font-semibold hidden md:inline">
            {currentQ.topic}
          </span>
        </div>

        {/* Center: Progress Bar */}
        <div className="flex items-center gap-3 flex-1 max-w-xs sm:max-w-md mx-2">
          <span className="text-xs sm:text-sm font-mono font-bold text-[#fff1d1]/90 shrink-0">
            Q {currentIndex + 1} / {questions.length}
          </span>
          <div className="flex-1 h-3 bg-[#120504] rounded-full overflow-hidden border border-[#ff9100]/30 p-0.5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#df301c] via-[#ff9100] to-[#00b7cd]"
              style={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Right: Live Score */}
        <div className="relative flex items-center gap-2 bg-[#33110e] px-4 py-1.5 rounded-full border border-[#ff9100]/60 shadow-md shrink-0">
          <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff9100]" />
          <span className="text-sm sm:text-lg font-black font-mono text-[#fff1d1]">
            {roundScore} / {questions.length} <span className="text-xs text-[#ff9100] font-normal">marks</span>
          </span>

          <AnimatePresence>
            {scoreGain !== null && scoreGain > 0 && (
              <motion.span
                initial={{ opacity: 0, y: 0, scale: 0.8 }}
                animate={{ opacity: 1, y: -24, scale: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute right-1 font-mono font-black text-xs text-[#00b7cd] bg-[#0d282c] px-2 py-0.5 rounded-md border border-[#00b7cd]/60 shadow-lg pointer-events-none"
              >
                +1 Mark
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. Main Question Arena Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="w-full bg-[#1e0a08]/95 rounded-3xl p-6 sm:p-8 md:p-9 border border-[#ff9100]/40 relative shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl"
        >
          {/* Question Title & 15s Timer Ring */}
          <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-4 sm:gap-6 mb-5">
            <div className="space-y-1.5 text-left flex-1">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ff9100] bg-[#ff9100]/15 px-3 py-1 rounded-md border border-[#ff9100]/30">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="text-xs sm:text-sm text-[#fff1d1]/80 font-mono">
                  Rosen Discrete Mathematics (1 Mark)
                </span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-relaxed pt-1">
                {currentQ.question}
              </h3>
            </div>

            {/* Timer Ring */}
            <div className="shrink-0">
              <TimerRing timeLeft={timeLeft} totalTime={15} isPaused={isAnswered} />
            </div>
          </div>

          {/* 4 Large, High-Contrast Options in 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 mb-3">
            {currentQ.options.map((optionText, idx) => {
              const optionLetters = ["A", "B", "C", "D"];
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let cardStyle =
                "bg-[#290d0b]/80 border-[#ff9100]/30 hover:border-[#00b7cd] hover:bg-[#381310] text-[#fff1d1] shadow-md";

              let badgeStyle =
                "bg-[#3b1512] text-[#ff9100] border-[#ff9100]/40 group-hover:bg-[#00b7cd] group-hover:text-[#160706] group-hover:border-[#00b7cd]";

              if (isAnswered) {
                if (isCorrect) {
                  cardStyle =
                    "bg-[#00b7cd]/25 border-2 border-[#00b7cd] text-white shadow-[0_0_20px_rgba(0,183,205,0.4)] scale-[1.01]";
                  badgeStyle = "bg-[#00b7cd] text-[#160706] border-[#00b7cd] font-black";
                } else if (isSelected && !isCorrect) {
                  cardStyle =
                    "bg-[#df301c]/25 border-2 border-[#df301c] text-[#ffb4ab] shadow-[0_0_20px_rgba(223,48,28,0.4)]";
                  badgeStyle = "bg-[#df301c] text-white border-[#df301c] font-black";
                } else {
                  cardStyle = "bg-[#150605]/60 border-white/10 text-white/40";
                  badgeStyle = "bg-[#1f0907] text-white/40 border-white/10";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-150 flex items-center justify-between gap-3.5 group cursor-pointer ${cardStyle}`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl font-mono font-bold text-sm sm:text-base flex items-center justify-center border shrink-0 transition-all ${badgeStyle}`}
                    >
                      {optionLetters[idx]}
                    </span>
                    <span className="text-sm sm:text-base md:text-lg font-semibold leading-relaxed break-words">
                      {optionText}
                    </span>
                  </div>

                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#00b7cd] shrink-0 animate-bounce" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#df301c] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* 3. Feedback Banner & Next Button */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <div
                  className={`p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl ${
                    isCorrectAnswer
                      ? "bg-[#00b7cd]/15 border-[#00b7cd]/50"
                      : "bg-[#df301c]/15 border-[#df301c]/50"
                  }`}
                >
                  <div className="flex items-start gap-3.5 flex-1">
                    {isCorrectAnswer ? (
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#00b7cd] shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#df301c] shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <div className="text-sm sm:text-base font-black text-white">
                        {isCorrectAnswer
                          ? "Correct Answer! (+1 Mark)"
                          : selectedOption === -1
                          ? "Time Expired! (0 Marks)"
                          : "Incorrect Answer (0 Marks)"}
                      </div>
                      <div className="text-xs sm:text-sm text-[#fff1d1]/90 leading-relaxed">
                        <strong className="text-[#ff9100]">Explanation:</strong> {currentQ.explanation}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    className="w-full md:w-auto shrink-0 py-3 px-8 rounded-xl bg-gradient-to-r from-[#ff9100] via-[#ffa726] to-[#fff1d1] hover:brightness-110 text-[#160706] font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,145,0,0.4)] transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <span>
                      {currentIndex + 1 === questions.length
                        ? "Finish Round → See Results"
                        : "Next Question →"}
                    </span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
