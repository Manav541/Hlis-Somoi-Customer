import { StyleSheet } from "react-native";
import { colors } from "../../../constants/Colors";
import { fontSize } from "../../../constants/FontSizes";
import { fontsfamily } from "../../../constants/FontFamily";
import { ScreenDimensions } from "../../../constants/utils/Dimensions";

export const styles = StyleSheet.create({
  // View Styles
  vwMain: {
    flex: 1,
    backgroundColor: colors.orange1c,
  },
  vwContainer: {
    flex: 1,
    backgroundColor: colors.blue4e,
    borderBottomLeftRadius : 40,
    borderBottomRightRadius:40
  },
  vwLocationNotification:{
    flexDirection : 'row',
    justifyContent : 'space-between',
    paddingHorizontal : 20,
    height : 24,
  },
  
 

  // Text Styles
  lblLocation:{
    color : colors.white,
    fontSize : fontSize.size14,
    fontFamily: fontsfamily.semibold,
    marginLeft : 5
  },
  lblAllCategoriesName:{
    color : colors.white,
    fontSize : fontSize.size14,
    fontFamily : fontsfamily.semibold,
    textAlign : 'center',
    marginHorizontal : 20,
    lineHeight : 20
},

  // TouchableOpacity Styles
 
  btnLocation:{
    flexDirection : 'row',
    alignItems : 'center',
    gap : 5
  },
  btnAllCategories :{
    gap : 10,
    width: (ScreenDimensions.screenWidth - 20 * 2 - 20) / 2
},

  // Image Styles
  imgLocation:{
    width : 24,
    height : 24,
  },
  imgDownArrow:{
    width : 24,
    height : 24,
  },
  imgNotification:{
    width : 24,
    height : 24,
  },
  imgAllCategories :{
    height : 122,
    width : (ScreenDimensions.screenWidth - 20 * 2 - 20) / 2,
    borderRadius : 20,
    overflow : 'hidden'
}
});
