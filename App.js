import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Navigation from "./app/navigation";
import { LogBox } from 'react-native';




const App = () => {
  LogBox.ignoreAllLogs(true)
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