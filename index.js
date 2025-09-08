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
import { setupSentry } from "./setupSentry";
import { zustandStore } from "./src/store";

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
createNotificationChannel();

// Background message handler

getMessaging().setBackgroundMessageHandler(async (remoteMessage) => {
  __DEV__ &&
    console.log("[FCMService] setBackgroundMessageHandler:", remoteMessage);
  const chatReceiverId =
    zustandStore.ChatNotificationStore.getState().receiverId;
  __DEV__ && console.log("Chat receiver id from index===>", chatReceiverId);

  try {
    const notification = PlatformVersion.isIOS
      ? remoteMessage?.data
      : JSON.parse(remoteMessage.data.data);

    // Restrict Chat Notification
    if (
      chatReceiverId &&
      notification.notification_tag == NotificationTypes.NEW_CHAT_RECEIVED
    ) {
      if (chatReceiverId == notification?.sender_id) {
        __DEV__ &&
          console.log(
            "Not shown notification because same of socket connection"
          );
        return;
      }
    }

    // Emit order-event only for order-related notifications
    const orderNotificationTypes = [
      NotificationTypes.ORDER_PLACED,
      NotificationTypes.ORDER_ACCEPTED,
      NotificationTypes.ORDER_PREPARING,
      NotificationTypes.ORDER_PREPARED,
      NotificationTypes.ORDER_PACKAGING,
      NotificationTypes.ORDER_OUT_FOR_DELIVERY,
      NotificationTypes.ORDER_DELIVERED,
      NotificationTypes.ORDER_CANCELLED,
      NotificationTypes.ORDER_REJECTED,
      NotificationTypes.ORDER_RETURN_REQUESTED,
      NotificationTypes.ORDER_RETURN_ACCEPTED,
      NotificationTypes.ORDER_RETURNED,
      NotificationTypes.DELIVERY_PERSON_NOT_AVAILABLE,
    ];

    const notificationToEmitterMap = {
      [NotificationTypes.ORDER_PLACED]: EmitterTypes.ORDER_PLACED,
      [NotificationTypes.ORDER_ACCEPTED]: EmitterTypes.ORDER_ACCEPTED,
      [NotificationTypes.ORDER_PREPARING]: EmitterTypes.ORDER_PREPARING,
      [NotificationTypes.ORDER_PREPARED]: EmitterTypes.ORDER_PREPARED,
      [NotificationTypes.ORDER_PACKAGING]: EmitterTypes.ORDER_PACKAGING,
      [NotificationTypes.ORDER_OUT_FOR_DELIVERY]:
        EmitterTypes.ORDER_OUT_FOR_DELIVERY,
      [NotificationTypes.ORDER_DELIVERED]: EmitterTypes.ORDER_DELIVERED,
      [NotificationTypes.ORDER_CANCELLED]: EmitterTypes.ORDER_CANCELLED,
      [NotificationTypes.ORDER_REJECTED]: EmitterTypes.ORDER_REJECTED,
      [NotificationTypes.ORDER_RETURN_REQUESTED]:
        EmitterTypes.ORDER_RETURN_REQUESTED,
      [NotificationTypes.ORDER_RETURN_ACCEPTED]:
        EmitterTypes.ORDER_RETURN_ACCEPTED,
      [NotificationTypes.ORDER_RETURNED]: EmitterTypes.ORDER_RETURNED,
      [NotificationTypes.DELIVERY_PERSON_NOT_AVAILABLE]:
        EmitterTypes.DELIVERY_PERSON_NOT_AVAILABLE,
    };

    if (orderNotificationTypes.includes(notification.notification_tag)) {
      const eventType = notificationToEmitterMap[notification.notification_tag];
      if (eventType) {
        __DEV__ &&
          console.log(
            "[FCMService] Emitting order-event:",
            eventType,
            "for notification_tag:",
            notification.notification_tag
          );
        DeviceEventEmitter.emit("order-event", eventType);
      }
    }

    await showNotification(notification);
  } catch (err) {
    console.error("[FCMService] Background error:", err);
  }
});

// Foreground message handler

