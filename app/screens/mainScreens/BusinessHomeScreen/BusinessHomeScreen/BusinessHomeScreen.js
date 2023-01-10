import { View, Text, SectionList } from "react-native";
import React, { useState, useContext } from "react";
import SectionTitle from "../../../components/SectionTitle";
import { AxiosContext } from "../../../../context/AxiosContext";
import PackageCard from "../../../components/PackageCard";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { TextStyles } from "../../../../CommonStyles";

const BusinessHomeScreen = ({ navigation }) => {
  const [myPackages, setMyPackages] = useState([{}]);
  const [isLoading, setLoading] = useState(true);
  const { authAxios } = useContext(AxiosContext);
  const [userName, setUserName] = useState({});

  const getPackageData = async () => {
    try {
      const response = await authAxios.get("/business-package?package-limit=4");
      const { my_packages = [] } = response.data;
      setMyPackages([{ data: my_packages }]);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserName = async () => {
    try {
      const response = await authAxios.get("/users");
      const { data } = response;
      const {
        id,
        email,
        first_name: firstName,
        last_name: lastName,
        join_date,
      } = data;
      setUserName({ firstName, lastName });
    } catch (error) {
      console.error(error);
      // todo: anything else?
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
    }, [])
  );

  if (isLoading) {
    getPackageData()
      .then(() =>
        getUserName()
          .then(() => setLoading(false))
          .catch((e) => console.error(e))
      )
      .catch((e) => {
        console.error(e);
      });
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator animating={true} />
      </View>
    );
  } else {
    return (
      <View style={{ alignItems: "center" }}>
        <Text
          style={[
            TextStyles.sectionTitleText,
            { color: "black", fontSize: 20 },
          ]}
        >
          {`Hello there, ${userName.firstName}!`}
        </Text>
        <SectionTitle title={"My Packages"} />
        <SectionList
          sections={myPackages}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => {
            const {
              id,
              package_name: packageName,
              description,
              price,
              currency,
            } = item;
            return (
              <PackageCard
                onPressCard={() =>
                  navigation.navigate("My Packages", {
                    id,
                    packageName,
                    description,
                    price,
                    currency,
                  })
                }
                packageName={packageName}
                description={description}
                price={price}
                currency={currency}
              />
            );
          }}
          onRefresh={() => setLoading(true)}
          refreshing={isLoading}
        />
      </View>
    );
  }
};

export default BusinessHomeScreen;
