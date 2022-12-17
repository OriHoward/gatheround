import { View, Text, StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import SectionTitle from "../../components/SectionTitle";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RadioButton } from "react-native-paper";
import { AxiosContext } from "../../../context/AxiosContext";

const ProfileScreen = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [businessValues, setBusinessValues] = useState({
    profession: null,
    country: null,
    city: null,
    phoneNumber: null,
  });
  const { authAxios } = useContext(AxiosContext);

  const getBusinessInfo = async () => {
    const response = await authAxios.get("/business");
    return response.data;
  };

  if (isLoading) {
    getBusinessInfo().then((data) => {
      const { id, profession, country, city, phoneNumber } = data;
      setBusinessValues({ profession, country, city, phoneNumber });
      setLoading(false);
    });

    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.root}>
        <SectionTitle title={"My Profile"} />
        <Text style={styles.name}>My Name</Text>
        <Text style={styles.profession}>{businessValues.profession}</Text>
        <Ionicons name={"location"}>
          <Text>{businessValues.country}</Text>
        </Ionicons>
        <View style={styles.line}></View>
        <Text style={styles.contact_info}> Contact Info</Text>
        <Text style={styles.contact_details}>{businessValues.phoneNumber}</Text>
        <Text style={styles.contact_details}>Email</Text>
        <Text style={styles.contact_details}>Website Link</Text>
        <View style={styles.line}></View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.switch_style}>Show profile</Text>
          <RadioButton
            value="first"
            status={isVisible ? "checked" : "unchecked"}
            onPress={() => setIsVisible(true)}
          />
          <Text style={styles.switch_style}>Hide profile</Text>
          <RadioButton
            value="second"
            status={!isVisible ? "checked" : "unchecked"}
            onPress={() => setIsVisible(false)}
          />
        </View>
        <Ionicons name="create-sharp" size={16}>
          <Text style={{ marginRight: 12, padding: 10 }}> Edit Profile</Text>
        </Ionicons>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    marginTop: 30,
  },
  line: {
    borderBottomWidth: 3,
    borderBottomColor: "black",
    borderBottomStyle: "solid",
    padding: 15,
    width: "100%",
    maxWidth: 350,
  },
  name: {
    marginTop: 30,
    fontSize: 25,
    padding: 8,
    fontWeight: "bold",
    color: "#333",
  },
  profession: {
    fontSize: 15,
    padding: 8,
    fontWeight: "bold",
    color: "#333",
  },
  location: {
    fontSize: 12,
    color: "#333",
  },
  contact_info: {
    fontSize: 28,
    padding: 8,
    marginTop: 20,
    color: "#C5C5C5",
  },
  contact_details: {
    fontSize: 20,
    padding: 8,
    fontWeight: "bold",
    color: "#333",
  },
  switch_style: {
    fontSize: 16,
    color: "gray",
    marginTop: 8,
  },
});
export default ProfileScreen;
