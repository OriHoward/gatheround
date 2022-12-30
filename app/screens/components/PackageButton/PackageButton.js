import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

const PackageButton = ({
  onPressOpacity,
  packageName,
  description,
  currency,
  price,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressOpacity}>
      <Text style={styles.header1_name}>{packageName}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.header2_price}>
          {price} {currency}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.header3_desc}>{description}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}></View>
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
    minWidth: 450,
    flexWrap: "wrap",
  },
  header1_name: { fontSize: 24, fontWeight: "bold" },
  header2_price: { fontSize: 16, fontWeight: "bold", padding: 2 },
  header2_currency: { fontSize: 16 },
  header3_desc: { fontSize: 16, color: "gray" },
});

export default PackageButton;
