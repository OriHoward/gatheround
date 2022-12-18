import { StyleSheet, View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { Searchbar, Button } from "react-native-paper";
import { AxiosContext } from "../../../context/AxiosContext";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dataToDisplay, setDataToDispay] = useState([]);
  const { authAxios } = useContext(AxiosContext);

  const onChangeSearch = (query) => setSearchQuery(query);

  const onSearchClick = async () => {
    try {
      const resp = await authAxios.get(
        `/business-search?profession=${searchQuery}`
      );
      const { data } = resp;
      const { results = [] } = data;
      setDataToDispay(results);
    } catch (error) {
      console.error(error);
      setDataToDispay([]);
    }
  };
  return (
    <View style={styles.root}>
      <View style={styles.root}>
        <Searchbar
          onIconPress={onSearchClick}
          placeholder="Search profession"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <Button color="black" uppercase={false} onPress={() => setDataToDispay([])}>
          Clear
        </Button>
      </View>
      <View>
        {dataToDisplay.map((entry) => {
          const { id, profession, country, city, phone_number } = entry;
          return (
            <View key={id} style={{ alignItems: "center" }}>
              <Text>{profession}</Text>
              <Text>{country}</Text>
              <Text>{city}</Text>
              <Text>{phone_number}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    alignSelf: "center",
    alignItems: "center",
    padding: 10,
    maxWidth: 350,
  },
});

export default SearchScreen;
