import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import SectionTitle from "../components/SectionTitle";
import CreateEventScreen from "./CreateEventScreen";
import HomeScreen from "./HomeScreen";
import EventDetailsScreen from "./HomeScreen/EventDetailsScreen";
import ProfileScreen from "./ProfileScreen";
import SearchScreen from "./SearchScreen";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const HomeScreenName = "Home";
const EventDetailsScreenName = "Details";
const ProfileScreenName = "My Profile";
const SearchScreenName = "Search";
const CreateEventScreenName = "Create New Event";

const HostNavigator = () => {
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
        headerShown: false,
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        labelStlye: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70 },
      })}
    >
      <Tab.Screen name={HomeScreenName}>
        {() => (
          <HomeStack.Navigator>
            <HomeStack.Screen
              name={HomeScreenName}
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <HomeStack.Screen
              name={EventDetailsScreenName}
              component={EventDetailsScreen}
              options={{
                headerTitleAlign: "center",
                headerTransparent: true,
                contentStyle: { padding: 50 },
                headerTitle: () => <></>,
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
