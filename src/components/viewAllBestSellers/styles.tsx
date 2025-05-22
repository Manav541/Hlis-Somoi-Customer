import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { ScreenDimensions } from "../../constants/utils/Dimensions";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
  // View Style
  vwMain: {
    flex: 1,
    backgroundColor: colors.blue4e,
    paddingHorizontal: 20,
  },
  vwBestSellersItemDetails: {
    paddingHorizontal: 12.5,
    paddingTop: 14,
    paddingBottom: 10,
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

  // Text Style
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
  lblDistance: {
    color: colors.black35,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.mediumOutFit,
  },
  lblRatings: {
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regularOutFit,
    alignSelf :'center',
  },

  // TouchableOpacity Style
  btnAllBestSellersItem: {
    height: 249,
    width: ScreenDimensions.screenWidth - 40,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  btnFavourite: {
    height: 22.3,
    width: 24,
    backgroundColor: colors.white,
    borderRadius: 22,
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
    shadowOpacity: 0.07,
    shadowRadius: 0.30,
    elevation: 4,
  },

  // Image Style
  imgBestSellers: {
    height: 148,
    width: ScreenDimensions.screenWidth - 40,
  },
  imgHeart: {
    height: 14,
    width: 14,
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
    bottom: 70,
    right: 13,
  },
});
