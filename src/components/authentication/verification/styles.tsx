import { StyleSheet } from "react-native";
import { fontSize } from "../../../constants/FontSizes";
import { colors } from "../../../constants/Colors";
import { fontsfamily } from "../../../constants/FontFamily";

export const styles = StyleSheet.create({
  vwLogoTitle: {
    marginTop: 31,
    marginBottom: 29,
  },
  vwOtpMain: {
    marginVertical: 30,
    flexDirection: "row",
    alignSelf: "center",
    gap: 10,
  },
  vwTxtInput: {
    borderWidth: 1,
    height: 52,
    width: 52,
    borderRadius: 100,
    borderColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  txtInput: {
    height: 52,
    width: 52,
    textAlign: "center",
    borderRadius: 100,
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
  },

  lblTitle: {
    textAlign: "center",
    fontSize: fontSize.size14,
    color: colors.greye8,
    fontFamily: fontsfamily.semibold,
  },
  lblResendTitle: {
    color: colors.greya7,
    fontFamily: fontsfamily.medium,
    fontSize: fontSize.size12,
  },
});
