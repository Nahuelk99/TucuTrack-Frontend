import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/layout";

export const Header = ({ user, onLogout }) => {
  const navigation = useNavigation();

  // Obtener el nombre corto del usuario
  const getUserName = () => {
    if (user.name) {
      return user.name;
    } else if (user.displayName) {
      return user.displayName;
    }
    return "Usuario";
  };

  // Obtener la foto de perfil o usar un ícono por defecto
  const getUserImage = () => {
    if (user.photoURL) {
      return <Image source={{ uri: user.photoURL }} style={styles.userImage} />;
    } else {
      return (
        <Ionicons
          name="person-circle"
          size={40}
          color="rgba(0, 0, 0, 0.3)"
          style={styles.userIcon}
        />
      );
    }
  };

  return (
    <View style={styles.headerContainer}>
      {user ? (
        // Vista cuando el usuario está logueado
        <View style={styles.userContainer}>
          {getUserImage()}
          <Text style={styles.userName}>{getUserName()}</Text>
          <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Vista cuando el usuario NO está logueado
        <View style={styles.authButtonsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("login")}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
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
  );
};
