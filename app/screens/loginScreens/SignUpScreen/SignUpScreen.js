import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import { AxiosContext } from "../../../context/AxiosContext";

import {
  isValidEmail,
  isIdentical,
  isValidPassword,
  isValidStr,
} from "../../../utils/input-validation";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [isBusiness, setIsBusiness] = useState(false);
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const { publicAxios } = useContext(AxiosContext);

  const navigation = useNavigation();

  /*
    This functions alerts the user for invalid input
  */

  const alertAccordingly = (
    validFirstName,
    validLastName,
    validEmail,
    validPassword,
    validRepeat
  ) => {
    if (!validFirstName) {
      alert("Only letter are allowed");
    }
    if (!validLastName) {
      alert("Only letter are allowed");
    }
    if (!validEmail) {
      alert("Not a valid email");
    }
    if (!validPassword) {
      alert(
        "Password length must be between 5-20 and must contain atleast one letter and one digit"
      );
    }
    if (!validRepeat) {
      alert("Password and repeat password does not match");
    }
  };

  /*
    This function sends a post request if the user selected Host, 
    otherwise it navigates to the Business Sign Up screen with the user's params.
  */

  const onRegisterPressed = async () => {
    const validEmail = isValidEmail(email);
    const validFirstName = isValidStr(firstName);
    const validLastName = isValidStr(lastName);
    const validPassword = isValidPassword(password);
    const validRepeat = isIdentical(password, passwordRepeat);
    if (
      validFirstName &&
      validLastName &&
      validEmail &&
      validPassword &&
      validRepeat
    ) {
      const data = {
        email,
        firstName,
        lastName,
        password,
      };
      try {
        if (isBusiness) {
          navigation.navigate("SignUpBusiness", { ...data, isBusiness });
        } else {
          try {
            const response = await publicAxios.post("/users", data);
            navigation.navigate("SignIn");
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alertAccordingly(
        validFirstName,
        validLastName,
        validEmail,
        validPassword,
        validRepeat
      );
    }
  };

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  const onTermsOfUsePressed = () => {
    // does nothing
    console.log("onTermsOfUsePressed");
  };

  const onPrivacyPressed = () => {
    // does nothing
    console.log("onPrivacyPressed");
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>
        <CustomInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
          keyboardType="email-address"
        />
        <CustomInput
          placeholder="First Name"
          value={firstName}
          setValue={setFirstName}
        />
        <CustomInput
          placeholder="Last Name"
          value={lastName}
          setValue={setlastName}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomInput
          placeholder="Repeat Password"
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry={true}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, color: "gray", marginTop: 8 }}>
            Host
          </Text>
          <RadioButton
            value="first"
            status={!isBusiness ? "checked" : "unchecked"}
            onPress={() => setIsBusiness(false)}
          />
          <Text style={{ fontSize: 16, color: "gray", marginTop: 8 }}>
            Business
          </Text>
          <RadioButton
            value="second"
            status={isBusiness ? "checked" : "unchecked"}
            onPress={() => setIsBusiness(true)}
          />
        </View>
        <CustomButton text="Register" onPress={onRegisterPressed} />
        <Text style={styles.text}>
          By registering, you confirm that you accept our{" "}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{" "}
          and{" "}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
          .
        </Text>
        <SocialSignInButtons />
        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPressed}
          type="TERTIARY"
        />
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

export default SignUpScreen;
