import { Platform, StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
    minHeight: "100%",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: "contain",
  },
  pickerContainer: {
    marginBottom: 15,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#4A90E2",
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
    overflow: "hidden",
  },
  picker: {
    height: 35,
    color: "#333",
    backgroundColor: "#f9f9f9",
    marginLeft: 5,
    marginRight: 5,
  },
  pickerItem: {
    fontSize: 15,
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 6,
    marginBottom: 5,
    color: "#333",
  },
  priceContainer: {
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderColor: "#4A90E2",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#4A90E2",
    alignItems: "center",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#333",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    padding: 10,
  },
  // Estilos específicos para web
  webPickerWrapper: {
    borderWidth: 1,
    borderColor: "#4A90E2",
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
    height: 40,
    justifyContent: "center",
  },
  // Responsive layout para pantallas más grandes
  responsive: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  halfWidth: {
    width: Platform.OS === "web" ? "48%" : "100%",
    marginHorizontal: Platform.OS === "web" ? "1%" : 0,
  },
});
