import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import CreateEventScreen from "./CreateEventScreen";
import HomeScreen from "./HomeScreen";
import EventDetailsScreen from "./HomeScreen/EventDetailsScreen";
import ProfileScreen from "./ProfileScreen";
import SearchScreen from "./SearchScreen";
import { TextStyles } from "../../CommonStyles";
import { IconButton } from "react-native-paper";
import { AuthContext } from "../../context/AuthContext";
import React, { useContext, useState, useCallback } from "react";
import { View } from "react-native";
import { AxiosContext } from "../../context/AxiosContext";
import { useFocusEffect } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const HomeScreenName = "Home";
const EventDetailsScreenName = "Details";
const ProfileScreenName = "My Profile";
const SearchScreenName = "Search";
const CreateEventScreenName = "Create New Event";

const HostNavigator = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const { authAxios } = useContext(AxiosContext);
  const [notifAmount, setNotifAmount] = useState(0);
  const logout = authContext.logout;

  const headerRight = () => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <IconButton
          icon={"archive-outline"}
          onPress={() => navigation.navigate("Archive")}
        />
        <IconButton icon={"logout"} onPress={logout} />
      </View>
    );
  };

  const getNotifAmount = async () => {
    const resp = await authAxios.get(`/notif-meta`);
    const { data } = resp;
    const { notifCount = 0 } = data;
    setNotifAmount(notifCount);
  };

  useFocusEffect(
    useCallback(() => {
      getNotifAmount()
        .then()
        .catch((e) => console.log(e));
    }, [])
  );

  const getLeftHeader = () => {
    const notifIcon = notifAmount ? "bell-badge" : "bell";
    const iconColor = notifAmount ? "red" : "black";
    return (
      <IconButton
        icon={notifIcon}
        color={iconColor}
        onPress={() => {
          navigation.navigate("Notifications");
        }}
      />
    );
  };

  return (
    <Tab.Navigator
      initialRouteName={HomeScreenName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === HomeScreenName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === ProfileScreenName) {
            iconName = focused ? "person" : "person-outline";
          } else if (rn === SearchScreenName) {
            iconName = focused ? "search" : "search-outline";
          } else if (rn === CreateEventScreenName) {
            iconName = focused ? "add" : "add-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        headerTitleAlign: "center",
        labelStlye: { paddingBottom: 10, fontSize: 10 },
        headerTitleStyle: [TextStyles.sectionTitleText, { color: "black" }],
        headerRight: headerRight,
        headerLeft: getLeftHeader,
      })}
    >
      <Tab.Screen name={HomeScreenName} options={{ headerShown: false }}>
        {() => (
          <HomeStack.Navigator>
            <HomeStack.Group
              screenOptions={{
                headerShown: true,
                headerTitleAlign: "center",
                headerTitleStyle: [
                  TextStyles.sectionTitleText,
                  { color: "black" },
                ],
              }}
            >
              <HomeStack.Screen
                name={HomeScreenName}
                component={HomeScreen}
                options={{
                  headerRight: headerRight,
                  headerLeft: getLeftHeader,
                }}
              />
              <HomeStack.Screen
                name={EventDetailsScreenName}
                component={EventDetailsScreen}
                options={{ contentStyle: { padding: 30 } }}
              />
            </HomeStack.Group>
          </HomeStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name={SearchScreenName} component={SearchScreen} />
      <Tab.Screen name={CreateEventScreenName} component={CreateEventScreen} />
      <Tab.Screen name={ProfileScreenName} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default HostNavigator;
