import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { PlatformVersion } from "../../constants/utils/Platform";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PropsType {
  driverProfile: any;
  driverName: string;
  delivertoName: string;
  delivertoAddress: string;
  onPressChat: () => void;
}

const DriverTrackingComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets()
  return (
    <ImageBackground style={styles.imgMap} source={images.map}>
      <Image style={styles.imgMapDirections} source={images.mapDirection} />
      <View style={{...styles.vwDriverDetails,
        paddingBottom: PlatformVersion.isIOS ? insets.bottom + 20 : 20
      }}>
        <Text style={styles.lblDriverInfo}>{getTranslation("driverInfo")}</Text>
        <View style={styles.vwDriverInfo}>
          <Image
            style={styles.imgDriverProfile}
            source={images.driverProfile}
          />
          <Text style={styles.lblDriverName}>{props?.driverName}</Text>
          <TouchableOpacity
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={props?.onPressChat}
          >
            <Image style={styles.imgChat} source={images.chatIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.lblDriverInfo}>
          {getTranslation("deliverto") + " " + props?.delivertoName}
        </Text>
        <Text style={styles.lblDeliverToAddress}>
          {props?.delivertoAddress}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default DriverTrackingComponent;
