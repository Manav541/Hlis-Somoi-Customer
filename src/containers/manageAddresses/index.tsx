import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, Text, Alert, StatusBar } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import GlobalBackButton from "../../global/GlobalBackButton";
import ManageAddressesComponent from "../../components/manageAddresses";

import {
  flashMessageSucess,
  flashMessageWarning,
  showConfirmAlert,
  toggleLoader,
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
  // Pagination state
  const [addressListPageNumber, setAddressListPageNumber] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const hasMountedOnce = useRef(false);
  const [canLoadMore, setCanLoadMore] = useState(false);

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

  const onPressAddress = (selectedAddress: LocationData) => {
    if (
      (navigateFromCart || navigateFromHome) &&
      route.params?.onSelectAddress
    ) {
      route.params.onSelectAddress(selectedAddress); // call the callback
      navigation.goBack();
    }
  };

  const loadMoreCategories = () => {
    if (hasMoreData && !isLoadingMore) {
      const nextPage = addressListPageNumber + 1;
      handleAddressListApi(nextPage, true);
    }
  };

  // ----------------------- API Calling -------------------------
  // handleAddressListApi
  const handleAddressListApi = async (page: number, isLoadMore = false) => {
    if (isLoadMore && isLoadingMore) return;

    if (!isLoadMore) toggleLoader(true);
    else setIsLoadingMore(true);
    const dictData = {
      page_no: page,
    };
    try {
      const response = await addressListApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("ADDRESS LIST RESPONSE===>", JSON.stringify(response));

        if (response.code === statusCodes.success) {
          const locationData = response.data as LocationData[];
          if (Array.isArray(locationData) && locationData.length > 0) {
            setArrManageAddress((prev) =>
              isLoadMore ? [...prev, ...locationData] : locationData
            );
            setAddressListPageNumber(page);
            setHasMoreData(true);
          } else {
            if (!isLoadMore) setArrManageAddress([]);
            setHasMoreData(false);
          }
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        } else if (response.code === statusCodes.emptyData) {
          if (!isLoadMore) setArrManageAddress([]);
          setHasMoreData(false);
        }
      }
    } catch (error) {
      __DEV__ && console.log("Address List API Error:", error);
    } finally {
      if (!isLoadMore) toggleLoader(false);
      else setIsLoadingMore(false);
    }
  };

  // handleUpdateLocationApi
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
          handleAddressListApi(addressListPageNumber, false);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  // handleDeleteAddressApi
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
          handleAddressListApi(addressListPageNumber, false);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log("Customer Detail API Error:", error);
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
      handleAddressListApi(1, false);
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
      // pagination
      loadMoreCategories={loadMoreCategories}
      canLoadMore={canLoadMore}
      setCanLoadMore={setCanLoadMore}
      hasMountedOnce={hasMountedOnce}
    />
  );
};

export default ManageAddressesContainer;
