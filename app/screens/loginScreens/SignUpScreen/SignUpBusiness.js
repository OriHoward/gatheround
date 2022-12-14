import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { AxiosContext } from "../../../context/AxiosContext";
import { RadioButton } from "react-native-paper";

import { isValidStr, isValidNumber } from "../../../utils/input-validation";

const SignUpScreenBusiness = ({ route }) => {
  const [profession, setProffesion] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [isVisible, setVisible] = useState(true);
  const { publicAxios } = useContext(AxiosContext);

  const navigation = useNavigation();

  /*
    This functions alerts the user for invalid input
*/

  const alertAccordingly = (
    validProfession,
    validCountry,
    validCity,
    validPhoneNumber
  ) => {
    if (!validProfession) {
      alert("Invalid profession");
    }
    if (!validCountry) {
      alert("Invalid country");
    }
    if (!validCity) {
      alert("Invalid city");
    }
    if (!validPhoneNumber) {
      alert("Invalid phone Number");
    }
  };

  /*
    This function sends a post request with the user's params
  */

  const onCreateProfilePressed = async () => {
    const validProfession = isValidStr(profession);
    const validCountry = isValidStr(country);
    const validCity = isValidStr(city);
    const validPhoneNumber = isValidNumber(phoneNumber);
    if (validProfession && validCountry && validCity && validPhoneNumber) {
      const data = {
        profession,
        country,
        city,
        phoneNumber,
        isVisible,
        ...route.params, //these are the parameters that were passed from the previous page
      };
      try {
        const respone = await publicAxios.post("/users", data);
        if (respone.status == 200) {
          navigation.navigate("SignIn");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alertAccordingly(
        validProfession,
        validCountry,
        validCity,
        validPhoneNumber
      );
    }
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Add business profile info</Text>
        <CustomInput
          placeholder="Profession"
          value={profession}
          setValue={setProffesion}
        />
        <CustomInput
          placeholder="Country"
          value={country}
          setValue={setCountry}
        />
        <CustomInput placeholder="City" value={city} setValue={setCity} />
        <CustomInput
          placeholder="Phone Number"
          value={phoneNumber}
          setValue={setphoneNumber}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, color: "gray", marginTop: 8 }}>
            Show profile
          </Text>
          <RadioButton
            value="first"
            status={isVisible ? "checked" : "unchecked"}
            onPress={() => setVisible(true)}
          />
          <Text style={{ fontSize: 16, color: "gray", marginTop: 8 }}>
            Hide profile
          </Text>
          <RadioButton
            value="second"
            status={!isVisible ? "checked" : "unchecked"}
            onPress={() => setVisible(false)}
          />
        </View>
        <CustomButton text="Create Profile" onPress={onCreateProfilePressed} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
  logo: {
    width: "80%",
    maxWidth: 600,
    maxHeight: 450,
  },
});

export default SignUpScreenBusiness;
