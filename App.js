import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import SignInScreen from "./app/screens/SignInScreen";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SignInScreen />
      <Text></Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
