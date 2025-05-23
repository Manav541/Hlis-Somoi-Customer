import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
  // View Styles
  vwMain: {
    flex: 1,
    backgroundColor: colors.blue4e,
    justifyContent : 'space-between'
  },
  vwProductImage: {
    height: 116,
    width: 69,
    backgroundColor: colors.whiteff,
    alignItems: "center",
    justifyContent: "center",
  },
  vwProductDetails: {
    marginLeft : 10,
    marginTop : 9
  },
  

//   Text Styles
  lblProductName: {
    color: colors.black35,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
    lineHeight: 21,
  },
  lblProductPrice: {
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.bold
  },
  lblProductWeight: {
    color: colors.greya7,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.semibold 
  },
  lblQuantity: {
    color: colors.grey62,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regularGolosText,
  },
  lblQuantityCount: {
    color: colors.blue4e,
    fontFamily: fontsfamily.semiboldGolosText,
    fontSize: fontSize.size14,
  },

//   Image Styles
  imgDotBlue: {
    height: 4,
    width: 4,
  },
  imgCheckBox:{
    height : 24,
    width : 24,
    position : "absolute",
    right : 7,
    bottom : 7
  },

  // TouchableOpacity Styles
  btnProductsItem: {
    height: 116,
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: "row",
    overflow: "hidden",
  },
});
