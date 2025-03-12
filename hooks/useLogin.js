import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  deleteUser,
} from "firebase/auth";
import { auth } from "../services/firebase";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

WebBrowser.maybeCompleteAuthSession();

export const useLogin = (router) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Iniciar sesión con correo y contraseña
  const loginWithEmail = async (email, password) => {
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      switch (error.code) {
        case "auth/user-not-found":
          setError("El correo electrónico no está registrado");
          break;
        case "auth/wrong-password":
          setError("Contraseña incorrecta");
          break;
        case "auth/invalid-email":
          setError("Correo electrónico inválido");
          break;
        case "auth/invalid-credential":
          // Manejar el error genérico de credenciales inválidas
          if (error.message.includes("email")) {
            setError("El correo electrónico no está registrado");
          } else if (error.message.includes("password")) {
            setError("Contraseña incorrecta");
          } else {
            setError("Credenciales inválidas");
          }
          break;
        default:
          setError("Hubo un problema al iniciar sesión: " + error.message);
      }
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Iniciar sesión con Google
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "336066728031-fqnpampevfgung7cihibcmft4cq08m8g.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    redirectUri: makeRedirectUri({ scheme: "tucutrack" }),
  });

  useEffect(() => {
    if (response?.type === "success") {
      setIsGoogleLoading(true);
      const { authentication } = response;
      const credential = GoogleAuthProvider.credential(
        authentication.idToken,
        authentication.accessToken
      );

      // Autenticar con Google
      signInWithCredential(auth, credential)
        .then(async (userCredential) => {
          const user = userCredential.user;

          // Verificar si el usuario ya está registrado en Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            // Si el usuario no está registrado, mostrar un mensaje de error
            setError("Este correo no está registrado. Regístrate primero.");

            // Eliminar el usuario de Firebase Authentication
            await deleteUser(user);
            console.log(
              "Usuario no registrado eliminado de Firebase Authentication"
            );

            return;
          }

          console.log("Inicio de sesión con Google exitoso");
          if (router) {
            router.push("/"); // Redirigir solo si el router está definido
          }
        })
        .catch((error) => {
          console.error("Error en inicio de sesión con Google:", error);
          setError("No se pudo completar el inicio de sesión con Google.");
        })
        .finally(() => {
          setIsGoogleLoading(false);
        });
    } else if (response?.type === "error" || response?.type === "cancel") {
      setIsGoogleLoading(false);
    }
  }, [response, router]);

  return { loginWithEmail, promptAsync, error, loading, isGoogleLoading };
};
