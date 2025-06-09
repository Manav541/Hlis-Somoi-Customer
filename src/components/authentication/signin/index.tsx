import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import React, { Ref } from "react";
import GlobalLogoTitle from "../../../global/GlobalLogoTitle";
import { styles } from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import GlobalTextInput from "../../../global/GlobalTextInput";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { activityOpacity } from "../../../constants/GConstant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GlobalButton from "../../../global/GlobalButton";
import { PlatformVersion } from "../../../constants/utils/Platform";
import { constnatStyles } from "../../../constants/Styles";
import GlobalEmailPhoneButton from "../../../global/GlobalEmailPhoneButton";
import { CountryDataType } from "../../../constants/interfaces";
import GlobalCountryModal from "../../../global/GlobalCountryModal";

interface PropsType {
  email: string;
  password: string;
  showPassword: boolean;
  emailRef: Ref<TextInput>;
  passwordRef: Ref<TextInput>;
  handleOnChangeText: (text: string, type: string) => void;
  handleOnSubmit: (type: string) => void;
  handleOnPressEye: () => void;
  handleOnPressSignIn: () => void;
  handleOnPressSignUp: () => void;
  emailFocused: boolean;
  passwordFocused: boolean;
  handleOnFocus: (type: string) => void;
  handleOnBlur: (type: string) => void;
  handleOnPressForgotPassword: () => void;
  isEmailSelected: boolean;
  onPressEmail: () => void;
  onPressPhone: () => void;
  mobileNumber: string;
  mobileNumberRef: Ref<TextInput>;
  mobileNumberFocused: boolean;
  countryCode: string;
  countryArray: CountryDataType[];
  countryModal: boolean;
  searchCountry: string;
  handleOnPressCountryCode: () => void;
  handleOnChangeSearchCountry: (text: string) => void;
  handleOnSelectCountry: (item: CountryDataType) => void;
  handleOnPressBackCountryModal: () => void;
  handleOnPressGuest: () => void;
}

const SignInComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={constnatStyles.vwOrangeBgParent}>
      <View style={constnatStyles.vwBlueBgWithRadius}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* View Logo - Title */}
          <GlobalLogoTitle style={styles.vwLogoTitle} />

          {/* Email Phone */}
          <View style={{ marginBottom: 30 }}>
            <GlobalEmailPhoneButton
              isSelected={props?.isEmailSelected}
              onPressEmail={props?.onPressEmail}
              onPressPhone={props?.onPressPhone}
            />
          </View>

          {/* View Input */}
          {props?.isEmailSelected ? (
            <View style={{ gap: 10 }}>
              <GlobalTextInput
                placeholder={getTranslation("email")}
                isEmailField
                value={props.email}
                reference={props.emailRef}
                onChangeText={(text) => {
                  props.handleOnChangeText(text, "email");
                }}
                onSubmitEditing={() => {
                  props.handleOnSubmit("email");
                }}
                onBlur={() => {
                  props.handleOnBlur("email");
                }}
                onFocus={() => {
                  props.handleOnFocus("email");
                }}
                focusValue={props.emailFocused}
              />

              <GlobalTextInput
                isLastField
                isPasswordField
                placeholder={getTranslation("password")}
                value={props.password}
                reference={props.passwordRef}
                secureTextEntry={!props.showPassword}
                onChangeText={(text) => {
                  props.handleOnChangeText(text, "password");
                }}
                onSubmitEditing={() => {
                  props.handleOnSubmit("password");
                }}
                onPressEye={props.handleOnPressEye}
                onBlur={() => {
                  props.handleOnBlur("password");
                }}
                onFocus={() => {
                  props.handleOnFocus("password");
                }}
                focusValue={props.passwordFocused}
              />
            </View>
          ) : (
            <View>
              <GlobalTextInput
                isPhoneField
                isLastField
                maxLength={10}
                placeholder={getTranslation("mobileNumber")}
                value={props.mobileNumber}
                reference={props.mobileNumberRef}
                onChangeText={(text) => {
                  props.handleOnChangeText(text, "mobileNumber");
                }}
                onSubmitEditing={() => {
                  props.handleOnSubmit("mobileNumber");
                }}
                onFocus={() => {
                  props.handleOnFocus("mobileNumber");
                }}
                onBlur={() => {
                  props.handleOnBlur("mobileNumber");
                }}
                focusValue={props.mobileNumberFocused}
                countryCode={props.countryCode}
                onPressCode={props.handleOnPressCountryCode}
              />
            </View>
          )}

          {/* Forgot Password Button */}
          {props?.isEmailSelected && (
            <TouchableOpacity
              style={styles.btnForgot}
              activeOpacity={activityOpacity}
              onPress={props.handleOnPressForgotPassword}
            >
              <Text style={styles.lblForgot}>
                {getTranslation("forgotPassword")}?
              </Text>
            </TouchableOpacity>
          )}

          {/* View Bottom */}
          <View
            style={[
              styles.vwBottom,
              {
                marginTop: props?.isEmailSelected ? 20 : 40,
              },
            ]}
          >
            <GlobalButton
              title={getTranslation("signin")}
              onPress={props.handleOnPressSignIn}
              flex={1}
              isOrange
            />

            <GlobalButton
              title={getTranslation("signup")}
              onPress={props.handleOnPressSignUp}
              flex={1}
              isTransparentWithBorder
            />
          </View>
          {/* Continue As Guest */}
          <GlobalButton
            isWhite={true}
            title={getTranslation("ContinueAsGuest")}
            onPress={props.handleOnPressGuest}
          />
        </KeyboardAwareScrollView>
      </View>
     
    </View>
  );
};

export default SignInComponent;
