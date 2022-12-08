import { View, Text } from "react-native";
import React from "react";

const SectionTitle = ({ title }) => {
  return (
    <View>
      <Text
        style={{ fontSize: 16, color: "gray", fontWeight: "bold", padding: 15 }}
      >
        title
      </Text>
    </View>
  );
};

export default SectionTitle;
