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
    backgroundColor: `${colors.greya7}30`,
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
    backgroundColor: `${colors.black}17`,
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
    width: 65,
    height: 65,
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
    marginBottom: 20,
  },
  btnReviewImage: {
    height: 65,
    width: 65,
    borderRadius: 5,
    backgroundColor: colors.whiteff,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  btnReviewVideo: {
    height: 65,
    width: 65,
    borderRadius: 5,
    backgroundColor: colors.black50,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  btnClose: {
    position: "absolute",
    right: 20,
    zIndex: 999,
  },
  mediaItem: {
    width: ScreenDimensions.windowWidth,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenMedia: {
    width: "100%",
    height: "60%",
  },
});
