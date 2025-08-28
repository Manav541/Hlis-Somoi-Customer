import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { ScreenDimensions } from "../../constants/utils/Dimensions";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
  // View Styles
  vwMain: {
    flex: 1,
    backgroundColor: colors.blue4e,
    // paddingBottom: 20,
  },
  vwMyWishlistItem: {
    height: 293,
    borderRadius: 20,
    overflow: "hidden",
  },
  vwDotsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 9,
    alignSelf: "center",
    gap: 8,
  },

  vwDot: {
    width: 5,
    height: 5,
    borderRadius: 5 / 2,
  },
  vwRestaurantDetails: {
    marginHorizontal: 20,
    marginTop: 32,
  },
  vwRestaurantAddress: {
    flexDirection: "row",
    gap: 5.39,
    marginRight: 20,
    marginTop: 5.39,
  },
  vwRestaurantTimeDistance: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5.39,
  },
  vwRestaurantDistance: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4.31,
  },
  vwRestaurantRateReview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 20,
    marginTop: 14.51,
  },
  vwRestaurantRate: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  vwRestaurantReview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  vwFilterSubCategoryType: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 20,
    marginTop: 10,
  },

  vwFoodImgLike: {
    flex: 1,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.whiteff,
    justifyContent: "center",
    alignItems: "center",
  },
  vwFoodDetails: {
    marginHorizontal: 7,
    marginTop: 6,
    marginBottom: 11,
    justifyContent: "space-between",
  },
  vwPriceRating: {
    height: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 7,
  },
  vwPrice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  vwFoodRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  vwCounterContainer: {
    height: 34,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    backgroundColor: colors.orange1c,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    flexDirection: "row",
  },
  vwRestaurantFood: {
    paddingHorizontal: 20,
    gap: 9,
    marginBottom: 40,
    marginTop: 10,
  },
  vwPriceWeight: {
    marginHorizontal: 9,
    marginTop: 4,
  },
  vwProductPrice: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    gap: 9,
  },

  // Text Styles
  lblRestaurant_name: {
    color: colors.white,
    fontSize: fontSize.size1509,
    fontFamily: fontsfamily.bold,
  },
  lblRestaurant_address: {
    color: colors.white,
    fontSize: fontSize.size1294,
    fontFamily: fontsfamily.regularOutFit,
    lineHeight: 20,
  },
  lblRestaurant_deliverytime: {
    color: colors.white,
    fontSize: fontSize.size1294,
    fontFamily: fontsfamily.regularOutFit,
  },
  lblRestaurant_distance: {
    color: colors.white,
    fontSize: fontSize.size1294,
    fontFamily: fontsfamily.mediumOutFit,
  },
  lblRestaurant_rate: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
  },
  lblRestaurant_reviews: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
  },
  lblReviews: {
    color: colors.greya7,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regularGolosText,
  },
  lblSubCategoryTitle: {
    color: colors.greya7,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
  },
  lblSubCategoryTitleSelected: {
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
  },
  lblAddToCart: {
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
  },
  lblFoodName: {
    color: colors.black35,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
    lineHeight: 20,
  },
  lblFoodWeight: {
    color: colors.greya7,
    fontSize: fontSize.size10,
    fontFamily: fontsfamily.semibold,
  },
  lblFoodFinalPrice: {
    color: colors.blue4e,
    fontSize: fontSize.size13,
    fontFamily: fontsfamily.bold,
  },
  lblFoodPrice: {
    color: colors.greya7,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
    textDecorationLine: "line-through",
  },
  lblFoodRating: {
    color: colors.black13,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.semibold,
  },
  lblFoodQuantity: {
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
    marginHorizontal: 10,
  },
  lblNoData: {
    fontSize: fontSize.size16,
    color: colors.greya7,
    textAlign: "center",
  },
  lblProdcuctFinalPrice: {
    color: colors.blue4e,
    fontSize: fontSize.size18,
    fontFamily: fontsfamily.semibold,
  },
  lblProductPrice: {
    color: colors.greya7,
    fontSize: fontSize.size18,
    fontFamily: fontsfamily.regular,
    textDecorationLine: "line-through",
  },
  lblProductWeight1: {
    color: colors.greya7,
    fontSize: fontSize.size18,
    fontFamily: fontsfamily.regular,
  },

  // Image Styles
  imgRestaurant_imgMain: {
    height: ScreenDimensions.screenHeight / 3,
    width: ScreenDimensions.screenWidth,
  },
  imgRestaurant_logo: {
    height: 62,
    width: 62,
    position: "absolute",
    right: 20,
    bottom: -30,
    borderRadius: 100,
  },
  imgRestaurant_location: {
    height: 23.71,
    width: 23.71,
  },
  imgDot: {
    height: 5.39,
    width: 5.39,
  },
  imgDotGrey: {
    height: 6,
    width: 6,
  },
  imgStar: {
    height: 15.02,
    width: 15.14,
  },
  imgFilter: {
    height: 33,
    width: 33,
  },
  imgRedHeart: {
    height: 14,
    width: 14,
  },
  imgStarFood: {
    height: 12.5,
    width: 12.6,
  },
  imgAddMinus: {
    height: 24,
    width: 24,
  },
  imgFood: {
    height: 88,
    width: 88,
  },
  imgSimilarProduct: {
    flex: 1,
    width: "100%",
  },

  // Touchableopacity Styles
  btnFoodItem: {
    height: 260,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.white,
  },
  btnSubCategoryTitle: {
    paddingHorizontal: 15,
    height: 35,
    borderRadius: 50,
    gap: 3,
    borderWidth: 1,
    borderColor: colors.greya7,
    justifyContent: "center",
    alignItems: "center",
  },
  btnSubCategoryTitleSelected: {
    paddingHorizontal: 15,
    backgroundColor: colors.orange1c,
    height: 35,
    borderRadius: 50,
    gap: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  btnRedHeart: {
    height: 24,
    width: 24,
    borderRadius: 22,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 10,
    right: 10,
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
  btnSimilarProduct: {
    backgroundColor: colors.creamee,
    borderRadius: 20,
    height: 192,
    width: 120,
    justifyContent: "space-between",
    paddingBottom: 11,
    overflow: "hidden",
  },
  btnSimilarProductSelected: {
    backgroundColor: colors.creamee,
    borderRadius: 20,
    height: 192,
    width: 120,
    justifyContent: "space-between",
    paddingBottom: 7,
    borderWidth: 4,
    borderColor: colors.orange1c,
    overflow: "hidden",
  },

  //   Modal
  vwFoodModalView: {
    flex: 1,
    backgroundColor: colors.black50,
    // justifyContent: "flex-end",
  },
  vwFoodModalContainer: {
    width: "100%",
    height: ScreenDimensions.screenHeight / 1.5,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 37,
    backgroundColor: colors.blue4e,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  vwFoodImgBG: {
    height: 249,
    borderRadius: 10,
    backgroundColor: colors.whiteff,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  vwFoodNameShare: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 24,
    marginTop: 24,
  },
  vwAdditionalInfo: {
    justifyContent: "space-between",
    height: 36,
  },
  lblModalFoodName: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
  },
  lblModalFoodDesc: {
    color: colors.white,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
    marginBottom: 16,
  },
  lblModalFoodAdditionalInfo: {
    color: colors.white,
    fontSize: fontSize.size13,
    fontFamily: fontsfamily.regular,
  },
  imgModalFood: {
    height: 189,
    width: 189,
  },
  imgShareCartBag: {
    height: 24,
    width: 24,
  },
  btnModalAddToCart: {
    height: 52,
    borderRadius: 200,
    backgroundColor: colors.orange1c,
    justifyContent: "center",
    alignItems: "center",
  },

  // Header Styles
  vwHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    height: 24,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 12,
  },
  vwHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    gap: 10,
  },
  vwBedge: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: colors.red2e,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 15,
    alignSelf: "center",
  },
  lblBedge: {
    color: colors.white,
    fontSize: fontSize.size08_31,
    fontFamily: fontsfamily.semibold,
  },
  imgButton: {
    width: 24,
    height: 24,
  },

  fixedBottom: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: colors.blue4e,
    padding: 20,
  },
});
