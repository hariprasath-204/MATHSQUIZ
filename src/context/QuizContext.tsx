"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { db, auth, signInAnonymously } from "@/lib/firebase";
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { soundFx } from "@/lib/sound";
import { Question } from "@/data/questionBank";
import { fetchRoundQuestions } from "@/lib/firestoreQuestions";

export interface StudentSession {
  id: string;
  name: string;
  rollNo: string;
  round1Score: number;
  round2Score: number;
  round3Score: number;
  totalScore: number;
  round1Done: boolean;
  round2Done: boolean;
  round3Done: boolean;
  createdAt?: string;
  lastActiveAt?: string;
}

interface QuizContextType {
  student: StudentSession | null;
  isLoading: boolean;
  isMuted: boolean;
  toggleMute: () => void;
  registerStudent: (name: string, rollNo: string) => Promise<boolean>;
  completeRound: (roundNum: 1 | 2 | 3, roundScore: number) => Promise<void>;
  resetQuizSession: () => void;
  calculateScore: (isCorrect: boolean, timeRemaining: number, basePoints?: number) => number;
  fetchRoundQuestions: (roundNum: 1 | 2 | 3) => Promise<Question[]>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "mca_maths_quiz_student";

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<StudentSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Initialize from LocalStorage and attempt Firestore sync
  useEffect(() => {
    const initSession = async () => {
      try {
        const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (localData) {
          const parsed: StudentSession = JSON.parse(localData);
          setStudent(parsed);

          // Try syncing with Firestore if available
          if (db && parsed.id) {
            try {
              const docRef = doc(db, "students", parsed.id);
              const snap = await getDoc(docRef);
              if (snap.exists()) {
                const remoteData = snap.data() as StudentSession;
                const merged = { ...parsed, ...remoteData };
                setStudent(merged);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
              }
            } catch (err) {
              console.warn("Firestore sync warning (falling back to local cache):", err);
            }
          }
        }
      } catch (e) {
        console.error("Error loading student session", e);
      } finally {
        setIsLoading(false);
      }
    };

    initSession();
  }, []);

  const toggleMute = () => {
    const next = soundFx.toggleMute();
    setIsMuted(next);
  };

  const registerStudent = async (name: string, rollNo: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      soundFx.playClick();

      // Clean input
      const cleanName = name.trim().toUpperCase();
      const cleanRollNo = rollNo.trim().toUpperCase();
      const generatedId = `std_${cleanRollNo.replace(/[^A-Z0-9]/gi, "_")}_${Date.now().toString(36)}`;

      let authUid = generatedId;
      try {
        if (auth) {
          const userCredential = await signInAnonymously(auth);
          if (userCredential?.user?.uid) {
            authUid = userCredential.user.uid;
          }
        }
      } catch (authErr) {
        console.warn("Anonymous auth optional notice:", authErr);
      }

      const newStudent: StudentSession = {
        id: authUid,
        name: cleanName,
        rollNo: cleanRollNo,
        round1Score: 0,
        round2Score: 0,
        round3Score: 0,
        totalScore: 0,
        round1Done: false,
        round2Done: false,
        round3Done: false,
        createdAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
      };

      // Save locally first for guaranteed zero-delay UI response
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newStudent));
      setStudent(newStudent);

      // Save to Firestore collections: `students` and initial `results`
      try {
        if (db) {
          await setDoc(doc(db, "students", authUid), {
            ...newStudent,
            serverCreatedAt: serverTimestamp(),
          });
          await setDoc(doc(db, "results", authUid), {
            studentId: authUid,
            name: cleanName,
            rollNo: cleanRollNo,
            round1Score: 0,
            round2Score: 0,
            round3Score: 0,
            totalScore: 0,
            updatedAt: serverTimestamp(),
          });
        }
      } catch (fsErr) {
        console.warn("Firestore save notice:", fsErr);
      }

      return true;
    } catch (err) {
      console.error("Failed to register student", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const completeRound = async (roundNum: 1 | 2 | 3, roundScore: number) => {
    if (!student) return;

    const r1 = roundNum === 1 ? roundScore : student.round1Score;
    const r2 = roundNum === 2 ? roundScore : student.round2Score;
    const r3 = roundNum === 3 ? roundScore : student.round3Score;

    const r1Done = roundNum === 1 ? true : student.round1Done;
    const r2Done = roundNum === 2 ? true : student.round2Done;
    const r3Done = roundNum === 3 ? true : student.round3Done;

    const total = r1 + r2 + r3;

    const updatedStudent: StudentSession = {
      ...student,
      round1Score: r1,
      round2Score: r2,
      round3Score: r3,
      totalScore: total,
      round1Done: r1Done,
      round2Done: r2Done,
      round3Done: r3Done,
      lastActiveAt: new Date().toISOString(),
    };

    setStudent(updatedStudent);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedStudent));

    // Update in Firestore
    try {
      if (db && student.id) {
        const studentRef = doc(db, "students", student.id);
        const resultRef = doc(db, "results", student.id);

        const updatePayload = {
          round1Score: r1,
          round2Score: r2,
          round3Score: r3,
          totalScore: total,
          round1Done: r1Done,
          round2Done: r2Done,
          round3Done: r3Done,
          lastActiveAt: serverTimestamp(),
        };

        await updateDoc(studentRef, updatePayload).catch(async () => {
          await setDoc(studentRef, { ...updatedStudent, serverCreatedAt: serverTimestamp() }, { merge: true });
        });

        await updateDoc(resultRef, {
          name: student.name,
          rollNo: student.rollNo,
          round1Score: r1,
          round2Score: r2,
          round3Score: r3,
          totalScore: total,
          updatedAt: serverTimestamp(),
        }).catch(async () => {
          await setDoc(resultRef, {
            studentId: student.id,
            name: student.name,
            rollNo: student.rollNo,
            round1Score: r1,
            round2Score: r2,
            round3Score: r3,
            totalScore: total,
            updatedAt: serverTimestamp(),
          });
        });
      }
    } catch (err) {
      console.warn("Firestore update error (persisted locally):", err);
    }
  };

  const resetQuizSession = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setStudent(null);
  };

  // Pure scoring: Strictly 1 mark per correct answer, 0 for incorrect/expired
  const calculateScore = (isCorrect: boolean, _timeRemaining?: number, _basePoints?: number): number => {
    return isCorrect ? 1 : 0;
  };

  return (
    <QuizContext.Provider
      value={{
        student,
        isLoading,
        isMuted,
        toggleMute,
        registerStudent,
        completeRound,
        resetQuizSession,
        calculateScore,
        fetchRoundQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
