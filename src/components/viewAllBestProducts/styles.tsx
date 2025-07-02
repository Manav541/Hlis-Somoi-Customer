import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { ScreenDimensions } from "../../constants/utils/Dimensions";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
  // View Styles
  vwMain: {
    flex: 1,
    backgroundColor: colors.whiteff,
  },
  vwBestProductsImage: {
    height: 149.33,
    width: (ScreenDimensions.screenWidth - 20 * 2 - 19) / 2,
    backgroundColor: colors.white,
    borderRadius: 19,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  //   Text Styles
  lblBestProductsUsed: {
    color: colors.white,
    fontSize: fontSize.size07,
    fontFamily: fontsfamily.semibold,
    textAlign: "center",
    marginTop: 3,
  },
  lblBestProductsName: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 6,
    marginHorizontal: 10,
  },

  // TouchableOpacity Styles
  btnBestProducts: {
    // height: 200,
    width: (ScreenDimensions.screenWidth - 20 * 2 - 19) / 2,
    backgroundColor: colors.blue4e,
    borderRadius: 20,
  },
});
