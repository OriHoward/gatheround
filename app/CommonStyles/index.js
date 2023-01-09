import { StyleSheet } from "react-native";

export const SearchStyles = StyleSheet.create({
  dropdownButtonStyle: {
    width: "80%",
    height: 50,
    backgroundColor: "#FFF",
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#444",
    marginLeft: 20,
  },
});

export const CardStyles = StyleSheet.create({
  cardContainer: {
    alignSelf: "center",
    width: 500,
    borderRadius: 15,
  },
  boldText: { textAlign: "center", fontWeight: "bold" },
  normalText: { textAlign: "center" },
});

export const TextStyles = StyleSheet.create({
  sectionTitleText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    fontWeight: "bold",
    padding: 15,
  },
});
