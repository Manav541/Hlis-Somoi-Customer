import { View, Text, TextInput, BackHandler, StatusBar } from "react-native";
import React, { useEffect, useRef, useState, useCallback } from "react";
import GlobalBackButton from "../../../global/GlobalBackButton";
import AddAddressComponent from "../../../components/authentication/addAddress";
import { regex } from "../../../constants/Regex";
import {
  containsEmoji,
  flashMessageSucess,
  flashMessageWarning,
  showConfirmAlert,
} from "../../../constants/GConstant";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { ScreenNames } from "../../../routers";
import { constnatStyles } from "../../../constants/Styles";
import {
  AddressResponseType,
  SecretKeyItem,
} from "../../../constants/interfaces";
import { zustandStore } from "../../../store";
import { statusCodes } from "../../../api/APIConstant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GooglePlacesTextInputRef } from "react-native-google-places-textinput";
import LocationManager from "../../../constants/utils/LocationManager";
import MapView from "react-native-maps";

const AddAddressContainer = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  // API Zustand Store
  const addAddressApi = zustandStore.AddressStore((state) => state.addAddress);
  const updateAddressApi = zustandStore.AddressStore(
    (state) => state.updateAddress
  );
  const secretKeyApi = zustandStore.KeyStore((state) => state.secretKey);

  const [googleApiKey, setGoogleApiKey] = useState<string>("");
  const [isAddressInitialized, setIsAddressInitialized] = useState(false);

  // Search Location
  const [searchLocation, setSearchLocation] = useState("");
  const [searchLocationFocused, setSearchLocationFocused] = useState(false);
  const searchLocationRef = useRef<GooglePlacesTextInputRef>(null);
  const [fullAddress, setFullAddress] = useState("");

  const [address, setAddress] = useState("");
  const [house, setHouse] = useState("");
  const [additionalDescription, setAdditionalDescription] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [location_id, setLocation_id] = useState("");

  const addressRef = useRef<TextInput>(null);
  const houseRef = useRef<TextInput>(null);
  const additionalDescriptionRef = useRef<TextInput>(null);

  const [addressFocused, setAddressFocused] = useState(false);
  const [houseFocused, setHouseFocused] = useState(false);
  const [additionalDescriptionFocused, setAdditionalDescriptionFocused] =
    useState(false);

  const [isDefault, setIsDefault] = useState(false);
  const mapRef = useRef<MapView>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isNavigateFromManageAddress =
    route?.params?.isNavigateFromManageAddress;

  const isEditAddress = route?.params?.isEditAddress;

  const handleCurrentLocation = useCallback(async () => {
    const granted = await LocationManager.ensureLocationPermission();
    if (granted) {
      const location = await LocationManager.getCurrentLocation();
      if (location) {
        setLatitude(location.latitude);
        setLongitude(location.longitude);
        const address = await LocationManager.getFormattedAddress(location);
        setFullAddress(address || "");
        setSearchLocation(address || "");
        setAdditionalDescription(address || "");
        if (mapRef.current) {
          mapRef.current.animateToRegion(
            {
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            },
            1000
          );
        }
      }
    }
  }, []);

  const handleMapPress = useCallback(async (event: any) => {
    console.log("event", event);
    const coord = event.nativeEvent.coordinate;
    setLatitude(coord.latitude);
    setLongitude(coord.longitude);
    const address = await LocationManager.getFormattedAddress(coord);
    setFullAddress(address || "");
    setSearchLocation(address || "");
    setAdditionalDescription(address || "");
  }, []);

  const handleConfirmLocation = () => {
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handlePlaceSelect = useCallback(
    async (place: any) => {
      handleOnFocus("address");
      console.log("place", place);

      const mainText = place.structuredFormat?.mainText?.text || "";
      const secondaryText = place.structuredFormat?.secondaryText?.text || "";

      console.log("Main Text:", mainText);
      console.log("Secondary Text:", secondaryText);
      const fullLocation = mainText + ", " + secondaryText;

      // Update state to reflect the full address
      setSearchLocation(fullLocation);
      setFullAddress(fullLocation);
      setAddress(mainText);
      setAdditionalDescription(secondaryText);

      const placeId = place.place_id || place.placeId;
      if (!placeId) return;

      const location = await fetchPlaceDetails(placeId);
      if (location) {
        setLatitude(location.lat);
        setLongitude(location.lng);
      }

      console.log("Location:", location);
    },
    [googleApiKey]
  );

  const fetchPlaceDetails = useCallback(
    async (placeId: string) => {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${googleApiKey}`;

      try {
        const response = await fetch(url);
        const result = await response.json();

        if (result.status === "OK") {
          const location = result.result.geometry.location;
          console.log("Latitude:", location.lat);
          console.log("Longitude:", location.lng);
          return location;
        } else {
          console.warn("Google Place Details Error:", result.status);
        }
      } catch (err) {
        console.error("Failed to fetch place details:", err);
      }
    },
    [googleApiKey]
  );

  const handleOnSubmit = useCallback((type: string) => {
    if (type === "address") {
      houseRef?.current?.focus();
    } else if (type === "house") {
      additionalDescriptionRef?.current?.focus();
    }
  }, []);

  const handleOnChangeSearchText = useCallback((text: string) => {
    setSearchLocation(text);
  }, []);

  const handleOnChangeText = useCallback((text: string, type: string) => {
    if (type === "address") {
      if (regex.address.test(text)) {
        setAddress(text);
      }
    } else if (type === "house") {
      const cleanedText = text.replace(/\s/g, "");
      if (!containsEmoji(cleanedText)) {
        setHouse(cleanedText);
      }
    } else if (type === "description") {
      setAdditionalDescription(text);
    }
  }, []);

  const handleOnFocus = useCallback((type: string) => {
    if (type === "address") {
      setAddressFocused(true);
      setSearchLocationFocused(true);
    } else if (type === "house") {
      setHouseFocused(true);
    } else if (type === "description") {
      setAdditionalDescriptionFocused(true);
    }
  }, []);

  const handleOnBlur = useCallback((type: string) => {
    if (type === "address") {
      setAddressFocused(false);
      setSearchLocationFocused(false);
    } else if (type === "house") {
      setHouseFocused(false);
    } else if (type === "description") {
      setAdditionalDescriptionFocused(false);
    }
  }, []);

  const handleOnPressAdd = useCallback(() => {
    if (address.trim() === "") {
      flashMessageWarning(getTranslation("addressRequired"));
    } else if (house.trim() === "") {
      flashMessageWarning(getTranslation("houseRequired"));
    } else {
      if (isEditAddress) {
        handleUpdateLocationApi();
      } else {
        handleAddLocationApi();
      }
    }
  }, [address, house, isEditAddress]);

  const handleAddLocationApi = useCallback(async () => {
    const dictData: AddressResponseType = {
      address: address,
      building_details: house,
      description: additionalDescription,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    };
    if (isNavigateFromManageAddress) {
      dictData.is_default = isDefault;
    }
    try {
      const response = await addAddressApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ && console.log("ADD LOCATION RESPONSE===>", response);
        if (response.code === statusCodes.success) {
          flashMessageSucess(response.message);
          if (!isNavigateFromManageAddress) {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{ name: ScreenNames.bottomTabsNavigation }],
              })
            );
          } else {
            navigation.goBack();
          }
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  }, [
    address,
    house,
    additionalDescription,
    latitude,
    longitude,
    isDefault,
    isNavigateFromManageAddress,
    navigation,
  ]);

  const handleUpdateLocationApi = useCallback(async () => {
    const dictData: AddressResponseType = {
      address: address,
      building_details: house,
      description: additionalDescription,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      is_default: isDefault,
      location_id: location_id,
    };

    try {
      const response = await updateAddressApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ && console.log("UPDATE LOCATION RESPONSE===>", response);
        if (response.code === statusCodes.success) {
          flashMessageSucess(response.message);
          navigation.goBack();
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  }, [
    address,
    house,
    additionalDescription,
    latitude,
    longitude,
    isDefault,
    location_id,
    navigation,
  ]);

  const handleSetDefault = useCallback(() => {
    showConfirmAlert(
      "Are you sure want to set this as default?",
      () => {
        setIsDefault(true); // When user presses "Yes"
      },
      () => {
        setIsDefault(false); // When user presses "No"
      }
    );
  }, []);

  const onPressGoBack = useCallback(() => {
    if (isNavigateFromManageAddress) {
      navigation.goBack();
    } else {
      showConfirmAlert("Do you want to continue without address?", () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: ScreenNames.bottomTabsNavigation }],
          })
        );
      });
    }
  }, [isNavigateFromManageAddress, navigation]);

  const handleSecretKeyApi = useCallback(async () => {
    try {
      const response = await secretKeyApi({}, navigation);
      if (
        response?.code === statusCodes.success &&
        Array.isArray(response.data)
      ) {
        const keysData = response.data as SecretKeyItem[];
        keysData.forEach((item) => {
          switch (item.name) {
            case "googleApiKey":
              if (item.keys) setGoogleApiKey(item.keys);
              break;
            default:
              break;
          }
        });
      } else if (response?.code === statusCodes.invaildOrFail) {
        flashMessageWarning(response.message);
      }
    } catch (error) {
      __DEV__ && console.log("Secret Key API Error:", error);
    }
  }, [navigation]);

  const header = useCallback(() => {
    navigation.setOptions({
      header: () => (
        <View style={[constnatStyles.vwHeader, { paddingTop: insets.top }]}>
          <GlobalBackButton onPress={onPressGoBack} />

          <Text style={constnatStyles.lblHeaderTitle}>
            {isNavigateFromManageAddress
              ? isEditAddress
                ? getTranslation("updateAddress")
                : ScreenNames.addAddress
              : ScreenNames.addAddress}
          </Text>
          <View style={{ width: 24 }}></View>
        </View>
      ),
    });
  }, [insets, isNavigateFromManageAddress, isEditAddress, onPressGoBack]);

  useEffect(() => {
    header();

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (!isNavigateFromManageAddress) {
          showConfirmAlert("Do you want to continue without address?", () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{ name: ScreenNames.bottomTabsNavigation }],
              })
            );
          });
          return true;
        }
        return false;
      }
    );
    return () => backHandler.remove();
  }, [header, isNavigateFromManageAddress, navigation]);

  useEffect(() => {
    console.log("Route Params:", route?.params); // Debug route params
    if (
      route?.params?.isNavigateFromManageAddress &&
      route?.params?.isEditAddress &&
      route?.params?.editAddressItem
    ) {
      const editItem = route?.params?.editAddressItem;
      console.log("EDIT ADDRESS ITEM===>", editItem);
      console.log(
        "Raw Latitude:",
        editItem.latitude,
        "Raw Longitude:",
        editItem.longitude
      );
      const parsedLat = parseFloat(editItem.latitude);
      const parsedLon = parseFloat(editItem.longitude);
      console.log(
        "Parsed Latitude:",
        parsedLat,
        "Parsed Longitude:",
        parsedLon
      );

      setAddress(editItem.address);
      setHouse(editItem.building_details);
      setAdditionalDescription(editItem.description);
      setIsDefault(editItem.is_default);
      setLatitude(parsedLat || 0); // Use parsed value or fallback to 0
      setLongitude(parsedLon || 0); // Use parsed value or fallback to 0
      setLocation_id(editItem.id);
      // Initialize searchLocation with combined address and description
      const fullLocation = `${editItem.address}, ${editItem.description}`;
      setFullAddress(fullLocation);
      setSearchLocation(fullLocation);
    } else {
      setAddress("");
      setHouse("");
      setAdditionalDescription("");
      setIsDefault(false);
      setLatitude(0);
      setLongitude(0);
      setSearchLocation("");
      setFullAddress("");
    }
    // Mark it as initialized
    setIsAddressInitialized(true);
  }, [route?.params]);

  useFocusEffect(
    React.useCallback(() => {
      handleSecretKeyApi();
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [handleSecretKeyApi])
  );

  // Fetch and store current location only if not editing an address
  useEffect(() => {
    if (!isEditAddress) {
      const checkAndFetchLocation = async () => {
        const granted = await LocationManager.ensureLocationPermission();

        if (granted) {
          // ✅ Permission granted – now fetch and store location
          const location = await LocationManager.getCurrentLocation();
          if (location) {
            setLatitude(location.latitude);
            setLongitude(location.longitude);
            const address = await LocationManager.getFormattedAddress(location);
            setFullAddress(address || "");
            setSearchLocation(address || "");
            setAdditionalDescription(address || "");
          }
          if (mapRef.current) {
            mapRef.current.animateToRegion(
              {
                latitude: location?.latitude ?? 0,
                longitude: location?.longitude ?? 0,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              },
              1000
            );
          }
        }
      };

      checkAndFetchLocation();
    }
  }, [isEditAddress]);

  useEffect(() => {
    if (mapRef.current && latitude !== 0 && longitude !== 0) {
      mapRef.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000
      );
    }
  }, [latitude, longitude]);

  return (
    <AddAddressComponent
      address={address}
      house={house}
      additionalDescription={additionalDescription}
      addressRef={addressRef}
      houseRef={houseRef}
      additionalDescriptionRef={additionalDescriptionRef}
      addressFocused={addressFocused}
      houseFocused={houseFocused}
      additionalDescriptionFocused={additionalDescriptionFocused}
      handleOnChangeText={handleOnChangeText}
      handleOnSubmit={handleOnSubmit}
      handleOnPressAdd={handleOnPressAdd}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
      isDefault={isDefault}
      handleSetDefault={handleSetDefault}
      isNavigateFromManageAddress={isNavigateFromManageAddress}
      isEditAddress={isEditAddress}
      handlePlaceSelect={handlePlaceSelect}
      googleApiKey={googleApiKey}
      isAddressInitialized={isAddressInitialized}
      searchLocation={searchLocation}
      searchLocationFocused={searchLocationFocused}
      searchLocationRef={searchLocationRef}
      handleOnChangeSearchText={handleOnChangeSearchText}
      latitude={latitude}
      longitude={longitude}
      fullAddress={fullAddress}
      mapRef={mapRef}
      isModalVisible={isModalVisible}
      handleCloseModal={handleCloseModal}
      handleConfirmLocation={handleConfirmLocation}
      handleCurrentLocation={handleCurrentLocation}
      handleMapPress={handleMapPress}
    />
  );
};

export default AddAddressContainer;
