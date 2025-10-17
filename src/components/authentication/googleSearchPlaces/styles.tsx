import {StyleSheet} from 'react-native';
import { colors } from '../../../constants/Colors';
import { fontSize } from '../../../constants/FontSizes';
import { fontsfamily } from '../../../constants/FontFamily';
export const styles = StyleSheet.create({
  vwMain: {paddingTop: 20, paddingHorizontal: 20, gap: 5},
  flatlistContainer: {flexGrow: 1, gap: 10, paddingTop: 5},
  btn: {
    gap: 3,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: colors.grey62,
  },
  lblMain: {
    fontSize: fontSize.size15,
    color: colors.white,
    fontFamily: fontsfamily.medium,
  },
  lblSecondary: {
    fontSize: fontSize.size14,
    color: colors.white,
    fontFamily: fontsfamily.regular,
  },
});
