import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const EventButton = ({
  onPress,
  isHost,
  name,
  event_date,
  event_time,
  address,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.header1}>{name}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.header2_date}>{event_date}</Text>
        <Text style={styles.header2_time}>{event_time}</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.header3}>{address}</Text>
        {isHost === true ? (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                alignSelf: "center",
                paddingRight: 5,
                fontWeight: "bold",
              }}
            >
              {/* Num. Attending */}
            </Text>
            <Ionicons name="people-circle-outline" size={30} color="black" />
          </View>
        ) : (
          <Ionicons name="checkmark-circle" size={30} color="black" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
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

export default EventButton;
