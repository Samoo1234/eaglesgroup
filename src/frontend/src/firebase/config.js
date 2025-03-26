import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCg7GapqC-MZFyDRI7Roi8DcrJXeRWWxyM",
  authDomain: "eaglesgroup-59508.firebaseapp.com",
  projectId: "eaglesgroup-59508",
  storageBucket: "eaglesgroup-59508.appspot.com",
  messagingSenderId: "529455442509",
  appId: "1:529455442509:web:615a0a8c17a381bc404a04",
  measurementId: "G-JRDRVJKJBS"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar serviços do Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

console.log('Firebase inicializado com sucesso:', {
  auth: !!auth,
  db: !!db,
  storage: !!storage
});

export default app;
