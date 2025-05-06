import {StyleSheet} from 'react-native';
import {colors} from '../../constants/Colors';
import {fontsfamily} from '../../constants/FontFamily';
import {fontSize} from '../../constants/FontSizes';

export const styles = StyleSheet.create({
  vwMain: {
    flex: 1,
    backgroundColor: 'white',
    gap: 7,
  },
  vwInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginRight: 16,
  },
  vwDataMap: {gap: 5, paddingHorizontal: 10},
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  searchInput: {
    margin: 0,
    padding: 0,
    height: 52,
    borderWidth: 1,
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    borderColor: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
    color: colors.black35,
  },
  btnCountry: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: colors.blue4e,
  },
  lblCountryName: {
    fontSize: fontSize.size14,
    color: colors.blue4e,
    fontFamily: fontsfamily.medium,
  },
});
