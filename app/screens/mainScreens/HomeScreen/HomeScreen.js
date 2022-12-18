import { View, Text, Platform, SectionList } from "react-native";
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
  const [myEvents, setMyEvents] = useState([{}]);

  const getMyEvents = async () => {
    try {
      const response = await authAxios.get("/events");
      const { data } = response;
      const { my_events = [] } = data;
      setMyEvents([
        {
          title: "My Invites",
          data: [],
        },
        {
          title: "My Events",
          data: my_events,
        },
      ]);
    } catch (error) {
      console.error(error);
      // setMyEvents([]);
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
      <View
        style={{
          alignContent: "center",
        }}
      >
        <SectionList
          sections={myEvents}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => {
            const {
              id,
              name,
              event_date,
              address,
              description,
              limit_attending,
            } = item;
            return (
              <EventButton
                isHost={true}
                name={name}
                event_date={event_date}
                address={address}
              />
            );
          }}
          renderSectionHeader={({ section: { title } }) => (
            <SectionTitle title={title} />
          )}
        />
        <CustomButton text="Sign Out" onPress={logout} />
      </View>
    );
  }
};

export default HomeScreen;
