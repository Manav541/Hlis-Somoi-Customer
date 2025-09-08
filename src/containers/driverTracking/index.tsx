import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import GlobalBackButton from "../../global/GlobalBackButton";
import { constnatStyles } from "../../constants/Styles";
import { ScreenNames } from "../../routers";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";
import {
  CoordinatesType,
  SecretKeyItem,
  TrackingData,
} from "../../constants/interfaces";
import { flashMessageWarning } from "../../constants/GConstant";
import MapView from "react-native-maps";
import { MapDirectionsResponse } from "react-native-maps-directions";
import DriverTrackingComponent from "../../components/driverTracking";
import LocationManager from "../../constants/utils/LocationManager";

// Custom debounce function
const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
  let timeout: NodeJS.Timeout | null = null;
  let isFirstCall = true;

  const debounced = (...args: Parameters<T>) => {
    if (isFirstCall) {
      // Execute immediately for the first call
      func(...args);
      isFirstCall = false;
      return;
    }

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, wait);
  };

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

const DriverTrackingContainer = ({ navigation, route }: any) => {
  // Zustand Store
  const driverTrackApi = zustandStore.MyOrdersStore(
    (state) => state.deliveryBoyLocation
  );
  const secretKeyApi = zustandStore.KeyStore((state) => state.secretKey);

  const [googleApiKey, setGoogleApiKey] = useState<string>("");
  const [driverLatitude, setDriverLatitude] = useState<number>(0);
  const [driverLongitude, setDriverLongitude] = useState<number>(0);
  const [vendorLatitude, setVendorLatitude] = useState<number>(0);
  const [vendorLongitude, setVendorLongitude] = useState<number>(0);
  const [driverHeading, setDriverHeading] = useState<number>(0);
  const mapRef = useRef<MapView | null>(null);
  const [markersReady, setMarkersReady] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState<CoordinatesType[]>(
    []
  );
  const [isTracking, setIsTracking] = useState(true);
  const [isMapReady, setIsMapReady] = useState(false);

  // Route params
  const routeData = route?.params;
  const order_id = routeData?.order_id;
  const driver_id = routeData?.driver_id;
  const driverProfileImage = routeData?.driverProfileImage;
  const driverName = routeData?.driverName;
  const customer_id = routeData?.customer_id;
  const customerName = routeData?.customerName || '';
  const customerAddress = routeData?.customerAddress;
  const customerLatitude = routeData?.customerLatitude;
  const customerLongitude = routeData?.customerLongitude;

  const onPressChat = () => {
    navigation.navigate(ScreenNames.chat, {
      driver_id: driver_id,
      customer_id: customer_id,
    });
  };

  const handleOnReadyDirections = (result: MapDirectionsResponse) => {
    __DEV__ && console.log("Route Coordinates:", result?.coordinates);
    setRouteCoordinates(result?.coordinates || []);
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

  // API to fetch Google API key
  const handleSecretKeyApi = async () => {
    try {
      const response = await secretKeyApi({}, navigation);
      if (
        response?.code === statusCodes.success &&
        Array.isArray(response.data)
      ) {
        const keysData = response.data as SecretKeyItem[];
        const googleKey = keysData.find((item) => item.name === "googleApiKey");
        if (googleKey?.keys) setGoogleApiKey(googleKey.keys);
      } else if (response?.code === statusCodes.invaildOrFail) {
        flashMessageWarning(response.message);
      }
    } catch (error) {
      __DEV__ && console.log("Secret Key API Error:", error);
    }
  };

  // Validate coordinates
  const isValidCoordinate = (value: any) =>
    typeof value === "number" && !isNaN(value) && value !== 0;

  // Debounced driver location update
  const handleDriverLocation = debounce(async () => {
    const dictData = { order_id };
    try {
      const response = await driverTrackApi(dictData, navigation);
      if (response?.code === statusCodes.success) {
        const driverData = response.data as TrackingData;
        const newLat = Number(driverData?.driver_latitude);
        const newLon = Number(driverData?.driver_longitude);
        const newHeading = Number(driverData?.driver_heading);
        const newVendorLat = Number(driverData?.vendor_latitude);
        const newVendorLon = Number(driverData?.vendor_longitude);

        // Only update state if coordinates are valid
        if (isValidCoordinate(newLat) && isValidCoordinate(newLon)) {
          setDriverLatitude(newLat);
          setDriverLongitude(newLon);
          setDriverHeading(newHeading || 0);
          setVendorLatitude(newVendorLat || 0);
          setVendorLongitude(newVendorLon || 0);

          // Update map camera only if significant change
          if (mapRef.current && newHeading !== 0) {
            mapRef.current.animateCamera(
              {
                center: {
                  latitude: newLat,
                  longitude: newLon,
                },
                heading: newHeading,
                pitch: 35,
                zoom: 17,
              },
              { duration: 1000 }
            );
          }
        }
      } else if (response?.code === statusCodes.invaildOrFail) {
        flashMessageWarning(response.message);
      }
    } catch (error) {
      __DEV__ && console.log("Driver Location API Error:", error);
    }
  }, 10000); // Debounce for 10 seconds, but first call is immediate

  // Set header and fetch API key and initial driver location on mount
  useEffect(() => {
    header();
    (async () => {
      await handleSecretKeyApi();
      setIsTracking(true);
      handleDriverLocation(); // Trigger initial API call immediately
    })();
  }, []);

  // Start tracking driver location
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const startTracking = async () => {
      const hasPermission = await LocationManager.ensureLocationPermission();
      if (!hasPermission || !isTracking) return;

      interval = setInterval(() => {
        handleDriverLocation();
      }, 12000); // Slightly longer than debounce to avoid overlap
    };

    startTracking();

    return () => {
      handleDriverLocation.cancel(); // Cancel debounced function
      if (interval) clearInterval(interval);
    };
  }, [isTracking]);

  // Restrict marker blinking
  useEffect(() => {
    const timer = setTimeout(() => setMarkersReady(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Set map ready when all coordinates and API key are available
  useEffect(() => {
    if (
      googleApiKey &&
      isValidCoordinate(driverLatitude) &&
      isValidCoordinate(driverLongitude) &&
      isValidCoordinate(customerLatitude) &&
      isValidCoordinate(customerLongitude)
    ) {
      setIsMapReady(true);
    }
  }, [googleApiKey, driverLatitude, driverLongitude, customerLatitude, customerLongitude]);

  return (
    <DriverTrackingComponent
      driverProfileImage={driverProfileImage}
      driverName={driverName}
      customerName={customerName}
      customerAddress={customerAddress}
      customerLatitude={customerLatitude}
      customerLongitude={customerLongitude}
      mapRef={mapRef}
      markersReady={markersReady}
      googleApiKey={googleApiKey}
      driverLatitude={driverLatitude}
      driverLongitude={driverLongitude}
      driverHeading={driverHeading}
      vendorLatitude={vendorLatitude}
      vendorLongitude={vendorLongitude}
      onPressChat={onPressChat}
      routeCoordinates={routeCoordinates}
      handleOnReadyDirections={handleOnReadyDirections}
      isMapReady={isMapReady}
    />
  );
};

export default DriverTrackingContainer;