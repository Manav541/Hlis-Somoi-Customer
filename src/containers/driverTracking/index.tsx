import { Text, StatusBar } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import DriverTrackingComponent from "../../components/driverTracking";
import GlobalBackButton from "../../global/GlobalBackButton";
import { useFocusEffect } from "@react-navigation/native";
import { ScreenNames } from "../../routers";
import { constnatStyles } from "../../constants/Styles";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";
import {
  CoordinatesType,
  OrderDetailsData,
  RegionType,
  SecretKeyItem,
} from "../../constants/interfaces";
import { flashMessageWarning } from "../../constants/GConstant";
import MapView from "react-native-maps";
import { MapDirectionsResponse } from "react-native-maps-directions";
import LocationManager from "../../constants/utils/LocationManager";

const DriverTrackingContainer = ({ navigation, route }: any) => {
  const orderDetailsApi = zustandStore.MyOrdersStore(
    (state) => state.orderDetails
  );
  const secretKeyApi = zustandStore.KeyStore((state) => state.secretKey);

  const [googleApiKey, setGoogleApiKey] = useState<string>("");
  const order_id = route?.params?.order_id;
  const [orderDetails, setOrderDetails] = useState<OrderDetailsData | null>(
    null
  );
  const [routeCoordinates, setRouteCoordinates] = useState<CoordinatesType[]>(
    []
  );
  const [region, setRegion] = useState<RegionType | undefined>(undefined);
  const mapRef = useRef<MapView | null>(null);
  const [markersReady, setMarkersReady] = useState(false);
  const lastLatLngRef = useRef<{ lat: number; lng: number } | null>(null);
  const isUpdatingRef = useRef(false);

  const isValidCoordinate = (lat: any, lng: any) =>
    typeof lat === "number" &&
    typeof lng === "number" &&
    !isNaN(lat) &&
    !isNaN(lng);

  const handleOnReadyDirections = async (result: MapDirectionsResponse) => {
    if (
      Array.isArray(result?.coordinates) &&
      result.coordinates.length > 0 &&
      result.coordinates.every((coord) =>
        isValidCoordinate(coord.latitude, coord.longitude)
      )
    ) {
      setRouteCoordinates(result.coordinates);
    } else {
      console.log("Invalid route data. Skipping polyline update.");
    }
  };

  const onPressChat = () => {
    navigation.navigate(ScreenNames.chat, {
      driver_id: orderDetails?.driver_details?.id,
      customer_id: orderDetails?.delivery_details?.customer_id,
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
    handleSecretKeyApi();
  }, []);

  const handleOrderDetailsApi = async (showLoader: boolean) => {
    const dictData = {
      order_id: order_id,
    };
    try {
      const response = await orderDetailsApi(dictData, navigation, showLoader);
      if (response?.code === statusCodes.success) {
        const rawData = response.data as OrderDetailsData;
        setOrderDetails(rawData);

        const driverLat = Number(rawData?.driver_details?.latitude);
        const driverLng = Number(rawData?.driver_details?.longitude);

        if (
          isValidCoordinate(driverLat, driverLng) &&
          (lastLatLngRef.current?.lat !== driverLat ||
            lastLatLngRef.current?.lng !== driverLng)
        ) {
          lastLatLngRef.current = { lat: driverLat, lng: driverLng };
          const newRegion = {
            latitude: driverLat,
            longitude: driverLng,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          };
          setRegion(newRegion);

          mapRef.current?.animateToRegion(newRegion, 1000);
        }
      } else {
        setOrderDetails(null);
      }
    } catch (error) {
      __DEV__ && console.log("Order Details Error:", error);
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
          if (item.name === "googleApiKey" && item.keys) {
            setGoogleApiKey(item.keys);
          }
        });
      } else {
        flashMessageWarning(response?.message);
      }
    } catch (error) {
      __DEV__ && console.log("Secret Key API Error:", error);
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkPermissionsAndTrackLocation = async () => {
      const permissions = await LocationManager.ensureLocationPermission();
      if (permissions) {
        handleOrderDetailsApi(false);
      }
    };

    checkPermissionsAndTrackLocation();
    intervalId = setInterval(checkPermissionsAndTrackLocation, 10000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMarkersReady(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <DriverTrackingComponent
      onPressChat={onPressChat}
      region={region}
      mapRef={mapRef}
      markersReady={markersReady}
      orderDetails={orderDetails}
      routeCoordinates={routeCoordinates}
      handleOnReadyDirections={handleOnReadyDirections}
      googleApiKey={googleApiKey}
    />
  );
};

export default DriverTrackingContainer;
