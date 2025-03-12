import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { useNavigation } from "expo-router";
import { auth } from "../services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import styles from "../styles/layout";
import About from "../components/About";

export default function Layout() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  /*
  useEffect(() => {
    // Listener de cambios de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
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
      navigation.navigate("index");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };*/

  return (
    <View style={styles.container}>
      {/* Stack de navegación */}
      <Stack
        screenOptions={{
          headerRight: () => (
            <View style={styles.headerContainer}>
              {user ? (
                // Vista cuando el usuario está logueado
                <View style={styles.userContainer}>
                  {user.photoURL && (
                    <Image
                      source={{ uri: user.photoURL }}
                      style={styles.userImage}
                    />
                  )}
                  <Text style={styles.userName}>
                    {user.displayName || user.email}
                  </Text>
                  <TouchableOpacity
                    onPress={handleLogout}
                    style={styles.logoutButton}
                  >
                    <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                // Vista cuando el usuario NO está logueado
                <View style={styles.authButtonsContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      alert(
                        "Funcionalidad de inicio de sesión estará disponible pronto."
                      )
                    }
                    style={styles.loginButton}
                  >
                    <Text>Iniciar Sesión</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("register")}
                    style={styles.registerButton}
                  >
                    <Text style={styles.registerButtonText}>Registrarse</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ),
        }}
      />
      <About />
    </View>
  );
}
