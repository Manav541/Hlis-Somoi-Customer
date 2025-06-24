import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {activityOpacity} from '../../constants/GConstant';
import {styles} from './styles';
import {colors} from '../../constants/Colors';
import {fontsfamily} from '../../constants/FontFamily';

interface PropsType {
  onPress: (() => void) | undefined;
  title: string | null;
  isOrange?: boolean;
  isTransparentWithBorder?: boolean;
  isOrangeWithBorder?: boolean;
  flex?: number;
  isWhite? : boolean;
  disabled?:boolean;
}

const GlobalButton = (props: PropsType) => {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        {
          backgroundColor: props.isOrange
            ? colors.orange1c
            : props.isOrangeWithBorder
            ? 'transaprent'
            : props?.isWhite ? colors.whiteff : colors.blue4e ,
          borderWidth:
            props.isTransparentWithBorder || props.isOrangeWithBorder ? 1 : 0,
          borderColor: props.isTransparentWithBorder
            ? colors.white
            : props.isOrangeWithBorder
            ? colors.orange1c
            : 'transparent',
          flex: props.flex,
          
        },
      ]}
      onPress={props.onPress}
      activeOpacity={activityOpacity}
      disabled={props?.disabled}>
      <Text
        style={[
          styles.title,
          {
            color: props.isOrange || props.isWhite
              ? colors.blue4e
              : props.isOrangeWithBorder
              ? colors.orange1c
              : colors.white,
            fontFamily: props.isTransparentWithBorder
              ? fontsfamily.semibold
              : fontsfamily.bold,
          },
        ]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default GlobalButton;
