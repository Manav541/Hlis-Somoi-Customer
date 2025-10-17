import { StyleSheet } from "react-native";
import { colors } from "./Colors";
import { fontSize } from "./FontSizes";
import { fontsfamily } from "./FontFamily";

export const constnatStyles = StyleSheet.create({
  vwOrangeBgParent: { flex: 1, backgroundColor: colors.orange1c },
  vwBlueBgWithRadius: {
    flex: 1,
    backgroundColor: colors.blue4e,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 10,
    paddingHorizontal: 20,
  },
   vwBlueBgOnly:{
    flex: 1,
    backgroundColor: colors.blue4e,
  },
  vwBlueBgBottomRadius: {
    flex: 1,
    backgroundColor: colors.blue4e,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  vwNoDataCenter: { flex: 1, justifyContent: "center", alignItems: "center" },
  flashMessage: {
    zIndex: 1000,
    elevation: 1000,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    pointerEvents: "box-none",
  },
  vwActivityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.blue4e,
  },
  vwHeader: {
    flexDirection: "row",
    backgroundColor: colors.orange1c,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 14,
  },
  lblNoData: {
    color: colors.white,
    fontSize: fontSize.size16,
    fontFamily: fontsfamily.semibold,
  },
  img24: { height: 24, width: 24 },
  lblHeaderTitle: {
    color: colors.blue4e,
    fontSize: fontSize.size18,
    fontFamily: fontsfamily.bold,
    textAlign: "center",
  },
});
