import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
    // View Styles
    vwMain: {
        flexGrow: 1,
        backgroundColor: colors.blue4e,
        justifyContent: "space-between",
      },
    vwAddCard: {
        marginHorizontal: 19,
        flex: 1,
      },

    // Text Styles
    lblAddCardHeading:{
        color : colors.white,
        fontSize : fontSize.size14,
        fontFamily: fontsfamily.medium,
        textAlign : 'center',
        marginVertical : 20
    },
})