import { View, Text } from "react-native";
import React from "react";
import Ionic from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import HomeScreen from "../../HomeScreen";

const BottomNavi = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <text>hello</text>
        <Tab.Screen name="Home" />
        {/* <Tab.Screen name="Search" component={HomeScreen} />
      <Tab.Screen name="Notifications" component={HomeScreen} />
      <Tab.Screen name="New Event" component={HomeScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavi;
