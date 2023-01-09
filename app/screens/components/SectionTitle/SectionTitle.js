import { View, Text } from "react-native";
import React from "react";
import { TextStyles } from "../../../CommonStyles";

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
      <Text style={TextStyles.sectionTitleText}>{title}</Text>
    </View>
  );
};

export default SectionTitle;
