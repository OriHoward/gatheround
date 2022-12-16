import { StyleSheet, View, Text } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";

const EventScreen = () => {
  const [name, setName] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [limitAttending, setLimitAttending] = useState("");

  const getFormattedDate = () => {
    //  backend format: %d/%m/%Y
    // +1 because Month starts from 0
    return `${eventDate.getDay()}/${
      eventDate.getMonth() + 1
    }/${eventDate.getFullYear()}`;
  };

  const onCreateNewEventPressed = () => {
    alert("New event created");
  };

  return (
    <View style={styles.root}>
      <SectionTitle title={"Create New Event"} />
      <CustomInput
        placeholder="Event Name"
        value={name}
        setValue={setName}
        type="event"
        inputType="event"
      />
      <CustomInput
        placeholder="Select Date and Time"
        value={setEventDate}
        setValue={setEventDate}
        type="event"
        inputType="event"
      />
      <CustomInput
        placeholder="Address"
        value={address}
        setValue={setAddress}
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
      <CustomButton text="Create Event" onPress={onCreateNewEventPressed} />
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
