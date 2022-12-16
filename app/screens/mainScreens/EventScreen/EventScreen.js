import { StyleSheet, View, Text } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import React, { useState, useContext } from "react";
import SectionTitle from "../../components/SectionTitle";
import { AxiosContext } from "../../../context/AxiosContext";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigation } from "@react-navigation/core";

const EventScreen = () => {
  const [name, setName] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [limitAttending, setLimitAttending] = useState("");

  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);
  const navigate = useNavigation();

  const getFormattedDate = () => {
    //  backend format: %d/%m/%Y
    // +1 because Month starts from 0
    return `${eventDate.getDay()}/${
      eventDate.getMonth() + 1
    }/${eventDate.getFullYear()}`;
  };

  const onCreateNewEventPressed = async () => {
    const eventData = {
      name,
      eventDate: getFormattedDate(),
      address,
      description,
    };
    try {
      const eventResponse = await publicAxios.post("/events", eventData);
      // TODO: how to get userId
      // const userResponse = await publicAxios.get("/users", authContext.authState);
      if (eventResponse.status === 200) {
        const hostData = {
          eventId: eventResponse.data.eventId,
          userId: authContext.userInfo.id,
        };
        const hostResponse = await publicAxios.post("/hosts", hostData);
        if (hostResponse.status === 200) {
          console.log("Event: Success!");
          navigation.navigate("Home");
        }
      }
    } catch (error) {
      console.error(error);
    }
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
        value={eventDate}
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
