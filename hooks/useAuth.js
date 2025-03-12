// hooks/useAuth.js
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "expo-router";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Cargar datos adicionales del usuario desde Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          // Combinar datos de Firebase Authentication con datos de Firestore
          setUser({
            ...currentUser, // Datos de Firebase Authentication
            name: userDoc.data().name, // Nombre desde Firestore
          });
        } else {
          setUser(currentUser); // Usar solo los datos de Firebase Authentication
        }
      } else {
        setUser(null); // No hay usuario autenticado
      }
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert("Sesión cerrada", "Has cerrado sesión correctamente.");
      router.replace("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return { user, handleLogout };
};
