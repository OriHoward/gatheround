import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Platform } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import * as SecureStore from "expo-secure-store";
import Cookies from "js-cookie";
import { getValue } from "../utils/user-utils";
import LoginContainer from "../screens/loginScreens/LoginContainer";
import BusinessNavigator from "../screens/mainScreens/BusinessNavigator";
import HostNavigator from "../screens/mainScreens/HostNavigator";
import ArchiveScreen from "../screens/mainScreens/ArchiveScreen";
import { TextStyles } from "../CommonStyles";
import NotificationScreen from "../screens/mainScreens/NotificationScreen/";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const authContext = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);

  const loadJWT = useCallback(async () => {
    try {
      let jwt;
      if (Platform.OS !== "web") {
        const value = (await SecureStore.getItemAsync("token")) || {};
        jwt = JSON.parse(value);
      } else {
        const tokenString = Cookies.get("token") || {};
        jwt = JSON.parse(tokenString);
      }
      const value = await getValue("isBusiness");
      authContext.setUserInfo({
        isBusiness: value === "true",
      });

      authContext.setAuthState({
        accessToken: jwt.accessToken || null,
        refreshToken: jwt.refreshToken || null,
        authenticated: jwt.accessToken !== null,
      });
      setLoading(false);
    } catch (error) {
      console.log(`JWT parsing Error: ${error}`);
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
      });
      authContext.setUserInfo({
        isBusiness: null,
      });
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    if (authContext?.authState?.authenticated === false) {
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginContainer} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else if (authContext.userInfo.isBusiness) {
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Business Main" component={BusinessNavigator} />
            <Stack.Screen
              name="Notifications"
              component={NotificationScreen}
              options={{
                headerShown: true,
                headerTitleAlign: "center",
                headerTitleStyle: [
                  TextStyles.sectionTitleText,
                  { color: "black" },
                ],
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Host Main" component={HostNavigator} />
            <Stack.Screen
              name="Archive"
              component={ArchiveScreen}
              options={{
                headerShown: true,
                headerTitleAlign: "center",
                headerTitleStyle: [
                  TextStyles.sectionTitleText,
                  { color: "black" },
                ],
              }}
            />
            <Stack.Screen
              name="Notifications"
              component={NotificationScreen}
              options={{
                headerShown: true,
                headerTitleAlign: "center",
                headerTitleStyle: [
                  TextStyles.sectionTitleText,
                  { color: "black" },
                ],
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
};

export default Navigation;
