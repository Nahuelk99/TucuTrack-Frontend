// hooks/useAuth.js
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

// Variable global para controlar si estamos en proceso de registro
let isRegistrationProcess = false;

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log(
        "Estado de autenticación cambió:",
        currentUser ? "Usuario autenticado" : "No hay usuario"
      );

      if (!isRegistrationProcess && currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUserData({
              ...currentUser,
              ...userSnap.data(),
            });
          } else {
            setUserData(currentUser);
          }
        } catch (error) {
          console.error("Error al obtener datos de usuario:", error);
          setUserData(currentUser);
        }
      } else if (!isRegistrationProcess) {
        setUserData(null);
      }

      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Sesión cerrada manualmente");
      setUserData(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Funciones para controlar el estado de registro
  const setRegistrationMode = (value) => {
    isRegistrationProcess = value;
    console.log("Modo registro:", value ? "ACTIVADO" : "DESACTIVADO");
  };

  return { user: userData, loading, handleLogout, setRegistrationMode };
};

// Función auxiliar para usar fuera del hook
export const markAsRegistrationProcess = (value) => {
  isRegistrationProcess = value;
};
