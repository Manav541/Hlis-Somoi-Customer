import {Alert} from 'react-native';
import {colors} from './Colors';
import {fontsfamily} from './FontFamily';
import {fontSize} from './FontSizes';
import {showMessage} from 'react-native-flash-message';
import { PlatformVersion } from './utils/Platform';

export const appName = 'Somoi Vendor';

// Alert
export const showAlert = (message: string) => {
  Alert.alert(appName, message);
};

// Buttons
export const activityOpacity = 0.6;
export const hitSlop = 10;

// Flash Messages
export const flashMessageSucess = (message: string) => {
  showMessage({
    message: message,
    type: 'success',
    color: colors.white,
    duration: 3000,
    icon: 'success',
    style: {
      paddingTop: PlatformVersion.isAndroid ? 40 : 10,
      zIndex: 1,
    },
    titleStyle: {
      fontFamily: fontsfamily.bold,
      fontSize: fontSize.size16,
    },
  });
};

export const flashMessageWarning = (message: string) => {
  showMessage({
    message: message,
    backgroundColor: colors.white,
    color: colors.white,
    duration: 3000,
    icon: 'none',
    style: {
      paddingTop: PlatformVersion.isAndroid ? 40 : 10,
      zIndex: 1,
    },
    titleStyle: {
      fontFamily: fontsfamily.bold,
      fontSize: fontSize.size16,
    },
  });
};

// Loader
interface LoaderRef {
  toggleLoader: (show: boolean) => void;
}
export let loaderRef: LoaderRef | null = null;
export const setLoaderRef = (ref: LoaderRef | null) => {
  loaderRef = ref;
};
export const toggleLoader = (showLoader: boolean) => {
  if (loaderRef) {
    loaderRef.toggleLoader(showLoader);
  }
};
