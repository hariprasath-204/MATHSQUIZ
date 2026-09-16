import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, writeBatch, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxDxtoOZ6oSgefuIqnSU8ebRikQ4q6Npc",
  authDomain: "maths-25c83.firebaseapp.com",
  projectId: "maths-25c83",
  storageBucket: "maths-25c83.firebasestorage.app",
  messagingSenderId: "1061652020241",
  appId: "1:1061652020241:web:4c43e9ab85dd6f4680c5b0",
  measurementId: "G-5QMGLED3ZM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkAndSeed() {
  console.log("Checking Firebase Firestore connection...");
  try {
    const qCol = collection(db, "questions");
    const snap = await getDocs(qCol);
    console.log(`Current questions in Firestore: ${snap.size}`);
  } catch (err) {
    console.error("Firestore check:", err.message);
  }
}

checkAndSeed();
