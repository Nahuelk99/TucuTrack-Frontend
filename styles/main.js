import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: width > 600 ? 50 : 20,
    paddingBottom: 100,
  },
  scrollView: {
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 40,
  },
  logo: {
    width: width > 600 ? 250 : 180,
    height: width > 600 ? 250 : 180,
    resizeMode: "contain",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    width: "100%",
  },
  card: {
    backgroundColor: "#4A90E2",
    borderRadius: 15,
    padding: 15,
    width: "45%",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  cardHovered: {
    backgroundColor: "#357ABD",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  cardContent: {
    alignItems: "center",
    padding: 5,
  },
  icon: {
    marginBottom: 8,
  },
  iconHovered: {
    transform: [{ scale: 1.1 }],
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 5,
    color: "#fff",
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 11,
    color: "#ddd",
    textAlign: "center",
    lineHeight: 14,
  },
});
