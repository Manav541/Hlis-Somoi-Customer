import {StyleSheet} from 'react-native';
import {colors} from '../../constants/Colors';
import {fontsfamily} from '../../constants/FontFamily';
import {fontSize} from '../../constants/FontSizes';

export const styles = StyleSheet.create({
  vwMain: {flexDirection: 'row', alignItems: 'center', gap: 25},
  btn: {height: 28},
  lbl: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
  },
});
