import { View, ImageBackground, SectionList } from "react-native";
import React, { useState, useContext } from "react";
import { AxiosContext } from "../../../context/AxiosContext";
import backgroundImage from "../../../../assets/Images/app-background.jpg";
import {
  Card,
  Button,
  Avatar,
  Text,
  ActivityIndicator,
} from "react-native-paper";
import { CardStyles } from "../../../CommonStyles";
import SectionTitle from "../../components/SectionTitle";

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

  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

  const renderItem = () => {
    return (
      <Card style={CardStyles.cardContainer}>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={LeftContent}
        />
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
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
