import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AxiosContext } from "../../../context/AxiosContext";
import { TextInput } from "react-native-paper";

const EditEventScreen = ({ route }) => {
  const { authAxios } = useContext(AxiosContext);
  const [myEvent, setMyEvent] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  const peachColor = "#FF7F50";
  const { id, name, event_date, address, description, limit_attending } = route;
  setMyEvent({
    id,
    name,
    event_date,
    address,
    description,
    limit_attending,
  });
  //   const [date, time] = event_date.split(" ");
  return (
    <View style={{ alignItems: "center" }}>
      <TextInput
        label="Event Name"
        value={name}
        disabled={isDisabled}
        activeUnderlineColor={peachColor}
      />
    </View>
  );
};

export default EditEventScreen;
