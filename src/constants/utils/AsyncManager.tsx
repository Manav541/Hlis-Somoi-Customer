import AsyncStorage from '@react-native-async-storage/async-storage';

export const AsyncManager = {
  Keys: {
    appLanguage: 'appLanguage',
  },

  getData: async (key: string, callback: (value: string | null) => void) => {
    try {
      const value = await AsyncStorage.getItem(key);
      callback(value ? (JSON.parse(value) as string) : null);
    } catch (error) {
      __DEV__ && console.log('[Async Storage] Error in getData: ', error);
    }
  },

  setData: async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      __DEV__ && console.log('[Async Storage] Error in setData: ', error);
    }
  },
};
