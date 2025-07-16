import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import React, { RefObject } from "react";
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
  OrderDetailsData,
  RegionType,
} from "../../constants/interfaces";
import MapViewDirections, {
  MapDirectionsResponse,
} from "react-native-maps-directions";

interface PropsType {
  onPressChat: () => void;
  region: RegionType | undefined;
  mapRef: RefObject<MapView | null>;
  markersReady: boolean;
  orderDetails: OrderDetailsData | null;
  routeCoordinates: CoordinatesType[];
  handleOnReadyDirections: (result: MapDirectionsResponse) => void;
  googleApiKey: string;
}

const isValidCoordinate = (lat: any, lng: any) =>
  typeof lat === "number" &&
  typeof lng === "number" &&
  !isNaN(lat) &&
  !isNaN(lng);

const DriverTrackingComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  const driverLat = Number(props?.orderDetails?.driver_details?.latitude);
  const driverLng = Number(props?.orderDetails?.driver_details?.longitude);
  const customerLat = Number(props?.orderDetails?.delivery_details?.latitude);
  const customerLng = Number(props?.orderDetails?.delivery_details?.longitude);

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
        region={props?.region}
      >
        {props?.orderDetails && isValidCoordinate(driverLat, driverLng) && (
          <Marker
            coordinate={{ latitude: driverLat, longitude: driverLng }}
            rotation={Number(props?.orderDetails?.driver_details?.heading)}
            flat
            anchor={{ x: 0.5, y: 0.5 }}
            tracksViewChanges={!props?.markersReady}
          >
            <Image source={images.vehicleIcon} style={styles.imgDriverMarker} />
          </Marker>
        )}

        {props?.orderDetails && isValidCoordinate(customerLat, customerLng) && (
          <Marker
            coordinate={{ latitude: customerLat, longitude: customerLng }}
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

        {props.googleApiKey &&
          props?.orderDetails &&
          isValidCoordinate(driverLat, driverLng) &&
          isValidCoordinate(customerLat, customerLng) && (
            <MapViewDirections
              origin={{ latitude: driverLat, longitude: driverLng }}
              destination={{ latitude: customerLat, longitude: customerLng }}
              apikey={props.googleApiKey}
              strokeWidth={3}
              strokeColor={colors.black35}
              mode="DRIVING"
              onError={(errorMessage) => {
                __DEV__ &&
                  console.log("MapViewDirections ERROR: ", errorMessage);

                // Prevent crashing when receiving error
                if (
                  errorMessage.includes("NOT_FOUND") ||
                  errorMessage.includes("ZERO_RESULTS") ||
                  errorMessage.includes("invalid")
                ) {
                  // Optional: suppress directions temporarily
                }
              }}
              onReady={props?.handleOnReadyDirections}
            />
          )}

        {false && (
  <Polyline
    coordinates={props?.routeCoordinates}
    strokeColor={colors.black35}
    strokeWidth={3}
  />
)}
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
            source={{ uri: props?.orderDetails?.driver_details?.image }}
            resizeMode="stretch"
          />
          <Text style={styles.lblDriverName}>
            {props?.orderDetails?.driver_details?.name}
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
            props?.orderDetails?.delivery_details?.name}
        </Text>
        <Text style={styles.lblDeliverToAddress}>
          {props?.orderDetails?.delivery_details?.address}
        </Text>
      </View>
    </View>
  );
};

export default DriverTrackingComponent;
