import { StyleSheet } from "react-native";
import { fontSize } from "../../../constants/FontSizes";
import { fontsfamily } from "../../../constants/FontFamily";
import { colors } from "../../../constants/Colors";
import { ScreenDimensions } from "../../../constants/utils/Dimensions";

export const styles = StyleSheet.create({
  // View Styles
  vwMain: {
    flex: 1,
    backgroundColor: colors.orange1c,
  },
  vwMainEmpty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue4e,
  },
  vwMainContainer: {
    flex: 1,
    backgroundColor: colors.blue4e,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: "hidden",
  },
  vwOrderNumberHeader: {
    backgroundColor: colors.whiteff,
    height: 61,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  vwWhiteBox: {
    marginVertical: 15,
  },
  vwProductlist: {
    borderBottomWidth: 1,
    borderColor: colors.greyd9_50,
    // Change color
  },
  vwProductData: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
    marginHorizontal: 15.5,
  },
  vwLeftProductData: {
    flexDirection: "row",
  },
  vwProductImage: {
    backgroundColor: colors.whiteff,
    height: 60,
    width: 48.81,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 7.07,
    borderBottomLeftRadius: 7.07,
  },
  vwProductName: {
    marginLeft: 7.07,
    marginTop: 6.37,
  },
  vwPrice: { flexDirection: "row", alignItems: "center" },
  vwDot: {
    marginHorizontal: 2.83,
    height: 2.83,
    width: 2.83,
    backgroundColor: colors.blue4e,
    borderRadius: 100,
  },
  vwStatusDate: {
    marginHorizontal: 15,
    marginTop: 13,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  //Text style
  lblEmptyCart: {
    fontSize: fontSize.size20,
    fontFamily: fontsfamily.bold,
    color: colors.white,
    textAlign: "center",
  },
  lblOrderNumber: {
    color: colors.grey62,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
    lineHeight: 16,
  },

  lblOrderNumberValue: {
    color: colors.black35,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.medium,
  },

  lblTotal: {
    color: colors.grey62,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
    lineHeight: 16,
    textAlign: "right",
  },
  lblTotalValue: {
    color: colors.blue4e,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.semibold,
    textAlign: "right",
  },
  lblItemLength: {
    color: colors.black12,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
    marginBottom: 10,
    marginHorizontal: 15.5,
  },
  lblProductName: {
    color: colors.black35,
    fontSize: fontSize.size10,
    fontFamily: fontsfamily.semibold,
    marginBottom: 3.54,
    flexWrap: "wrap",
    lineHeight: 15,
    marginRight : 90,
  },
  lblPrice: {
    color: colors.blue4e,
    fontSize: fontSize.size10,
    fontFamily: fontsfamily.bold,
  },
  lblUnit: {
    color: colors.greya7,
    fontFamily: fontsfamily.semibold,
    fontSize: fontSize.size10,
    lineHeight: 15,
  },
  lblQuantity: {
    color: colors.grey62,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regularGolosText,
    position :'absolute',
    top:0,
    right:0
  },
  lblQuantityCount: {
    color: colors.blue4e,
    fontFamily: fontsfamily.semiboldGolosText,
    fontSize: fontSize.size14,
  },

  lblOrderDate: {
    color: colors.black35,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
  },

  // Image style
  imgArrowRight: {
    height: 20,
    width: 20,
    alignSelf: "center",
  },

  // button style
  btnOrderItems: {
    marginHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 8,
  },

  // Modal style
  vwFilterModal: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colors.black50,
  },
  vwFilterModalContainer: {
    width: ScreenDimensions.screenWidth,
    backgroundColor: colors.blue4e,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  vwFilterClose: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: colors.white,
  },
  vwFilterData: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  vwApplyResetButton: {
    height: 52,
    marginBottom: 40,
    marginHorizontal: 20,
    gap: 11,
    flexDirection: "row",
  },

  lblFilter: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.bold,
    marginTop: 2,
    marginBottom: 16,
  },
  lblFilterOrderTypeDate: {
    color: colors.white,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.bold,
    marginBottom: 15,
  },

  lblRadioLabel: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
  },
  btnArrItems: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  imgRadioButton: {
    height: 19,
    width: 19,
  },

  imgClose: {
    height: 24,
    width: 24,
    marginBottom: 17,
  },
});
