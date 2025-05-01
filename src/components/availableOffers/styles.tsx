import { StyleSheet } from "react-native";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";
import { colors } from "../../constants/Colors";

export const styles = StyleSheet.create({
  //  View Styles
  vwMain: {
    flex: 1,
    backgroundColor: colors.blue4e,
    padding : 20
  },
  vwOfferCodeValidity:{
    justifyContent : 'space-between',
      alignItems : 'center',
      height : 32,
      flexDirection : 'row',
      marginTop : 10.1
  },

  // Text Styles
  lblOfferTitle :{
    color : colors.black35,
    fontSize : fontSize.size16,
    fontFamily : fontsfamily.semibold,
  },
  lblOffer :{
    color : colors.blue4e,
    fontSize : fontSize.size18,
    fontFamily : fontsfamily.extrabold,
  },
  lblOfferDesc :{
    color : colors.gray62,
    fontSize : fontSize.size16,
    fontFamily : fontsfamily.semibold,
  },
  lblOfferPrice :{
    color : colors.blue4e,
    fontSize : fontSize.size16,
    fontFamily : fontsfamily.semibold,
  },
  lblOfferCode:{
    color : colors.ornage1c,
    fontSize : fontSize.size14,
    fontFamily : fontsfamily.bold,
  },
  lblOfferValidity:{
    color : colors.black,
    fontSize : fontSize.size10,
    fontFamily : fontsfamily.bold,
    textAlign:'right'
  },
  lblOfferValidityDate:{
    color : colors.black,
    fontSize : fontSize.size1323,
    fontFamily : fontsfamily.bold,
    textAlign:'right'
  },

  // TouchableOpacity Styles
  btnOffersData: {
    padding: 20,
    backgroundColor: colors.whiteff,
    borderRadius: 10,
  },
  btnOfferCode:{
    borderStyle:'dotted',
    borderColor : colors.ornage1c,
    borderWidth : 1,
    padding : 7.4,
    borderRadius : 7.4,
    backgroundColor : colors.blue4e,
  }
});
