import { View, Text } from "react-native";
import React, { useContext } from "react";
import CustomButton from "../../components/CustomButton";
import { AuthContext } from "../../../context/AuthContext";

const HomeScreen = () => {
  const authContext = useContext(AuthContext);
  const logout = authContext.logout;
  return (
    <View>
      <Text style={{ fontSize: 24, alignSelf: "center" }}>Homepage</Text>
      <CustomButton text="Sign Out" onPress={logout} />
    </View>
  );
};

export default HomeScreen;
