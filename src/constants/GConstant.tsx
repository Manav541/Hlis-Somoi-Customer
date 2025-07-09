import { Alert, Platform } from "react-native";
import { colors } from "./Colors";
import { PlatformVersion } from "./utils/Platform";
import { fontsfamily } from "./FontFamily";
import { fontSize } from "./FontSizes";
import { showMessage } from "react-native-flash-message";
import {
  checkMultiple,
  openSettings,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from "react-native-permissions";
import NetInfo from "@react-native-community/netinfo";
import emojiRegex from "emoji-regex";
import { NotificationData, NotificationGroup } from "./interfaces";
import moment from "moment";

export const appName = "Somoi";

// Alert
export const showAlert = (message: string) => {
  Alert.alert(appName, message);
};

export const showConfirmAlert = (
  message: string | null,
  onConfirm: () => void,
  OnCancel?: () => void,
  cancelText: string = "No",
  confirmText: string = "Yes"
) => {
  Alert.alert(
    appName,
    message || undefined,
    [
      {
        text: cancelText,
        style: "destructive",
        onPress: OnCancel,
      },
      {
        text: confirmText,
        onPress: onConfirm,
      },
    ],
    { cancelable: true }
  );
};

export const showConfirmForGuest = (onConfirm: () => void) => {
  Alert.alert(
    appName,
    "To access this feature, Please sign in!",
    [
      {
        text: "Cancel",
        style: "destructive",
      },
      {
        text: "Sign In",
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
export const rupeeSymbol = "₹";

// Flash Messages
export const flashMessageSucess = (message: string | null) => {
  showMessage({
    message: message || "",
    type: "success",
    backgroundColor: colors.white,
    color: colors.blue4e,
    duration: 3000,
    icon: "success",
    iconProps: { tintColor: colors.blue4e },
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
    message: message || "",
    backgroundColor: colors.white,
    color: colors.blue4e,
    duration: 3000,
    icon: "none",
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
  // url: "https://hlik-deep-bhaumik.s3.amazonaws.com/",
  url: "https://hlik-deep-bhaumik.s3.amazonaws.com/",
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
  return new Promise((callback) => {
    checkMultiple([permission]).then((status) => {
      if (
        status[permission] === RESULTS.DENIED ||
        status[permission] === RESULTS.UNAVAILABLE
      ) {
        requestMultiple([permission]).then((status) => {
          const data: any = Object.values(status);
          callback(data[0] === "granted");

          if (data[0] === "blocked" && Platform.OS === "android") {
            Alert.alert(
              appName,
              message,
              [
                {
                  text: "Cancel",
                  onPress: () => __DEV__ && console.log("Cancel Pressed"),
                },
                {
                  text: "Settings",
                  onPress: () => openSettings(),
                },
              ],
              { cancelable: false }
            );
          }
        });
      } else if (status[permission] === RESULTS.BLOCKED) {
        Alert.alert(
          appName,
          message,
          [
            {
              text: "Cancel",
              onPress: () => __DEV__ && console.log("Cancel Pressed"),
            },
            {
              text: "Settings",
              onPress: () => openSettings(),
            },
          ],
          { cancelable: false }
        );
        callback(false);
      } else {
        callback(true);
      }
    });
  });
};

export const containsEmoji = (str: string): boolean => {
  const regex = emojiRegex();
  return regex.test(str);
};

export const statusColors: { [key: string]: string } = {
  "Order Accepted": colors.black35,
  "Order Requested": colors.black35,
  "Order Preparing": colors.black35,
  "Order Prepared": colors.black35,
  "Order Packaging": colors.black35,
  "Order Out for Delivery": colors.black35,
  "Order Delivered": colors.green4f,
  "Order Cancelled": colors.red2e,
  "Order Rejected": colors.red2e,
  "Order Return Requested": colors.orange1c,
  "Order Return Accepted": colors.black35,
  Request_exchange: colors.orange1c,
  "Order Returned": colors.green4f,
  "Delivery Person Not Available": colors.red2e,
};

export const statusTexts: { [key: string]: string } = {
  "Order Requested": "Your Order is Placed",
  "Order Accepted": "Your Order is Confirmed",
  "Order Preparing": "Your Order is Preparing",
  "Order Prepared": "Your Order is Prepared",
  "Order Packaging": "Your Order is Packaging",
  "Order Out for Delivery": "Your Order is On The Way",
  "Order Delivered": "Your Order is Delivered",
  "Order Cancelled": "Your Order is Cancelled",
  "Order Rejected": "Your Order is Rejected",
  "Order Return Requested": "Requested for Returned",
  "Order Return Accepted": "Return Request is Accepted",
  // "Order Replacement Requested": "Requested for Exchange",
  "Order Returned": "Your Order is Returned",
  "Delivery Person Not Available": "Delivery Person Not Available",
};

export const backendToUIStatusMap: { [key: string]: string } = {
  "Order Requested": "Order Placed",
  "Order Accepted": "Order Confirmed",
  "Order Preparing": "Preparing",
  "Order Prepared": "Order Prepared",
  "Order Packaging": "Order Packaging",
  "Order Out for Delivery": "On The Way",
  "Order Delivered": "Order Delivered",
  "Order Cancelled": "Order Cancelled",
  "Order Rejected": "Order Rejected",
  "Order Return Requested": "Order pickup date & Time",
  // "Order Replacement Requested": "Requested for Exchange",
  "Order Returned": "Order Returned",
  "Delivery Person Not Available": "Delivery Person Not Available",
};

// App States
export const AppStates = {
  FOREGROUND: "FOREGROUND",
  BACKGROUND: "BACKGROUND",
  KILL: "KILL",
};

// Notification Types
export const NotificationTypes = {
  ADMIN_NOTIFICATION: "ADMIN_NOTIFICATION",
  ORDER_PLACED: "ORDER_PLACED",
  ORDER_ACCEPTED: "ORDER_ACCEPTED",
  ORDER_PREPARING: "ORDER_PREPARING",
  ORDER_PREPARED: "ORDER_PREPARED",
  ORDER_PACKAGING: "ORDER_PACKAGING",
  ORDER_OUT_FOR_DELIVERY: "ORDER_OUT_FOR_DELIVERY",
  ORDER_DELIVERED: "ORDER_DELIVERED",
  ORDER_CANCELLED: "ORDER_CANCELLED",
  ORDER_REJECTED: "ORDER_REJECTED",
  ORDER_RETURN_REQUESTED: "ORDER_RETURN_REQUESTED",
  ORDER_RETURN_ACCEPTED: "ORDER_RETURN_ACCEPTED",
  ORDER_RETURNED: "ORDER_RETURNED",
  DELIVERY_PERSON_NOT_AVAILABLE:"DELIVERY_PERSON_NOT_AVAILABLE",
  CHAT: "CHAT",
  NEW_CHAT_RECEIVED:"NEW_CHAT_RECEIVED"
};

// Emitter Types
export const EmitterTypes = {
  ORDER_ACCEPTED: "ORDER_ACCEPTED",
  ORDER_PREPARING: "ORDER_PREPARING",
  ORDER_PREPARED: "ORDER_PREPARED",
  ORDER_PACKAGING: "ORDER_PACKAGING",
  ORDER_OUT_FOR_DELIVERY: "ORDER_OUT_FOR_DELIVERY",
  ORDER_DELIVERED: "ORDER_DELIVERED",
  ORDER_CANCELLED: "ORDER_CANCELLED",
  ORDER_REJECTED: "ORDER_REJECTED",
  ORDER_RETURN_REQUESTED: "ORDER_RETURN_REQUESTED",
  ORDER_RETURN_ACCEPTED: "ORDER_RETURN_ACCEPTED",
  ORDER_RETURNED: "ORDER_RETURNED",
  CHAT : "CHAT"
};

// Formate Notification
export const formatNotifications = (rawData: any[]): NotificationGroup[] => {
  const today = moment().startOf("day");
  const yesterday = moment().subtract(1, "day").startOf("day");

  const grouped: Record<string, NotificationData[]> = {
    Today: [],
    Yesterday: [],
    Older: [],
  };

  rawData.forEach((item) => {
    const createdAt = moment(item.created_at);
    const formattedTime = createdAt.format("hh:mm A");

    const notificationItem: NotificationData = {
      title: item.title,
      desc: item.body,
      time: formattedTime,
      tag: item.tag,
      other_data: item.other_data,
    };

    if (createdAt.isSame(today, "d")) {
      grouped["Today"].push(notificationItem);
    } else if (createdAt.isSame(yesterday, "d")) {
      grouped["Yesterday"].push(notificationItem);
    } else {
      grouped["Older"].push(notificationItem);
    }
  });

  const sections: NotificationGroup[] = Object.entries(grouped)
    .filter(([_, data]) => data.length > 0)
    .map(([titleMain, data]) => ({
      titleMain,
      data,
    }));

  return sections;
};
