import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
  vwLogotTitle: {
    marginTop: 31,
    marginBottom: 21,
  },
  vwContainer :  {
    flex: 1,
    backgroundColor: colors.blue4e,
    paddingHorizontal: 20,
  },
  lblOtpTitle: {
    textAlign: "center",
    marginHorizontal: 42,
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
  },
});
