import React, { useState } from "react";
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
import { useRouter } from "expo-router";
import { useLogin } from "../hooks/useLogin";
import styles from "../styles/login";
import googleIcon from "../assets/google-icon.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Usa el hook useLogin para manejar la lógica de inicio de sesión
  const { loginWithEmail, promptAsync, error, loading, isGoogleLoading } =
    useLogin(router);

  // Limpiar campos del formulario
  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  // Iniciar sesión con correo y contraseña
  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, ingresa correo y contraseña");
      return;
    }

    const result = await loginWithEmail(email, password);

    if (result.success) {
      Alert.alert("Éxito", "Inicio de sesión exitoso");

      clearForm();

      router.push("/");
    }
  };

  // Iniciar sesión con Google
  const handleGoogleLogin = async () => {
    await promptAsync();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.mainContainer}>
        {/* Columna izquierda - Formulario */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Iniciar Sesión</Text>

          {/* Mostrar errores */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Campo de correo electrónico */}
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Campo de contraseña */}
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Botón de inicio de sesión con correo y contraseña */}
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.disabledButton]}
            onPress={handleEmailLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>

          {/* Botón de inicio de sesión con Google */}
          <TouchableOpacity
            style={[
              styles.googleButton,
              isGoogleLoading && styles.disabledButton,
            ]}
            onPress={handleGoogleLogin}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              <ActivityIndicator color="#4285F4" size="small" />
            ) : (
              <>
                <Image source={googleIcon} style={styles.googleIcon} />
                <Text style={styles.googleButtonText}>
                  Iniciar sesión con Google
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* Enlace para registrarse */}
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.registerLink}>
              ¿No tienes cuenta? Regístrate
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
