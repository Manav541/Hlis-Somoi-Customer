import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

export const MmkvManager = {
  Keys: {
    appLanguage: "appLanguage",
    isOnBoardingVisisted: "isOnBoardingVisisted",
    isLoggedIn: "isLoggedIn",
    isGuestUser: "isGuestUser",
  },

  getData: (key: string, callback: (value: string | null) => void) => {
    try {
      const value = storage.getString(key);
      if (value === undefined || value === null) {
        callback(null);
        return;
      }
      try {
        const parsed = JSON.parse(value);
        callback(parsed as string);
      } catch {
        callback(value as string);
      }
    } catch (error) {
      __DEV__ && console.log("[MMKV Storage] Error in getData: ", error);
      callback(null);
    }
  },

  setData: (key: string, value: string) => {
    try {
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        storage.set(key, value.toString());
      } else {
        storage.set(key, JSON.stringify(value));
      }
    } catch (error) {
      __DEV__ && console.log("[MMKV Storage] Error in setData: ", error);
    }
  },

  removeData: (key: string) => {
    try {
      storage.delete(key);
    } catch (error) {
      __DEV__ && console.log("[MMKV Storage] Error in removeData: ", error);
    }
  },

  clearAll: () => {
    try {
      storage.clearAll();
    } catch (error) {
      __DEV__ && console.log("[MMKV Storage] Error in clearAll: ", error);
    }
  },

  clearAllExcept: (keysToPreserve: string[]) => {
    try {
      const allKeys = storage.getAllKeys();

      const keysToDelete = allKeys.filter(
        (key) => !keysToPreserve.includes(key)
      );

      keysToDelete.forEach((key) => {
        storage.delete(key);
      });
    } catch (error) {
      __DEV__ && console.log("[MMKV Storage] Error in clearAllExcept: ", error);
    }
  },
};
