import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
  vwHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    gap: 10,
  },
  vwBedge: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: colors.red2e,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 15,
    alignSelf: "center",
  },
  vwBlankScreen: {
    flex: 1,
    backgroundColor: colors.blue4e,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal : 20
  },
  lblBlankScreenMsg: {
    fontFamily: fontsfamily.semibold,
    fontSize: fontSize.size18,
    color: colors.white,
  },
  lblBedge: {
    color: colors.white,
    fontSize: fontSize.size08_31,
    fontFamily: fontsfamily.semibold,
  },
  imgButton: {
    width: 24,
    height: 24,
  },
});
