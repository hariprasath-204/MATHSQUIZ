import { db } from "@/lib/firebase";
import { QUESTION_BANK } from "@/data/questionBank";
import { doc, setDoc } from "firebase/firestore";

export async function seedQuestionsToFirestore() {
  if (!db) {
    console.error("Firestore is not initialized.");
    return { success: false, message: "Firestore is not initialized" };
  }

  try {
    let seededCount = 0;
    for (const q of QUESTION_BANK) {
      const qRef = doc(db, "questions", q.id);
      await setDoc(qRef, {
        id: q.id,
        unit: q.unit,
        topic: q.topic,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        points: q.points,
        explanation: q.explanation,
      });
      seededCount++;
    }

    return {
      success: true,
      message: `Successfully seeded ${seededCount} questions to Firestore 'questions' collection!`,
      count: seededCount,
    };
  } catch (error) {
    console.error("Error seeding questions to Firestore:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error during seeding",
    };
  }
}
