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
  vwMyWishlistItem: {
    height: 303,
    borderRadius: 20,
    overflow: "hidden",
  },
  vwProductImgLike: {
    // height: 112,
    flex: 1,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.whiteff,
    justifyContent: "center",
    alignItems: "center",
  },
  vwProductDetails: {
    // flex: 1,
    marginHorizontal: 7,
    marginTop: 6,
    marginBottom: 7,
    justifyContent: "space-between",
  },
  vwPriceRating: {
    // height: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 7,
  },
  vwPrice: {
    // flexDirection: "row",
    // alignItems: "center",
    // gap: 6,
  },
  vwProductRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  vwNoData: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  //   Text Styles
  lblAddToCart: {
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
  },
  lblProductName: {
    color: colors.black35,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
    lineHeight: 22,
  },
  lblProductWeight: {
    color: colors.greya7,
    fontSize: fontSize.size10,
    fontFamily: fontsfamily.semibold,
  },
  lblProductFinalPrice: {
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.bold,
  },
  lblProductPrice: {
    color: colors.greya7,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
    textDecorationLine: "line-through",
  },
  lblProductRating: {
    color: colors.black13,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.semibold,
  },
  lblNoData: {
    fontSize: fontSize.size20,
    color: colors.white,
    fontFamily: fontsfamily.semibold,
    textAlign: "center",
  },

  //   TouchableOpacity Styles
  btnMyWishlistItem: {
    height: 270,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  btnAddToCart: {
    height: 34,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    backgroundColor: colors.orange1c,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  //   Image styles
  imgStar: {
    height: 12.5,
    width: 12.6,
  },
});
