import { StyleSheet, View, Text } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import React, { useState } from "react";

const EventScreen = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [description, setDescription] = useState("");
  const [limitAttending, setLimitAttending] = useState("");

  const createNewEventOnPress = () => {
    alert("New event created");
  };
  return (
    <View style={styles.root}>
      <CustomInput
        placeholder="Event Name"
        value={eventName}
        setValue={setEventName}
        type="event"
        inputType="event"
      />
      <CustomInput
        placeholder="Select Date and Time"
        value={eventDate}
        setValue={setEventDate}
        type="event"
        inputType="event"
      />
      <CustomInput
        placeholder="Address"
        value={eventAddress}
        setValue={setEventAddress}
        type="event"
        inputType="event"
      />
      <CustomInput
        placeholder="Invitation Description (Optional)"
        value={description}
        setValue={setDescription}
        type="event"
        inputType="event"
      />
      <CustomButton text="Create New Event" onPress={createNewEventOnPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
});
export default EventScreen;
