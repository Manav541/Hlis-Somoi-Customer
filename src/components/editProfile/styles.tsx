import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
  // View styles
  vwMain: {
    flex: 1,
    backgroundColor: colors.blue4e,
  },

  //   Text styles
  lblName: {
    color: colors.white,
    fontSize: fontSize.size20,
    fontFamily: fontsfamily.bold,
    alignSelf: "center",
  },

  //   TextIn

  // Image styles
  imgProfileBigIcon: {
    height: 50,
    width: 50,
  },
  //   TouchableOpacity styles
  btnProfileImage: {
    height: 110,
    width: 110,
    borderRadius: 110 / 2,
    backgroundColor: colors.ornage1c,
    borderColor: colors.white,
    borderWidth: 1.51,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
    marginBlock: 10,
  },
});
