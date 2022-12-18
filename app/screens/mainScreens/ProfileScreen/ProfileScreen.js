import { View, Text } from "react-native";
import React, { useState, useContext } from "react";
import { AxiosContext } from "../../../context/AxiosContext";
import { Button, TextInput } from "react-native-paper";
import SectionTitle from "../../components/SectionTitle";

const ProfileScreen = ({ navigation }) => {
  const { authAxios } = useContext(AxiosContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

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

  const putUserInfo = async () => {
    try {
      const response = await authAxios.put("/users", userInfo);
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
      <View style={{ alignItems: "center" }}>
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

export default ProfileScreen;
