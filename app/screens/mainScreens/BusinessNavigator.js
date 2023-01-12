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
import React, { useContext } from "react";
import { TextStyles } from "../../CommonStyles";
import { IconButton } from "react-native-paper";

// import here the packageDetailsScreen
const Tab = createBottomTabNavigator();
const CalendarStack = createNativeStackNavigator();
const homeStack = createNativeStackNavigator();

const CalendarScreenName = "My Calendar";
const CalendarTabName = "Calendar Tab";
const HomeScreenName = "Home";
const PackageDetailsName = "My Packages";
const ProfileScreenName = "My Profile";
const PackageScreenName = "Create New Package";

const BusinessNavigator = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const logout = authContext.logout;

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
        headerRight: () => <IconButton icon={"logout"} onPress={logout} />,
        headerLeft: () => <IconButton icon={"bell"} onPress={()=>{navigation.navigate("Notifications")}} />
      })}
    >
      <Tab.Screen name={HomeScreenName} options={{ headerShown: false }}>
        {() => (
          <homeStack.Navigator>
            <homeStack.Screen
              name={HomeScreenName}
              component={BusinessHomeScreen}
              options={{
                headerShown: true,
                headerTitleAlign: "center",
                headerTitleStyle: [
                  TextStyles.sectionTitleText,
                  { color: "black" },
                ],
                headerRight: () => (
                  <IconButton icon={"logout"} onPress={logout} />
                ),
                headerLeft: () => <IconButton icon={"bell"} onPress={()=>{navigation.navigate("Notifications")}} />
              }}
            />
            <homeStack.Screen
              name={PackageDetailsName}
              component={PackageDetailsScreen}
              options={{
                headerShown: true,
                headerTitleAlign: "center",
                headerTitleStyle: [
                  TextStyles.sectionTitleText,
                  { color: "black" },
                ],
                contentStyle: { padding: 30 },
              }}
            />
          </homeStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name={ProfileScreenName} component={BusinessProfileScreen} />
      <Tab.Screen name={PackageScreenName} component={BusinessPackageScreen} />
      <Tab.Screen name={CalendarTabName} options={{ headerShown: false }}>
        {() => (
          <CalendarStack.Navigator>
            <CalendarStack.Screen
              name={CalendarScreenName}
              component={BusinessCalendarScreen}
              options={{
                headerShown: true,
                headerTitleAlign: "center",
                headerTitleStyle: [
                  TextStyles.sectionTitleText,
                  { color: "black" },
                ],
                headerRight: () => (
                  <IconButton icon={"logout"} onPress={logout} />
                ),
                headerLeft: () => <IconButton icon={"bell"} onPress={()=>{navigation.navigate("Notifications")}} />
              }}
            />
            <CalendarStack.Screen
              name="Details"
              component={CalendarDetailsScreen}
              options={{
                headerShown: true,
                headerTitleAlign: "center",
                headerTitleStyle: [
                  TextStyles.sectionTitleText,
                  { color: "black" },
                ],
                contentStyle: { padding: 30 },
              }}
            />
          </CalendarStack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BusinessNavigator;
