import {View, Image, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {images} from '../../constants/Images';
import {styles} from './styles';

interface PropsType {
  style?: StyleProp<ViewStyle>;
}

const GlobalLogoTitle = (props: PropsType) => {
  return (
    <View style={[styles.vwMain, props.style]}>
      <Image source={images.logoTitle1} style={styles.img} />
    </View>
  );
};

export default GlobalLogoTitle;
