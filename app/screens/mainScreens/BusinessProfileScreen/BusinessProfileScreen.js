import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import SectionTitle from "../../components/SectionTitle";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RadioButton } from "react-native-paper";
import { AxiosContext } from "../../../context/AxiosContext";

const BusinessProfileScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const { authAxios } = useContext(AxiosContext);
  const [businessProfile, setBusinessProfile] = useState({
    email: null,
    firstName: null,
    lastName: null,
    profession: null,
    country: null,
    city: null,
    phoneNumber: null,
    visible: null,
  });

  /*
    This function sends a get request to recieve the business profile data.
  */

  const getBusinessInfo = async () => {
    const response = await authAxios.get("/business");
    return response.data;
  };

  const showProfile = async () => {
    try {
      const visible = 1;
      await authAxios.put("/business", { visible });
    } catch (error) {
      console.error(error);
    }
  };

  const hideProfile = async () => {
    try {
      const visible = 0;
      await authAxios.put("/business", { visible });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    getBusinessInfo().then((data) => {
      if (data && data.userRecord && data.businessRecord) {
        // Checks that the data exists
        const { userRecord, businessRecord } = data;
        const {
          id: userId,
          email,
          first_name: firstName,
          last_name: lastName,
          join_date: joinDate,
        } = userRecord;
        const {
          id,
          profession,
          country,
          city,
          phone_number: phoneNumber,
          visible,
        } = businessRecord;

        setBusinessProfile({
          email,
          firstName,
          lastName,
          profession,
          country,
          city,
          phoneNumber,
        });
        setIsVisible(Boolean(visible)); // visible is a string with 0 or 1 and IsVisible state uses a boolean value.
        setLoading(false);
      }
    });

    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.root}>
        <Text style={styles.name}>
          {businessProfile.firstName} {businessProfile.lastName}
        </Text>
        <Text style={styles.profession}>{businessProfile.profession}</Text>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Ionicons name="location" size={20} color="black" />
          <Text style={styles.location}>
            {businessProfile.country}, {businessProfile.city}
          </Text>
        </View>
        <View style={styles.line}></View>
        <SectionTitle title={"Contact Info"} />
        <Text style={styles.contact_details_bold}>
          {businessProfile.phoneNumber}
        </Text>
        <Text style={styles.contact_details}>{businessProfile.email}</Text>
        <Text style={styles.contact_details}>Website Link</Text>
        <View style={styles.line}></View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.switch_style}>Show profile</Text>
          <RadioButton
            value="first"
            status={isVisible ? "checked" : "unchecked"}
            onPress={() => showProfile().then(setIsVisible(true))}
          />
          <Text style={styles.switch_style}>Hide profile</Text>
          <RadioButton
            value="second"
            status={!isVisible ? "checked" : "unchecked"}
            onPress={() => hideProfile().then(setIsVisible(false))}
          />
        </View>
        {/* <TouchableOpacity style={styles.edit_style}>
          <Ionicons name="create-sharp" size={16} />
          <Text style={{ marginRight: 2, padding: 4 }}>Edit Profile</Text>
        </TouchableOpacity> */}
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
    borderBottomWidth: 1,
    borderBottomColor: "black",
    borderBottomStyle: "solid",
    padding: 7,
    width: "100%",
    maxWidth: 350,
  },
  name: { fontSize: 24, fontWeight: "bold" },
  profession: { fontSize: 16, fontWeight: "bold", padding: 2 },
  location: { fontSize: 16 },
  contact_details_bold: { fontSize: 16, fontWeight: "bold", padding: 2 },
  contact_details: { fontSize: 16, padding: 2 },
  switch_style: { fontSize: 14, color: "gray", marginTop: 8 },
  edit_style: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#dddddd",
    borderWidth: 7,
    borderColor: "#dddddd",
    borderRadius: 15,
    marginVertical: 3,
  },
});
export default BusinessProfileScreen;
