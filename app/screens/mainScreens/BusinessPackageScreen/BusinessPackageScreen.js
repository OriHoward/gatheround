import { StyleSheet, View, Text } from "react-native";
import React, { useState, useContext } from "react";
import { Button, TextInput } from "react-native-paper";
import SectionTitle from "../../components/SectionTitle";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import { AxiosContext } from "../../../context/AxiosContext";
const BusinessPackageScreen = () => {
  const [packageName, setPackageName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const { authAxios } = useContext(AxiosContext);
  const navigation = useNavigation();

  const peachColor = "#FF7F50";
  const currencyList = ["Select Currunecy", "ILS", "USD", "EUR"];

  const OnAddPackagePressed = async () => {
    const packageData = {
      packageName,
      description,
      currency,
      price,
    };
    try {
      const packageResponse = await authAxios.post(
        "/business-package",
        packageData
      );
      if (packageResponse.status == 200) {
        navigation.navigate("Business Home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.root}>
      <SectionTitle title={"Create New Package"} />
      <TextInput
        label="Package Name"
        value={packageName}
        activeUnderlineColor={peachColor}
        onChangeText={(newName) => {
          setPackageName(newName);
        }}
        style={styles.input}
      />
      <TextInput
        multiline={true}
        label="Description"
        value={description}
        activeUnderlineColor={peachColor}
        onChangeText={(newDesc) => {
          setDescription(newDesc);
        }}
        style={[styles.input]}
      />
      <SelectDropdown
        data={currencyList}
        onSelect={(selectedItem, index) => {
          setCurrency(selectedItem);
        }}
        buttonStyle={styles.dropDown}
        defaultButtonText={"Select Currunecy"}
        buttonTextAfterSelection={(selectedItem) => {
          return selectedItem;
        }}
        rowTextForSelection={(item) => {
          return item;
        }}
      />
      <TextInput
        label="price"
        value={price}
        activeUnderlineColor={peachColor}
        onChangeText={(newPrice) => {
          setPrice(newPrice);
        }}
        style={styles.input}
        right={<TextInput.Icon icon="cash" />}
      />
      <Button
        uppercase={false}
        color={peachColor}
        mode="contained"
        onPress={OnAddPackagePressed}
        style={styles.button}
        labelStyle={{ fontWeight: "bold" }}
      >
        Create Package
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  button: {
    padding: 3,
    marginVertical: 5,
    borderRadius: 15,
  },
  input: {
    minWidth: 300,
    maxHeight: 70,
  },
  dropDown: {
    width: "20%",
  },
});
export default BusinessPackageScreen;
