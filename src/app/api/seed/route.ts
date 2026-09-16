import { NextResponse } from "next/server";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, writeBatch, serverTimestamp } from "firebase/firestore";
import { QUESTION_BANK } from "@/data/questionBank";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBxDxtoOZ6oSgefuIqnSU8ebRikQ4q6Npc",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "maths-25c83.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "maths-25c83",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "maths-25c83.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1061652020241",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1061652020241:web:4c43e9ab85dd6f4680c5b0",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-5QMGLED3ZM"
};

export async function GET() {
  try {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const db = getFirestore(app);

    const batch = writeBatch(db);

    // 1. Seed all 45 Questions
    for (const q of QUESTION_BANK) {
      const qRef = doc(db, "questions", q.id);
      batch.set(qRef, {
        id: q.id,
        unit: q.unit,
        topic: q.topic,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        points: q.points,
        explanation: q.explanation,
      });
    }

    // 2. Seed Creator initial showcase result in 'results' & 'students'
    const creatorRef = doc(db, "results", "26PCA135");
    batch.set(creatorRef, {
      studentId: "26PCA135",
      name: "S. HARI PRASATH",
      rollNo: "26PCA135",
      round1Score: 320,
      round2Score: 345,
      round3Score: 360,
      totalScore: 1025,
      completedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const studentRef = doc(db, "students", "26PCA135");
    batch.set(studentRef, {
      name: "S. HARI PRASATH",
      rollNo: "26PCA135",
      round1Score: 320,
      round2Score: 345,
      round3Score: 360,
      totalScore: 1025,
      round1Done: true,
      round2Done: true,
      round3Done: true,
      createdAt: serverTimestamp(),
    });

    await batch.commit();

    return NextResponse.json({
      success: true,
      message: `Successfully seeded all ${QUESTION_BANK.length} MCQs and initial leaderboard record to Firebase Firestore!`,
      totalQuestions: QUESTION_BANK.length,
      collectionsSeeded: ["questions", "results", "students"],
    });
  } catch (error) {
    console.error("Seeding API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown seeding error",
      },
      { status: 500 }
    );
  }
}
