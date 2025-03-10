// styles/about.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  footer: {
    width: "auto",
    backgroundColor: "#2c3e50",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  poweredBy: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
    marginLeft: 10,
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    marginRight: 10,
  },
  email: {
    fontSize: 14,
    color: "#fff",
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});
