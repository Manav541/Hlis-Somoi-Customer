import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
  // View styles
  vwMain: {
    flex: 1,
  },
  vwBottomBlueBg: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.blue4e,
    paddingHorizontal: 21,
    paddingTop: 12,
    marginTop: -34,
  },

  vwDriverInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
  },
  vwDriverImageName: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  vwDestinationMarker: {
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  // Text styles
  lblDriverInfoTitle: {
    color: colors.white,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.semibold,
  },
  lblDriverName: {
    color: colors.blue4e,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.semibold,
    flex: 1,
  },
  lblDeliverToAddress: {
    color: colors.greya7,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
    marginTop: 7,
  },

  // Image styles
  imgDriverProfile: {
    height: 42,
    width: 42,
    borderRadius: 42 / 2,
  },
  imgChat: {
    height: 27,
    width: 27,
  },
  imgDestinationMarker: { height: 24, width: 24 },
  imgDriverMarker: { height: 37, width: 37 },
});
