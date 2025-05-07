import { StyleSheet } from "react-native";
import { colors } from "../../../constants/Colors";
import { fontSize } from "../../../constants/FontSizes";
import { fontsfamily } from "../../../constants/FontFamily";

export const styles = StyleSheet.create({
  // View styles
  vwMain: {
    flex: 1,
    backgroundColor: colors.orange1c,
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
    backgroundColor: colors.orange1c,
    justifyContent: "center",
    alignItems: "center",
  },
  vwHelloName: {
    marginLeft: 12,
    height: 50,
    justifyContent: "space-between",
  },
  vwSubArrayData: {
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  vwDeleteLogoutView: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "flex-end",
  },
  vwDeleteLogoutModal: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 33.29,
    paddingBottom: 51.19,
    backgroundColor: colors.blue4e,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    alignItems: "center",
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
  lblSettingTitle: {
    color: colors.blue4e,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.semibold,
    marginLeft: 10,
  },
  lblDeleteLogoutTitle: {
    color: colors.white,
    fontSize: fontSize.size20,
    fontFamily: fontsfamily.bold,
    marginTop: 36,
  },
  lblDeleteLogoutDecs: {
    color: colors.greya7,
    fontSize: fontSize.size15,
    fontFamily: fontsfamily.regular,
    marginTop: 10.51,
  },

  // Image styles
  imgProfileIcon: {
    height: 24,
    width: 24,
  },
  imgPrfileImage: {
    height: 58,
    width: 58,
    borderRadius: 58 / 2,
  },
  imgModalLogo: {
    height: 151,
    width: 143,
  },

  //   TouchableOpacity styles
  btnSubArrayData: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
    borderBottomColor: colors.graye6,
  },
});
