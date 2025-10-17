import { Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import GlobalBackButton from "../../global/GlobalBackButton";
import { constnatStyles } from "../../constants/Styles";
import { ScreenNames } from "../../routers";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";
import {
  CoordinatesType,
  DeliveryTrackingResponse,
} from "../../constants/interfaces";
import { flashMessageWarning } from "../../constants/GConstant";
import MapView from "react-native-maps";
import DriverTrackingComponent from "../../components/driverTracking";
import LocationManager from "../../constants/utils/LocationManager";
import { decode } from "@mapbox/polyline";

// Custom debounce function
const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
) => {
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
  const getDriverDirectionsApi = zustandStore.MyOrdersStore(
    (state) => state.getDriverDirections
  );

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
  const customerName = routeData?.customerName || "";
  const customerAddress = routeData?.customerAddress;
  const customerLatitude = routeData?.customerLatitude;
  const customerLongitude = routeData?.customerLongitude;

  const onPressChat = () => {
    navigation.navigate(ScreenNames.chat, {
      driver_id: driver_id,
      customer_id: customer_id,
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

  // Validate coordinates
  const isValidCoordinate = (value: any) =>
    typeof value === "number" && !isNaN(value) && value !== 0;

  // Debounced driver location update
  const handleGetDriverDirectionsApi = debounce(async () => {
    const dictData = {
      order_id: order_id,
      type: "customer",
    };
    try {
      const response = await getDriverDirectionsApi(dictData, navigation);
      if (response?.code === statusCodes.success) {
        __DEV__ &&
          console.log("Get Driver Directions API Response:", response.data);
        const locationData = response.data as DeliveryTrackingResponse;

        // Decode polyline for route coordinates
        const points = decode(locationData?.route?.encoded_polyline);
        const decodedCoordinates = points.map((point: any) => ({
          latitude: point[0],
          longitude: point[1],
        }));
        setRouteCoordinates(decodedCoordinates);
        // Update driver and vendor coordinates
        const newLat = Number(locationData?.driver_location?.latitude);
        const newLon = Number(locationData?.driver_location?.longitude);
        const newHeading = Number(locationData?.driver_location?.heading);
        const newVendorLat = Number(locationData?.vendor_location?.latitude);
        const newVendorLon = Number(locationData?.vendor_location?.longitude);

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
  }, 10000);

  // Set header and fetch API key and initial driver location on mount
  useEffect(() => {
    header();
    (async () => {
      setIsTracking(true);
      handleGetDriverDirectionsApi(); // Trigger initial API call immediately
    })();
  }, []);

  // Start tracking driver location
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const startTracking = async () => {
      const hasPermission = await LocationManager.ensureLocationPermission();
      if (!hasPermission || !isTracking) return;

      interval = setInterval(() => {
        handleGetDriverDirectionsApi();
      }, 12000); // Slightly longer than debounce to avoid overlap
    };

    startTracking();

    return () => {
      handleGetDriverDirectionsApi.cancel(); // Cancel debounced function
      if (interval) clearInterval(interval);
    };
  }, [isTracking]);

  // // Restrict marker blinking
  useEffect(() => {
    const timer = setTimeout(() => setMarkersReady(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Set map ready when all coordinates and API key are available
  useEffect(() => {
    if (
      isValidCoordinate(driverLatitude) &&
      isValidCoordinate(driverLongitude) &&
      isValidCoordinate(customerLatitude) &&
      isValidCoordinate(customerLongitude)
    ) {
      setIsMapReady(true);
    }
  }, [driverLatitude, driverLongitude, customerLatitude, customerLongitude]);

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
      driverLatitude={driverLatitude}
      driverLongitude={driverLongitude}
      driverHeading={driverHeading}
      vendorLatitude={vendorLatitude}
      vendorLongitude={vendorLongitude}
      onPressChat={onPressChat}
      routeCoordinates={routeCoordinates}
      isMapReady={isMapReady}
    />
  );
};

export default DriverTrackingContainer;
