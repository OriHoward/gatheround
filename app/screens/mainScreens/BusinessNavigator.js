import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BusinessCalendarScreen from "./BusinessCalendar/BusinessCalendarScreen";
import CalendarDetailsScreen from "./BusinessCalendar/CalendarDetailsScreen";
import {
  BusinessHomeScreen,
  PackageDetailsScreen,
} from "./BusinessHomeScreen/BusinessHomeScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import BusinessProfileScreen from "./BusinessProfileScreen";
import BusinessPackageScreen from "./BusinessPackageScreen";
import { AuthContext } from "../../context/AuthContext";
import React, { useContext, useState, useCallback } from "react";
import { TextStyles } from "../../CommonStyles";
import { IconButton } from "react-native-paper";
import { View } from "react-native";
import { AxiosContext } from "../../context/AxiosContext";
import { useFocusEffect } from "@react-navigation/native";

// import here the packageDetailsScreen
const Tab = createBottomTabNavigator();
const CalendarStack = createNativeStackNavigator();
const homeStack = createNativeStackNavigator();

const CalendarScreenName = "My Calendar";
const CalendarTabName = "Calendar Tab";
const HomeTabName = "Home Tab";
const HomeScreenName = "Home";
const PackageDetailsName = "My Packages";
const ProfileScreenName = "My Profile";
const PackageScreenName = "Create New Package";

const BusinessNavigator = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const { authAxios } = useContext(AxiosContext);
  const [notifAmount, setNotifAmount] = useState(0);
  const logout = authContext.logout;

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

  const headerRight = () => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <IconButton
          icon={"email"}
          onPress={() => navigation.navigate("Requests")}
        />
        <IconButton icon={"logout"} onPress={logout} />
      </View>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName={HomeTabName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === HomeTabName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === ProfileScreenName) {
            iconName = focused ? "person" : "person-outline";
          } else if (rn === PackageScreenName) {
            iconName = focused ? "cube" : "cube-outline";
          } else if (rn === CalendarTabName) {
            iconName = focused ? "calendar" : "calendar-outline";
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
      <Tab.Screen name={HomeTabName} options={{ headerShown: false }}>
        {() => (
          <homeStack.Navigator>
            <homeStack.Group
              screenOptions={{
                headerShown: true,
                headerTitleAlign: "center",
                headerTitleStyle: [
                  TextStyles.sectionTitleText,
                  { color: "black" },
                ],
              }}
            >
              <homeStack.Screen
                name={HomeScreenName}
                component={BusinessHomeScreen}
                options={{
                  headerRight: headerRight,
                  headerLeft: getLeftHeader,
                }}
              />
              <homeStack.Screen
                name={PackageDetailsName}
                component={PackageDetailsScreen}
                options={{ contentStyle: { padding: 30 } }}
              />
            </homeStack.Group>
          </homeStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name={ProfileScreenName} component={BusinessProfileScreen} />
      <Tab.Screen name={PackageScreenName} component={BusinessPackageScreen} />
      <Tab.Screen name={CalendarTabName} options={{ headerShown: false }}>
        {() => (
          <CalendarStack.Navigator>
            <CalendarStack.Group
              screenOptions={{
                headerShown: true,
                headerTitleAlign: "center",
                headerTitleStyle: [
                  TextStyles.sectionTitleText,
                  { color: "black" },
                ],
              }}
            >
              <CalendarStack.Screen
                name={CalendarScreenName}
                component={BusinessCalendarScreen}
                options={{
                  headerRight: headerRight,
                  headerLeft: getLeftHeader,
                }}
              />
              <CalendarStack.Screen
                name="Details"
                component={CalendarDetailsScreen}
                options={{ contentStyle: { padding: 30 } }}
              />
            </CalendarStack.Group>
          </CalendarStack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BusinessNavigator;
