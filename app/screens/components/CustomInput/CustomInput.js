import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  type = "primary",
  inputType = "regular",
}) => {
  return (
    <View style={styles[`container_${type}`]}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles[`input_${inputType}`]}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container_primary: {
    backgroundColor: "white",
    width: "100%",
    maxWidth: 500,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginVertical: 10,
  },
  container_event: {
    width: "100%",
    maxWidth: 500,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 8,
    marginVertical: 10,
  },

  input_regular: {
    padding: 8,
  },
  input_event: {
    backgroundColor: "#dddddd",
    borderRadius: 15,
    padding: 15,
    height: 65,
  },
});
export default CustomInput;
