import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}
      >
        {" "}
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 500,
    padding: 15,
    marginVertical: 7,
    alignItems: "center",
    borderRadius: 15,
  },

  container_PRIMARY: {
    backgroundColor: "#FF7F50",
  },

  container_SECONDARY: {
    borderColor: "#FF7F50",
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: "bold",
    color: "white",
  },

  text_SECONDARY: {
    color: "#FF7F50",
  },

  text_TERTIARY: {
    color: "grey",
  },
});

export default CustomButton;
