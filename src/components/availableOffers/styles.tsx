import { StyleSheet } from "react-native";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";
import { colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
  //  View Styles
  vwMain: {
    flex: 1,
    backgroundColor: colors.blue4e,
    paddingTop: 20,
  },
  vwOfferCodeValidity: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 32,
    flexDirection: "row",
    marginTop: 10.1,
  },

  // Text Styles
  lblOfferTitle: {
    color: colors.black35,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.semibold,
  },
  lblOffer: {
    color: colors.blue4e,
    fontSize: fontSize.size18,
    fontFamily: fontsfamily.extrabold,
  },
  lblOfferDesc: {
    color: colors.grey62,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.semibold,
  },
  lblOfferPrice: {
    color: colors.blue4e,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.semibold,
  },
  lblOfferCode: {
    color: colors.orange1c,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.bold,
    letterSpacing: 4,
    lineHeight : 16
  },
  lblOfferValidity: {
    color: colors.black,
    fontSize: fontSize.size10,
    fontFamily: fontsfamily.bold,
    textAlign: "right",
  },
  lblOfferValidityDate: {
    color: colors.black,
    fontSize: fontSize.size1323,
    fontFamily: fontsfamily.bold,
    textAlign: "right",
  },
  lblNoData: {
    fontSize: fontSize.size20,
    color: colors.white,
    fontFamily: fontsfamily.semibold,
    textAlign: "center",
  },

  // TouchableOpacity Styles
  btnOffersData: {
    padding: 20,
    backgroundColor: colors.whiteff,
    borderRadius: 10,
  },
  btnOfferCode: {
    borderStyle: "dotted",
    borderColor: colors.orange1c,
    borderWidth: 1,
    borderRadius: 7.4,
    backgroundColor: colors.blue4e,
    justifyContent : "center",
    alignItems:'center',
    height : 31.79,
    paddingHorizontal : 7.4
  },
});
