import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginContainer from "../screens/loginScreens/loginContainer";
import MainContainer from "../screens/mainScreens/MainContainer";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginContainer} />
        <Stack.Screen name="Home" component={MainContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