getMessaging().onMessage(async (remoteMessage) => {
  console.log("[FCMService] Foreground notification received:", remoteMessage);
  const chatReceiverId =
    zustandStore.ChatNotificationStore.getState().receiverId;
  __DEV__ && console.log("Chat receiver id from index===>", chatReceiverId);

  try {
    const notification = PlatformVersion.isIOS
      ? remoteMessage?.data
      : JSON.parse(remoteMessage.data.data);

    // Restrict Chat Notification
    if (
      chatReceiverId &&
      notification.notification_tag == NotificationTypes.NEW_CHAT_RECEIVED
    ) {
      if (chatReceiverId == notification?.sender_id) {
        __DEV__ &&
          console.log(
            "Not shown notification because same of socket connection"
          );
        return;
      }
    }

    // Emit order-event only for order-related notifications
    const orderNotificationTypes = [
      NotificationTypes.ORDER_PLACED,
      NotificationTypes.ORDER_ACCEPTED,
      NotificationTypes.ORDER_PREPARING,
      NotificationTypes.ORDER_PREPARED,
      NotificationTypes.ORDER_PACKAGING,
      NotificationTypes.ORDER_OUT_FOR_DELIVERY,
      NotificationTypes.ORDER_DELIVERED,
      NotificationTypes.ORDER_CANCELLED,
      NotificationTypes.ORDER_REJECTED,
      NotificationTypes.ORDER_RETURN_REQUESTED,
      NotificationTypes.ORDER_RETURN_ACCEPTED,
      NotificationTypes.ORDER_RETURNED,
      NotificationTypes.DELIVERY_PERSON_NOT_AVAILABLE,
      NotificationTypes.PAYMENT_SUCCESSFUL,
      NotificationTypes.PAYMENT_FAILED,
      NotificationTypes.REFUND_PAYMENT,
      NotificationTypes.REFUND_FAILED,
    ];

    const notificationToEmitterMap = {
      [NotificationTypes.ORDER_PLACED]: EmitterTypes.ORDER_PLACED,
      [NotificationTypes.ORDER_ACCEPTED]: EmitterTypes.ORDER_ACCEPTED,
      [NotificationTypes.ORDER_PREPARING]: EmitterTypes.ORDER_PREPARING,
      [NotificationTypes.ORDER_PREPARED]: EmitterTypes.ORDER_PREPARED,
      [NotificationTypes.ORDER_PACKAGING]: EmitterTypes.ORDER_PACKAGING,
      [NotificationTypes.ORDER_OUT_FOR_DELIVERY]:
        EmitterTypes.ORDER_OUT_FOR_DELIVERY,
      [NotificationTypes.ORDER_DELIVERED]: EmitterTypes.ORDER_DELIVERED,
      [NotificationTypes.ORDER_CANCELLED]: EmitterTypes.ORDER_CANCELLED,
      [NotificationTypes.ORDER_REJECTED]: EmitterTypes.ORDER_REJECTED,
      [NotificationTypes.ORDER_RETURN_REQUESTED]:
        EmitterTypes.ORDER_RETURN_REQUESTED,
      [NotificationTypes.ORDER_RETURN_ACCEPTED]:
        EmitterTypes.ORDER_RETURN_ACCEPTED,
      [NotificationTypes.ORDER_RETURNED]: EmitterTypes.ORDER_RETURNED,
      [NotificationTypes.DELIVERY_PERSON_NOT_AVAILABLE]:
        EmitterTypes.DELIVERY_PERSON_NOT_AVAILABLE,
      [NotificationTypes.PAYMENT_SUCCESSFUL]: EmitterTypes.PAYMENT_SUCCESSFUL,
      [NotificationTypes.PAYMENT_FAILED]: EmitterTypes.PAYMENT_FAILED,
      [NotificationTypes.REFUND_PAYMENT]: EmitterTypes.REFUND_PAYMENT,
      [NotificationTypes.REFUND_FAILED]: EmitterTypes.REFUND_FAILED,
    };

    if (orderNotificationTypes.includes(notification.notification_tag)) {
      const eventType = notificationToEmitterMap[notification.notification_tag];
      if (eventType) {
        __DEV__ &&
          console.log(
            "[FCMService] Emitting order-event:",
            eventType,
            "for notification_tag:",
            notification.notification_tag
          );
        DeviceEventEmitter.emit("order-event", eventType);
      }
    }
    await showNotification(notification);
  } catch (err) {
    console.error("[FCMService] Error parsing notification payload:", err);
  }
});

// Initial Notification Handler

getMessaging()
  .getInitialNotification()
  .then(async (remoteMessage) => {
    if (remoteMessage) {
      __DEV__ &&
        console.log("[FCM Service] Initial Notification:", remoteMessage);
      await notifee.cancelAllNotifications();
      handleNotificationPress(remoteMessage);
    }
  });

getMessaging().onNotificationOpenedApp(async (remoteMessage) => {
  console.log(
    "[FCMService] Notification opened app:",
    remoteMessage.notification
  );
  handleNotificationPress(remoteMessage);
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
      case NotificationTypes.CONTACT_US:
      case NotificationTypes.PAYMENT_SUCCESSFUL:
      case NotificationTypes.PAYMENT_FAILED:
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
      case NotificationTypes.REFUND_PAYMENT:
      case NotificationTypes.REFUND_FAILED:
        navigate(ScreenNames.orderSummary, {
          order_id: notification?.order_id || notification?.data?.order_id,
        });
        break;

      case NotificationTypes.CHAT:
      case NotificationTypes.NEW_CHAT_RECEIVED:
        navigate(ScreenNames.chat, {
          driver_id: notification?.sender_id || notification?.data?.sender_id,
          customer_id:
            notification?.receiver_id || notification?.data?.receiver_id,
        });
        break;

      default:
        console.log("Unhandled notification tag:", tag);
        break;
    }
  }, 1000);
}
setupSentry();
AppRegistry.registerComponent(appName, () => App);
