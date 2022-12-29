import { View, StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import {
  Card,
  Button,
  Title,
  Paragraph,
  Text,
  Divider,
  TextInput,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import SectionTitle from "../../components/SectionTitle";
import { AxiosContext } from "../../../context/AxiosContext";
import { CardStyles } from "../../../CommonStyles";

const EventDetailsScreen = ({ route, navigation }) => {
  const { authAxios } = useContext(AxiosContext);
  const { id, name, event_date, address, description, limit_attending } =
    route.params;
  const [date, time] = event_date.split(" ");

  const [isSaved, setIsSaved] = useState(true);
  const [isDialogVisible, setDialogVisible] = useState(false);

  const peachColor = "#FF7F50";

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  const deleteEvent = async () => {
    // todo: send to back
    try {
      const response = await authAxios.delete(`/events/${id}`);
      console.log(`delete response ${response.status}`);
      hideDialog();
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
    }
  };

  return isSaved ? (
    <View style={styles.root}>
      <Card mode="outlined" style={CardStyles.cardContainer}>
        <Card.Content>
          <Title style={CardStyles.boldText}>{name}</Title>
          <Text style={CardStyles.boldText}>{date}</Text>
          <Text style={CardStyles.normalText}>{time}</Text>
          <Text style={CardStyles.normalText}>{address}</Text>
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
      <Card mode="outlined" style={CardStyles.cardContainer}>
        <Card.Content>
          <Title style={CardStyles.boldText}>{"Edit Event Details"}</Title>
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
          <Button
            icon="delete"
            uppercase={false}
            color="black"
            onPress={showDialog}
          >
            Delete
          </Button>
          <Provider>
            <View>
              <Portal>
                <Dialog visible={isDialogVisible} onDismiss={hideDialog}>
                  <Dialog.Title>Alert</Dialog.Title>
                  <Dialog.Content>
                    <Paragraph>
                      Are you sure you want to delete this event?
                    </Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button
                      uppercase={false}
                      color="black"
                      onPress={hideDialog}
                    >
                      Cancel
                    </Button>
                    <Button
                      uppercase={false}
                      color="black"
                      onPress={() =>
                        deleteEvent()
                          .then()
                          .catch((e) => console.error(e))
                      }
                    >
                      Yes
                    </Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
          </Provider>
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
});
export default EventDetailsScreen;
