import * as SecureStore from "expo-secure-store";
import Cookies from "js-cookie";
import { Platform } from "react-native";

export async function setValue(key, value) {
  let curr_value = JSON.stringify({ value });
  if (Platform.OS !== "web") {
    await SecureStore.setItemAsync(key, curr_value);
  } else {
    Cookies.set(key, curr_value);
  }
}

export async function getValue(key) {
  try {
    let curr_value = null;
    if (Platform.OS !== "web") {
      curr_value = await SecureStore.getItemAsync(key);
    } else {
      curr_value = Cookies.get(key);
    }

    if (curr_value !== null) {
      return curr_value;
    } else {
      return Promise.reject();
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deleteValue(key) {
  if (Platform.OS !== "web") {
    await SecureStore.deleteItemAsync(key);
  } else {
    Cookies.remove(key);
  }
}
