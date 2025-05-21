import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";
import { ScreenDimensions } from "../../constants/utils/Dimensions";

export const styles = StyleSheet.create({
  // View Styles
  vwMain: {
    flex: 1,
    backgroundColor: colors.blue4e,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  vwManageAddress: {
    backgroundColor: "#EEF0FF",
    paddingVertical: 15,
    paddingHorizontal: 12,
    width: ScreenDimensions.screenWidth - 40,
    alignSelf: "center",
    borderRadius: 8,
  },
  vwDefaultEditDelete: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
  },
  vwLine: {
    height: 17,
    width: 1,
    backgroundColor: "#D9D9D9",
    alignSelf: "center",
  },

  // Text Styles
  lblAddNewAddress: {
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
  },
  lblAddressTitle: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
    color: colors.blue4e,
    lineHeight: 20,
  },
  lblSetAsDefault: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
    color: colors.blue4e,
    alignSelf: "center",
    marginLeft: 10,
  },

  // TouchableOpacity Styles
  btnAddAddress: {
    height: 48,
    borderRadius: 10,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    // marginBottom: 20,
  },

  // Image Styles
  imgAddAddress: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  imgSetDefault: {
    height: 24,
    width: 24,
    alignSelf: "center",
  },
  imgEditDelete: {
    height: 28,
    width: 28,
  },
});
