import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { RefObject, useCallback } from "react";
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
  const PathDraw = useCallback(() => {
    return (
      props.googleApiKey != "" &&
      props?.trackingDetails != null && (
        <MapViewDirections
          origin={{
            latitude: Number(props?.trackingDetails?.driver_latitude),
            longitude: Number(props?.trackingDetails?.driver_longitude),
          }}
          destination={{
            latitude: Number(props?.trackingDetails?.customer_latitude),
            longitude: Number(props?.trackingDetails?.customer_longitude),
          }}
          apikey={props.googleApiKey}
          strokeWidth={3}
          strokeColor={colors.black35}
          strokeColors={[colors.black35]}
          mode="DRIVING"
          onError={(error) => {
            __DEV__ && console.log("Maps Directions Error ===>", error);
          }}
          onReady={props?.handleOnReadyDirections}
        />
      )
    );
  }, [props]);

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
        {props?.trackingDetails != null && (
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
            <Image source={images.vehicleIcon} style={styles.imgDriverMarker} />
          </Marker>
        )}
        {/* Customer Marker */}
        {props?.trackingDetails != null && (
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
        <PathDraw />
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
