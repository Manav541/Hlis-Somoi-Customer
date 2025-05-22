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
  vwRateProgress: {
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  vwVerticalLine: {
    height: 120,
    width: 1,
    backgroundColor: colors.greya7,
    marginHorizontal: 15,
  },
  vwRateProgressItem: {
    flexDirection: "row",
    // height: 17,
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  vwRateNumber: {
    flexDirection: "row",
    width: 28.14,
    alignItems: "center",
    gap: 4,
  },
  vwProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: colors.white,
    borderRadius: 1,
    overflow: "hidden",
  },
  vwReviewItem: {},
  vwLine: {
    height: 1,
    flex: 1,
    backgroundColor: `₹{colors.greya7}30`,
    marginTop: 20,
    marginBottom: 10,
  },

  vwProgressBarFill: {
    height: "100%",
    borderRadius: 1,
    backgroundColor: colors.orange1c,
  },
  vwReviewRateDate: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  vwImgeVideo: {
    height: 65,
    width: 65,
    borderRadius: 5,
    marginTop: 5,
  },
  vwReviewImage: {
    height: 65,
    width: 65,
    borderRadius: 5,
    backgroundColor: colors.whiteff,
    justifyContent: "center",
    alignItems: "center",
  },
  vwReviewVideo: {
    height: 65,
    width: 65,
    borderRadius: 5,
    backgroundColor: `₹{colors.black}17`,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },

  // Text Styles
  lblReviews: {
    color: colors.white,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.semibold,
  },
  lblRate: {
    color: colors.white,
    fontSize: fontSize.size22,
    fontFamily: fontsfamily.boldGolosText,
  },
  lblReviewsCount: {
    color: colors.greya7,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
    marginTop: 5,
  },
  lblRateNumber: {
    color: colors.greya7,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
  },
  lblRatePercentage: {
    color: colors.greya7,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
  },
  lblReviewName: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
  },
  lblReviewRateNumber: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semiboldGolosText,
  },
  lblReviewDate: {
    color: colors.white,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
  },
  lblReviewDesc: {
    color: colors.white,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
    marginTop: 5,
    marginRight: 30,
  },
  lblViewAll: {
    color: colors.orange1c,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
  },

  // Image Styles
  imgMainStar: {
    height: 15.02,
    width: 15.14,
  },
  imgVideo: {
    height: 24,
    width: 24,
  },
  imgReview: {
    width: 30.9,
    height: 45,
  },
  imgRightOrangeArrow: {
    height: 16,
    width: 16,
  },
  btnViewAll: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 9,
  },
});
