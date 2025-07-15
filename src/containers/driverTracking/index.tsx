import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import DriverTrackingComponent from "../../components/driverTracking";
import GlobalBackButton from "../../global/GlobalBackButton";
import { useFocusEffect } from "@react-navigation/native";
import { images } from "../../constants/Images";
import { ScreenNames } from "../../routers";
import { constnatStyles } from "../../constants/Styles";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";
import { OrderDetailsData, SecretKeyItem } from "../../constants/interfaces";
import { flashMessageWarning, toggleLoader } from "../../constants/GConstant";

const DriverTrackingContainer = ({ navigation, route }: any) => {
  // API zustand store
  const orderDetailsApi = zustandStore.MyOrdersStore(
    (state) => state.orderDetails
  );
  const secretKeyApi = zustandStore.KeyStore((state) => state.secretKey);

  const [googleApiKey, setGoogleApiKey] = useState<string>("");
  const order_id = route?.params?.order_id;
  const [orderDetails, setOrderDetails] = useState<OrderDetailsData | null>(
    null
  );
  const [customer_details, setCustomerDetails] = useState<any>(null);
  const [driver_details, setDriverDetails] = useState<any>(null);

  const [driverLocation, setDriverLocation] = useState({
    latitude: 0,
    longitude: 0,
    heading: 0,
  });
  const [markersReady, setMarkersReady] = useState(false);

  const onPressChat = () => {
    navigation.navigate(ScreenNames.chat, {
      driver_id: driver_details?.id,
      customer_id: customer_details?.customer_id,
    });
  };
  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {ScreenNames.driverTracking}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  // -------------------------API Calling----------------------------
  // handleOrderDetailsApi
  const handleOrderDetailsApi = async (showLoader: boolean) => {
    const dictData = {
      order_id: order_id,
    };
    try {
      const response = await orderDetailsApi(dictData, navigation, showLoader);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("ORDER DETAILS RESPONSE===>", JSON.stringify(response));
        if (response.code === statusCodes.success) {
          const rawData = response.data as OrderDetailsData;
          setOrderDetails(rawData);
          setCustomerDetails(rawData?.delivery_details);
          setDriverDetails(rawData?.driver_details);
          setDriverLocation({
            latitude: Number(rawData?.driver_details?.latitude),
            longitude: Number(rawData?.driver_details?.longitude),
            heading: Number(rawData?.driver_details?.heading),
          });
        } else if (response.code === statusCodes.invaildOrFail) {
          setOrderDetails(null);
        } else if (response.code === statusCodes.emptyData) {
          setOrderDetails(null);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
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

  useEffect(() => {
    const interval = setInterval(() => {
      handleOrderDetailsApi(false);
    }, 10000);

    return () => clearInterval(interval);
  }, [order_id]);

  useEffect(() => {
    const timer = setTimeout(() => setMarkersReady(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await handleSecretKeyApi(); 
        await handleOrderDetailsApi(true); 
      };

      fetchData();
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );
  return (
    <DriverTrackingComponent
      driver_details={driver_details}
      customer_details={customer_details}
      onPressChat={onPressChat}
      googleApiKey={googleApiKey}
      driverLocation={driverLocation}
      markersReady={markersReady}
    />
  );
};

export default DriverTrackingContainer;
