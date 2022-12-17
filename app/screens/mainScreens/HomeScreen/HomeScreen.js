import { View, Text, Platform } from "react-native";
import React, { useContext, useState } from "react";
import CustomButton from "../../components/CustomButton";
import EventButton from "../../components/EventButton";
import SectionTitle from "../../components/SectionTitle";
import { AuthContext } from "../../../context/AuthContext";
import { AxiosContext } from "../../../context/AxiosContext";

const HomeScreen = () => {
  const authContext = useContext(AuthContext);
  const { authAxios } = useContext(AxiosContext);
  const logout = authContext.logout;
  const [isLoading, setLoading] = useState(true);
  const [myEvents, setMyEvents] = useState([]);

  const getMyEvents = async () => {
    // console.log(authContext.getAccessToken())
    try {
      const response = await authAxios.get("/events");
      const { data } = response;
      const { my_events = [] } = data;
      console.log(response.data);
      setMyEvents(my_events);
    } catch (error) {
      console.error(error);
      setMyEvents([]);
    }
  };
  if (isLoading) {
    getMyEvents().then(() => {
      setLoading(false);
    });
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={{ alignItems: "center" }}>
        <SectionTitle title={"My Invites"} />
        <EventButton />
        <EventButton />
        <SectionTitle title={"My Events"} />
        {myEvents.map((entry) => {
          return <EventButton data={entry} isHost={true} />;
        })}
        <CustomButton text="Sign Out" onPress={logout} />
      </View>
    );
  }
};

export default HomeScreen;
