import { View, Text, SectionList, ImageBackground } from "react-native";
import React, { useContext, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { AxiosContext } from "../../../context/AxiosContext";
import { useFocusEffect } from "@react-navigation/native";
import { EventCardStyles, TextStyles } from "../../../CommonStyles";
import {
  ActivityIndicator,
  Card,
  IconButton,
  Avatar,
} from "react-native-paper";
import { CardStyles } from "../../../CommonStyles";
import backgroundImage from "../../../../assets/Images/app-background.jpg";
import { categoryIcons } from "../../../utils/category-icons";

const HomeScreen = ({ navigation }) => {
  const { authAxios } = useContext(AxiosContext);
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
      if (my_events.length === 0) {
        setMyEvents([
          {
            title: "No events to display",
            data: my_events,
          },
        ]);
      } else {
        setMyEvents([
          {
            title: "My Events",
            data: my_events,
          },
        ]);
      }
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

  const RightContent = (props) => (
    <IconButton {...props} icon="chevron-right" disabled={true} />
  );

  const renderItem = ({ item }) => {
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
    const [day, month, year] = date.split("/");
    const formattedDate = `${year}-${month}-${day}T${time}`;
    return (
      <Card
        style={CardStyles.cardContainer}
        mode="outlined"
        onPress={() =>
          navigation.navigate("Details", {
            id,
            name,
            event_date: formattedDate,
            category,
            address,
            description,
            limit_attending,
          })
        }
      >
        <Card.Title
          title={name}
          subtitle={address}
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon={categoryIcons[`${category}`]?.icon || "calendar-star"}
              color={"white"}
              style={{
                backgroundColor: categoryIcons[`${category}`]?.color || "blue",
              }}
            />
          )}
          right={RightContent}
        />
        <Card.Content>
          <View style={{ flexDirection: "row" }}>
            <Text style={EventCardStyles.header2_date}>{date}</Text>
            <Text style={EventCardStyles.header2_time}>{`, ${time}`}</Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

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
      <View style={{ padding: 20 }}>
        <ActivityIndicator animating={true} />
      </View>
    );
  } else {
    return (
      <View style={{ alignContent: "center", flex: 1 }}>
        <ImageBackground
          source={backgroundImage}
          style={{ flex: 1 }}
          imageStyle={{ opacity: 0.4 }}
        >
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
            renderItem={renderItem}
            renderSectionHeader={({ section: { title } }) => (
              <SectionTitle title={title} />
            )}
            onRefresh={() => setLoading(true)}
            refreshing={isLoading}
          />
        </ImageBackground>
      </View>
    );
  }
};

export default HomeScreen;
