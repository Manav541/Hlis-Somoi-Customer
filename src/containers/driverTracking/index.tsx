import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import DriverTrackingComponent from "../../components/driverTracking";
import GlobalBackButton from "../../global/GlobalBackButton";
import { useFocusEffect } from "@react-navigation/native";
import { images } from "../../constants/Images";
import { ScreenNames } from "../../routers";
import { constnatStyles } from "../../constants/Styles";

const DriverTrackingContainer = ({ navigation, route }: any) => {
  const driver_details = route?.params?.driver_details;
  const customer_details = route?.params?.customer_details;
  const [driverName, setDriverName] = useState<string>("");
  const [driverMobileNumber, setDriverMobileNumber] = useState<string>("");

  const onPressChat = () => {
    navigation.navigate(ScreenNames.chat, {
      driver_id : driver_details?.id,
      customer_id : customer_details?.customer_id,
    });
  };
  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>{ScreenNames.driverTracking}</Text>
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
    <DriverTrackingComponent
      driver_details={driver_details}
      customer_details={customer_details}
      onPressChat={onPressChat}
    />
  );
};

export default DriverTrackingContainer;
