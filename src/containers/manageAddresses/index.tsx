import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Alert, StatusBar } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import GlobalBackButton from "../../global/GlobalBackButton";
import ManageAddressesComponent from "../../components/manageAddresses";

import {
  flashMessageSucess,
  flashMessageWarning,
  showConfirmAlert,
} from "../../constants/GConstant";
import { constnatStyles } from "../../constants/Styles";
import { statusCodes } from "../../api/APIConstant";
import { zustandStore } from "../../store";

import {
  AddressResponseType,
  LocationData,
  SignupResponse,
} from "../../constants/interfaces";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { ScreenNames } from "../../routers";

const ManageAddressesContainer = ({ navigation, route }: any) => {
  //  API Zustand Store
  const addressListApi = zustandStore.AddressStore(
    (state) => state.addressList
  );
  const deleteAddressApi = zustandStore.AddressStore(
    (state) => state.deleteAddress
  );

  const updateAddressApi = zustandStore.AddressStore(
    (state) => state.updateAddress
  );

  const navigateFromCart = route.params?.navigateFromCart;
  const navigateFromHome = route.params?.navigateFromHome;

  const [arrManageAddress, setArrManageAddress] = useState<LocationData[]>([]);

  const handleSetDefault = (item: LocationData) => {
    showConfirmAlert(
      "Are you sure you want to set this as default?",
      () => {
        handleUpdateLocationApi(item, true); // on "Yes" — set as default
      },
      () => {
        handleUpdateLocationApi(item, false); // on "No" — not default
      }
    );
  };

  const handleOnPressDelete = (location_id: string) => {
    showConfirmAlert(getTranslation("confirmDeleteAddress"), () => {
      handleDeleteAddressApi(location_id);
    });
  };

  const handleDeleteAddressApi = async (location_id: string) => {
    const dictData = {
      location_id: location_id,
    };
    try {
      const response = await deleteAddressApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("DELETE ADDRESS RESPONSE===>", JSON.stringify(response));

        if (response.code === statusCodes.success) {
          flashMessageSucess(response.message);
          handleAddressListApi();
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log("Customer Detail API Error:", error);
    }
  };

  const handleOnPressEditAddress = (item: LocationData) => {
    navigation.navigate(ScreenNames.addAddress, {
      isNavigateFromManageAddress: true,
      isEditAddress: true,
      editAddressItem: item,
    });
  };

  const handleOnPressAddAddress = () => {
    navigation.navigate("Add Address", {
      isNavigateFromManageAddress: true,
    });
  };

  const onPressAddress = () => {
    if (navigateFromCart) {
      navigation.goBack();
    }
  };

  const handleAddressListApi = async () => {
    try {
      const response = await addressListApi({}, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("ADDRESS LIST RESPONSE===>", JSON.stringify(response));

        if (response.code === statusCodes.success) {
          const locationData = response.data;
          if (Array.isArray(locationData)) {
            setArrManageAddress(locationData as LocationData[]);
          }
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
        else if (response.code === statusCodes.emptyData) {
          setArrManageAddress([]);
        }
      }
    } catch (error) {
      __DEV__ && console.log("Customer Detail API Error:", error);
    }
  };

  const handleUpdateLocationApi = async (
    item: LocationData,
    isDefault: boolean
  ) => {
    const dictData: AddressResponseType = {
      address: item?.address,
      building_details: item?.building_details,
      description: item?.description,
      latitude: item?.latitude,
      longitude: item?.longitude,
      is_default: isDefault,
      location_id: item?.id,
    };

    try {
      const response = await updateAddressApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ && console.log("UPDATE LOCATION RESPONSE===>", response);
        if (response.code === statusCodes.success) {
          // flashMessageSucess(response.message);
          handleAddressListApi();
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => <GlobalBackButton onPress={navigation.goBack} />,
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {navigateFromCart
            ? getTranslation("changeLocation")
            : getTranslation("manageAddress")}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      handleAddressListApi();
      StatusBar.setBarStyle("dark-content");
    }, [navigation])
  );

  return (
    <ManageAddressesComponent
      arrManageAddress={arrManageAddress}
      handleSetDefault={handleSetDefault}
      handleOnPressDelete={handleOnPressDelete}
      handleOnPressAddAddress={handleOnPressAddAddress}
      handleOnPressEditAddress={handleOnPressEditAddress}
      navigateFromCart={navigateFromCart}
      navigateFromHome={navigateFromHome}
      onPressAddress={onPressAddress}
    />
  );
};

export default ManageAddressesContainer;
