import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Searchbar } from "react-native-paper";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <View style={styles.root}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 10,
    maxWidth: 350,
  },
});

export default SearchScreen;
