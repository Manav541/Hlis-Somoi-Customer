/**
 * @format
 */
import 'react-native-reanimated';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import { PlatformVersion } from './src/constants/utils/Platform';
import notifee, {AndroidImportance} from '@notifee/react-native';

PlatformVersion.isAndroid &&
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    let notification = PlatformVersion.isIOS
      ? remoteMessage.notification
      : JSON.parse(remoteMessage.data.data);

    if (notification) {
      const {title, body} = notification;
      console.log('title', title);
      console.log('body', body);

      notifee.displayNotification({
        title: title,
        body: body,
        data: notification,
        android: {
          smallIcon: 'ic_launcher_foreground',
          channelId: 'default',
          pressAction: {
            id: 'default',
          },
          importance: AndroidImportance.DEFAULT,
        },
      });
    }
  });


LogBox.ignoreLogs(['Open debugger']);

AppRegistry.registerComponent(appName, () => App);
