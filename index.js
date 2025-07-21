import {
  AppRegistry,
  AppState,
  DeviceEventEmitter,
  LogBox,
} from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import notifee, { AndroidImportance, EventType } from "@notifee/react-native";
import { getMessaging } from "@react-native-firebase/messaging";
import { ScreenNames } from "./src/routers";
import { navigate } from "./src/constants/utils/Notification/notificationNavigation";
import { PlatformVersion } from "./src/constants/utils/Platform";
import { EmitterTypes, NotificationTypes } from "./src/constants/GConstant";

LogBox.ignoreAllLogs();

// Create notification Channel
async function createNotificationChannel() {
  await notifee.createChannel({
    id: "default-channel-id",
    name: "Default Channel",
    description: "A channel for default notifications",
    importance: AndroidImportance.HIGH,
    sound: "default",
    vibration: true,
  });
}
PlatformVersion.isAndroid && createNotificationChannel();

// Background message handler
PlatformVersion.isAndroid &&
  getMessaging().setBackgroundMessageHandler(async (remoteMessage) => {
    __DEV__ &&
      console.log("[FCMService] setBackgroundMessageHandler:", remoteMessage);
    // Defines Emitter
    DeviceEventEmitter.emit("refresh", "test");
    DeviceEventEmitter.emit(EmitterTypes.CHAT);

    try {
      const notification = PlatformVersion.isIOS
        ? remoteMessage?.notification
        : JSON.parse(remoteMessage.data.data);

      await showNotification(notification);
    } catch (err) {
      console.error("[FCMService] Background error:", err);
    }
  });

// Foreground message handler
PlatformVersion.isAndroid &&
  getMessaging().onMessage(async (remoteMessage) => {
    console.log(
      "[FCMService] Foreground notification received:",
      remoteMessage
    );
    // Defines Emitter
    DeviceEventEmitter.emit("refresh", "test");
    DeviceEventEmitter.emit(EmitterTypes.CHAT);

    try {
      const notification = PlatformVersion.isIOS
        ? remoteMessage?.notification
        : JSON.parse(remoteMessage.data.data);

      await showNotification(notification);
    } catch (err) {
      console.error("[FCMService] Error parsing notification payload:", err);
    }
  });

// Initial Notification Handler
PlatformVersion.isAndroid &&
  getMessaging()
    .getInitialNotification()
    .then(async (remoteMessage) => {
      if (remoteMessage) {
        __DEV__ &&
          console.log("[FCM Service] Initial Notification:", remoteMessage);
        await notifee.cancelAllNotifications();
        if (AppState.currentState === "active" && Platform.OS === "android") {
          await showNotification(remoteMessage.data);
        }
      }
    });

// Display notifiction handler
async function showNotification(remoteMessage) {
  console.log("[showNotification] Showing Notification:", remoteMessage);

  await notifee.displayNotification({
    title: remoteMessage?.title || "Default Title",
    body: remoteMessage?.message || remoteMessage?.body || "Default message",
    android: {
      channelId: "default-channel-id",
      smallIcon: "ic_launcher",
      largeIcon: "ic_launcher",
      importance: AndroidImportance.HIGH,
      pressAction: { id: "default" },
    },
    data: remoteMessage,
  });
}

// Foreground notification taps handler
PlatformVersion.isAndroid &&
  notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
      const detailedData = PlatformVersion.isIOS
        ? detail.notification
        : detail.notification?.data;
      __DEV__ &&
        console.log("[Notifee] Foreground Notification Pressed:", detailedData);
      handleNotificationPress(detailedData);
    }
  });

// Background notification taps handler
PlatformVersion.isAndroid &&
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === EventType.PRESS) {
      const detailedData = PlatformVersion.isIOS
        ? detail.notification
        : detail.notification?.data;
      __DEV__ &&
        console.log("[Notifee] Background Notification Pressed:", detailedData);
      handleNotificationPress(detailedData);
    }
  });

// Navigation handler on notification taps
function handleNotificationPress(notification) {
  const tag = PlatformVersion.isIOS
    ? notification.tag || notification?.data?.notification_tag
    : notification.notification_tag;
  __DEV__ && console.log("[handleNotificationPress] Notification tag:", tag);

  setTimeout(() => {
    switch (tag) {
      case NotificationTypes.ADMIN_NOTIFICATION:
        navigate(ScreenNames.notification);
        break;
      case NotificationTypes.ORDER_PLACED:
      case NotificationTypes.ORDER_ACCEPTED:
      case NotificationTypes.ORDER_PREPARING:
      case NotificationTypes.ORDER_PREPARED:
      case NotificationTypes.ORDER_PACKAGING:
      case NotificationTypes.ORDER_OUT_FOR_DELIVERY:
      case NotificationTypes.ORDER_DELIVERED:
      case NotificationTypes.ORDER_CANCELLED:
      case NotificationTypes.ORDER_REJECTED:
      case NotificationTypes.ORDER_RETURN_REQUESTED:
      case NotificationTypes.ORDER_RETURN_ACCEPTED:
      case NotificationTypes.ORDER_RETURNED:
      case NotificationTypes.DELIVERY_PERSON_NOT_AVAILABLE:
        navigate(ScreenNames.orderSummary, {
          order_id: notification?.order_id,
        });
        break;

      case NotificationTypes.CHAT:
      case NotificationTypes.NEW_CHAT_RECEIVED:
        navigate(ScreenNames.chat, {
          driver_id: notification?.sender_id,
          customer_id: notification?.receiver_id,
        });
        break;

      default:
        console.log("Unhandled notification tag:", tag);
        break;
    }
  }, 1000);
}

AppRegistry.registerComponent(appName, () => App);
