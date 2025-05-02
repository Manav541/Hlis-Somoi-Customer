import { StyleSheet } from "react-native";
import { colors } from "../../../constants/Colors";
import { fontSize } from "../../../constants/FontSizes";
import { fontsfamily } from "../../../constants/FontFamily";

export const styles = StyleSheet.create({
  vwHeader : {
    backgroundColor: colors.orange1c,
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom : 12
  },
  txtHeaderTitle : {
    color : colors.blue4e,
    fontSize : fontSize.size18,
    fontFamily: fontsfamily.bold
  }
})
