// styles/Register.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row", // Lado a lado
    padding: 20,
  },
  formContainer: {
    flex: 1, // Toma la mitad del espacio
    paddingRight: 20,
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1, // Toma la otra mitad del espacio
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
  },
  loginLink: {
    marginTop: 15,
    alignItems: "center",
    padding: 10,
  },
  loginLinkText: {
    color: "#4285F4", // Color azul de Google
    fontSize: 15,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});
