import {Platform} from 'react-native';

export const PlatformVersion = {
  isAndroid: Platform.OS === 'android',
  isIOS: Platform.OS === 'ios',
};
