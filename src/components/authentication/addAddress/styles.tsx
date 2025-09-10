import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/Colors";
import { fontSize } from "../../../constants/FontSizes";
import { fontsfamily } from "../../../constants/FontFamily";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  // Main container for the entire screen
  container: {
    flex: 1,
    backgroundColor: colors.blue4e,
  },
  vwSearchAddress: {
    backgroundColor: colors.blue4e,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  // Map styles
  map: {
    flex: 1, // Reduced to 60% to allow space for bottom content
  },
  // Search input container
  searchContainer: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  // Bottom container (for modal content)
  bottomContainer: {
    flex: 1,
    backgroundColor: colors.blue4e,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  // Scrollable content inside bottom container (modal)
  bottomScrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  // Sticky button container at the bottom (modal)
  bottomButtonContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: colors.blue4e,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  // Modal container (for transparent background)
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
    justifyContent: "flex-end",
  },
  // Modal content (full screen with blue background)
  modalContent: {
    backgroundColor: colors.blue4e,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  // Existing styles for other components
  vwSetAsDefault: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  lblAddAddressHeading: {
    fontSize: fontSize.size14,
    color: colors.greya7,
    fontFamily: fontsfamily.regular,
    textAlign: "center",
    marginHorizontal: 35,
    marginBottom: 15,
    lineHeight: 20,
  },
  lblAddress: {
    fontSize: fontSize.size16,
    color: colors.white,
    fontFamily: fontsfamily.bold,
  },
  lblSetAsDefault: {
    fontSize: fontSize.size14,
    color: colors.greya7,
    fontFamily: fontsfamily.regular,
  },
  lblDeliverAddHeading: {
    fontSize: fontSize.size14,
    color: colors.white,
    fontFamily: fontsfamily.regular,
    marginBottom: 10,
  },
  lblDeliverAddress: {
    fontSize: fontSize.size16,
    color: colors.white,
    fontFamily: fontsfamily.semibold,
    marginBottom: 20,
    marginRight: 40,
  },
  imgCheck: {
    width: 24,
    height: 24,
  },
  btnCurrentLocation: {
    position: "absolute",
    alignSelf:'flex-end',
    bottom:20, // Adjust based on map height and padding
    right: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 10,
  },
   vwDestinationMarker: {
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  // GooglePlacesTextInput Styles
  googlePlacesContainer: {
    backgroundColor: colors.orange1c,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
  },
  input: {
    fontSize: fontSize.size14,
    color: colors.black35,
    fontFamily: fontsfamily.medium,
    backgroundColor: colors.white,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.grey76,
    height : 57,
  },
  placeholder: {
    color: colors.greya7,
  },
  loadingIndicator: {
    color: colors.orange1c,
  },
  suggestionsContainer: {
    position: "absolute",
    top: 52,
    maxHeight: 250,
    zIndex: 1000,
    marginHorizontal: 20,
    width: "100%",
  },
});
