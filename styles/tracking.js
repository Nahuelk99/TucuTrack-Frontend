import { StyleSheet } from "react-native";

export default StyleSheet.create({
  containerWithMargins: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "white",
  },

  filtersContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  filterItem: {
    flex: 1,
    marginHorizontal: 6,
  },

  // Estilos para los combobox (Picker)
  pickerContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  picker: {
    height: 35,
    color: "#000",
    backgroundColor: "#f9f9f9",
    marginLeft: 5,
    marginRight: 5,
  },
  pickerItem: {
    fontSize: 15,
    color: "#000",
  },

  // Estilos para las etiquetas de los combobox
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 16,
  },

  mapContainerWithMargins: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },

  locationButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  locationButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  errorText: {
    color: "red",
    marginBottom: 16,
    textAlign: "center",
    fontSize: 16,
  },

  retryButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },

  retryButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
