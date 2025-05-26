import { View, Text, TextInput, Alert, BackHandler } from "react-native";
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
import { CommonActions } from "@react-navigation/native";
import { ScreenNames } from "../../../routers";
import { constnatStyles } from "../../../constants/Styles";

const AddAddressContainer = ({ navigation, route }: any) => {
  const [address, setAddress] = useState("");
  const [house, setHouse] = useState("");
  const [additionalDescription, setAdditionalDescription] = useState("");

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
      if (!isNavigateFromManageAddress) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: ScreenNames.bottomTabsNavigation }],
          })
        );
        flashMessageSucess(getTranslation("addressAddedSucess"));
      } else {
        navigation.goBack();
        flashMessageSucess(getTranslation("addressAddedSucess"));
      }
    }
  };

  const handleSetDefault = () => {
    showConfirmAlert("Are you sure want to set this as default?", () => {
      setIsDefault(true);
    });
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton
          onPress={() => {
            if (isNavigateFromManageAddress) {
              navigation.goBack();
            } else {
              showConfirmAlert(
                "Do you want to continue without address?",
                () => {
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [{ name: ScreenNames.bottomTabsNavigation }],
                    })
                  );
                }
              );
            }
          }}
        />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {isNavigateFromManageAddress
            ? ScreenNames.addAddress
            : isEditAddress
            ? getTranslation("updateAddress")
            : ScreenNames.addAddress}
        </Text>
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
  }, []);

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
    />
  );
};

export default AddAddressContainer;
