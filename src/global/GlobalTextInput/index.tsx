import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {Ref} from 'react';
import {colors} from '../../constants/Colors';
import {styles} from './styles';
import {images} from '../../constants/Images';
import {activityOpacity, hitSlop} from '../../constants/GConstant';

interface PropsType {
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
  onFocus: () => void;
  onBlur: () => void;
  focusValue: boolean;
  placeholder: string | null;
  reference: Ref<TextInput>;

  //   Optional
  secureTextEntry?: boolean;
  onPressEye?: () => void;
  countryCode?: string;
  isEmailField?: boolean;
  isPhoneField?: boolean;
  isNumberInputField?: boolean;
  isPasswordField?: boolean;
  isLastField?: boolean;
  isDescriptionField?: boolean;
  onPressCode?: () => void;
  maxLength?: number;
}

const GlobalTextInput = (props: PropsType) => {
  return (
    <View
      style={[
        styles.vwMain,
        {
          height: props.isDescriptionField ? 121 : 52,
          borderRadius: props.isDescriptionField ? 20 : 100,
          borderColor: props.focusValue == true ? colors.white : colors.greya7,
        },
      ]}>
      {/* Country Code */}
      {props.isPhoneField && (
        <TouchableOpacity
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          onPress={props.onPressCode}>
          <Text style={styles.lblCountryCode}>{props.countryCode}</Text>
        </TouchableOpacity>
      )}

      {/* Input - Eye */}
      <View style={styles.vwInputEye}>
        <TextInput
          placeholder={props.placeholder || ''}
          ref={props.reference}
          value={props.value}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          cursorColor={colors.greya7}
          selectionColor={colors.greya7}
          onChangeText={props.onChangeText}
          secureTextEntry={props.secureTextEntry}
          onSubmitEditing={props.onSubmitEditing}
          placeholderTextColor={colors.greya7}
          multiline={props.isDescriptionField}
          returnKeyType={props.isLastField ? 'done' : 'next'}
          blurOnSubmit={props.isLastField ? true : false}
          maxLength={props.maxLength}
          autoCorrect={false}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="none"
          keyboardType={
            props.isEmailField
              ? 'email-address'
              : props.isPhoneField || props.isNumberInputField
              ? 'number-pad'
              : 'default'
          }
          style={[
            styles.input,
            {
              height: props.isDescriptionField ? 121 : 52,
              textAlignVertical: props.isDescriptionField ? 'top' : 'center',
              paddingVertical: props.isDescriptionField ? 10 : 0,
            },
          ]}
        />

        {/* Eye */}
        {props.isPasswordField && (
          <TouchableOpacity
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={props.onPressEye}>
            <Image
              source={props.secureTextEntry ? images.hideEye : images.showEye}
              style={styles.eyeImg}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default GlobalTextInput;
