import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const ConfirmEmailScreen = () => {
  const [code, setCode] = useState("");

  const navigation = useNavigation();

  const onConfirmPressed = () => {
    navigation.navigate("SignIn");
  };

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  const onResendPressed = () => {
    // does nothing
    console.log("onResendPressed");
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>
        <CustomInput
          placeholder="Enter your confirmation code"
          value={code}
          setValue={setCode}
        />
        <CustomButton text="Confirm" onPress={onConfirmPressed} />
        <CustomButton
          text="Resend code"
          onPress={onResendPressed}
          type="SECONDARY"
        />
        <CustomButton
          text="Back to Sign In"
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
});

export default ConfirmEmailScreen;
