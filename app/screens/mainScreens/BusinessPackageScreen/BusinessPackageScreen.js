import { StyleSheet, View, Text } from "react-native";
import React, { useState, useContext } from "react";
import { Button, TextInput, RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AxiosContext } from "../../../context/AxiosContext";
import { isPrintable, isNumber } from "../../../utils/input-validation";

const BusinessPackageScreen = () => {
  const [packageName, setPackageName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("ILS");
  const { authAxios } = useContext(AxiosContext);
  const [checked, setChecked] = React.useState("first");
  const navigation = useNavigation();

  const peachColor = "#FF7F50";

  const setCurrencyStatus = (currency, checked) => {
    setCurrency(currency);
    setChecked(checked);
  };

  const OnAddPackagePressed = async () => {
    const packageData = {
      packageName,
      description,
      currency,
      price,
    };
    try {
      if (isPrintable(packageName) && isNumber(price)) {
        const packageResponse = await authAxios.post(
          "/business-package",
          packageData
        );
        if (packageResponse.status == 200) {
          setPackageName("");
          setDescription("");
          setPrice("");
          setCurrency("");
          navigation.navigate("Home");
        }
      } else {
        alert("Make sure you fill everything correctly");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.root}>
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
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.switch_style}>ILS</Text>
        <RadioButton
          value="first"
          status={checked === "first" ? "checked" : "unchecked"}
          onPress={() => setCurrencyStatus("ILS", "first")}
        />
        <Text style={styles.switch_style}>USD</Text>
        <RadioButton
          value="second"
          status={checked === "second" ? "checked" : "unchecked"}
          onPress={() => setCurrencyStatus("USD", "second")}
        />
        <Text style={styles.switch_style}>EUR</Text>
        <RadioButton
          value="third"
          status={checked === "third" ? "checked" : "unchecked"}
          onPress={() => setCurrencyStatus("EUR", "third")}
        />
      </View>
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
    width: "50%",
  },
});
export default BusinessPackageScreen;
