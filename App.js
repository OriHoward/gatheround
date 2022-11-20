import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import SignInScreen from "./app/screens/SignInScreen";
import SignUpScreen from "./app/screens/SignUpScreen";
import ConfirmEmailScreen from "./app/screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "./app/screens/ForgotPasswordScreen";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ForgotPasswordScreen />
      {/* <ConfirmEmailScreen /> */}
      {/* <SignUpScreen /> */}
      {/* <SignInScreen /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
