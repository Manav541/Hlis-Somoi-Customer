/**
 * @format
 */
import 'react-native-reanimated';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

LogBox.ignoreLogs(['Open debugger']);

AppRegistry.registerComponent(appName, () => App);
