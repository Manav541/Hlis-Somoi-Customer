import { StyleSheet } from "react-native";
import { colors } from "../../../constants/Colors";
import { fontsfamily } from "../../../constants/FontFamily";
import { fontSize } from "../../../constants/FontSizes";

export const styles = StyleSheet.create({
  vwLogoTitle: {
    marginTop: 31,
    marginBottom: 25,
  },
  btnForgot: {
    alignSelf: "flex-end",
    marginTop: 15,
  },
  vwBottom: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    marginBottom: 20,
  },
  lblForgot: {
    color: colors.orange1c,
    fontFamily: fontsfamily.semibold,
    fontSize: fontSize.size14,
  },
});
