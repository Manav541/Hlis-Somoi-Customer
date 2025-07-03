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
