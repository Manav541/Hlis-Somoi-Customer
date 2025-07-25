import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { RefObject, useCallback, useMemo } from "react";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { PlatformVersion } from "../../constants/utils/Platform";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";
import { colors } from "../../constants/Colors";
import MapView, { Marker, Polyline } from "react-native-maps";
import {
  CoordinatesType,
  RegionType,
  TrackingData,
} from "../../constants/interfaces";
import MapViewDirections, {
  MapDirectionsResponse,
} from "react-native-maps-directions";

interface PropsType {
  onPressChat: () => void;
  // Tracking
  region: RegionType | undefined;
  mapRef: RefObject<MapView | null>;
  markersReady: boolean;
  trackingDetails: TrackingData | null;
  routeCoordinates: CoordinatesType[];
  handleOnReadyDirections: (result: MapDirectionsResponse) => void;
  googleApiKey: string;
}

const DriverTrackingComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  
  // const PathDraw = useCallback(() => {
  //   console.log("props changes")
  //   return (

  //     )
  //   );
  // }, [props?.trackingDetails]);
  const {
    driver_latitude,
    driver_longitude,
    customer_latitude,
    customer_longitude,
  } = props?.trackingDetails || {};

  const driverLat = Number(props.trackingDetails?.driver_latitude);
const driverLng = Number(props.trackingDetails?.driver_longitude);
const customerLat = Number(props.trackingDetails?.customer_latitude);
const customerLng = Number(props.trackingDetails?.customer_longitude);

const isValidCoordinate = (lat: number, lng: number) =>
  typeof lat === "number" &&
  typeof lng === "number" &&
  !isNaN(lat) &&
  Math.abs(lat) <= 90 &&
  Math.abs(lng) <= 180;

const shouldRenderDirections =
  isValidCoordinate(driverLat, driverLng) &&
  isValidCoordinate(customerLat, customerLng) &&
  !(driverLat === customerLat && driverLng === customerLng);


  const directionPath = useMemo(() => {
  if (!shouldRenderDirections || !props.googleApiKey) return null;

  return (
    <MapViewDirections
      key={`${driverLat}-${driverLng}-${customerLat}-${customerLng}`} // Only when safe
      origin={{ latitude: driverLat, longitude: driverLng }}
      destination={{ latitude: customerLat, longitude: customerLng }}
      apikey={props.googleApiKey}
      strokeWidth={3}
      strokeColor="#000"
      region="IN"
      mode="DRIVING"
      onReady={props.handleOnReadyDirections}
      onError={(errorMessage) => {
        if (__DEV__) {
          console.warn("MapViewDirections error:", errorMessage);
        }
      }}
    />
  );
}, [
  driverLat,
  driverLng,
  customerLat,
  customerLng,
  props.googleApiKey,
  props.handleOnReadyDirections,
  shouldRenderDirections,
]);


  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={props?.mapRef}
        style={{ flex: 1 }}
        provider="google"
        showsUserLocation={false}
        showsMyLocationButton={false}
        minZoomLevel={10}
        maxZoomLevel={20}
        initialRegion={{
          latitude: 23.076,
          longitude: 72.5265,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Driver Marker */}
        {props?.trackingDetails != null &&
          props?.trackingDetails?.driver_latitude != null &&
          props?.trackingDetails?.driver_longitude != null && (
            <Marker
              coordinate={{
                latitude: Number(props?.trackingDetails?.driver_latitude),
                longitude: Number(props?.trackingDetails?.driver_longitude),
              }}
              rotation={Number(props?.trackingDetails?.driver_heading)}
              flat={true}
              anchor={{ x: 0.5, y: 0.5 }}
              tracksViewChanges={!props?.markersReady}
            >
              <Image
                source={images.vehicleIcon}
                style={styles.imgDriverMarker}
              />
            </Marker>
          )}
        {/* Customer Marker */}
        {props?.trackingDetails != null &&
          props?.trackingDetails?.customer_latitude != null &&
          props?.trackingDetails?.customer_longitude != null && (
            <Marker
              coordinate={{
                latitude: Number(props?.trackingDetails?.customer_latitude),
                longitude: Number(props?.trackingDetails?.customer_longitude),
              }}
              tracksViewChanges={!props?.markersReady}
            >
              <View style={styles.vwDestinationMarker}>
                <Image
                  source={images.customerMarker}
                  style={styles.imgDestinationMarker}
                />
              </View>
            </Marker>
          )}
        {shouldRenderDirections && directionPath}

        {/* Restrict Path Blinking */}
        <Polyline
          coordinates={props?.routeCoordinates}
          strokeColor={colors.black35}
          strokeColors={[colors.black35]}
          strokeWidth={3}
        />
      </MapView>

      {/* Driver Info Section */}
      <View
        style={{
          ...styles.vwDriverDetails,
          paddingBottom: PlatformVersion.isIOS ? insets.bottom + 20 : 20,
        }}
      >
        <Text style={styles.lblDriverInfo}>{getTranslation("driverInfo")}</Text>
        <View style={styles.vwDriverInfo}>
          <FastImage
            style={styles.imgDriverProfile}
            source={{ uri: props?.trackingDetails?.driver_image }}
            resizeMode="stretch"
          />
          <Text style={styles.lblDriverName}>
            {props?.trackingDetails?.driver_name}
          </Text>
          <TouchableOpacity
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={props?.onPressChat}
          >
            <Image
              style={styles.imgChat}
              source={images.chatIcon}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.lblDriverInfo}>
          {getTranslation("deliverto") +
            " " +
            props?.trackingDetails?.customer_name}
        </Text>
        <Text style={styles.lblDeliverToAddress}>
          {props?.trackingDetails?.customer_address}
        </Text>
      </View>
    </View>
  );
};

export default DriverTrackingComponent;
