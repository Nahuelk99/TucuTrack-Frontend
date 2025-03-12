import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAi1xT5IAeO706hjg-aeTaIEaIWRD5kEE4",
  authDomain: "pf-tucutrack-ce518.firebaseapp.com",
  projectId: "pf-tucutrack-ce518",
  storageBucket: "pf-tucutrack-ce518.firebasestorage.app",
  messagingSenderId: "336066728031",
  appId: "1:336066728031:web:43e04cf14eb711adeecbea",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Configurar autenticación
export const auth = getAuth(app);

// Configurar proveedor de Google
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account", // Forzar al usuario a seleccionar una cuenta
});

// Configurar Firestore
export const db = getFirestore(app);
