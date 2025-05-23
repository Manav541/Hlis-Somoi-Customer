import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
  vwMain: {
    flexGrow: 1,
    backgroundColor: colors.blue4e,
    paddingHorizontal: 20,
  },
  vwFaq: { borderBottomWidth: 1, borderBottomColor: `${colors.greya7}50` },
  btnTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  imgDropdown: { height: 24, width: 24 },
  lblTitle: {
    fontSize: fontSize.size16,
    color: colors.white,
    fontFamily: fontsfamily.bold,
    flex: 1,
  },
  lblDesc: {
    fontSize: fontSize.size14,
    color: colors.greya7,
    fontFamily: fontsfamily.regular,
    flex: 1,
    letterSpacing: 0.2,
    lineHeight: 22,
    marginBottom: 20,
    marginTop: -10,
  },
  lblCMSData: {
    fontSize: fontSize.size16,
    color: colors.white,
    fontFamily: fontsfamily.regular,
    lineHeight: 22,
  },
});
