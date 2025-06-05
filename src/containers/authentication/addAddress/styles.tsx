import { Platform, StyleSheet } from "react-native";
import { fontSize } from "../../../constants/FontSizes";
import { colors } from "../../../constants/Colors";
import { fontsfamily } from "../../../constants/FontFamily";

export const styles = StyleSheet.create({
  txtHeaderTitle: {
    color: colors.blue4e,
    fontSize: fontSize.size18,
    fontFamily: fontsfamily.bold,
  
  },
  vwHeader : {
    
    backgroundColor: colors.orange1c,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 14,
    paddingLeft : 16
  }
});
