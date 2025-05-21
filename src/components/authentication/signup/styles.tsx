import { StyleSheet } from "react-native";
import { colors } from "../../../constants/Colors";
import { fontsfamily } from "../../../constants/FontFamily";
import { fontSize } from "../../../constants/FontSizes";

export const styles = StyleSheet.create({
  vwLogoTitle: {
    marginTop: 29,
    marginBottom: 47,
  },
  vwSignupSignin: {
    flexDirection: "row",
    alignItems: "center",
  },
  vwInputsMain: {
    gap: 40,
    flex: 1,
  },
  vwLine: {
    height: 1,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: colors.white,
  },
  lblOr: {
    fontSize: fontSize.size16,
    color: colors.white,
    fontFamily: fontsfamily.semibold,
  },
  lblTermsCondition: {
    textAlign: "center",
    fontFamily: fontsfamily.light,
    color: colors.white,
    fontSize: fontSize.size14,
  },
  lblTermsConditionLine: {
    textDecorationLine: "underline",
    fontFamily: fontsfamily.regular,
  },
});
