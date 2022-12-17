import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "../../context/AuthContext";
import { getValue } from "../../utils/user-utils";
import Ionicons from "react-native-vector-icons/Ionicons";
// use this to search for icons: https://oblador.github.io/react-native-vector-icons/
// we support only icons from here:  https://ionic.io/ionicons

// Screens
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import SearchScreen from "./SearchScreen";
import EventScreen from "./EventScreen";
import BusinessProfileScreen from "./BusinessProfileScreen";

// Screen names
const homeName = "Home";
const profileName = "Profile";
const searchName = "Search";
const eventName = "Create New Event";
const businessProfileName = "My Profile";

const Tab = createBottomTabNavigator();
// https://reactnavigation.org/docs/tab-based-navigation/

const MainContainer = () => {
  const authContext = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  console.log(authContext.userInfo.isBusiness);

  if (isLoading) {
    getValue("isBusiness").then((value) => {
      authContext.setUserInfo({
        isBusiness: value === "true",
      });
      setLoading(false);
    });
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else if (!isLoading && authContext.userInfo.isBusiness) {
    return (
      <Tab.Navigator
        initialRootName={businessProfileName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === businessProfileName) {
              iconName = focused ? "person" : "person-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
          labelStlye: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70 },
        })}
      >
        <Tab.Screen
          name={businessProfileName}
          component={BusinessProfileScreen}
        />
        <Tab.Screen name={homeName} component={HomeScreen} />
      </Tab.Navigator>
    );
  } else if (!isLoading && !authContext.userInfo.isBusiness) {
    return (
      <Tab.Navigator
        initialRootName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === profileName) {
              iconName = focused ? "person" : "person-outline";
            } else if (rn === searchName) {
              iconName = focused ? "search" : "search-outline";
            } else if (rn === eventName) {
              iconName = focused ? "add" : "add-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
          labelStlye: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70 },
        })}
      >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={searchName} component={SearchScreen} />
        <Tab.Screen name={eventName} component={EventScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />
      </Tab.Navigator>
    );
  }
};

export default MainContainer;
