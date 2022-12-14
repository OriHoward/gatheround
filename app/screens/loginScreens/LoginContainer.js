import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import SignUpScreenBusiness from "./SignUpScreen/SignUpBusiness";
import ConfirmEmailScreen from "./ConfirmEmailScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import NewPasswordScreen from "./NewPasswordScreen";

const Stack = createNativeStackNavigator();

const LoginContainer = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignUpBusiness" component={SignUpScreenBusiness} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
    </Stack.Navigator>
  );
};

export default LoginContainer;
