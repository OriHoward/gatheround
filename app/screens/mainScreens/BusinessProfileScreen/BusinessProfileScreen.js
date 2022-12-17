import { View, Text } from "react-native";
import React from "react";
import SectionTitle from "../../components/SectionTitle";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <SectionTitle title={"My Profile"} />
    </View>
  );
};

export default ProfileScreen;
