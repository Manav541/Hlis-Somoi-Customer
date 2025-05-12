import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";
import { ScreenDimensions } from "../../constants/utils/Dimensions";

export const styles = StyleSheet.create({
    // View Styles
    vwMain :{
        flex: 1,
        backgroundColor : colors.blue4e,
    },
    vwNoDataFound:{
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    vwContentContainer:{
        marginHorizontal: 20,
        gap: 20,
        paddingTop: 20,
      },
      vwProductImage:{
        width :69,
        height : 86,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : colors.whiteff,
      },
      vwProductDetails:{
        marginLeft : 10,
        marginVertical : 9,
        width : 149
      },
      vwProductPriceWeight:{
        flexDirection:'row',
        alignItems : 'center',
        height : 19,
        marginTop : 5
      },

    // Text Styles
    lblNoDataFound:{
        fontSize : fontSize.size18,
        color : colors.white,
        fontFamily:fontsfamily.semibold,
        textAlign : 'center',
        marginTop : 15
    },
    lblNoDataFoundDesc:{
        fontSize : fontSize.size14,
        color : colors.greya7,
        fontFamily:fontsfamily.regular,
        textAlign : 'center',
        marginTop : 4
    },
    lblProductName:{
        fontSize : fontSize.size14,
        color : colors.black35,
        fontFamily:fontsfamily.semibold,
    },
    lblProductPrice:{
        fontSize : fontSize.size14,
        color : colors.blue4e,
        fontFamily:fontsfamily.bold,
    },
    lblProductWeight:{
        fontSize : fontSize.size12,
        color : colors.greya7,
        fontFamily:fontsfamily.semibold,
    },

    // Image Styles
    imgNoDataFound:{
        width : 94,
        height : 94,
        resizeMode : 'contain',
        alignSelf : 'center',
    },
    imgProduct:{
        width : 42.3,
        height : 61.6
    },
    imgDot:{
        width : 4,
        height : 4,
        tintColor : colors.blue4e,
        marginHorizontal : 4
    },

    // Tocuhable Opacity Styles
    btnProductItem:{
        height : 86,
        width: ScreenDimensions.screenWidth-40,
        backgroundColor : colors.white,
        flexDirection : 'row',
        alignItems : 'center',
        borderRadius:10,
        overflow : 'hidden',
    },
})