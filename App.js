import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Navigation from "./app/navigation";
import MainContainer from "./app/screens/mainScreens/MainContainer";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
