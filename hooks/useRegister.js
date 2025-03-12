import { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

export const useRegister = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Función para validar los datos del formulario
  const validateFormData = (name, email, password, confirmPassword) => {
    // Validar campos obligatorios
    if (!name.trim()) {
      return "El nombre es obligatorio";
    }

    if (!email.trim()) {
      return "El correo electrónico es obligatorio";
    }

    if (!password) {
      return "La contraseña es obligatoria";
    }

    if (!confirmPassword) {
      return "Confirma tu contraseña";
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      return "Las contraseñas no coinciden";
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "El formato del correo electrónico es inválido";
    }

    // Validar longitud de la contraseña
    if (password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
    }

    return null;
  };

  const registerWithEmail = async (name, email, password, confirmPassword) => {
    setError("");
    setLoading(true);

    try {
      // Primero validar el formulario
      const validationError = validateFormData(
        name,
        email,
        password,
        confirmPassword
      );
      if (validationError) {
        setError(validationError);
        setLoading(false);
        return { success: false, validationError };
      }

      // Crear usuario con email y contraseña
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Guardar información adicional del usuario en Firestore
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: email,
          createdAt: new Date(),
          registeredWithEmail: true,
          isActive: true,
        });
        console.log("Documento de usuario creado con éxito");
      } catch (firestoreError) {
        console.error("Error al guardar en Firestore:", firestoreError);
      }

      // Cerrar sesión después del registro exitoso
      try {
        await signOut(auth);
        console.log("Sesión cerrada con éxito");
      } catch (signOutError) {
        console.error("Error al cerrar sesión:", signOutError);
      }

      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error("Error de registro:", error.code, error.message);

      let errorMessage;
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "El correo electrónico ya está registrado";
          break;
        case "auth/invalid-email":
          errorMessage = "Correo electrónico inválido";
          break;
        case "auth/weak-password":
          errorMessage = "La contraseña es demasiado débil";
          break;
        default:
          errorMessage = "Hubo un problema al registrar tu cuenta";
      }

      setError(errorMessage);
      setLoading(false);
      return { success: false, firebaseError: error.code };
    }
  };

  return { registerWithEmail, error, loading, setError };
};

export default useRegister;
