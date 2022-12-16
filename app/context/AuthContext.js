import React, { createContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import Cookies from "js-cookie";

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: null,
  });

  // TODO: this ID is hardcoded (need to make it dynamic)
  const [userInfo, setUserInfo] = useState({
    id: 1,
  });

  const logout = async () => {
    if (Platform.OS !== "web") {
      await SecureStore.deleteItemAsync("token");
    } else {
      await Cookies.remove("token");
    }

    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
    });

    setUserInfo({
      id: null,
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
