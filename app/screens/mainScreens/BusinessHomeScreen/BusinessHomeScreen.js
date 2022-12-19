import { View } from "react-native";
import React, { useContext } from "react";
import CustomButton from "../../components/CustomButton";
import EventButton from "../../components/EventButton";
import SectionTitle from "../../components/SectionTitle";
import { AuthContext } from "../../../context/AuthContext";
import { AxiosContext } from "../../../context/AxiosContext";

const BusinessHomeScreen = () => {
  const authContext = useContext(AuthContext);
  // We will use this in the future for new requests
  const { authAxios } = useContext(AxiosContext);
  const logout = authContext.logout;

  return (
    <View style={{ alignItems: "center" }}>
      <SectionTitle title={"My Invites"} />
      <EventButton />
      <CustomButton text="Sign Out" onPress={logout} />
    </View>
  );
};

export default BusinessHomeScreen;
