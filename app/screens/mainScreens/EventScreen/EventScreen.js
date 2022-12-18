import { StyleSheet, View } from "react-native";
import React, { useState, useContext } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import SectionTitle from "../../components/SectionTitle";
import { AxiosContext } from "../../../context/AxiosContext";
import { useNavigation } from "@react-navigation/core";
import { DatePickerInput, TimePickerModal } from "react-native-paper-dates";

const EventScreen = () => {
  const [name, setName] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTime, setEventTime] = useState({});
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [limitAttending, setLimitAttending] = useState("");
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const { authAxios } = useContext(AxiosContext);
  const navigation = useNavigation();

  const getFormattedTime = (time) => {
    const { hours, minutes } = time;
    if (!hours || !minutes) {
      return "";
    }
    return `${hours}:${minutes}`;
  };
  const getFormattedDate = () => {
    //  backend format: %d/%m/%Y
    // +1 because Month starts from 0
    return `${eventDate.getUTCDate()}/${
      eventDate.getMonth() + 1
    }/${eventDate.getFullYear()}`;
  };

  const onCreateNewEventPressed = async () => {
    const fdate = getFormattedDate();
    console.log(fdate);
    const eventData = {
      name,
      eventDate: fdate,
      address,
      description,
    };
    try {
      const eventResponse = await authAxios.post("/events", eventData);
      if (eventResponse.status === 200) {
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const peachColor = "#FF7F50";
  return (
    <View style={styles.root}>
      <SectionTitle title={"Create New Event"} />
      <TextInput
        label="Event Name"
        value={name}
        activeUnderlineColor={peachColor}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <DatePickerInput
        value={eventDate}
        onChange={(date) => {
          console.log(getFormattedDate());
          setEventDate(date);
        }}
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
          setEventTime({
            hours,
            minutes,
          });
          setTimePickerVisible(false);
        }}
        label="Select time"
        uppercase={false}
      />
      <TextInput
        placeholder="Event Time"
        value={getFormattedTime(eventTime)}
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
        label="Address"
        value={address}
        activeUnderlineColor={peachColor}
        onChangeText={(text) => setAddress(text)}
        style={styles.input}
      />
      <TextInput
        label="Invitation Description (Optional)"
        value={description}
        activeUnderlineColor={peachColor}
        onChangeText={(text) => setDescription(text)}
        style={styles.input}
      />
      <Button
        uppercase={false}
        color={peachColor}
        mode="contained"
        onPress={onCreateNewEventPressed}
        style={styles.button}
        labelStyle={{ fontWeight: "bold" }}
      >
        Create Event
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    flexDirection: "column",
  },
  button: {
    padding: 3,
    marginVertical: 5,
    borderRadius: 15,
  },
  input: {
    minWidth: 300,
  },
});
export default EventScreen;
