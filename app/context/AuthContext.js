import React, { createContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import Cookies from "js-cookie";
import { deleteValue } from "../utils/user-utils";

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: null,
  });

  const [userInfo, setUserInfo] = useState({
    isBusiness: null,
  });

  /*
    This function resets all the states and deletes all the cookies.
  */

  const logout = async () => {
    if (Platform.OS !== "web") {
      await SecureStore.deleteItemAsync("token");
    } else {
      Cookies.remove("token");
    }
    deleteValue("isBusiness");

    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
    });

    setUserInfo({
      isBusiness: null,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
