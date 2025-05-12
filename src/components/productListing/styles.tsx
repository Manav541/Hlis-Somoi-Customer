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
  vwSubCategoryContainer: {
    gap: 12,
    marginTop: 17,
    marginLeft: 20,
    paddingRight: 20,
    height: 35,
    marginBottom:18
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
  },
  vwPriceRating:{
    height : 17,
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginTop : 7,
  },
  vwPrice : {
    flexDirection : 'row',
    alignItems : 'center',
    gap : 6,
  },
  vwRating : {
    flexDirection : 'row',
    alignItems : 'center',
    gap : 4
  },
  vwNoData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  lblProductName: {
    color: colors.black35,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
    lineHeight : 22
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
    fontSize: fontSize.size16,
    color: colors.greya7,
  },
  lblProductQuantity: {
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
    marginHorizontal : 10
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
  },
  btnSubCategoryTitleSelected: {
    paddingHorizontal: 7,
    backgroundColor: colors.orange1c,
    flexDirection: "row",
    alignItems: "center",
    height: 35,
    borderRadius: 50,
    gap: 3,
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
  

  // Image Styles
  imgSubIcon: {
    height: 20,
    width: 20,
  },
  imgRedHeart: {
    height: 14,
    width: 14,
  },
  imgStar :{
    height : 12.5,
    width : 12.6,
  },
  imgAddMinus :{
    height : 24,
    width : 24
  },
});
