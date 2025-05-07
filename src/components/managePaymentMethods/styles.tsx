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
      borderWidth : 1,
      flexDirection : "row",
      alignItems : "center",
      justifyContent : "space-between",
      paddingHorizontal : 16,
    },
    vwCardTypeNumber:{
      flexDirection : "row",
      alignItems : "center",
      gap:11,
      flex : 1,
    },
    vwCardType:{
      height : 25.29,
      width : 44,
      justifyContent:'center',
      alignItems : 'center',
      backgroundColor : colors.white,
      borderRadius : 5
    },

     // Text Styles
  lblAddNewCard: {
    color: colors.blue4e,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
  },
  lblCardNumber:{
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
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
  imgCardTypeVisa:{
    width: 29.39,
    height: 9.75,
  },
  imgCardTypeMaster:{
    width: 23.59,
    height: 14.58,
  },
  imgDeleteCard:{
    height : 28,
    width : 28
  },

})
