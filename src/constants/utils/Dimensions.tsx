import {Dimensions} from 'react-native';

export const ScreenDimensions = {
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
  screenWidth: Dimensions.get('screen').width,
  screenHeight: Dimensions.get('screen').height,
};
