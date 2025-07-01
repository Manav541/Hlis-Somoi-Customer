import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  StatusBar,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { PlatformVersion } from "../../constants/utils/Platform";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";
import { colors } from "../../constants/Colors";
import MapView, { Marker } from "react-native-maps";
import {
  DeliveryData,
  DeliveryDetails,
  DriverDetails,
} from "../../constants/interfaces";

interface PropsType {
  driver_details: DriverDetails;
  customer_details: DeliveryDetails;
  onPressChat: () => void;
}

const DriverTrackingComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 23.075434658074716,
          longitude: 72.52564540995715,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: 23.07, longitude: 72.52 }}>
          <Image
            source={images.driverMarker}
            style={styles.imgDriverMarker}
            resizeMode="center"
          />
        </Marker>
        <Marker
          coordinate={{
            latitude: Number(props?.customer_details?.latitude),
            longitude: Number(props?.customer_details?.longitude),
          }}
        >
          <Image
            source={images.customerMarker}
            style={styles.imgCustomerMarker}
            resizeMode="stretch"
          />
        </Marker>
      </MapView>
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

// <ImageBackground style={styles.imgMap} source={images.map}>
//   <StatusBar
//     translucent={false}
//     backgroundColor={colors.orange1c}
//     barStyle={"dark-content"}
//   />
//   <Image style={styles.imgMapDirections} source={images.mapDirection} />
//   <View
//     style={{
//       ...styles.vwDriverDetails,
//       paddingBottom: PlatformVersion.isIOS ? insets.bottom + 20 : 20,
//     }}
//   >
//     <Text style={styles.lblDriverInfo}>{getTranslation("driverInfo")}</Text>
//     <View style={styles.vwDriverInfo}>
//       <FastImage
//         style={styles.imgDriverProfile}
//         source={{ uri: props?.driverProfile }}
//         resizeMode="stretch"
//       />
//       <Text style={styles.lblDriverName}>{props?.driverName}</Text>
//       <TouchableOpacity
//         activeOpacity={activityOpacity}
//         hitSlop={hitSlop}
//         onPress={props?.onPressChat}
//       >
//         <Image
//           style={styles.imgChat}
//           source={images.chatIcon}
//           resizeMode="stretch"
//         />
//       </TouchableOpacity>
//     </View>
//     <Text style={styles.lblDriverInfo}>
//       {getTranslation("deliverto") + " " + props?.delivertoName}
//     </Text>
//     <Text style={styles.lblDeliverToAddress}>
//       {props?.delivertoAddress}
//     </Text>
//   </View>
// </ImageBackground>
