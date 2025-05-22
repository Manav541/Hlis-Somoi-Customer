import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

export const styles = StyleSheet.create({
  // View Styles
  vwMain: {
    flex: 1,
    backgroundColor: colors.blue4e,
    justifyContent: "space-between",
  },
  vwReturnOrder: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  vwLine: {
    backgroundColor: colors.greyd9_50,
    height: 1,
    marginBottom: 15,
  },
  vwUploadImageVideos: {
    marginHorizontal: 20,
    marginTop: 20,
    gap: 10,
    marginBottom: 20,
  },
  vwUploadImageVideosItem: {
    height: 78,
    width: 78,
    borderRadius: 9.38,
    overflow: "hidden",
  },
  vwChooseResoltionItem: {
    flexDirection: "row",
    marginTop: 20,
    height: 22,
    gap: 15,
  },

  // Text Styles
  lblReturnOrderDesc: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
    lineHeight: 20,
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  lblReturnOrderReason: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.medium,
  },
  lblUploadImageVideo: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
  },
  lblChooseResolution: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontFamily: fontsfamily.semibold,
  },
  lblRadioText:{
    color : colors.white,
    fontSize : fontSize.size14,
    fontFamily : fontsfamily.regular
  },

  // TouchableOpacity Styles
  btnReturnOrderReasonItem: {
    height: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  btnUploadImageVideo: {
    height: 78,
    width: 78,
    borderRadius: 9.38,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  btnCancelImage: {
    height: 78,
    width: 78,
    borderRadius: 9.38,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black50,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  // Image styles
  imgCheckbox: {
    height: 24,
    width: 24,
  },
  imgAdd: {
    height: 22.51,
    width: 22.51,
  },
  imgUpload: {
    height: 78,
    width: 78,
    borderRadius: 9.38,
    overflow: "hidden",
  },
  imgRadioButton:{
    height : 19,
    width : 19
  }
});
