import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Logo from "../../../../assets/Images/logo-transparent-background.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import { AxiosContext } from "../../../context/AxiosContext";

import {
  isValidEmail,
  isIdentical,
  isValidPassword,
  isValidName,
} from "../../../utils/input-validation";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const { publicAxios } = useContext(AxiosContext);

  const { height } = useWindowDimensions();

  const navigation = useNavigation();

  const alertAccordingly = (
    validFirstName,
    validLastName,
    validEmail,
    validPassword,
    validRepeat
  ) => {
    if (!validFirstName) {
      alert("All first name letters must be lowercase");
    }
    if (!validLastName) {
      alert("All last name letters must be lowercase");
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

  const onRegisterPressed = async () => {
    const validEmail = isValidEmail(email);
    const validFirstName = isValidName(firstName);
    const validLastName = isValidName(lastName);
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
        const response = await publicAxios.post("/users", data);
        if (response.status == 200) {
          navigation.navigate("SignIn");
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
