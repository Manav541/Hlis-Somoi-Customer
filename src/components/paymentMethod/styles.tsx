import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontsfamily } from "../../constants/FontFamily";
import { fontSize } from "../../constants/FontSizes";
import { ScreenDimensions } from "../../constants/utils/Dimensions";

export const styles = StyleSheet.create({
  // View Styles
  vwMain: {
    flex: 1,
    backgroundColor: colors.blue4e,
  },
  vwCOD: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  vwLine: {
    height: 1,
    backgroundColor: colors.greyd9_50,
  },
  vwTotal: {
    marginHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  vwPlaceOrder: {
    marginHorizontal: 20,
    marginBottom: 29,
  },

  // Text Styles
  lblPaymentMethodDesc: {
    color: colors.white,
    fontFamily: fontsfamily.medium,
    fontSize: fontSize.size14,
    marginHorizontal: 20,
    marginTop: 12,
    lineHeight: 20,
  },
  lblPaymentMethods: {
    color: colors.white,
    fontFamily: fontsfamily.semibold,
    fontSize: fontSize.size16,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom : 10,
    lineHeight: 29,
  },
  lblCreditOrDebit: {
    color: colors.white,
    fontFamily: fontsfamily.semibold,
    fontSize: fontSize.size16,
    marginHorizontal: 20,
  },
  lblCOD: {
    color: colors.black13,
    fontFamily: fontsfamily.semiboldGolosText,
    fontSize: fontSize.size16,
  },
  lblAddNewCard: {
    color: colors.blue4e,
    fontFamily: fontsfamily.medium,
    fontSize: fontSize.size14,
  },
  lblCardNumber: {
    color: colors.black1d,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.bold,
    marginTop: 16,
  },
  lblCardExpiryDate: {
    color: colors.black1c,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
    marginTop: 14,
  },
  lblTotalAmount: {
    color: colors.white,
    fontSize: fontSize.size20,
    fontFamily: fontsfamily.semibold,
  },
  lblTotalAmountValue: {
    color: colors.orange1c,
    fontSize: fontSize.size20,
    fontFamily: fontsfamily.bold,
  },

  // Image Styles
  imgGpay: {
    height: 31,
    width: 69,
  },
  imgCOD: {
    height: 34,
    width: 34,
  },
  imgCheckBox: {
    height: 24,
    width: 24,
  },
  imgAdd: {
    height: 24,
    width: 24,
  },
  imgCardTypeVisa: {
    width: 62,
    height: 20,
  },
  imgCardTypeMaster: {
    width: 45.92,
    height: 28.66,
  },

  // TouchableOpacity Styles
  btnGPay: {
    height: 65,
    backgroundColor: colors.whiteff,
    marginHorizontal: 20,
    marginTop: 11,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  btnCOD: {
    height: 55,
    backgroundColor: colors.whiteff,
    marginHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 27,
    paddingLeft: 13,
    paddingRight: 15,
  },
  btnAddNewCard: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    gap: 10,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  btnCard: {
    height: 87,
    borderRadius: 8,
    backgroundColor: colors.whiteff,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 16.5,
    paddingRight: 16,
  },

  // ------------------- Success Modal ---------
  vwSuccessModal: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "flex-end",
  },
  vwSuccessModalContainer: {
    width: ScreenDimensions.screenWidth,
    paddingHorizontal: 20,
    paddingTop: 33.29,
    paddingBottom: 51.19,
    backgroundColor: colors.blue4e,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    alignItems: "center",
  },

  lblSuccessTitle: {
    color: colors.white,
    fontSize: fontSize.size20,
    fontFamily: fontsfamily.bold,
    textAlign: "center",
    lineHeight: 28,
  },
  lblSuccessDecs: {
    color: colors.greya7,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
    textAlign: "center",
    marginTop: 8,
  },
  lblOrderNumber: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
    textAlign: "center",
    marginTop: 8,
  },
  imgSuccess: {
    height: 144,
    width: 144,
    alignSelf: "center",
  },
});
