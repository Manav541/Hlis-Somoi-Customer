import {StyleSheet} from 'react-native';
import {colors} from './Colors';
import {fontSize} from './FontSizes';
import {fontsfamily} from './FontFamily';

export const constnatStyles = StyleSheet.create({
  vwOrangeBgParent: {flex: 1, backgroundColor: colors.orange1c},
  vwBlueBgWithRadius: {
    flex: 1,
    backgroundColor: colors.blue4e,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  vwBlueBgBottomRadius: {
    flex: 1,
    backgroundColor: colors.blue4e,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  vwNoDataCenter: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  lblNoData: {
    color: colors.white,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.semibold,
  },
  img24: {height: 24, width: 24},
});
