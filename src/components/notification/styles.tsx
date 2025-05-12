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
  vwNotification: {
    height: 56,
    flexDirection: "row",
    gap: 12,
    flex : 1
  },
  vwNotificationDetails: {
    flex : 1,
    height: 56,
    justifyContent: "space-between",
  },
  vwNotificationTitleTime: {
    height: 17,
    flexDirection: "row",
    alignItems: "center",
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
    flex : 1,
  },
  lblNotificationTime: {
    color: colors.orange1c,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regularGolosText,
  },
  lblNotificationDesc: {
    color: colors.greya7,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
    marginRight : 18
  },

  // TouchableOpacity Styles
  btnNotification: {
    height: 76,
    borderBottomColor: colors.greyd9_50,
    borderBottomWidth: 1,
    flexDirection: "row",
  },

  // Image Styles
  imgNotificationBell: {
    height: 46,
    width: 46,
  },
});
