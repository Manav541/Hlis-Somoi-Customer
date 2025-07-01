import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { ScreenDimensions } from "../../constants/utils/Dimensions";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
  // View styles
  vwDriverDetails: {
    backgroundColor: colors.blue4e,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    paddingLeft: 21,
    paddingRight: 17,
    alignSelf: "flex-end",
    width: ScreenDimensions.screenWidth,
    position: "absolute",
    bottom: 0,
  },
  vwDriverInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 66,
  },

  // Text styles
  lblDriverInfo: {
    color: colors.white,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.semibold,
  },
  lblDriverName: {
    color: colors.blue4e,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.semibold,
    flex: 1,
    marginHorizontal: 12,
  },
  lblDeliverToAddress: {
    color: colors.greya7,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
    lineHeight: 16,
    marginTop: 7,
  },

  // Image styles
  imgMap: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imgMapDirections: {
    alignSelf: "center",
    height: 340,
    width: 275,
    top: 44,
    position: "absolute",
  },
  imgDriverProfile: {
    height: 42,
    width: 42,
    borderRadius: 42 / 2,
  },
  imgChat: {
    height: 27,
    width: 27,
  },
  imgDriverMarker: {
    width: 54,
    height: 60,
  },
  imgCustomerMarker: {
    width: 24,
    height: 24,
  },
});
