import { StyleSheet } from "react-native";
import { colors } from "../../../constants/Colors";
import { fontSize } from "../../../constants/FontSizes";
import { fontsfamily } from "../../../constants/FontFamily";

export const styles = StyleSheet.create({
  // View styles
  vwMain: {
    flex: 1,
    backgroundColor: colors.ornage1c,
  },
  vwSettingView: {
    flex: 1,
    backgroundColor: colors.blue4e,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
    paddingHorizontal: 20,
  },
  vwProfileData: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
  },
  vwProfileImage: {
    height: 58,
    width: 58,
    borderRadius: 58 / 2,
    backgroundColor: colors.ornage1c,
    justifyContent: "center",
    alignItems: "center",
  },
  vwHelloName: {
    marginLeft: 12,
    height: 50,
    justifyContent: "space-between",
  },
  vwSubArrayData :{
    backgroundColor : colors.white,
    borderRadius : 10,
  },

  //   Text styles
  lblHello: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
  },
  lblName: {
    color: colors.white,
    fontSize: fontSize.size18,
    fontFamily: fontsfamily.bold,
  },
  lblTitleMain: {
    color: colors.white,
    fontSize: fontSize.size18,
    fontFamily: fontsfamily.semibold,
    marginTop: 20,
    marginBottom: 15,
  },
  lblSettingTitle:{
    color: colors.blue4e,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.semibold,
    marginLeft : 10
  },

  // Image styles
  imgProfileIcon: {
    height: 24,
    width: 24,
  },

//   TouchableOpacity styles
  btnSubArrayData :{
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
    borderBottomColor: colors.graye6,
  },
});
