import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontsfamily } from "../../constants/FontFamily";
import { fontSize } from "../../constants/FontSizes";

export const styles = StyleSheet.create({

  txtSearchInput: {
    flex: 1,
    color: colors.blue4e,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.medium,
    marginLeft : 10,
    margin : 0,
    padding : 0,
  },

});
