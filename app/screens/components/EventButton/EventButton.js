import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const EventButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={{ padding: 2 }} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.header1}>Event Name</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.header2}>Event Date</Text>
          <Text style={styles.header2}>Event Time</Text>
        </View>
        <Text style={styles.header3}>Event Address</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "300%",
    backgroundColor: "#dddddd",
    maxWidth: 500,
    padding: 15,
    marginVertical: 7,
    borderRadius: 15,
    alignSelf: "center",
  },
  header1: { fontSize: 24, fontWeight: "bold" },
  header2: { fontSize: 16, fontWeight: "bold" },
  header3: { fontSize: 16, color: "gray" },
});

export default EventButton;
