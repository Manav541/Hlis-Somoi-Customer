import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalBackButton from "../../global/GlobalBackButton";
import ManageAddressesComponent from "../../components/manageAddresses";
import { flashMessageSucess } from "../../constants/GConstant";
import { getTranslation } from "../../localization/i18n/i18n.config";

const ManageAddressesContainer = ({ navigation }: any) => {
  const [arrManageAddress, setArrManageAddress] = useState([
    {
      title: `1181 North Bend River Road Lexington, KY 40507`,
      default: true,
    },
    {
      title: `1123 North Bend River Road Lexington, KY 40507`,
      default: false,
    },
    {
      title: `1123 North Bend River Road Lexington, KY 40507`,
      default: false,
    },
  ]);

  const handleSetDefault = (index: number) => {
    Alert.alert(
      "Set as Default",
      "Are you sure want to set this as default?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            const updatedData = arrManageAddress.map((item, i) => ({
              ...item,
              default: i === index, // only this one becomes default
            }));
            setArrManageAddress(updatedData);
          },
        },
      ],
      { cancelable: true }
    );
  };
  const handleDelete = (index: number) => {
    Alert.alert(
      "Delete Address",
      "Are you sure want to delete this address?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            const updatedData = [...arrManageAddress];
            updatedData.splice(index, 1); // remove item at index
            setArrManageAddress(updatedData);
            flashMessageSucess(getTranslation('addressDeleted'))
          },
        },
      ],
      { cancelable: true }
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
    <ManageAddressesComponent
      arrManageAddress={arrManageAddress}
      handleSetDefault={handleSetDefault}
      handleDelete={handleDelete}
    />
  );
};

export default ManageAddressesContainer;
