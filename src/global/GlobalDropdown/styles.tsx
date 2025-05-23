import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
    btnDropdownCategories: {
        height: 52,
        borderRadius: 100,
        borderColor: colors.greya7,
        borderWidth: 1,
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 16,
        justifyContent: "space-between",
        backgroundColor : colors.blue4e
      },
      lblDropdownCategories: {
        color: colors.greya7,
        fontSize: fontSize.size14,
        fontFamily: fontsfamily.semibold,
      },
      imgCheckBox: {
        height: 24,
        width: 24,
      },
})