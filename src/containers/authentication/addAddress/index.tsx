import { View, Text, TextInput, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import GlobalBackButton from "../../../global/GlobalBackButton";
import AddAddressComponent from "../../../components/authentication/addAddress";
import { regex } from "../../../constants/Regex";
import { flashMessageWarning, showConfirmAlert } from "../../../constants/GConstant";
import { getTranslation } from "../../../localization/i18n/i18n.config";

const AddAddressContainer = ({ navigation, route }: any) => {
  const [address, setAddress] = useState("");
  const [house, setHouse] = useState("");
  const [additionalDescription, setAdditionalDescription] = React.useState("");

  const addressRef = useRef<TextInput>(null);
  const houseRef = useRef<TextInput>(null);
  const additionalDescriptionRef = useRef<TextInput>(null);

  const [addressFocused, setAddressFocused] = useState(false);
  const [houseFocused, setHouseFocused] = useState(false);
  const [additionalDescriptionFocused, setAdditionalDescriptionFocused] =
    useState(false);

    const [isDefault, setIsDefault] = useState(false);
    const isNavigateFromManageAddress = route?.params?.isNavigateFromManageAddress;

  const handleOnSubmit = (type: string) => {
    if (type === "address") {
      addressRef?.current?.focus();
    } else if (type === "house") {
      houseRef?.current?.focus();
    } else {
      additionalDescriptionRef?.current?.focus();
    }
  };

  const handleOnChangeText = (text: string, type: string) => {
    if (type === 'address') {
      if (regex.address.test(text)) {
        setAddress(text);
      }
    } else if (type === 'house') {
      setHouse(text.replace(/\s/g, ''));
    } else {
      setAdditionalDescription(text.replace(/\s/g, ''));
    }
  };

  const handleOnFocus = (type: string) => {
    if (type === 'address') {
      setAddressFocused(true);
    } else if (type === 'house') {
      setHouseFocused(true);
    } else {
      setAdditionalDescriptionFocused(true);
    }
  };

  const handleOnBlur = (type: string) => {
    if (type === 'address') {
        setAddressFocused(true);
      } else if (type === 'house') {
        setHouseFocused(true);
      } else {
        setAdditionalDescriptionFocused(true);
      }
  };

  const handleOnPressAdd = () => {
    if (address.trim() == '') {
      flashMessageWarning(getTranslation('emptyName'));
    } else if (house.trim() == '') {
      flashMessageWarning(getTranslation('emptyEmail'));
    } else {
    }
  };

  const handleSetDefault = () => {
    showConfirmAlert(
        "Are you sure want to set this as default?",
        () => {
            setIsDefault(true);
        }
      );
  };


  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  };

  useEffect(() => {
    header();
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
