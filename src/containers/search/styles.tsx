import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
  // View Styles
  vwHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    backgroundColor: colors.orange1c,
  },
  vwLeftHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },

  // Image Styles
  imgClose: {
    height: 24,
    width: 24,
    marginRight: 20,
  },

  //   TextInput Styles
  txtSearchInput: {
    flex: 1,
    color: colors.blue4e,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.medium,
    marginRight: 10,
  },
});
