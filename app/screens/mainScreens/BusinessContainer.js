import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SectionTitle from "../components/SectionTitle";
import BusinessCalendarScreen from "./BusinessCalendar/BusinessCalendarScreen";
import CalendarDetailsScreen from "./BusinessCalendar/CalendarDetailsScreen";
import BusinessHomeScreen from "./BusinessHomeScreen";

const Tab = createBottomTabNavigator();
const CalendarStack = createNativeStackNavigator();

const CalendarScreenName = "My Calendar";
const HomeScreenName = "Home";

const BusinessNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name={HomeScreenName} component={BusinessHomeScreen} />
      <Tab.Screen name="Second">
        {() => (
          <CalendarStack.Navigator>
            <CalendarStack.Screen
              name={CalendarScreenName}
              component={BusinessCalendarScreen}
              options={{
                headerTitleAlign: "center",
                headerTransparent: true,
                contentStyle: { padding: 50 },
                headerTitle: () => <SectionTitle title={CalendarScreenName} />,
              }}
            />
            <CalendarStack.Screen
              name="Details"
              component={CalendarDetailsScreen}
            />
          </CalendarStack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BusinessNavigator;
