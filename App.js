import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import SignInScreen from "./app/screens/SignInScreen";
import SignUpScreen from "./app/screens/SignUpScreen";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SignUpScreen />
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
