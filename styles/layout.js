import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userIcon: {
    marginRight: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 20,
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 26,
    backgroundColor: "#ff4444",
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  authButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginButton: {
    marginRight: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 5,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  registerButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#28a745",
    borderRadius: 5,
    marginRight: 50,
  },
  registerButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
