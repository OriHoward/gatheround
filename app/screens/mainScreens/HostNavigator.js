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
import React, { useContext } from "react";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const HomeScreenName = "Home";
const EventDetailsScreenName = "Details";
const ProfileScreenName = "My Profile";
const SearchScreenName = "Search";
const CreateEventScreenName = "Create New Event";

const HostNavigator = () => {
  const authContext = useContext(AuthContext);
  const logout = authContext.logout;

  return (
    <Tab.Navigator
      initialRootName={HomeScreenName}
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
        headerRight: () => <IconButton icon={"logout"} onPress={logout} />,
      })}
    >
      <Tab.Screen name={HomeScreenName} options={{ headerShown: false }}>
        {() => (
          <HomeStack.Navigator>
            <HomeStack.Screen
              name={HomeScreenName}
              component={HomeScreen}
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
              }}
            />
            <HomeStack.Screen
              name={EventDetailsScreenName}
              component={EventDetailsScreen}
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
