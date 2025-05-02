import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { activityOpacity, hitSlop } from "../../constants/GConstant";

interface PropsType {
  onPress: () => void;
}

const GlobalBackButton = (props: PropsType) => {
  return (
    <TouchableOpacity
      activeOpacity={activityOpacity}
      hitSlop={hitSlop}
      style={{ marginLeft: 16 }}
      onPress={props.onPress}
    >
      <Image style={styles.img} source={images.backarrow} />
    </TouchableOpacity>
  );
};

export default GlobalBackButton;
