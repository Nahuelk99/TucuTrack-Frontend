import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

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

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#3e4b53",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: width,
  },
  poweredBy: {
    fontSize: 14,
    color: "#fff",
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  email: {
    fontSize: 14,
    color: "#fff",
    textDecorationLine: "underline",
  },
});
