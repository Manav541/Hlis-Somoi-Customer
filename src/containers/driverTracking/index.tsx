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
  TrackingData,
} from "../../constants/interfaces";
import { flashMessageWarning } from "../../constants/GConstant";
import MapView from "react-native-maps";
import { MapDirectionsResponse } from "react-native-maps-directions";
import LocationManager from "../../constants/utils/LocationManager";

const DriverTrackingContainer = ({ navigation, route }: any) => {
  // API zustand store
  const deliveryBoyLocationApi = zustandStore.MyOrdersStore(
    (state) => state.deliveryBoyLocation
  );
  const secretKeyApi = zustandStore.KeyStore((state) => state.secretKey);

  const [googleApiKey, setGoogleApiKey] = useState<string>("");
  const order_id = route?.params?.order_id;
  const [trackingDetails, setTrackingDetails] = useState<TrackingData | null>(
    null
  );
  const [routeCoordinates, setRouteCoordinates] = useState<CoordinatesType[]>(
    []
  );
  const [region, setRegion] = useState<RegionType | undefined>(undefined);
  const mapRef = useRef<MapView | null>(null);
  const [markersReady, setMarkersReady] = useState(false);

  const handleOnReadyDirections = async (result: MapDirectionsResponse) => {
    setRouteCoordinates(result.coordinates);
  };

  const onPressChat = () => {
    navigation.navigate(ScreenNames.chat, {
      driver_id: trackingDetails?.driver_id,
      customer_id: trackingDetails?.customer_id,
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

  // -------------------------API Calling----------------------------
  // handleDeliveryBoyLocationApi
  const handleDeliveryBoyLocationApi = async () => {
    const dictData = {
      order_id: order_id,
    };
    try {
      const response = await deliveryBoyLocationApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "DELIVERY BOY LOCATION RESPONSE===>",
            JSON.stringify(response)
          );
        if (response.code === statusCodes.success) {
          const trackingData = response.data as TrackingData;
          setTrackingDetails(trackingData);
          if (mapRef?.current && Number(trackingData?.driver_heading) !== 0) {
            mapRef.current.animateCamera(
              {
                center: {
                  latitude: Number(trackingData?.driver_latitude),
                  longitude: Number(trackingData?.driver_longitude),
                },
                heading: Number(trackingData?.driver_heading),
                pitch: 35,
                zoom: 17,
              },
              { duration: 1000 } // Animation duration in milliseconds
            );
          }
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
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
    let intervalId: NodeJS.Timeout;

    const checkPermissionsAndTrackLocation = async () => {
      __DEV__ && console.log("Checking Location Permissions...");
      const permissions = await LocationManager.ensureLocationPermission();
      if (permissions) {
        __DEV__ &&
          console.log(
            "Location Permissions are granted. Proceed to track location..."
          );

        handleDeliveryBoyLocationApi();
      } else {
        __DEV__ && console.log("Permissions not granted!!");
      }
    };
    checkPermissionsAndTrackLocation();
    intervalId = setInterval(checkPermissionsAndTrackLocation, 10000);

    return () => {
      clearInterval(intervalId);
    };
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
      // Tracking
      region={region}
      mapRef={mapRef}
      markersReady={markersReady}
      trackingDetails={trackingDetails}
      routeCoordinates={routeCoordinates}
      handleOnReadyDirections={handleOnReadyDirections}
      googleApiKey={googleApiKey}
    />
  );
};

export default DriverTrackingContainer;
