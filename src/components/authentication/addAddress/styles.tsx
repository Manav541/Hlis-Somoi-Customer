import { StyleSheet } from "react-native";
import { colors } from "../../../constants/Colors";
import { fontSize } from "../../../constants/FontSizes";
import { fontsfamily } from "../../../constants/FontFamily";

export const styles = StyleSheet.create({
  // View styles
  vwMain: {
    flexGrow: 1,
    backgroundColor: colors.blue4e,
    justifyContent: "space-between",
  },
  vwAddress: {
    marginHorizontal: 19,
    flex: 1,
  },
  vwSetAsDefault: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  //   Text styles
  lblAddAddressHeading: {
    fontSize: fontSize.size14,
    color: colors.greya7,
    fontFamily: fontsfamily.regular,
    textAlign: "center",
    marginHorizontal: 35,
    marginVertical: 20,
    lineHeight: 20,
  },
  lblAddress: {
    fontSize: fontSize.size14,
    color: colors.white,
    fontFamily: fontsfamily.bold,
    marginBottom: 12,
  },
  lblSetAsDefault: {
    fontSize: fontSize.size14,
    color: colors.greya7,
    fontFamily: fontsfamily.regular,
  },
  //   Image styles
  imgCheck: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});
