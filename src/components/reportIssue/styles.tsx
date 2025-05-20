import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
    // View Styles
    vwMain :{
        flex : 1,
        backgroundColor : colors.blue4e,
        justifyContent : 'space-between'
    },
    
    vwUploadImageVideos:{
        marginHorizontal : 20,
        marginTop : 20,
        gap : 10
    },
    vwUploadImageVideosItem :{
        height : 78,
        width : 78,
        borderRadius : 9.38,
        overflow : 'hidden'
    },

    // Text Styles
    lblReturnOrderDesc:{
        color : colors.white,
        fontSize: fontSize.size14,
        fontFamily:fontsfamily.medium,
        lineHeight :20,
        textAlign:'center',
        marginHorizontal : 20,
        marginVertical : 20
    },
    lblYourMessage:{
        color : colors.white,
        fontSize: fontSize.size16,
        fontFamily:fontsfamily.semibold,
        marginHorizontal : 20,
        marginBottom : 15
    },
    lblReturnOrderReason :{
        color : colors.white,
        fontSize: fontSize.size14,
        fontFamily:fontsfamily.medium,
    },
    lblUploadImageVideo :{
        color : colors.white,
        fontSize: fontSize.size14,
        fontFamily:fontsfamily.semibold,
    },

    // TouchableOpacity Styles
    
    btnUploadImageVideo :{
        height : 78,
        width : 78,
        borderRadius : 9.38,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : colors.white
    },
    btnCancelImage :{
        height : 78,
        width : 78,
        borderRadius : 9.38,
        overflow :'hidden',
        justifyContent:'center',
        alignItems : 'center',
        backgroundColor : colors.black50,
        position : 'absolute',
        top : 0,
        bottom : 0,
        left : 0,
        right : 0
    },

    // Image styles
    imgAdd :{
        height : 22.51,
        width : 22.51
    },
    imgUpload:{
        height : 78,
        width : 78,
        borderRadius : 9.38,
        overflow : 'hidden'
    },
})