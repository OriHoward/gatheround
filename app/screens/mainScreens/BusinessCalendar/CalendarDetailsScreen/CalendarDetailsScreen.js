import { View, Text } from "react-native";
import React from "react";

const CalendarDetailsScreen = ({ route }) => {
  console.log(route.params.data);
  return (
    <View>
      <Text>CalendarDetailsScreen</Text>
    </View>
  );
};

export default CalendarDetailsScreen;
