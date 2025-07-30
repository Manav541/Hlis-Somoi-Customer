import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
  vwBlankScreen: {
    flex: 1,
    backgroundColor: colors.blue4e,
    justifyContent: "center",
    alignItems: "center",
  },
  lblBlankScreenMsg: {
    fontFamily: fontsfamily.semibold,
    fontSize: fontSize.size18,
    color: colors.white,
  },
});
