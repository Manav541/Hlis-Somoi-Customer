import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  StatusBar,
  Platform,
} from "react-native";
import React, { useRef } from "react";
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
  DeliveryData,
  DeliveryDetails,
  DriverDetails,
} from "../../constants/interfaces";
import MapViewDirections from "react-native-maps-directions";

interface PropsType {
  driver_details: DriverDetails;
  customer_details: DeliveryDetails;
  onPressChat: () => void;
  googleApiKey: string;
  driverLocation: { latitude: number; longitude: number; heading: number };
  markersReady: boolean;
}

const DriverTrackingComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);
  return (
    <View style={{ flex: 1 }}>
      {props?.customer_details?.latitude &&
        props?.customer_details?.longitude &&
        props?.driverLocation?.latitude !== 0 &&
        props?.driverLocation?.longitude !== 0 && (
          <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            initialRegion={{
              latitude: Number(props?.customer_details?.latitude),
              longitude: Number(props?.customer_details?.longitude),
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            provider="google"
            showsUserLocation={false}
          >
            <Marker
              coordinate={props.driverLocation}
              image={
                Platform.OS === "ios"
                  ? images.vehicleIconiOS
                  : images.vehicleIconAndroid
              }
              rotation={Number(props.driver_details.heading)}
              flat
              anchor={{ x: 0.5, y: 0.5 }}
              tracksViewChanges={!props?.markersReady}
            />

            <Marker
              coordinate={{
                latitude: Number(props.customer_details.latitude),
                longitude: Number(props.customer_details.longitude),
              }}
            >
              <Image
                source={images.customerMarker}
                style={styles.imgCustomerMarker}
                resizeMode="stretch"
              />
            </Marker>

            {props.googleApiKey && (
              <MapViewDirections
                origin={{
                  latitude: Number(props.driver_details.latitude),
                  longitude: Number(props.driver_details.longitude),
                }}
                destination={{
                  latitude: Number(props.customer_details.latitude),
                  longitude: Number(props.customer_details.longitude),
                }}
                apikey={props.googleApiKey}
                strokeWidth={4}
                strokeColor={colors.black}
                optimizeWaypoints={true}
                onError={(err) => {
                  console.log("Directions Error:", err);
                }}
              />
            )}
          </MapView>
        )}
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
            source={{ uri: props?.driver_details?.image }}
            resizeMode="stretch"
          />
          <Text style={styles.lblDriverName}>
            {props?.driver_details?.name}
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
          {getTranslation("deliverto") + " " + props?.customer_details?.name}
        </Text>
        <Text style={styles.lblDeliverToAddress}>
          {props?.customer_details?.address}
        </Text>
      </View>
    </View>
  );
};

export default DriverTrackingComponent;
