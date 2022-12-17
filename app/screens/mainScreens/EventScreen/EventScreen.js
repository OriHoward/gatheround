import { StyleSheet, View } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import React, { useState, useContext } from "react";
import SectionTitle from "../../components/SectionTitle";
import { AxiosContext } from "../../../context/AxiosContext";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigation } from "@react-navigation/core";
import { DatePickerInput } from "react-native-paper-dates";

const EventScreen = () => {
  const [name, setName] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [limitAttending, setLimitAttending] = useState("");

  const authContext = useContext(AuthContext);
  const { authAxios } = useContext(AxiosContext);
  const navigation = useNavigation();

  const getFormattedDate = () => {
    //  backend format: %d/%m/%Y
    // +1 because Month starts from 0
    return `${eventDate.getDay()}/${
      eventDate.getMonth() + 1
    }/${eventDate.getFullYear()}`;
  };

  const onDateChange = (date) => {
    setEventDate(date);
  };

  const onCreateNewEventPressed = async () => {
    const eventData = {
      name,
      eventDate: getFormattedDate(),
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
      <View style={styles.container}>
        <DatePickerInput
          value={eventDate}
          onChange={onDateChange}
          label={"Event Date"}
          date
          withDateFormatInLabel={false}
          activeUnderlineColor="#FF7F50"
          backgroundColor="#dddddd"
          validRange={{ startDate: new Date() }}
        />
      </View>
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
  container: {
    backgroundColor: "#dddddd",
    width: "100%",
    maxWidth: 500,
    padding: 15,
    marginVertical: 7,
    borderRadius: 15,
  },
  header1: { fontSize: 24, fontWeight: "bold" },
  header2_date: { fontSize: 16, fontWeight: "bold", padding: 2 },
  header2_time: { fontSize: 16 },
  header3: { fontSize: 16, color: "gray" },
});
export default EventScreen;
