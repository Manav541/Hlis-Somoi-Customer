import {Alert} from 'react-native';
import {colors} from './Colors';
import {PlatformVersion} from './utils/Platform';
import {fontsfamily} from './FontFamily';
import {fontSize} from './FontSizes';
import {showMessage} from 'react-native-flash-message';

export const appName = 'Somoi';

// Alert
export const showAlert = (message: string) => {
  Alert.alert(appName, message);
};

export const showConfirmAlert = (
  message: string,
  onConfirm: () => void,
  cancelText: string = 'No',
  confirmText: string = 'Yes'
) => {
  Alert.alert(
    appName,
    message,
    [
      {
        text: cancelText,
        style: 'cancel',
      },
      {
        text: confirmText,
        onPress: onConfirm,
      },
    ],
    { cancelable: true }
  );
};

// Buttons
export const activityOpacity = 0.8;
export const hitSlop = 10;
export const rupeeSymbol = '₹';

// Flash Messages
export const flashMessageSucess = (message: string | null) => {
  showMessage({
    message: message || '',
    type: 'success',
    backgroundColor: colors.white,
    color: colors.blue4e,
    duration: 3000,
    icon: 'success',
    iconProps: {tintColor: colors.blue4e},
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

export const flashMessageWarning = (message: string | null) => {
  showMessage({
    message: message || '',
    backgroundColor: colors.white,
    color: colors.blue4e,
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
