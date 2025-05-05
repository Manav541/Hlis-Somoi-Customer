import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../constants/Colors';
import {styles} from './styles';
import {getTranslation} from '../../localization/i18n/i18n.config';
import {activityOpacity} from '../../constants/GConstant';

interface PropsType {
  isSelected: boolean;
  onPressEmail: () => void;
  onPressPhone: () => void;
}

const GlobalEmailPhoneButton = (props: PropsType) => {
  return (
    <View style={styles.vwMain}>
      {/* Email */}
      <TouchableOpacity
        activeOpacity={activityOpacity}
        style={[
          styles.btn,
          {
            borderBlockColor: props.isSelected
              ? colors.orange1c
              : 'transparent',
            borderBottomWidth: props.isSelected ? 1 : 0,
          },
        ]} onPress={props?.onPressEmail}>
        <Text
          style={[
            styles.lbl,
            {color: props.isSelected ? colors.orange1c : colors.greya7},
          ]}>
          {getTranslation('email')}
        </Text>
      </TouchableOpacity>

      {/* Phone Number */}
      <TouchableOpacity
        activeOpacity={activityOpacity}
        style={[
          styles.btn,
          {
            borderBlockColor: !props.isSelected
              ? colors.orange1c
              : 'transparent',
            borderBottomWidth: !props.isSelected ? 1 : 0,
          },
        ]}>
        <Text
          style={[
            styles.lbl,
            {color: !props.isSelected ? colors.orange1c : colors.greya7},
          ]} onPress={props?.onPressPhone}>
          {getTranslation('phone')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GlobalEmailPhoneButton;
