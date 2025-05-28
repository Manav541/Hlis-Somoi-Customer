import { View, Text, Alert, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalBackButton from "../../global/GlobalBackButton";
import ManageAddressesComponent from "../../components/manageAddresses";
import {
  flashMessageSucess,
  showConfirmAlert,
} from "../../constants/GConstant";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { useFocusEffect } from "@react-navigation/native";
import { AddressItem } from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";

const ManageAddressesContainer = ({ navigation, route }: any) => {
  const navigateFromCart = route.params?.navigateFromCart;
  const navigateFromHome = route.params?.navigateFromHome;
  const [arrManageAddress, setArrManageAddress] = useState<AddressItem[]>([
    {
      title: "1181 North Bend River Road Lexington, KY 40507",
      default: true,
    },
    {
      title: "1123 North Bend River Road Lexington, KY 40507",
      default: false,
    },
    {
      title: "1123 North Bend River Road Lexington, KY 40507",
      default: false,
    },
  ]);

  const handleSetDefault = (index: number) => {
    showConfirmAlert("Are you sure want to set this as default?", () => {
      const updatedData = arrManageAddress.map((item, i) => ({
        ...item,
        default: i === index,
      }));
      setArrManageAddress(updatedData);
    });
  };

  const handleOnPressDelete = (index: number) => {
    showConfirmAlert("Are you sure want to delete this address?", () => {
      const updatedData = [...arrManageAddress];
      const isDefaultAddress = updatedData[index].default;

      updatedData.splice(index, 1);

      if (isDefaultAddress && updatedData.length > 0) {
        updatedData[0].default = true;
      }

      setArrManageAddress(updatedData);
      flashMessageSucess(getTranslation("addressDeleted"));
    });
  };

  const handleOnPressEditAddress = (index: number) => {
    navigation.navigate("Add Address", {
      isNavigateFromManageAddress: true,
      isEditAddress: true,
    });
  };

  const handleOnPressAddAddress = () => {
    navigation.navigate("Add Address", { isNavigateFromManageAddress: true });
  };

  const onPressAddress = () => {
    if (navigateFromCart == false) {
      
    }
    else {
      navigation.goBack();
    }
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
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
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
      navigateFromHome = {navigateFromHome}
      onPressAddress={onPressAddress}
    />
  );
};

export default ManageAddressesContainer;
