import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";
import { ScreenDimensions } from "../../constants/utils/Dimensions";

export const styles = StyleSheet.create({
  //   View styles
  vwMain: {
    flex: 1,
    backgroundColor: colors.blue4e,
  },
  vwSearch: {
    height: 52,
    backgroundColor: colors.white,
    borderRadius: 100,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    gap: 13,
    marginHorizontal: 20,
  },
  vwMyWishlistItem: {
    height: 241,
    borderRadius: 20,
    overflow :'hidden'
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
  vwRating: {
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
  vwProductsRestaurants: {
    height: 28,
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
    gap : 10
  },
  vwLine: {
    height: 1,
    backgroundColor: colors.orange1c,
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
  vwRatingStore: {
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

  //   TextInput styles
  txtSearch: {
    flex: 1,
    color: colors.black,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
  },

  //   Image styles
  imgSearch: {
    height: 19,
    width: 19,
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

  //   TouchableOpacity styles
  btnMyWishlistItem: {
    height: 207,
    borderTopLeftRadius:20,
    borderTopRightRadius: 20,
    backgroundColor: colors.white,
    overflow :'hidden'
  },
   btnAllBestSellersItem: {
    height: 250,
    width: ScreenDimensions.screenWidth - 40,
    borderRadius: 20,
    overflow: "hidden",
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

  btnAddToCart: {
    height: 34,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    backgroundColor: colors.orange1c,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  btnProductsRestaurants: {
    flex: 1,
    justifyContent: "space-between",
  },

  //   Text styles
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
    color: colors.greya7,
    fontFamily: fontsfamily.semibold,
    textAlign: "center",
  },
  lblProductQuantity: {
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
    marginHorizontal: 10,
  },
  lblProductsRestaurantsSelected:{
    color: colors.orange1c,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
    textAlign:'center'
  },
  lblProductsRestaurantsUnSelected:{
    color: colors.greya7,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
    textAlign:'center'
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
});
