import {View, Image} from 'react-native';
import React from 'react';
import {images} from '../../constants/Images';
import {styles} from './styles';

const GlobalLogoTitle = () => {
  return (
    <View style={styles.vwMain}>
      <Image source={images.logoTitle} style={styles.img} />
    </View>
  );
};

export default GlobalLogoTitle;
