import { View, StyleSheet, ImageBackground } from "react-native";
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
  Avatar,
} from "react-native-paper";
import SectionTitle from "../../components/SectionTitle";
import { AxiosContext } from "../../../context/AxiosContext";
import { CardStyles } from "../../../CommonStyles";
import backgroundImage from "../../../../assets/Images/app-background.jpg";
import { categoryIcons } from "../../../utils/category-icons";
import { DatePickerInput, TimePickerModal } from "react-native-paper-dates";

const EventDetailsScreen = ({ route, navigation }) => {
  const { authAxios } = useContext(AxiosContext);
  const {
    id,
    name,
    event_date,
    category,
    address,
    description,
    limit_attending,
  } = route.params;
  const [date, time] = event_date.split(" ");

  const [isSaved, setIsSaved] = useState(true);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTime, setEventTime] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [data, setData] = useState({
    id,
    name,
    date,
    time,
    category,
    address,
    description,
    limit_attending,
  });

  const peachColor = "#FF7F50";

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  const deleteEvent = async () => {
    try {
      const response = await authAxios.delete(`/events/${id}`);
      console.log(`delete response ${response.status}`);
      hideDialog();
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
    }
  };

  const getFormattedTime = () => {
    const hours = eventTime.getHours();
    const minutes = eventTime.getMinutes();
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`;
  };

  const getFormattedDate = () => {
    //  backend format: %d/%m/%Y
    // +1 because Month starts from 0
    return `${eventDate.getUTCDate()}/${
      eventDate.getMonth() + 1
    }/${eventDate.getFullYear()}`;
  };

  const putEventInfo = async () => {
    try {
      const fdatetime = `${getFormattedDate()} ${getFormattedTime()}`;
      const dataToSend = {
        ...data,
        eventDate: fdatetime,
      };
      const response = await authAxios.put("/events", dataToSend);
      if (response.status === 200) {
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return isSaved ? (
    <View style={styles.root}>
      <ImageBackground
        source={backgroundImage}
        style={{ flex: 1 }}
        imageStyle={{ opacity: 0.4 }}
      >
        <Card mode="outlined" style={CardStyles.cardContainer}>
          <Card.Content>
            <Title style={CardStyles.boldText}>{data.name}</Title>
            <Text style={CardStyles.boldText}>{data.date}</Text>
            <Text style={CardStyles.normalText}>{data.time}</Text>
            <Text style={CardStyles.normalText}>{data.address}</Text>
            <Text> </Text>
            <Divider />
            <SectionTitle title={"Invitation Details"} />
            <Paragraph>{data.description}</Paragraph>
          </Card.Content>
          <Avatar.Icon
            icon={categoryIcons[`${data.category}`].icon}
            color={"white"}
            size={50}
            style={{
              marginTop: 20,
              alignSelf: "center",
              backgroundColor: categoryIcons[`${data.category}`].color,
            }}
          />
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
      </ImageBackground>
    </View>
  ) : (
    <View style={styles.root}>
      <ImageBackground
        source={backgroundImage}
        style={{ flex: 1 }}
        imageStyle={{ opacity: 0.4 }}
      >
        <Card mode="outlined" style={CardStyles.cardContainer}>
          <Card.Content>
            <Title style={CardStyles.boldText}>{"Edit Event Details"}</Title>
            <TextInput
              label={"Event Name"}
              value={data.name}
              activeUnderlineColor={peachColor}
              onChangeText={(text) => setData({ ...data, name: text })}
            />
            <DatePickerInput
              value={eventDate}
              onChange={(date) => setEventDate(date)}
              label={"Event Date"}
              withDateFormatInLabel={false}
              activeUnderlineColor={peachColor}
              backgroundColor="#dddddd"
              validRange={{ startDate: new Date() }}
              style={styles.input}
            />
            <TimePickerModal
              visible={isTimePickerVisible}
              onDismiss={() => setTimePickerVisible(false)}
              onConfirm={({ hours, minutes }) => {
                eventTime.setHours(hours);
                eventTime.setMinutes(minutes);
                setTimePickerVisible(false);
              }}
              label="Select time"
              uppercase={false}
            />
            <TextInput
              label={"Event Time"}
              placeholder="Event Time"
              value={getFormattedTime()}
              style={styles.input}
              activeUnderlineColor={peachColor}
              right={
                <TextInput.Icon
                  icon="clock"
                  onPress={() => setTimePickerVisible(true)}
                />
              }
            />
            <TextInput
              label={"Address"}
              value={data.address}
              activeUnderlineColor={peachColor}
              onChangeText={(text) => setData({ ...data, address: text })}
            />
            <Text> </Text>
            <Divider />
            <SectionTitle title={"Invitation Details"} />
            <TextInput
              label={"Description"}
              value={data.description}
              activeUnderlineColor={peachColor}
              onChangeText={(text) => setData({ ...data, description: text })}
            />
          </Card.Content>
          <Card.Actions>
            <Button
              icon="content-save-edit"
              uppercase={false}
              color="black"
              onPress={() =>
                putEventInfo()
                  .then(() => setIsSaved(true))
                  .catch((e) => console.error(e))
              }
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
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignContent: "center",
    borderRadius: 15,
    flex: 1,
  },
});
export default EventDetailsScreen;
