import React, { useState } from "react";
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
import {
  isValidEmail,
  isIdentical,
  isValidUsername,
  isValidPassword,
} from "../../../utils/input-validation";

const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const { height } = useWindowDimensions();

  const navigation = useNavigation();

  const alertAccordingly = (
    validUsername,
    validEmail,
    validPassword,
    validRepeat
  ) => {
    if (!validUsername) {
      alert(
        "Username can only contain numbers and digits with one ' _ ' in between"
      );
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
    const validUsername = isValidUsername(username);
    const validEmail = isValidEmail(email);
    const validPassword = isValidPassword(password);
    const validRepeat = isIdentical(password, passwordRepeat);
    if (validUsername && validEmail && validPassword && validRepeat) {
      const data = {
        username,
        password,
        email,
      };
      try {
        const resp = await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const jsonData = await resp.json();
        console.log(jsonData, "FROM BACKEND");
        if (jsonData.status === "accepted") {
          navigation.navigate("SignIn");
        } else {
          alert("Something went wrong, Please try again later");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alertAccordingly(validUsername, validEmail, validPassword, validRepeat);
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
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.2 }]}
          resizeMode="contain"
        />
        <Text style={styles.title}>Create an account</Text>
        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
          keyboardType="email-address"
        />
        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
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
