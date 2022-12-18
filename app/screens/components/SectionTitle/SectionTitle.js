import { View, Text } from "react-native";
import React from "react";

const SectionTitle = ({ title }) => {
  return (
    <View
      style={{
        alignSelf: "center",
        alignItems: "center",
        flexDirection: "row",
        maxWidth: 500,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          color: "gray",
          fontWeight: "bold",
          padding: 15,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default SectionTitle;
