import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "../../context/AuthContext";
import Ionicons from "react-native-vector-icons/Ionicons";
// use this to search for icons: https://oblador.github.io/react-native-vector-icons/
// we support only icons from here:  https://ionic.io/ionicons

// Host screens
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import SearchScreen from "./SearchScreen";
import EventScreen from "./EventScreen";
// Business screen
import BusinessHomeScreen from "./BusinessHomeScreen";
import BusinessProfileScreen from "./BusinessProfileScreen";
import BusinessPackageScreen from "./BusinessPackageScreen";

// Host screen names
const homeName = "Home";
const profileName = "Profile";
const searchName = "Search";
const eventName = "Create New Event";
// Business screen names
const businessHomeName = "Business Home";
const businessProfileName = "My Profile";
const businessPackageName = "Create New Package";

const Tab = createBottomTabNavigator();
// https://reactnavigation.org/docs/tab-based-navigation/

const MainContainer = () => {
  const authContext = useContext(AuthContext);
  if (authContext.userInfo.isBusiness) {
    return (
      <Tab.Navigator
        initialRootName={businessProfileName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            if (rn === businessHomeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === businessProfileName) {
              iconName = focused ? "person" : "person-outline";
            } else if (rn == businessPackageName) {
              iconName = focused ? "cube" : "cube-outline";
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
        <Tab.Screen name={businessHomeName} component={BusinessHomeScreen} />
        <Tab.Screen name = {businessPackageName} component = {BusinessPackageScreen}/>
      </Tab.Navigator>
    );
  } else if (!authContext.userInfo.isBusiness) {
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
