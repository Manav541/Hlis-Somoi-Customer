import {Alert, Platform} from 'react-native';
import {colors} from './Colors';
import {PlatformVersion} from './utils/Platform';
import {fontsfamily} from './FontFamily';
import {fontSize} from './FontSizes';
import {showMessage} from 'react-native-flash-message';
import { checkMultiple, openSettings, PERMISSIONS, requestMultiple, RESULTS } from 'react-native-permissions';
import NetInfo from "@react-native-community/netinfo";

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

export const showConfirmForGuest = (
  message: string,
  onConfirm: () => void,
  cancelText: string = 'Cancel',
  confirmText: string = 'Sign In'
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

export const getConnection = (callback: any) => {
  NetInfo.fetch().then((state: any) => {
    callback(state.isConnected);
  });
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

// s3 Bucket
export const GlobalVar = {
  region: "ap-south-1",
  permissionAccess: "public-read-write",
  bucketName: "hlik-deep-bhaumik",
  url: "https://hlik-deep-bhaumik.s3.amazonaws.com/",
  // url: "https://hlik-deep-bhaumik.s3.amazonaws.com/somoiapp/",
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
    console.log('showLoader => ',showLoader);
    loaderRef.toggleLoader(showLoader);
  }
};

// Camera-Gallery Permissions
export const messages = {
  cameraPermission: `Allow ${appName} to use your camera for your profile picture and documents?`,
  galleryPermission: `Allow ${appName} to use your gallery for your profile picture and documents?`,
  documentPermission: `Allow ${appName} to use your documents?`,
};
export const cameraPermission = Platform.select({
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA,
});
export const galleryPermission = Platform.select({
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  android:
    Number(Platform.Version) > 32
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
});
export const checkPermission = (permission: any, message: string) => {
  return new Promise(callback => {
    checkMultiple([permission]).then(status => {
      if (
        status[permission] === RESULTS.DENIED ||
        status[permission] === RESULTS.UNAVAILABLE
      ) {
        requestMultiple([permission]).then(status => {
          const data: any = Object.values(status);
          callback(data[0] === 'granted');

          if (data[0] === 'blocked' && Platform.OS === 'android') {
            Alert.alert(
              appName,
              message,
              [
                {
                  text: 'Cancel',
                  onPress: () => __DEV__ && console.log('Cancel Pressed'),
                },
                {
                  text: 'Settings',
                  onPress: () => openSettings(),
                },
              ],
              {cancelable: false},
            );
          }
        });
      } else if (status[permission] === RESULTS.BLOCKED) {
        Alert.alert(
          appName,
          message,
          [
            {
              text: 'Cancel',
              onPress: () => __DEV__ && console.log('Cancel Pressed'),
            },
            {
              text: 'Settings',
              onPress: () => openSettings(),
            },
          ],
          {cancelable: false},
        );
        callback(false);
      } else {
        callback(true);
      }
    });
  });
};
