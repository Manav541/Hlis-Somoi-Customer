import { View, Text, TextInput, StatusBar } from "react-native";
import React, { Ref } from "react";
import { styles } from "./styles";
import GlobalLogoTitle from "../../../global/GlobalLogoTitle";
import GlobalTextInput from "../../../global/GlobalTextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import GlobalButton from "../../../global/GlobalButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PlatformVersion } from "../../../constants/utils/Platform";
import { constnatStyles } from "../../../constants/Styles";
import GlobalEmailPhoneButton from "../../../global/GlobalEmailPhoneButton";
import GlobalCountryModal from "../../../global/GlobalCountryModal";
import { CountryDataType } from "../../../constants/interfaces";

interface PropsType {
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
  nameRef: Ref<TextInput>;
  emailRef: Ref<TextInput>;
  passwordRef: Ref<TextInput>;
  mobileNumberRef: Ref<TextInput>;
  handleOnChangeText: (text: string, type: string) => void;
  handleOnSubmit: (type: string) => void;
  showPassword: boolean;
  handleOnPressEye: () => void;
  handleOnPressSignup: () => void;
  handleOnPressSignIn: () => void;
  handleOnFocus: (type: string) => void;
  handleOnBlur: (type: string) => void;
  nameFocused: boolean;
  emailFocused: boolean;
  passwordFocused: boolean;
  mobileNumberFocused: boolean;

  isEmailSelected: boolean;
  onPressEmail: () => void;
  onPressPhone: () => void;

  countryCode: string;
  countryArray: CountryDataType[];
  countryModal: boolean;
  searchCountry: string;
  handleOnPressCountryCode: () => void;
  handleOnChangeSearchCountry: (text: string) => void;
  handleOnSelectCountry: (item: CountryDataType) => void;
  handleOnPressBackCountryModal: () => void;

  handleOnPressGuest: () => void;
  onPressCMS: (page: string) => void;
}

const SignupComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={constnatStyles.vwOrangeBgParent}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <View style={constnatStyles.vwBlueBgWithRadius}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Logo-Title */}
          <GlobalLogoTitle style={styles.vwLogoTitle} />

          {/* Email Phone */}
          <View style={{ marginBottom: 30 }}>
            <GlobalEmailPhoneButton
              isSelected={props?.isEmailSelected}
              onPressEmail={props?.onPressEmail}
              onPressPhone={props?.onPressPhone}
            />
          </View>

          {/* View Inputs  */}
          <View style={styles.vwInputsMain}>
            {props?.isEmailSelected ? (
              <View style={{ gap: 10 }}>
                <GlobalTextInput
                  placeholder={getTranslation("name")}
                  value={props.name}
                  reference={props.nameRef}
                  secureTextEntry={false}
                  onChangeText={(text) => {
                    props.handleOnChangeText(text, "name");
                  }}
                  onSubmitEditing={() => {
                    props.handleOnSubmit("name");
                  }}
                  onBlur={() => {
                    props.handleOnBlur("name");
                  }}
                  onFocus={() => {
                    props.handleOnFocus("name");
                  }}
                  focusValue={props.nameFocused}
                />
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
                  isPhoneField
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
                <GlobalTextInput
                  placeholder={getTranslation("password")}
                  isPasswordField
                  value={props.password}
                  secureTextEntry={!props.showPassword}
                  reference={props.passwordRef}
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
                  isLastField
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

            {/* Bottom View */}
            <View
              style={{
                paddingBottom:  insets.bottom ? insets.bottom : 40,
              }}
            >
              {/* View Signup-Signin */}
              <View style={[styles.vwSignupSignin, { gap: 11 }]}>
                <GlobalButton
                  isOrange
                  flex={1}
                  onPress={props.handleOnPressSignup}
                  title={getTranslation("signup")}
                />
                <GlobalButton
                  isTransparentWithBorder
                  flex={1}
                  onPress={props.handleOnPressSignIn}
                  title={getTranslation("signin")}
                />
              </View>

              {/* View line - Or */}
              <View
                style={[styles.vwSignupSignin, { gap: 43, marginVertical: 23 }]}
              >
                <View style={styles.vwLine} />
                <Text style={styles.lblOr}>{getTranslation("or")}</Text>
                <View style={styles.vwLine} />
              </View>

              {/* Continue As Guest */}
              <GlobalButton
                isWhite={true}
                title={getTranslation("ContinueAsGuest")}
                onPress={props?.handleOnPressGuest}
              />

              {/* Terms and condition */}
              <View
                style={{
                  marginHorizontal: 30,
                  alignSelf: "center",
                  marginTop: 23,
                }}
              >
                <Text style={styles.lblTermsCondition}>
                  {getTranslation("bysigningup")}{" "}
                  <Text
                    onPress={() => {
                      props?.onPressCMS("termsConditions");
                    }}
                    style={[
                      styles.lblTermsCondition,
                      styles.lblTermsConditionLine,
                    ]}
                  >
                    {getTranslation("termsandconditions")}
                  </Text>{" "}
                  {getTranslation("andi")}{" "}
                  <Text
                    onPress={() => {
                      props?.onPressCMS("privacyPolicy");
                    }}
                    style={[
                      styles.lblTermsCondition,
                      styles.lblTermsConditionLine,
                    ]}
                  >
                    {getTranslation("privacyPolicy")}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
      {/* Country Modal */}
      <GlobalCountryModal
        countryArray={props.countryArray}
        onPressBack={props.handleOnPressBackCountryModal}
        onPressData={props.handleOnSelectCountry}
        onChangeText={props.handleOnChangeSearchCountry}
        searchVal={props.searchCountry}
        visible={props.countryModal}
      />
    </View>
  );
};

export default SignupComponent;
