import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
  // View Styles
  vwMain: {
    flex: 1,
    backgroundColor: colors.blue4e,
    justifyContent: "space-between",
  },
  vwCancelOrder: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  vwLine: {
    backgroundColor: colors.greyd9_50,
    height: 1,
    marginBottom: 15,
  },

  // Text Styles
  lblCancelOrderDesc: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
    lineHeight: 20,
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  lblCancelOrderReason: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
  },

  // TouchableOpacity Styles
  btnCancelOrderReasonItem: {
    height: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  // Image styles
  imgCheckbox: {
    height: 24,
    width: 24,
  },
});
