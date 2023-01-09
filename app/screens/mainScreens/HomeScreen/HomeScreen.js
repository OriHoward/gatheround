import { View, Text, SectionList } from "react-native";
import React, { useContext, useState } from "react";
import CustomButton from "../../components/CustomButton";
import EventButton from "../../components/EventButton";
import SectionTitle from "../../components/SectionTitle";
import { AuthContext } from "../../../context/AuthContext";
import { AxiosContext } from "../../../context/AxiosContext";
import { useFocusEffect } from "@react-navigation/native";
import { TextStyles } from "../../../CommonStyles";

const HomeScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const { authAxios } = useContext(AxiosContext);
  const logout = authContext.logout;
  const [isLoading, setLoading] = useState(true);
  const [myEvents, setMyEvents] = useState([{}]);
  const [userName, setUserName] = useState({});
  /*
    This function sends a get request for the 2 upcoming events.
  */

  const getMyEvents = async () => {
    try {
      const response = await authAxios.get("/events?host-limit=4");
      const { data } = response;
      const { my_events = [] } = data;
      setMyEvents([
        {
          title: "My Events",
          data: my_events,
        },
      ]);
    } catch (error) {
      console.error(error);
      setMyEvents([]);
    }
  };

  const getUserName = async () => {
    try {
      const response = await authAxios.get("/users");
      const { data } = response;
      const {
        id,
        email,
        first_name: firstName,
        last_name: lastName,
        join_date,
      } = data;
      setUserName({ firstName, lastName });
    } catch (error) {
      console.error(error);
      // todo: anything else?
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
    }, [])
  );

  if (isLoading) {
    getMyEvents()
      .then(() =>
        getUserName()
          .then(() => setLoading(false))
          .catch((e) => console.error(e))
      )
      .catch((e) => {
        console.error(e);
      });
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={{ alignContent: "center" }}>
        <Text
          style={[
            TextStyles.sectionTitleText,
            { color: "black", fontSize: 20 },
          ]}
        >
          {`Hello there, ${userName.firstName}!`}
        </Text>
        <SectionList
          sections={myEvents}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => {
            const {
              id,
              name,
              event_date,
              category,
              address,
              description,
              limit_attending,
            } = item;
            const [date, time] = event_date.split(" ");
            return (
              <EventButton
                isHost={true}
                name={name}
                event_date={date}
                event_time={time}
                category={category}
                address={address}
                onPress={() =>
                  navigation.navigate("Details", {
                    id,
                    name,
                    event_date,
                    address,
                    description,
                    limit_attending,
                  })
                }
              />
            );
          }}
          renderSectionHeader={({ section: { title } }) => (
            <SectionTitle title={title} />
          )}
          onRefresh={() => setLoading(true)}
          refreshing={isLoading}
        />
      </View>
    );
  }
};

export default HomeScreen;
