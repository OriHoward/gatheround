import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import Navigation from "./app/navigation";

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
