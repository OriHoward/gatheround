import { View, ImageBackground, SectionList, FlatList } from "react-native";
import React, { useState, useContext } from "react";
import { AxiosContext } from "../../../context/AxiosContext";
import backgroundImage from "../../../../assets/Images/app-background.jpg";
import {
  Card,
  Avatar,
  Text,
  ActivityIndicator,
  Divider,
  Paragraph,
} from "react-native-paper";
import { CardStyles, EventCardStyles } from "../../../CommonStyles";
import SectionTitle from "../../components/SectionTitle";
import { categoryIcons } from "../../../utils/category-icons";

const ArchiveScreen = () => {
  const { authAxios } = useContext(AxiosContext);
  const [pastEvents, setPastEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getPastEvents = async () => {
    try {
      const response = await authAxios.get("/archive");
      const { data } = response;
      const { past_events = [] } = data;
      if (past_events.length === 0) {
        setPastEvents([
          {
            title: "No past events to display",
            data: past_events,
          },
        ]);
      } else {
        setPastEvents([
          {
            title: "Past Events",
            data: past_events,
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      setPastEvents([]);
    }
  };

  const renderPackage = ({ item }) => {
    const { id, currency, description, package_name, price } = item;
    return (
      <View style={{ marginBottom: 10 }}>
        <Text style={EventCardStyles.header2_date}>{package_name}</Text>
        <Text
          style={EventCardStyles.header2_time}
        >{`${price} ${currency}`}</Text>
      </View>
    );
  };

  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

  const renderItem = ({ item }) => {
    const { event, packages } = item;
    const {
      id,
      name,
      event_date,
      category,
      address,
      description,
      limit_attending,
    } = event;
    const [date, time] = event_date.split(" ");
    return (
      <Card style={CardStyles.cardContainer}>
        <Card.Title
          title={name}
          subtitle={address}
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon={categoryIcons[`${category}`]?.icon || "calendar-star"}
              color={"white"}
              style={{
                backgroundColor:
                  categoryIcons[`${category}`]?.color || "blueviolet",
              }}
            />
          )}
        />
        <Card.Content>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <Text style={EventCardStyles.header2_date}>{date}</Text>
            <Text style={EventCardStyles.header2_time}>{`, ${time}`}</Text>
          </View>
          <Paragraph>{description}</Paragraph>
          <Text> </Text>
          <Divider />
          {packages.length === 0 ? (
            <>
              <SectionTitle title={"No services were purchased"} />
            </>
          ) : (
            <>
              <SectionTitle title={"Services"} />
              <FlatList
                data={packages}
                renderItem={renderPackage}
                keyExtractor={(item) => item.id}
              />
            </>
          )}
        </Card.Content>
      </Card>
    );
  };

  if (isLoading) {
    getPastEvents()
      .then(() => setLoading(false))
      .catch((e) => console.error(e));
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }
  return (
    <View style={{ alignContent: "center", flex: 1 }}>
      <ImageBackground
        source={backgroundImage}
        style={{ flex: 1 }}
        imageStyle={{ opacity: 0.4 }}
      >
        <SectionList
          sections={pastEvents}
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
};

export default ArchiveScreen;
