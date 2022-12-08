import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const SectionTitle = ({ title }) => {
  return (
    <View
      style={{
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
