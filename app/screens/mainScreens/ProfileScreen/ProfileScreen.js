import { View, Text, StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import { AxiosContext } from "../../../context/AxiosContext";
import { Button, TextInput } from "react-native-paper";
import SectionTitle from "../../components/SectionTitle";

const ProfileScreen = () => {
  const { authAxios } = useContext(AxiosContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  /*
    This function sends a get requst to display the user's data.
  */

  const getUserInfo = async () => {
    try {
      const response = await authAxios.get("/users");
      const { data } = response;
      const {
        id,
        email,
        first_name: firstName,
        last_name: lastName,
        join_date: joinDate,
        is_business: isBusiness,
      } = data;
      setUserInfo({
        firstName,
        lastName,
        email,
      });
    } catch (error) {
      console.error(error);
    }
  };

  /*
    This function sends a put request to update the user's data.
  */

  const putUserInfo = async () => {
    try {
      await authAxios.put("/users", userInfo);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    getUserInfo().then(() => setLoading(false));
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    const peachColor = "#FF7F50";
    return (
      <View style={styles.root}>
        <SectionTitle title={"My Profile"} />
        <TextInput
          label="First Name"
          value={userInfo.firstName}
          disabled={isDisabled}
          activeUnderlineColor={peachColor}
          onChangeText={(text) =>
            setUserInfo({
              ...userInfo,
              firstName: text,
            })
          }
          style={styles.input}
        />
        <TextInput
          label="Last Name"
          value={userInfo.lastName}
          disabled={isDisabled}
          activeUnderlineColor={peachColor}
          onChangeText={(text) =>
            setUserInfo({
              ...userInfo,
              lastName: text,
            })
          }
          style={styles.input}
        />
        <TextInput
          label="Email"
          value={userInfo.email}
          disabled={isDisabled}
          activeUnderlineColor={peachColor}
          onChangeText={(text) =>
            setUserInfo({
              ...userInfo,
              email: text,
            })
          }
          style={styles.input}
        />
        {isDisabled ? (
          <Button
            icon="pencil"
            uppercase={false}
            color="black"
            onPress={() => setIsDisabled(false)}
          >
            Edit
          </Button>
        ) : (
          <Button
            icon="content-save-edit"
            uppercase={false}
            color="black"
            onPress={() => putUserInfo().then(setIsDisabled(true))}
          >
            Save
          </Button>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    paddingTop: 30,
  },
  input: {
    minWidth: 300,
    maxHeight: 70,
  },
});
export default ProfileScreen;
