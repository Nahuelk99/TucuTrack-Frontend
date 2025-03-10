import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  userName: {
    marginRight: 15,
    fontWeight: "bold",
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
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  loginButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  registerButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#28a745",
    borderRadius: 5,
    marginRight: 26,
  },
  registerButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
