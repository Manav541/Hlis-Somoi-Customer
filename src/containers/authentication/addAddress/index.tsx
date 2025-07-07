import {
  View,
  Text,
  TextInput,
  Alert,
  BackHandler,
  StatusBar,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import GlobalBackButton from "../../../global/GlobalBackButton";
import AddAddressComponent from "../../../components/authentication/addAddress";
import { regex } from "../../../constants/Regex";
import {
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
  SignupResponse,
} from "../../../constants/interfaces";
import { zustandStore } from "../../../store";
import { statusCodes } from "../../../api/APIConstant";
import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddAddressContainer = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  // API Zustand Store
  const addAddressApi = zustandStore.AddressStore((state) => state.addAddress);
  const updateAddressApi = zustandStore.AddressStore(
    (state) => state.updateAddress
  );
  const customerDetailApi = zustandStore.AuthStore(
    (state) => state.getCustomerDetail
  );
  const secretKeyApi = zustandStore.KeyStore((state) => state.secretKey);

  const [googleApiKey, setGoogleApiKey] = useState<string>("");
  const [isAddressInitialized, setIsAddressInitialized] = useState(false);
  const [address, setAddress] = useState("");
  const [house, setHouse] = useState("");
  const [additionalDescription, setAdditionalDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location_id, setLocation_id] = useState("");

  const addressRef = useRef<TextInput>(null);
  const houseRef = useRef<TextInput>(null);
  const additionalDescriptionRef = useRef<TextInput>(null);

  const [addressFocused, setAddressFocused] = useState(false);
  const [houseFocused, setHouseFocused] = useState(false);
  const [additionalDescriptionFocused, setAdditionalDescriptionFocused] =
    useState(false);

  const [isDefault, setIsDefault] = useState(false);
  const isNavigateFromManageAddress =
    route?.params?.isNavigateFromManageAddress;

  const isEditAddress = route?.params?.isEditAddress;

  const handlePlaceSelect = async (place: any) => {
    handleOnFocus("address");
    console.log("Selected place:", JSON.stringify(place));
    const mainText = place.structuredFormat?.mainText?.text;
    const secondaryText = place.structuredFormat?.secondaryText?.text;
    setAddress(mainText);
    setAdditionalDescription(secondaryText);

    // Get the place ID from the response
    const placeId = place.placeId;

    // Now fetch lat/lng
    const location = await fetchPlaceDetails(placeId);
    if (location) {
      setLatitude(location.lat);
      setLongitude(location.lng);
    }
    console.log("Location:", location);
  };

  const fetchPlaceDetails = async (placeId: string) => {
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
  };

  const handleOnSubmit = (type: string) => {
    if (type === "address") {
      houseRef?.current?.focus();
    } else if (type === "house") {
      additionalDescriptionRef?.current?.focus();
    }
  };

  const handleOnChangeText = (text: string, type: string) => {
    if (type === "address") {
      if (regex.address.test(text)) {
        setAddress(text);
      }
    } else if (type === "house") {
      setHouse(text.replace(/\s/g, ""));
    } else if (type === "description") {
      setAdditionalDescription(text);
    }
  };

  const handleOnFocus = (type: string) => {
    if (type === "address") {
      setAddressFocused(true);
    } else if (type === "house") {
      setHouseFocused(true);
    } else if (type === "description") {
      setAdditionalDescriptionFocused(true);
    }
  };

  const handleOnBlur = (type: string) => {
    if (type === "address") {
      setAddressFocused(false);
    } else if (type === "house") {
      setHouseFocused(false);
    } else if (type === "description") {
      setAdditionalDescriptionFocused(false);
    }
  };

  const handleOnPressAdd = () => {
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
  };

  const handleAddLocationApi = async () => {
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
            // flashMessageSucess(getTranslation("addressAddedSucess"));
          } else {
            navigation.goBack();
            // flashMessageSucess(getTranslation("addressAddedSucess"));
          }
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  const handleUpdateLocationApi = async () => {
    const dictData: AddressResponseType = {
      address: address,
      building_details: house,
      description: additionalDescription,
      latitude: latitude,
      longitude: longitude,
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
  };

  const handleSetDefault = () => {
    showConfirmAlert(
      "Are you sure want to set this as default?",
      () => {
        setIsDefault(true); // When user presses "Yes"
      },
      () => {
        setIsDefault(false); // When user presses "No"
      }
    );
  };

  const onPressGoBack = () => {
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
  };

  const handleSecretKeyApi = async () => {
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
  };

  const header = () => {
    navigation.setOptions({
      header: () => (
        <View
          style={[constnatStyles.vwHeader, { paddingTop: insets.top + 10 }]}
        >
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
  };

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
  }, [route]);

  useEffect(() => {
    if (
      route?.params?.isNavigateFromManageAddress &&
      route?.params?.isEditAddress &&
      route?.params?.editAddressItem
    ) {
      console.log("EDIT ADDRESS ITEM===>", route?.params?.editAddressItem);
      setAddress(route?.params?.editAddressItem.address);
      setHouse(route?.params?.editAddressItem.building_details);
      setAdditionalDescription(route?.params?.editAddressItem.description);
      setIsDefault(route?.params?.editAddressItem.is_default);
      setLatitude(route?.params?.editAddressItem.latitude);
      setLongitude(route?.params?.editAddressItem.longitude);
      setLocation_id(route?.params?.editAddressItem.id);
    } else {
      setAddress("");
      setHouse("");
      setAdditionalDescription("");
      setIsDefault(false);
      setLatitude("");
      setLongitude("");
    }
     // ✅ Mark it as initialized
  setIsAddressInitialized(true);
  }, [route]);

  useFocusEffect(
    React.useCallback(() => {
      handleSecretKeyApi();
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

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
    />
  );
};

export default AddAddressContainer;
