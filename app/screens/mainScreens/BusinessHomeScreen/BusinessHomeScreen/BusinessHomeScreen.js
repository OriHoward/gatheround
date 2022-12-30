import { View, Text, SectionList } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import CustomButton from "../../../components/CustomButton";
import SectionTitle from "../../../components/SectionTitle";
import { AuthContext } from "../../../../context/AuthContext";
import { AxiosContext } from "../../../../context/AxiosContext";
import PackageButton from "../../../components/PackageButton";

const BusinessHomeScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const [myPackages, setMyPackages] = useState([{}]);
  const [isLoading, setLoading] = useState(true);
  const { authAxios } = useContext(AxiosContext);
  const logout = authContext.logout;


  const getPackageData = async () => {
    try {
      const response = await authAxios.get("/business-package?package-limit=4");
      const { my_packages = [] } = response.data;
      setMyPackages([{ data: my_packages }]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getPackageData()
      .then()
      .catch((e) => console.error(e));
  });

  if (isLoading) {
    getPackageData()
      .then(() => setLoading(false))
      .catch((e) => {
        console.error(e);
      });
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={{ alignItems: "center" }}>
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
              <PackageButton
                onPressOpacity={() =>
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
        <CustomButton text="Sign Out" onPress={logout} />
      </View>
    );
  }
};

export default BusinessHomeScreen;
