import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontsfamily } from "../../constants/FontFamily";
import { fontSize } from "../../constants/FontSizes";

export const styles = StyleSheet.create({
  //   TouchableOpacity styles
  btnCustomOrange: {
    height: 52,
    backgroundColor: colors.ornage1c,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  lblButtonTitle: {
    fontFamily: fontsfamily.semibold,
    color: colors.blue4e,
    fontSize: fontSize.size16,
  },
});
