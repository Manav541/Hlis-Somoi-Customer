import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";
import { ScreenDimensions } from "../../constants/utils/Dimensions";

export const styles = StyleSheet.create({
    // View Style
    vwMain :{
        flex : 1,
        backgroundColor : colors.blue4e
    },
    // Text Style
    lblAllCategoriesName:{
        color : colors.white,
        fontSize : fontSize.size14,
        fontFamily : fontsfamily.semibold,
        textAlign : 'center',
        marginHorizontal : 20,
        lineHeight : 20
    },

    // TouchableOpacity Style
    btnAllCategories :{
        gap : 10,
        width: (ScreenDimensions.screenWidth - 20 * 2 - 20) / 2
    },

    // Image Style
    imgAllCategories :{
        height : 122,
        width : (ScreenDimensions.screenWidth - 20 * 2 - 20) / 2,
        borderRadius : 20,
        overflow : 'hidden'
    }
})