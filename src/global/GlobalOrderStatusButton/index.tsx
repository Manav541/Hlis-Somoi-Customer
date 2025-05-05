import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors} from '../../constants/Colors';
import {activityOpacity} from '../../constants/GConstant';
import {styles} from './styles';

interface PropsType {
  image: ImageSourcePropType;
  title: string | null;
  isGreen?: boolean;
  isOrange?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

const GlobalOrderStatusButton = (props: PropsType) => {
  return (
    <TouchableOpacity
      activeOpacity={activityOpacity}
      disabled={props.disabled}
      onPress={props.onPress}
      style={[
        styles.vwMain,
        {
          backgroundColor: props.isGreen
            ? colors.green4f
            : props.isOrange
            ? colors.orange1c
            : colors.red2e,
        },
      ]}>
      <Image source={props.image} style={styles.img} />
      <Text
        style={[
          styles.lblTitle,
          {color: props.isOrange ? colors.blue4e : colors.white},
        ]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default GlobalOrderStatusButton;
