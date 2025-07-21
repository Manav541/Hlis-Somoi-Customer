import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
  // View Styles
  vwMain: {
    flex: 1,
    backgroundColor: colors.blue4e,
    paddingHorizontal: 20,
  },
  vwNotificationDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  vwNotificationTitleTime: {
    flexDirection: "row",
    marginBottom: 7,
  },
  vwNoData: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // Text Styles
  lblTitleMain: {
    color: colors.white,
    fontSize: fontSize.size18,
    fontFamily: fontsfamily.semibold,
  },
  lblNotificationTitle: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
    flex: 1,
    alignSelf: "center",
  },
  lblNotificationTime: {
    color: colors.orange1c,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regularGolosText,
    alignSelf: "center",
  },
  lblNotificationDesc: {
    color: colors.greya7,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
    marginRight: 18,
  },
  lblNoData: {
    fontSize: fontSize.size20,
    color: colors.white,
    fontFamily: fontsfamily.semibold,
    textAlign: "center",
  },

  // TouchableOpacity Styles
  btnNotification: {
    borderBottomColor: colors.greyd9_50,
    borderBottomWidth: 1,
    flexDirection: "row",
    paddingBottom: 20,
    gap: 12,
  },

  // Image Styles
  imgNotificationBell: {
    height: 46,
    width: 46,
  },
});
