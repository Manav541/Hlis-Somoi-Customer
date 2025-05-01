import { StyleSheet } from "react-native";
import { colors } from "../constants/Colors";
import { fontSize } from "../constants/FontSizes";
import { fontsfamily } from "../constants/FontFamily";

export const styles = StyleSheet.create({
  vwHeader: {
    backgroundColor: colors.ornage1c,
    paddingBottom: 12,
    paddingHorizontal: 22,
  },
  txtHeaderTitle: {
    color: colors.blue4e,
    fontSize: fontSize.size18,
    fontFamily: fontsfamily.bold,
  },
  btnBack: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    backgroundColor: colors.blue4e,
    justifyContent: "center",
    alignItems: "center",
  },
  imgBackArrow: {
    height: 7.06,
    width: 3.52,
  },
});
