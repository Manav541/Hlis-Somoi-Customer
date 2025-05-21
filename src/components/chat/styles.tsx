import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
  vwMain: {
    flex: 1,
    backgroundColor: colors.blue4e,
  },
  flatlistContainer: {
    gap: 16,
    paddingHorizontal: 20,
    flexGrow: 1,
    paddingBottom: 10,
  },
  vwFlatlistMessage: {
    padding: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    gap: 4,
    maxWidth: "90%",
  },
  vwMessageInputSendBtn: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 20,
  },
  vwMesssageInput: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "flex-end",
    maxHeight: 100,
    gap: 9,
    paddingLeft: 9,
    borderRadius: 10,
    flex: 1,
  },
  vwTimeLine: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  vwTimeLineInner: { flex: 1, height: 1, backgroundColor: colors.greya7 },
  messageInput: {
    flex: 1,
    maxHeight: 100,
    paddingVertical: 14,
    margin: 0,
    padding: 0,
    justifyContent: "center",
    fontSize: fontSize.size14,
    color: colors.blue4e,
    fontFamily: fontsfamily.regular,
  },
  btnSend: {
    height: 48,
    width: 47,
    borderRadius: 10,
    backgroundColor: colors.orange1c,
    alignItems: "center",
    justifyContent: "center",
  },
  lblMessage: {
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.regular,
    color: colors.black35,
  },
  lblTime: {
    fontSize: fontSize.size10,
    fontFamily: fontsfamily.regular,
  },
  lblMainTime: {
    color: colors.greya7,
    fontSize: fontSize.size12,
    fontFamily: fontsfamily.regular,
  },
});
