import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
  // View Styles
  vwMain: {
    flex: 1,
    backgroundColor: colors.blue4e,
  },
  vwProductRate:{
    flexDirection : 'row',
    alignItems : 'center',
    gap : 2,
    marginTop : 2,
    marginBottom : 3
  },
  vwPrice:{
    flexDirection : 'row',
    alignItems : 'center',
    gap : 4.87,
  },

//   Text Styles
  lblTitle: {
    color: colors.white,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.semibold,
    margin: 20,
  },
  lblProductName:{
    color: colors.blue4e,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.semibold,
    lineHeight : 19
  },
  lblProductRate:{
    color: colors.black13,
    fontSize: fontSize.size0742,
    fontFamily: fontsfamily.medium,
  },
  lblProductFinalPrice:{
    color: colors.blue4e,
    fontSize: fontSize.size11,
    fontFamily: fontsfamily.bold,
  },
  lblProductPrice:{
    color: colors.greya7,
    fontSize: fontSize.size10,
    fontFamily: fontsfamily.regular,
    textDecorationLine:"line-through"
  },
  lblProductDesc:{
    color: colors.black35,
    fontSize: fontSize.size10,
    fontFamily: fontsfamily.regular,
    marginTop : 5,
  },

  // TouchableOpacity Styles
  btnCompareProducts: {
    paddingVertical: 15,
    paddingLeft: 18,
    borderRadius: 10,
    backgroundColor: colors.whiteff,
    flexDirection : 'row',
    gap : 17,
  },

//   Image styles
imgProduct : {
    height : 91,
    width : 62
},
imgStar:{
    height : 7.73,
    width : 7.79
},
});
