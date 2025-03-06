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
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  pickerContainer: {
    marginBottom: 15,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 5,
  },
  tiposDiaContainer: {
    marginBottom: 15,
  },
  buttonGroupContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  groupButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#4A90E2",
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  selectedGroupButton: {
    backgroundColor: "#4A90E2",
  },
  groupButtonText: {
    fontSize: 14,
    color: "#333",
  },
  selectedGroupButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  horariosContainer: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  tableContent: {
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#fff",
  },
  horarioText: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingTableContainer: {
    padding: 20,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
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
  noHorarios: {
    textAlign: "center",
    padding: 20,
    fontSize: 16,
    color: "#666",
  },
  // Estilos específicos para web (pueden ser usados con Platform.select)
  webPickerWrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
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
