import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";

const CustomInput = ({ value, setValue, placeholder, secureTextEntry, keyboardType = 'default'}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    maxWidth: 500,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginVertical: 10,
  },
  input: {
    padding: 8,
  },
});
export default CustomInput;
