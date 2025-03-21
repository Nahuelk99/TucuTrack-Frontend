// components/Register.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useNavigation } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import googleIcon from "../assets/google-icon.png";
import { makeRedirectUri } from "expo-auth-session";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { auth, db } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRegister } from "../hooks/useRegister";
import styles from "../styles/register";
import { markAsRegistrationProcess } from "../hooks/useAuth";

WebBrowser.maybeCompleteAuthSession();

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const {
    registerWithEmail,
    error: emailError,
    loading,
    setError,
  } = useRegister();
  const navigation = useNavigation();

  // Configuración de Google Sign-In
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "336066728031-fqnpampevfgung7cihibcmft4cq08m8g.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    redirectUri: makeRedirectUri({ scheme: "tucutrack" }),
  });

  // Limpiar campos del formulario
  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(""); // Limpiar cualquier error previo
  };

  // Manejar la respuesta de Google
  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;

      // Activar modo registro antes de iniciar el proceso
      markAsRegistrationProcess(true);

      const credential = GoogleAuthProvider.credential(
        authentication.idToken,
        authentication.accessToken
      );

      signInWithCredential(auth, credential)
        .then(async (userCredential) => {
          const user = userCredential.user;

          await setDoc(doc(db, "users", user.uid), {
            name: user.displayName || "Usuario Google",
            email: user.email,
            createdAt: new Date(),
            registeredWithGoogle: true,
          });

          await signOut(auth); // Cerrar sesión después del registro

          // Desactivar modo registro una vez completado
          markAsRegistrationProcess(false);

          // Mostrar alerta de éxito
          alert("Tu cuenta ha sido creada con Google.");

          // Limpiar campos
          clearForm();

          // Navegar a login
          navigation.navigate("login");

          setIsGoogleLoading(false); // Terminar loading
        })
        .catch((error) => {
          console.error("Error en registro con Google:", error);
          markAsRegistrationProcess(false);
          alert("No se pudo completar el registro con Google.");
          setIsGoogleLoading(false); // Terminar loading en caso de error
        });
    } else if (response?.type === "error" || response?.type === "cancel") {
      // Desactivar modo registro en caso de cancelación
      markAsRegistrationProcess(false);
      setIsGoogleLoading(false); // Terminar loading si hay error o cancelación
    }
  }, [response]);

  // Registrar con correo y contraseña
  const handleEmailRegister = async () => {
    console.log("Intentando registrar...");

    const result = await registerWithEmail(
      name,
      email,
      password,
      confirmPassword
    );

    if (result.success) {
      console.log("Registro exitoso, mostrando alerta...");

      // Usar alert() nativo del navegador en vez de Alert.alert
      alert("¡Tu cuenta ha sido creada exitosamente!");

      // Limpiar los campos del formulario
      clearForm();

      // Navegar a login
      navigation.navigate("login");
    } else if (result.validationError) {
      console.log("Error de validación:", result.validationError);
      alert(result.validationError);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.mainContainer}>
        {/* Columna izquierda - Formulario */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Registro</Text>
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]}
            onPress={handleEmailRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.buttonText}>Registrarse con correo</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.googleButton,
              isGoogleLoading && styles.disabledButton,
            ]}
            onPress={() => {
              setIsGoogleLoading(true);
              promptAsync();
            }}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              <ActivityIndicator color="#4285F4" size="small" />
            ) : (
              <>
                <Image source={googleIcon} style={styles.googleIcon} />
                <Text style={styles.googleButtonText}>
                  Registrarse con Google
                </Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={styles.loginLinkText}>
              ¿Ya tienes una cuenta? Inicia sesión
            </Text>
          </TouchableOpacity>
        </View>

        {/* Columna derecha - Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/Logo-TucuTrack.png")}
            style={styles.logo}
          />
        </View>
      </View>
    </ScrollView>
  );
}
