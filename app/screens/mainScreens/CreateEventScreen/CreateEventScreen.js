import { StyleSheet, View, Picker } from "react-native";
import React, { useState, useContext } from "react";
import { Button, HelperText, TextInput } from "react-native-paper";
import SectionTitle from "../../components/SectionTitle";
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
  const [option, setOption] = useState("Choose Category");
  const [otherCategory, setOtherCategory] = useState("");

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
      const eventData = {
        name,
        eventDate: fdatetime,
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
    } else {
      alertAccordingly(isValidEventName);
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
      <Picker
        selectedValue={option}
        onValueChange={(itemValue, itemIndex) => setOption(itemValue)}
        style={styles.picker}
        itemStyle={styles.pickerItem}
      >
        <Picker.Item label="Choose Category" />
        <Picker.Item label="Wedding" value={"Wedding"} />
        <Picker.Item label="Birthday" value={"Birthday"} />
        <Picker.Item label="Reunion" value={"Reunion"} />
        <Picker.Item label="Anniversary" value={"Anniversary"} />
        <Picker.Item label="Karaoke Night" value={"Karaoke Night"} />
        <Picker.Item label="Other" value={"Other"} />
      </Picker>
      {option === "Other" ? (
        <TextInput
          label="Add Category"
          value={otherCategory}
          activeUnderlineColor={peachColor}
          onChangeText={(text) => setOtherCategory(text)}
          style={styles.input}
        />
      ) : null}
      {option === "Other" && otherCategory.length < 1 ? (
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
  picker: {
    minWidth: 300,
    height: 50,
    backgroundColor: "#FFF",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
  },
  pickerItem: {
    color: "#000",
    fontSize: 18,
  },
});
export default CreateEventScreen;
