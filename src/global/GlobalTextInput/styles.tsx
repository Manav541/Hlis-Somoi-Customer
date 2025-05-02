import {StyleSheet} from 'react-native';
import {fontsfamily} from '../../constants/FontFamily';
import {colors} from '../../constants/Colors';
import {fontSize} from '../../constants/FontSizes';

export const styles = StyleSheet.create({
  vwMain: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 5,
    flex: 1,
  },
  vwInputEye: {flex: 1, flexDirection: 'row', alignItems: 'center', gap: 5},
  input: {
    margin: 0,
    padding: 0,
    flex: 1,
    borderRadius: 100,
    fontSize: fontSize.size14,
    color: colors.white,
    fontFamily: fontsfamily.medium,
  },
  eyeImg: {height: 24, width: 24, resizeMode: 'stretch'},
  lblCountryCode: {
    fontSize: fontSize.size14,
    color: colors.white,
    fontFamily: fontsfamily.semibold,
  },
});
