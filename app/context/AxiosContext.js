import React, { createContext, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import Cookies from "js-cookie";

const AxiosContext = createContext();
const { Provider } = AxiosContext;

const AxiosProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: "http://localhost:5000",
  });

  const publicAxios = axios.create({
    baseURL: "http://localhost:5000",
  });

  authAxios.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const refreshAuthLogic = (failedRequest) => {
    const data = {
      refreshToken: authContext.authState.refreshToken,
    };
    const options = {
      method: "POST",
      data,
      url: "http://localhost:5000/refresh",
      headers:{
        Authorization:`Bearer ${authContext.authState.refreshToken}`
      }
    };

    return axios(options)
      .then(async (tokenRefreshResponse) => {
        const { data } = tokenRefreshResponse
        const {access_token: accessToken} = data
        failedRequest.response.config.headers.Authorization =
          "Bearer " + accessToken;
        
        authContext.setAuthState({
          ...authContext.authState,
          accessToken: accessToken,
        });

        if (Platform.OS !== "web") {
          await SecureStore.setItemAsync(
            "token",
            JSON.stringify({
              accessToken: tokenRefreshResponse.data.accessToken,
              refreshToken: authContext.authState.refreshToken,
            })
          );
        } else {
          Cookies.set(
            "token",
            JSON.stringify({
              accessToken,
              refreshToken,
            })
          );
        }

        return Promise.resolve();
      })
      .catch((e) => {
        authContext.setAuthState({
          accessToken: null,
          refreshToken: null,
        });
      });
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic);

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}
    >
      {children}
    </Provider>
  );
};

export { AxiosContext, AxiosProvider };
