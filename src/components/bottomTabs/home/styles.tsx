import { StyleSheet } from "react-native";
import { colors } from "../../../constants/Colors";
import { fontSize } from "../../../constants/FontSizes";
import { fontsfamily } from "../../../constants/FontFamily";
import { ScreenDimensions } from "../../../constants/utils/Dimensions";

export const styles = StyleSheet.create({
  vwMain: {
    flex: 1,
    backgroundColor: colors.orange1c,
  },
  vwMainContainer: {
    flex: 1,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor : colors.whiteff,
    overflow: "hidden",
  },
  vwGroceriesFoodLogo: {
    height: 122,
    gap: 19.42,
    flexDirection: "row",
  },

  vwType: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  vwLocationNotification: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
    flex: 1,
  },
  vwLocationWithArrow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  vwLocation: {
    flexDirection: "row",
    alignItems: "center",
    flex:1
  },
  vwAdds: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  vwAddsItem: {
    width: ScreenDimensions.screenWidth - 40, // Full width minus padding
    borderRadius: 20,
    overflow: "hidden",
  },
  vwDotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  vwDot: {
    width: 16,
    height: 2.03,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  vwSubCategoriesMain: {
    marginTop: 29.97,
  },
  vwSubCategoriesTitleSeeAll: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 22,
    marginHorizontal: 20,
  },
  vwSubCategoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  vwBestProducts: {
    marginTop: 24,
  },
  vwBestProductsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 19,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  vwBestProductsImage: {
    height: 149.33,
    width: (ScreenDimensions.screenWidth - 20 * 2 - 19) / 2,
    backgroundColor: colors.white,
    borderRadius: 19,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  vwRating: {
    flexDirection: "row",
    marginTop: 7,
    alignItems: "center",
  },
  vwBestSellerSeeAll :{
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
    marginHorizontal : 20,
  },
  vwBestSellerDetails: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.white,
    borderColor: colors.whiteea,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingTop: 8,
    height : 72
  },
  vwRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  vwStars: {
    flexDirection: "row",
    marginRight: 4,
  },

  //   Text Styles
  lblSearch:{
    color: colors.greya7,
    fontSize: fontSize.size15,
    fontFamily: fontsfamily.semibold,
    marginLeft : 10,
    lineHeight : 17,
  },
  lblGroceriesFood: {
    color: colors.blue4e,
    fontSize: fontSize.size1371,
    fontFamily: fontsfamily.semibold,
  },
  lblLocation: {
    color: colors.blue4e,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.semibold,
    marginLeft: 5,
    flex : 1
  },
  lblSubCategoriesTitle: {
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.bold,
  },
  lblSeeAll: {
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
  },
  lblSubCategory: {
    marginTop: 5,
    fontSize: fontSize.size10,
    fontFamily: fontsfamily.semibold,
    color: colors.blue4e,
    textAlign: "center",
  },
  lblBestProducts: {
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.bold,

    marginBottom: 10,
  },
  lblBestProductsName: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
    textAlign: "center",
    marginTop: 6,
  },
  lblBestProductsUsed: {
    color: colors.white,
    fontSize: fontSize.size07,
    fontFamily: fontsfamily.semibold,
    textAlign: "center",
    marginTop: 3,
  },
  lblBestSellerName: {
    color: colors.black35,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.bold,
  },
  lblBestSellerReviews: {
    color: colors.black35,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
  },

  //   TouchableOpacity Styles
  btnSearch: {
    height: 52,
    borderRadius: 100,
    borderColor: colors.greya7,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginTop: 20,
  },
  btnGroceriesFood: {
    height: 122,
    width: (ScreenDimensions.screenWidth - (20 * 2) - 19) / 2,
    borderRadius: 11.42,
    backgroundColor: colors.orange1c,
    overflow: 'hidden', 
  },
  btnNotification: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 9,
  },
  btnSubCategories: {
    width: (ScreenDimensions.screenWidth - 20 * 2 - 20 * 3) / 4,
    marginLeft: 20,
    marginTop: 20,
    alignItems: "center",
  },
  btnBestProducts: {
    height: 200,
    width: (ScreenDimensions.screenWidth - 20 * 2 - 19) / 2,
    backgroundColor: colors.blue4e,
    borderRadius: 20,
  },
  btnBestSeller: {
    marginHorizontal: 10,
    width: 299,
    marginTop: 10,
    height : 231,
    borderRadius : 20,
    overflow : 'hidden',
  },

  // Image Styles
  imgGroceriesFood: {
    height:87.36,
    width: (ScreenDimensions.screenWidth - 20 * 2 - 19) / 2,
    borderRadius: 11.42,
  },
  imgLocation: {
    height: 24,
    width: 24,
  },
  imgAdds: {
    width: ScreenDimensions.screenWidth-40,
    height: 195,
  },
  imgSubCategories: {
    height: 66,
    width: 69,
    borderRadius: 20,
    overflow: "hidden",
  },
  imgBestSeller: {
    height: 159,
    width: 299,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  imgLogo: {
    height: 42,
    width: 42,
    borderRadius: 100,
    position: "absolute",
    right: 12.29,
    bottom : 52.16
  },
  imgStar: {
    height: 24,
    width: 24,
  },

  //   TextInput Styles
  txtSearchInput: {
    flex: 1,
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
    marginLeft: 10,
  },
});
