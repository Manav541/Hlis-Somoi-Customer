import {StyleSheet} from 'react-native';
import {fontSize} from '../../constants/FontSizes';
import {fontsfamily} from '../../constants/FontFamily';

export const styles = StyleSheet.create({
  vwMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 100,
  },
  img: {height: 20, width: 20, resizeMode: 'stretch'},
  lblTitle: {
    fontSize: fontSize.size10,
    fontFamily: fontsfamily.semibold,
  },
});
