import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDlpMjbCOSK9O40U6vcITUAF8TDhtUAUG0",
  authDomain: "conversormoedasapp.firebaseapp.com",
  projectId: "conversormoedasapp",
  storageBucket: "conversormoedasapp.firebasestorage.app",
  messagingSenderId: "705105975547",
  appId: "1:705105975547:web:a3ef14bbc29ce45459785e",
  measurementId: "G-VP45G6MR7K"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta o Firestore para usar no serviço
export const db = getFirestore(app);
