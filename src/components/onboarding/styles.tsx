import {StyleSheet} from 'react-native';
import { colors } from '../../constants/Colors';
import { ScreenDimensions } from '../../constants/utils/Dimensions';
import { fontSize } from '../../constants/FontSizes';
import { fontsfamily } from '../../constants/FontFamily';

export const styles = StyleSheet.create({
  vwMain: {
    flex: 1,
    backgroundColor: colors.orange1c,
    justifyContent: 'space-between',
  },
  vwFlatlistMain: {
    height: ScreenDimensions.windowHeight / 1.2,
    backgroundColor: colors.blue4e,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  vwDotsMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 40,
    // position: 'absolute',
    // top: ScreenDimensions.screenHeight / 1.5,
  },
  vwDots: {
    height: 2,
    width: 18,
    borderRadius: 20,
  },
  image: {
    width: ScreenDimensions.screenWidth - 48,
    height: ScreenDimensions.screenHeight / 2.4,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  imageGo: {height: 52, width: 52, resizeMode: 'stretch'},
  title: {
    fontSize: fontSize.size24,
    color: colors.white,
    fontFamily: fontsfamily.bold,
    textAlign: 'center',
    marginHorizontal: 51,
    marginTop: 25,
  },
  description: {
    fontSize: fontSize.size16,
    color: colors.white,
    fontFamily: fontsfamily.regular,
    textAlign: 'center',
    marginHorizontal: 51,
    marginTop: 10,
  },
});
