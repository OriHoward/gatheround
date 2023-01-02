import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SectionTitle from "../components/SectionTitle";
import BusinessCalendarScreen from "./BusinessCalendar/BusinessCalendarScreen";
import CalendarDetailsScreen from "./BusinessCalendar/CalendarDetailsScreen";
import { BusinessHomeScreen,PackageDetailsScreen } from "./BusinessHomeScreen/BusinessHomeScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import BusinessProfileScreen from "./BusinessProfileScreen";
import BusinessPackageScreen from "./BusinessPackageScreen";

// import here the packageDetailsScreen
const Tab = createBottomTabNavigator();
const CalendarStack = createNativeStackNavigator();
const homeStack = createNativeStackNavigator();

const CalendarScreenName = "Calendar";
const CalendarTabName = "Calendar Tab";
const HomeScreenName = "Home";
const PackageDetailsName = "My Packages";
const ProfileScreenName = "My Profile";
const PackageScreenName = "Create New Package";

const BusinessNavigator = () => {
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
        headerShown: false,
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        labelStlye: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70 },
      })}
    >
      <Tab.Screen name={HomeScreenName}>
        {() => (
          <homeStack.Navigator>
            <homeStack.Screen
              name={HomeScreenName}
              component={BusinessHomeScreen}
              options={{
                headerTitleAlign: "center",
                headerTransparent: true,
                contentStyle: { padding: 50 },
                headerTitle: () => <SectionTitle title={"My Package"} />,
              }}
            />
            <homeStack.Screen
              name={PackageDetailsName}
              component={PackageDetailsScreen}
              options={{
                headerTitleAlign: "center",
                headerTransparent: true,
                contentStyle: { padding: 50 },
                headerTitle: () => <SectionTitle title={"My Package Details"} />,
              }}
            />
          </homeStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name={ProfileScreenName} component={BusinessProfileScreen} />
      <Tab.Screen name={PackageScreenName} component={BusinessPackageScreen} />
      <Tab.Screen
        name={CalendarTabName}
        options={{ title: CalendarScreenName }}
      >
        {() => (
          <CalendarStack.Navigator>
            <CalendarStack.Screen
              name={CalendarScreenName}
              component={BusinessCalendarScreen}
              options={{
                headerTitleAlign: "center",
                headerTransparent: true,
                contentStyle: { padding: 50 },
                headerTitle: () => <SectionTitle title={"My Calendar"} />,
              }}
            />
            <CalendarStack.Screen
              name="Details"
              component={CalendarDetailsScreen}
              options={{
                headerTitleAlign: "center",
                headerTransparent: true,
                contentStyle: { padding: 50 },
                headerTitle: () => <SectionTitle title={"Details"} />,
              }}
            />
          </CalendarStack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BusinessNavigator;
