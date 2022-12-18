import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {View ,Text, Platform } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import * as SecureStore from "expo-secure-store";
import Cookies from "js-cookie";
import { getValue } from '../utils/user-utils';
import LoginContainer from "../screens/loginScreens/LoginContainer";
import MainContainer from "../screens/mainScreens/MainContainer";

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
      const value = await getValue("isBusiness")
      console.log("got value", value)
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
        isBusiness:null
      })
      console.log("Couldn't identify if business")
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
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {authContext?.authState?.authenticated === false ? (
          <Stack.Screen name="Login" component={LoginContainer} />
        ) : (
          <Stack.Screen name="Main" component={MainContainer} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
