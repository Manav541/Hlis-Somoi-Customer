import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
    // View Styles
    vwMain : {
        flex : 1,
        backgroundColor: colors.blue4e,
        paddingHorizontal : 20,
    },
    vwCardDetail:{
      height : 58,
      borderRadius : 10,
      borderColor : colors.orange1c,
      borderWidth : 1
    },

     // Text Styles
  lblAddNewCard: {
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
  },

     // TouchableOpacity Styles
  btnAddCard: {
    height: 48,
    borderRadius: 10,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop : 13
  },

  // Image Styles
  imgAdd: {
    width: 24,
    height: 24,
    marginRight: 10,
  },

})
