import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { activityOpacity, hitSlop } from "../../constants/GConstant";

interface PropsType {
  onPress: () => void;
  isRight?: boolean;
  rightImage?: ImageSourcePropType;
  isWhite?: boolean;
  style?: StyleProp<ImageStyle>;
}

const GlobalBackButton = (props: PropsType) => {
  return (
    <TouchableOpacity
      activeOpacity={activityOpacity}
      hitSlop={hitSlop}
      onPress={props.onPress}
      style={{
        // marginLeft: props.isRight ? 0 : 16,
        marginRight: props.isRight ? 16 : 0,
      }}
    >
      <Image
        style={[styles.img, props?.style]}
        source={
          props.isRight
            ? props.rightImage
            : props?.isWhite
            ? images.backarrowWhite
            : images.backarrow
        }
      />
    </TouchableOpacity>
  );
};

export default GlobalBackButton;
