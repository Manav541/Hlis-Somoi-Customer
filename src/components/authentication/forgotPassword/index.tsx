import {View, Text, TextInput} from 'react-native';
import React, {Ref} from 'react';
import GlobalLogoTitle from '../../../global/GlobalLogoTitle';
import {styles} from './styles';
import {getTranslation} from '../../../localization/i18n/i18n.config';
import {fontsfamily} from '../../../constants/FontFamily';
import GlobalTextInput from '../../../global/GlobalTextInput';
import GlobalButton from '../../../global/GlobalButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { constnatStyles } from '../../../constants/Styles';

interface PropsType {
  email: string;
  emailRef: Ref<TextInput | null>;
  emailFocused: boolean;
  handleOnChangeText: (text: string) => void;
  handleOnFocus: () => void;
  handleOnBlur: () => void;
  handleOnPressSubmit: () => void;
}

const ForgotPasswordComponent = (props: PropsType) => {
  return (
    <View style={constnatStyles.vwOrangeBgParent}>
      <View style={constnatStyles.vwBlueBgWithRadius}>
        <KeyboardAwareScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <GlobalLogoTitle style={styles.vwLogotTitle} />

          {/* Otp Title */}
          <Text style={styles.lblOtpTitle}>
            {getTranslation('enterYourTitle')}{' '}
            <Text style={{fontFamily: fontsfamily.semibold}}>
              {getTranslation('emailId')}.{' '}
            </Text>
            {getTranslation('toGetTitle')}{' '}
            <Text style={{fontFamily: fontsfamily.semibold}}>
              {getTranslation('otp')}
            </Text>
            {getTranslation('toVerifyChangeTitle')}
          </Text>

          {/* View Input-Button */}
          <View style={{gap: 20, marginTop: 20}}>
            <GlobalTextInput
              value={props.email}
              reference={props.emailRef}
              onChangeText={props.handleOnChangeText}
              focusValue={props.emailFocused}
              placeholder={getTranslation('email')}
              isEmailField
              isLastField
              onFocus={props.handleOnFocus}
              onBlur={props.handleOnBlur}
              onSubmitEditing={() => {}}
            />

            {/* Submit Button */}
            <GlobalButton
              isOrange
              title={getTranslation('submit')}
              onPress={props.handleOnPressSubmit}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default ForgotPasswordComponent;
