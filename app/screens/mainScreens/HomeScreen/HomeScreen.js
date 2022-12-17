import { View, Text, Platform } from "react-native";
import React, { useContext, useState } from "react";
import CustomButton from "../../components/CustomButton";
import EventButton from "../../components/EventButton";
import SectionTitle from "../../components/SectionTitle";
import { AuthContext } from "../../../context/AuthContext";
import { getValue } from "../../../utils/user-utils";

const HomeScreen = () => {
  const authContext = useContext(AuthContext);
  const logout = authContext.logout;
  const [isLoading, setLoading] = useState(true);

  if (isLoading) {
    getValue("isBusiness").then((value) => {
      authContext.setUserInfo({
        isBusiness: value === "true",
      });
      setLoading(false);
    });
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    const isHost = authContext.userInfo.isBusiness === true ? false : true;
    return (
      <View style={{ alignItems: "center" }}>
        <SectionTitle title={"My Invites"} />
        <EventButton />
        <EventButton />
        {isHost && <SectionTitle title={"My Events"} />}
        <EventButton isHost={isHost} />
        <EventButton isHost={isHost} />
        <CustomButton text="Sign Out" onPress={logout} />
      </View>
    );
  }
};

export default HomeScreen;
