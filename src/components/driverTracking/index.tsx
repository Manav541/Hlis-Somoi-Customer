import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { RefObject, useState } from "react";
import { styles } from "./styles";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections, {
  MapDirectionsResponse,
} from "react-native-maps-directions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getTranslation } from "../../localization/i18n/i18n.config";
import FastImage from "react-native-fast-image";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { colors } from "../../constants/Colors";
import { PlatformVersion } from "../../constants/utils/Platform";
import { images } from "../../constants/Images";
import { CoordinatesType } from "../../constants/interfaces";

interface PropsType {
  driverProfileImage: string;
  driverName: string;
  customerName: string;
  customerAddress: string;
  customerLatitude: number;
  customerLongitude: number;
  mapRef: RefObject<MapView | null>;
  markersReady: boolean;
  googleApiKey: string;
  driverLatitude: number;
  driverLongitude: number;
  driverHeading: number;
  vendorLatitude: number;
  vendorLongitude: number;
  onPressChat: () => void;
  routeCoordinates: CoordinatesType[];
  handleOnReadyDirections: (result: MapDirectionsResponse) => void;
  isMapReady: boolean;
}

const isValidCoordinate = (value: any) =>
  typeof value === "number" && !isNaN(value) && value !== 0;

const DriverTrackingComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  const [isMapReady, setIsMapReady] = useState(false);

  const {
    driverLatitude,
    driverLongitude,
    customerLatitude,
    customerLongitude,
    markersReady,
    mapRef,
    driverHeading,
    driverProfileImage,
    driverName,
    customerName,
    customerAddress,
    onPressChat,
    googleApiKey,
    handleOnReadyDirections,
    routeCoordinates,
  } = props;

  const canDrawPath =
    isMapReady &&
    isValidCoordinate(driverLatitude) &&
    isValidCoordinate(driverLongitude) &&
    isValidCoordinate(customerLatitude) &&
    isValidCoordinate(customerLongitude);

  return (
    <View style={styles.vwMain}>
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          ref={mapRef}
          provider="google"
          initialRegion={{
            latitude: customerLatitude || 0,
            longitude: customerLongitude || 0,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onMapReady={() => setIsMapReady(true)}
        >
          {/* Driver Marker */}
          {isValidCoordinate(driverLatitude) &&
            isValidCoordinate(driverLongitude) && (
              <Marker
                coordinate={{
                  latitude: driverLatitude,
                  longitude: driverLongitude,
                }}
                rotation={driverHeading}
                flat
                anchor={{ x: 0.5, y: 0.5 }}
                tracksViewChanges={!markersReady}
              >
                <Image
                  source={images.vehicleIcon}
                  style={styles.imgDriverMarker}
                />
              </Marker>
            )}

          {/* Customer Marker */}
          {isValidCoordinate(customerLatitude) &&
            isValidCoordinate(customerLongitude) && (
              <Marker
                coordinate={{
                  latitude: customerLatitude,
                  longitude: customerLongitude,
                }}
                tracksViewChanges={!markersReady}
              >
                <View style={styles.vwDestinationMarker}>
                  <Image
                    source={images.customerMarker}
                    style={styles.imgDestinationMarker}
                  />
                </View>
              </Marker>
            )}

          {/* Path Rendering */}
          {canDrawPath && (
            <>
              <MapViewDirections
                origin={{
                  latitude: driverLatitude,
                  longitude: driverLongitude,
                }}
                destination={{
                  latitude: customerLatitude,
                  longitude: customerLongitude,
                }}
                apikey={googleApiKey}
                strokeWidth={4}
                strokeColor={colors.black35}
                strokeColors={[colors.black35]}
                onReady={handleOnReadyDirections}
                onError={(error) => {
                  __DEV__ && console.log("Maps Directions Error ===>", error);
                }}
                mode="DRIVING"
                region="IN"
                resetOnChange={false} // Prevent resetting the route on every change
              />

              {/* Draw custom polyline */}
              {routeCoordinates.length > 0 && (
                <Polyline
                  coordinates={routeCoordinates}
                  strokeWidth={4}
                  strokeColor={colors.black35}
                  strokeColors={[colors.black35]}
                />
              )}
            </>
          )}
        </MapView>
      </View>

      {/* Bottom Driver Info Section */}
      <View
        style={[
          styles.vwBottomBlueBg,
          { paddingBottom: PlatformVersion.isIOS ? insets.bottom + 20 : 20 },
        ]}
      >
        <Text style={styles.lblDriverInfoTitle}>
          {getTranslation("driverInfo")}
        </Text>
        <View style={styles.vwDriverInfo}>
          <View style={styles.vwDriverImageName}>
            <FastImage
              style={styles.imgDriverProfile}
              source={
                driverProfileImage
                  ? { uri: driverProfileImage }
                  : images.driverProfile
              }
            />
            <Text style={styles.lblDriverName}>{driverName}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={onPressChat}
          >
            <Image
              style={styles.imgChat}
              source={images.chatIcon}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.lblDriverInfoTitle, { marginTop: 10 }]}>
          {getTranslation("deliverto") + " " + customerName}
        </Text>
        <Text style={styles.lblDeliverToAddress}>{customerAddress}</Text>
      </View>
    </View>
  );
};

export default DriverTrackingComponent;
