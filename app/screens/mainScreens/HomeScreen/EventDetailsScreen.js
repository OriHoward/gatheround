import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  Card,
  Button,
  Title,
  Paragraph,
  Text,
  Divider,
  TextInput,
} from "react-native-paper";
import SectionTitle from "../../components/SectionTitle";

const EventDetailsScreen = ({ route }) => {
  const { id, name, event_date, address, description, limit_attending } =
    route.params;
  const [date, time] = event_date.split(" ");

  const [isSaved, setIsSaved] = useState(true);

  const peachColor = "#FF7F50";

  return isSaved ? (
    <View style={styles.root}>
      <Card mode="outlined" style={styles.cardContainer}>
        <Card.Content>
          <Title style={styles.boldText}>{name}</Title>
          <Text style={styles.boldText}>{date}</Text>
          <Text style={styles.normalText}>{time}</Text>
          <Text style={styles.normalText}>{address}</Text>
          <Text> </Text>
          <Divider />
          <SectionTitle title={"Invitation Details"} />
          <Paragraph>{description}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            icon="pencil"
            uppercase={false}
            color="black"
            onPress={() => setIsSaved(false)}
          >
            Edit
          </Button>
        </Card.Actions>
      </Card>
    </View>
  ) : (
    <View style={styles.root}>
      <Card mode="outlined" style={styles.cardContainer}>
        <Card.Content>
          <Title style={styles.boldText}>{"Edit Event Details"}</Title>
          <TextInput
            label={"Event Name"}
            value={name}
            activeUnderlineColor={peachColor}
          />
          <TextInput
            label={"Date"}
            value={date}
            activeUnderlineColor={peachColor}
          />
          <TextInput
            label={"Time"}
            value={time}
            activeUnderlineColor={peachColor}
          />
          <TextInput
            label={"Address"}
            value={address}
            activeUnderlineColor={peachColor}
          />
          <Text> </Text>
          <Divider />
          <SectionTitle title={"Invitation Details"} />
          <TextInput
            label={"Description"}
            value={description}
            activeUnderlineColor={peachColor}
          />
        </Card.Content>
        <Card.Actions>
          <Button
            icon="content-save-edit"
            uppercase={false}
            color="black"
            onPress={() => setIsSaved(true)}
          >
            Save
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignSelf: "center",
    width: 500,
    borderRadius: 15,
  },
  cardContainer: {
    alignSelf: "center",
    width: 500,
    borderRadius: 15,
  },
  boldText: { textAlign: "center", fontWeight: "bold" },
  normalText: { textAlign: "center" },
});
export default EventDetailsScreen;
