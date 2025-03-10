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
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#4A90E2",
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  selectedGroupButton: {
    backgroundColor: "#4A90E2",
  },
  groupButtonText: {
    fontSize: 15,
    color: "#333",
  },
  selectedGroupButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  horariosContainer: {
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#4A90E2",
    paddingVertical: 10,
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  tableContent: {
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
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
    fontSize: 15,
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
  noHorarios: {
    textAlign: "center",
    padding: 20,
    fontSize: 16,
    color: "#666",
  },
  // Estilos específicos para web (pueden ser usados con Platform.select)
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
