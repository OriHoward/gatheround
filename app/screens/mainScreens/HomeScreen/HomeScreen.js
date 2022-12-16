import { View } from "react-native";
import React, { useContext } from "react";
import CustomButton from "../../components/CustomButton";
import EventButton from "../../components/EventButton";
import SectionTitle from "../../components/SectionTitle";
import { AuthContext } from "../../../context/AuthContext";

const HomeScreen = () => {
  const authContext = useContext(AuthContext);
  const logout = authContext.logout;
  console.log(authContext.userInfo)
  return (
    <View style={{ alignItems: "center" }}>
      <SectionTitle title={"My Invites"} />
      <EventButton />
      <EventButton />
      <SectionTitle title={"My Events"} />
      <EventButton isHost={true} />
      <EventButton isHost={true} />
      <CustomButton text="Sign Out" onPress={logout} />
    </View>
  );
};

export default HomeScreen;
