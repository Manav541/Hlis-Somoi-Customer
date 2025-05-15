import {StyleSheet} from 'react-native';
import {colors} from '../../constants/Colors';
import {fontSize} from '../../constants/FontSizes';
import {fontsfamily} from '../../constants/FontFamily';

export const styles = StyleSheet.create({
  vwModal: {
    backgroundColor: colors.blue4e,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  imgSuccess: {height: 144, width: 144, alignSelf: 'center'},
  imgOtherImage:{
    height : 151, width : 143, alignSelf : 'center'
  },
  lblTitle: {
    color: colors.white,
    fontSize: fontSize.size20,
    fontFamily: fontsfamily.bold,
    textAlign: 'center',
    marginHorizontal: 12,
    lineHeight:28
  },
  lblSubtitle: {
    color: colors.greya7,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
    textAlign: 'center',
    marginHorizontal: 12,
    marginTop: 8,
  },
  lblOrderNumber: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
    textAlign: "center",
    marginBottom : 30
  },
});
