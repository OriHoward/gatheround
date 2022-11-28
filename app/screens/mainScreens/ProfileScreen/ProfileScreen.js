import { View, Text } from "react-native";
import React from "react";

const ProfileScreen = ({ navigation }) => {
  return (
    <View>
      <Text onPress={() => navigation.navigate("Home")}>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;
