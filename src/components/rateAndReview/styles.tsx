import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";
import { ScreenDimensions } from "../../constants/utils/Dimensions";

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
    marginHorizontal: 20,
  },
  vwProductImage: {
    width: 69,
    backgroundColor: colors.whiteff,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    paddingVertical: 12.2,
  },
  vwProductItemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginRight: 14,
    marginVertical: 9,
    marginLeft: 11,
  },
  vwUploadImageVideos: {
    marginHorizontal: 20,
    marginTop: 20,
    gap: 10,
  },
  vwUploadImageVideosItem: {
    height: 78,
    width: 78,
    borderRadius: 9.38,
    overflow: "hidden",
  },
  vwAllBestSellersItem: {
    height: 250,
    width: ScreenDimensions.screenWidth - 40,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.white,
    marginBottom: 10,
    marginHorizontal : 20
  },
  vwBestSellersItemDetails: {
    paddingHorizontal: 12.5,
    paddingTop: 14,
    paddingBottom: 10,
    height: 102,
  },
  vwLocation: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    height: 22,
  },
  vwTimeDistanceRating: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 23,
    marginTop: 5,
  },
  vwTimeDistance: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  vwDistance: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  vwRating: {
    backgroundColor: colors.orange1c,
    height: 23,
    width: 53,
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    paddingLeft: 6,
    paddingRight: 7,
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
  lblUploadImageVideo: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
  },
  lblBestSellersItemName: {
    color: colors.black35,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.bold,
    lineHeight: 22,
  },
  lblLocation: {
    color: colors.black35,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regularOutFit,
  },
  lblTime: {
    color: colors.black35,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regularOutFit,
  },
  lblRatings: {
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regularOutFit,
    alignSelf :'center',
  },

  // TouchableOpacity Styles

  btnUploadImageVideo: {
    height: 78,
    width: 78,
    borderRadius: 9.38,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  btnCancelImage: {
    height: 78,
    width: 78,
    borderRadius: 9.38,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black50,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  //   Image Styles
  imgDot: {
    height: 4,
    width: 4,
    marginHorizontal: 4,
  },
  imgCheckBox: {
    height: 58.11,
    width: 58.11,
  },
  imgAdd: {
    height: 22.51,
    width: 22.51,
  },
  imgUpload: {
    height: 78,
    width: 78,
    borderRadius: 9.38,
    overflow: "hidden",
  },
  imgBestSellers: {
    height: 148,
    width: ScreenDimensions.screenWidth - 40,
  },
  imgLocation: {
    height: 22,
    width: 22,
  },
  imgStarBlue: {
    height: 16,
    width: 16,
  },
  imgLogo: {
    height: 40.48,
    width: 40.48,
    borderRadius: 100,
    position: "absolute",
    bottom: 81.03,
    right: 13,
  },
});
