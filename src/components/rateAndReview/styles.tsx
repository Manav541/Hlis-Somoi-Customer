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
  vwLine: {
    height: 1,
    backgroundColor: colors.greyd9_50,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  vwProductsItems: {
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: "row",
    overflow: "hidden",
    marginHorizontal : 20,
  },
  vwProductImage: {
    width: 69,
    backgroundColor: colors.whiteff,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
  },
  vwProductItemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginRight: 14,
    marginVertical: 9,
    marginLeft: 11,
  },
  vwUploadImageVideos:{
    marginHorizontal : 20,
    marginTop : 20,
    gap : 10
},
vwUploadImageVideosItem :{
    height : 78,
    width : 78,
    borderRadius : 9.38,
    overflow : 'hidden'
},

  // Text Styles
  lblTitle: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  lblProductName: {
    color: colors.black35,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
    marginBottom: 5,
    lineHeight: 21,
  },
  lblProductPrice: {
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.bold,
  },
  lblProductWeight: {
    color: colors.greya7,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.semibold,
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
  lblUploadImageVideo :{
    color : colors.white,
    fontSize: fontSize.size14,
    fontFamily:fontsfamily.semibold,
},

  // TouchableOpacity Styles
 
btnUploadImageVideo :{
    height : 78,
    width : 78,
    borderRadius : 9.38,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : colors.white
},
btnCancelImage :{
    height : 78,
    width : 78,
    borderRadius : 9.38,
    overflow :'hidden',
    justifyContent:'center',
    alignItems : 'center',
    backgroundColor : colors.black50,
    position : 'absolute',
    top : 0,
    bottom : 0,
    left : 0,
    right : 0
},

  //   Image Styles
  imgDot: {
    height: 4,
    width: 4,
    marginHorizontal: 4,
  },
  imgCheckBox:{
    height : 58.11,
    width : 58.11,
  },
  imgAdd :{
      height : 22.51,
      width : 22.51
  },
  imgUpload:{
      height : 78,
      width : 78,
      borderRadius : 9.38,
      overflow : 'hidden'
  },
});
