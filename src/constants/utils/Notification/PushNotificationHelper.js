import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
import {PlatformVersion} from '../Platform';
import {MmkvManager, storage} from '../MmkvManager';

export async function requestUserForNotificationPermission() {
  __DEV__ && console.log('In request user for notification!!');

  if (PlatformVersion.isAndroid && Platform.Version >= 33) {
    // Explicitly request notification permission for Android 13+
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // Permission granted, proceed with getting FCM token
      await getFCMToken();
    } else {
      __DEV__ && console.log('Notification permission denied!');
    }
  } else {
    // For older Android versions or iOS
    __DEV__ && console.log('enabled out');
    __DEV__ && console.log('Checking iOS notification permission...');

    // Ensure device is registered for remote messages
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      __DEV__ && console.log('Registering device for remote messages...');
      await messaging().registerDeviceForRemoteMessages();
    }

    // Request permission from the user
    const authStatus = await messaging().requestPermission();
    __DEV__ && console.log('Authorization status received ==>', authStatus);

    // Check if permission is granted
    let enabled =
      authStatus === messaging().AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging().AuthorizationStatus.PROVISIONAL;

    __DEV__ && console.log('Initial Permission Enabled ==>', enabled);

    // If first-time permission is still false, retry after a short delay
    if (!enabled) {
      __DEV__ && console.log('Checking permission again after 1 second...');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second

      const currentPermission = await messaging().hasPermission();
      enabled =
        currentPermission === messaging().AuthorizationStatus.AUTHORIZED ||
        currentPermission === messaging().AuthorizationStatus.PROVISIONAL;

      __DEV__ &&
        console.log('Final permission enabled after retry ==>', enabled);
    }

    // Store permission status to prevent future inconsistencies
    storage.setItem(
      MmkvManager.Keys.notificationPermission,
      enabled ? 'true' : 'false',
    );

    if (enabled) {
      __DEV__ &&
        console.log('Permission granted, proceeding to get FCM token...');
      await getFCMToken();
    } else {
      __DEV__ &&
        console.log('Permission not enabled. Auth status ==>', authStatus);
    }
  }
}

const getFCMToken = async () => {
  try {
    const token = storage.getString(MmkvManager.Keys.fcmToken);
    __DEV__ && console.log('GETTING FCM TOKEN FROM MMKV ==>', token);

    if (!token) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        __DEV__ && console.log('GENERATED FCM TOKEN ==>', fcmToken);
        storage.set(MmkvManager.Keys.fcmToken, fcmToken);
        return fcmToken;
      }
    } else {
      return token;
    }
  } catch (error) {
    __DEV__ && console.log('Error in getting FCM Token ==>', error);
    return null;
  }
};
