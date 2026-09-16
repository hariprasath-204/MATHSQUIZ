import { db } from "@/lib/firebase";
import { QUESTION_BANK, Question } from "@/data/questionBank";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  writeBatch,
} from "firebase/firestore";

/**
 * Ensures all 45 syllabus questions are stored in Firebase Firestore.
 * If the collection is empty or missing documents, it writes them into Firestore.
 */
export async function ensureQuestionsInFirestore(): Promise<void> {
  if (!db) return;

  try {
    const questionsCol = collection(db, "questions");
    const snapshot = await getDocs(questionsCol);

    // If Firestore does not have questions, seed all 45 questions immediately
    if (snapshot.empty || snapshot.size < QUESTION_BANK.length) {
      console.log("Seeding question bank to Firebase Firestore...");
      const batch = writeBatch(db);

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

      await batch.commit();
      console.log("Successfully seeded 45 questions to Firestore 'questions' collection!");
    }
  } catch (error) {
    console.error("Error ensuring questions in Firestore:", error);
  }
}

/**
 * Fetches questions directly from Firebase Firestore for the specified unit,
 * and shuffles them randomly for the round.
 */
export async function getQuestionsFromFirestore(
  unitNum: 3 | 4 | 5,
  count: number = 15
): Promise<Question[]> {
  if (!db) {
    // If no db connection, fallback to local bank
    return QUESTION_BANK.filter((q) => q.unit === unitNum).slice(0, count);
  }

  try {
    // First ensure questions exist in Firestore
    await ensureQuestionsInFirestore();

    // Query Firestore for questions of this specific unit
    const qQuery = query(collection(db, "questions"), where("unit", "==", unitNum));
    const querySnapshot = await getDocs(qQuery);

    let list: Question[] = [];

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Question;
        list.push({
          id: doc.id,
          unit: data.unit,
          topic: data.topic,
          question: data.question,
          options: data.options,
          correctIndex: data.correctIndex,
          points: data.points || 10,
          explanation: data.explanation || "",
        });
      });
    }

    // If Firestore returned fewer than needed, fill from initial bank
    if (list.length === 0) {
      list = QUESTION_BANK.filter((q) => q.unit === unitNum);
    }

    // Fisher-Yates shuffle
    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count);
  } catch (err) {
    console.error(`Error fetching Unit ${unitNum} questions from Firestore:`, err);
    return QUESTION_BANK.filter((q) => q.unit === unitNum).slice(0, count);
  }
}

export function calculateScore(
  isCorrect: boolean,
  _timeRemaining?: number,
  _basePoints?: number
): number {
  return isCorrect ? 1 : 0;
}

export async function fetchRoundQuestions(roundNum: 1 | 2 | 3): Promise<Question[]> {
  const unitNum = roundNum === 1 ? 3 : roundNum === 2 ? 4 : 5;
  return getQuestionsFromFirestore(unitNum as 3 | 4 | 5, 15);
}

