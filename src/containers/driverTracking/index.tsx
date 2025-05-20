import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import DriverTrackingComponent from "../../components/driverTracking";
import GlobalBackButton from "../../global/GlobalBackButton";
import { useFocusEffect } from "@react-navigation/native";
import { images } from "../../constants/Images";
import { ScreenNames } from "../../routers";
import { constnatStyles } from "../../constants/Styles";

const DriverTrackingContainer = ({ navigation, route }: any) => {
  const [driverProfile, setDriverProfile] = useState<string>("");
  const [driverName, setDriverName] = useState<string>("");
  const [driverMobileNumber, setDriverMobileNumber] = useState<string>("");
  const [delivertoName, setDelivertoName] = useState<string>("");
  const [delivertoAddress, setDelivertoAddress] = useState<string>("");

  const onPressChat = () => {
    navigation.navigate(ScreenNames.chat, {
      driverName: driverName,
      driverMobileNumber: driverMobileNumber,
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

  useEffect(() => {
    header();
    if (route?.params) {
      setDriverProfile(route?.params?.driverProfile);
      setDriverName(route?.params?.driverName);
      setDriverMobileNumber(route?.params?.driverMobileNumber);
      setDelivertoName(route?.params?.delivertoName);
      setDelivertoAddress(route?.params?.delivertoAddress);
    } else {
      setDriverName("");
    }
  }, [route]);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );
  return (
    <DriverTrackingComponent
      driverProfile={driverProfile}
      driverName={driverName}
      delivertoName={delivertoName}
      delivertoAddress={delivertoAddress}
      onPressChat={onPressChat}
    />
  );
};

export default DriverTrackingContainer;
