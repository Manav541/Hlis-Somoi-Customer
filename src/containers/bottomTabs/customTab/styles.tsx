import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/Colors';
import {fontsfamily} from '../../../constants/FontFamily';
import {fontSize} from '../../../constants/FontSizes';

export const styles = StyleSheet.create({
  btn: {alignItems: 'center', gap: 1},
  lbl: {
    color: colors.black35,
    fontFamily: fontsfamily.semibold,
    fontSize: fontSize.size10,
  },
});
