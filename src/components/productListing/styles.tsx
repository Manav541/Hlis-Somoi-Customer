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
  vwSubCategoryContainer: {
    marginTop: 17,
    marginLeft: 20,
    paddingRight: 30,
    height: 35,
    marginBottom: 18,
  },
  vwMyWishlistItem: {
    height: 241,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  vwProductImgLike: {
    height: 112,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.whiteff,
    justifyContent: "center",
    alignItems: "center",
  },
  vwProductDetails: {
    flex: 1,
    marginHorizontal: 7,
    marginTop: 6,
    marginBottom: 7,
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
  vwProductRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  vwNoData: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
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
  vwBestSellersItemDetails: {
    paddingHorizontal: 12.5,
    paddingTop: 14,
    marginBottom: 10,
    height: 102,
    backgroundColor: colors.white,
  },
  vwLocation: {
    marginTop: 10,
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
    borderRadius: 50,
    paddingLeft: 6,
    paddingRight: 7,
  },

  // Text Styles
  lblSubCategoryTitle: {
    color: colors.greya7,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
  },
  lblSubCategoryTitleSelected: {
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
  },
  lblAddToCart: {
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
  },
  lblInStock: {
    fontSize: fontSize.size10,
    fontFamily: fontsfamily.semibold,
    position: "absolute",
    right: 7,
    bottom: 1,
    lineHeight: 18,
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
    lineHeight: 15,
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
    fontSize: fontSize.size16,
    color: colors.greya7,
  },
  lblProductQuantity: {
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
    marginHorizontal: 10,
  },
  lblBestSellersItemName: {
    color: colors.black35,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.bold,
    lineHeight: 14,
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
  lblDistance: {
    color: colors.black35,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.mediumOutFit,
  },
  lblRatings: {
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regularOutFit,
  },

  // Touchableopacity Styles
  btnSubCategoryTitle: {
    paddingHorizontal: 7,
    flexDirection: "row",
    alignItems: "center",
    height: 35,
    borderRadius: 50,
    gap: 3,
    borderWidth: 1,
    borderColor: colors.greya7,
    marginRight: 12,
  },
  btnSubCategoryTitleSelected: {
    paddingHorizontal: 7,
    backgroundColor: colors.orange1c,
    flexDirection: "row",
    alignItems: "center",
    height: 35,
    borderRadius: 50,
    gap: 3,
    marginRight: 12,
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
  btnAllBestSellersItem: {
    height: 250,
    width: ScreenDimensions.screenWidth - 40,
    borderRadius: 20,
    overflow: "hidden",
    // backgroundColor: colors.white,
  },
  btnFavourite: {
    height: 24,
    width: 24,
    backgroundColor: colors.white,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 9.29,
    right: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  // Image Styles
  imgSubIcon: {
    height: 20,
    width: 20,
  },
  imgRedHeart: {
    height: 14,
    width: 14,
  },
  imgStar: {
    height: 12.5,
    width: 12.6,
  },
  imgAddMinus: {
    height: 24,
    width: 24,
  },
  imgBestSellers: {
    height: 148,
    width: ScreenDimensions.screenWidth - 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  imgLocation: {
    height: 22,
    width: 22,
  },
  imgDot: {
    height: 5,
    width: 5,
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
    right: 14.76,
  },

  // Filter Modal
  vwFilterModal: {
    flex: 1,
    backgroundColor: colors.black50,
    justifyContent: "flex-end",
  },
  vwFilterModalContainer: {
    width: ScreenDimensions.screenWidth,
    paddingTop: 21,
    backgroundColor: colors.blue4e,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  vwFilterTitleClose: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  vwLine: {
    height: 1,
    backgroundColor: colors.white,
    width: ScreenDimensions.screenWidth,
    marginTop: 16,
  },
  vwInstantDeliveries: {
    gap: 5,
    height: 51,
    justifyContent: "space-between",
    marginBottom: 12,
  },
  vwInstantDeliveriesCheck: {
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  vwCategories: {
    height: 84,
    gap: 10,
    marginBottom: 12,
  },
  vwPricerange: {
    height: 133,
    gap: 10,
    marginBottom: 12,
  },
  vwPriceRangeData: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    gap: 10,
  },
  vwPriceValueBox: {
    height: 48,
    width: 72,
    borderRadius: 10,
    borderColor: colors.greya7,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  vwRatingRange: {
    marginTop: 12,
    gap: 10,
  },

  lblFilters: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.bold,
    flex: 1,
  },
  lblInstantDeliveries: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
  },
  lblAvailableInstantDeliveries: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
  },
  lblCategories: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.bold,
  },
  lblDropdownCategories: {
    color: colors.greya7,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
  },
  lblLowHightPriceValue: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
  },

  imgClose: {
    height: 24,
    width: 24,
  },
  imgCheckBox: {
    height: 24,
    width: 24,
  },
  imgDash: {
    height: 1,
    width: 14,
  },
  btnDropdownCategories: {
    height: 52,
    borderRadius: 100,
    borderColor: colors.greya7,
    borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    backgroundColor: colors.blue4e,
  },
  btnDropdownCategoriesContainer: {
    height: 52,
    borderColor: colors.greya7,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.blue4e,
  },

  // Slider Styles
  sliderSelected: {
    backgroundColor: colors.orange1c,
    height: 4,
  },
  sliderUnselected: {
    backgroundColor: colors.greya7,
    height: 4,
    borderRadius: 140,
  },
  sliderMarker: {
    backgroundColor: colors.blue4e,
    borderColor: colors.orange1c,
    borderWidth: 1,
    height: 16,
    width: 16,
  },
  sliderContainer: {
    height: 4,
    marginTop: 16,
  },
  vwSliderMinMaxValue: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: ScreenDimensions.screenWidth - 40,
    alignSelf: "center",
    marginTop: 4,
  },
  lblSliderMinMaxValue: {
    color: colors.white,
    fontFamily: fontsfamily.medium,
    fontSize: fontSize.size14,
  },

  // Sort Modal
  vwLineSort: {
    height: 1,
    backgroundColor: `${colors.greya7}50`,
    marginHorizontal: 20,
  },
  vwSort: {
    flexDirection: "row",
    marginTop: 11,
    marginBottom: 10,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    height: 22,
  },
  lblSort: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
  },
  imgSortSelected: {
    height: 22,
    width: 22,
  },
});
