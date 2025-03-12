// app/_layout.jsx
import React from "react";
import { Stack } from "expo-router";
import { View } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { Header } from "../components/Header";
import styles from "../styles/layout";

export default function Layout() {
  const { user, handleLogout } = useAuth();

  return (
    <View style={styles.container}>
      {/* Stack de navegación */}
      <Stack
        screenOptions={{
          headerRight: () => <Header user={user} onLogout={handleLogout} />,
        }}
      >
        {/* Página de inicio */}
        <Stack.Screen
          name="index"
          options={{
            title: "Inicio", // Nombre en español
          }}
        />

        {/* Página de registro */}
        <Stack.Screen
          name="register"
          options={{
            title: "Registro", // Nombre en español
          }}
        />

        {/* Página de inicio de sesión */}
        <Stack.Screen
          name="login"
          options={{
            title: "Iniciar Sesión", // Nombre en español
          }}
        />

        {/* Página de seguimiento */}
        <Stack.Screen
          name="tracking"
          options={{
            title: "Seguimiento", // Nombre en español
          }}
        />

        {/* Página de tarifas */}
        <Stack.Screen
          name="prices"
          options={{
            title: "Tarifas", // Nombre en español
          }}
        />

        {/* Página de horarios */}
        <Stack.Screen
          name="schedules"
          options={{
            title: "Horarios", // Nombre en español
          }}
        />

        {/* Página de chat */}
        <Stack.Screen
          name="chat"
          options={{
            title: "Chat", // Nombre en español
          }}
        />

        {/* Página de acerca de */}
        <Stack.Screen
          name="about"
          options={{
            title: "Acerca de", // Nombre en español
          }}
        />
      </Stack>
    </View>
  );
}
