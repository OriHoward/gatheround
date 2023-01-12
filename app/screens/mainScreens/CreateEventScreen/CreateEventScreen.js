import { StyleSheet, View, ScrollView } from "react-native";
import React, { useState, useContext } from "react";
import { List, Button, HelperText, TextInput } from "react-native-paper";
import { AxiosContext } from "../../../context/AxiosContext";
import { useNavigation } from "@react-navigation/core";
import { DatePickerInput, TimePickerModal } from "react-native-paper-dates";
import { isPrintable } from "../../../utils/input-validation";

const CreateEventScreen = () => {
  const [name, setName] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTime, setEventTime] = useState(new Date());
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [limitAttending, setLimitAttending] = useState(""); // We will use this state in the future
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [category, setCategory] = useState("Choose Category");
  const [otherCategory, setOtherCategory] = useState("");
  const [expanded, setExpanded] = useState(false);

  const options = [
    { label: "Wedding", value: "Wedding" },
    { label: "Birthday", value: "Birthday" },
    { label: "Reunion", value: "Reunion" },
    { label: "Anniversary", value: "Anniversary" },
    { label: "Karaoke Night", value: "Karaoke Night" },
    { label: "Other", value: "Other" },
  ];

  const { authAxios } = useContext(AxiosContext);
  const navigation = useNavigation();

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

  const alertAccordingly = (isValidEventName) => {
    if (!isValidEventName) {
      alert("You must enter a valid event name!");
    }
  };

  /*
      This function sends a post request to create a new event in the data base.
    */

  const onCreateNewEventPressed = async () => {
    const isValidEventName = isPrintable(name);
    if (isValidEventName) {
      // backend format: %d/%m/%Y %H:%M
      const fdatetime = `${getFormattedDate()} ${getFormattedTime()}`;
      let categoryName = category === "Other" ? otherCategory : category;
      const eventData = {
        name,
        eventDate: fdatetime,
        categoryName,
        address,
        description,
      };
      try {
        const eventResponse = await authAxios.post("/events", eventData);
        if (eventResponse.status === 200) {
          setName("");
          setEventDate(new Date());
          setEventTime(new Date());
          setAddress("");
          setDescription("");
          navigation.navigate("Home");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alertAccordingly(isValidEventName);
    }
  };

  const peachColor = "#FF7F50";
  return (
    <View style={styles.root}>
      <TextInput
        label="Event Name"
        value={name}
        activeUnderlineColor={peachColor}
        onChangeText={(text) => setName(text)}
        style={styles.input}
        right={<TextInput.Icon icon="asterisk" color="maroon" size={15} />}
      />
      {name.length < 1 ? (
        <HelperText type="error" visible={!isPrintable(name)}>
          Please fill out this field.
        </HelperText>
      ) : (
        <></>
      )}
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
      <List.Accordion
        title={category}
        style={styles.dropDown}
        titleStyle={{ fontSize: 12 }}
        expanded={expanded}
        onPress={() => setExpanded(!expanded)}
      >
        {options.map((option) => (
          <List.Item
            key={option.value}
            title={option.label}
            onPress={() => {
              setCategory(option.value);
              setExpanded(false);
            }}
          />
        ))}
      </List.Accordion>

      {category === "Other" ? (
        <TextInput
          label="Add Category"
          value={otherCategory}
          activeUnderlineColor={peachColor}
          onChangeText={(text) => setOtherCategory(text)}
          style={styles.input}
        />
      ) : null}
      {category === "Other" && otherCategory.length < 1 ? (
        <HelperText type="error" visible={!isPrintable(name)}>
          Please fill out this field.
        </HelperText>
      ) : null}
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
  },
  button: {
    padding: 3,
    marginVertical: 5,
    borderRadius: 15,
  },
  input: {
    minWidth: 300,
    maxHeight: 70,
  },
  dropDown: {
    minWidth: 300,
    height: 50,
    backgroundColor: "#FFF",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
  },
});
export default CreateEventScreen;
