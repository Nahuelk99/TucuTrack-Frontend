import React from "react";
import { View, Text, Pressable, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/about";

export default function About() {
  const handleEmailPress = () => {
    Linking.openURL("mailto:nahueljuarez@alu.frt.utn.edu.ar");
  };

  return (
    <View style={styles.footer}>
      <Text style={styles.poweredBy}>Powered by ©Nahuel Juarez</Text>

      <Pressable onPress={handleEmailPress} style={styles.emailContainer}>
        <Ionicons name="mail-outline" size={20} color="#fff" />
        <Text style={styles.email}>nahueljuarez@alu.frt.utn.edu.ar</Text>
      </Pressable>
    </View>
  );
}
