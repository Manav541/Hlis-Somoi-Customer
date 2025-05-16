import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  imgFilter: {
    height: 24,
    width: 24,
    marginRight: 20,
    marginBottom: Platform.OS == "ios" ? 12 : 0,
  },
});
