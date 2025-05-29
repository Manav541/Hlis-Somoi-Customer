import { View, Text, TextInput, StatusBar } from "react-native";
import React, { Ref } from "react";
import { constnatStyles } from "../../constants/Styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import GlobalLogoTitle from "../../global/GlobalLogoTitle";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { fontsfamily } from "../../constants/FontFamily";
import GlobalTextInput from "../../global/GlobalTextInput";
import GlobalButton from "../../global/GlobalButton";
import { styles } from "./styles";
import GlobalCountryModal from "../../global/GlobalCountryModal";
import { CountryDataType } from "../../constants/interfaces";

interface PropsType {
  email: string;
  emailRef: Ref<TextInput | null>;
  emailFocused: boolean;
  mobileNumber: string;
  mobileNumberRef: Ref<TextInput>;
  mobileNumberFocused: boolean;
  handleOnChangeText: (text: string, type: string) => void;
  handleOnFocus: (type: string) => void;
  handleOnBlur: (type: string) => void;
  handleOnPressSubmit: () => void;
  navigateFrom: string;

  countryCode: string;
  countryArray: CountryDataType[];
  countryModal: boolean;
  searchCountry: string;
  handleOnPressCountryCode: () => void;
  handleOnChangeSearchCountry: (text: string) => void;
  handleOnSelectCountry: (item: CountryDataType) => void;
  handleOnPressBackCountryModal: () => void;
}

const ChangeEmailPhoneNumberComponenet = (props: PropsType) => {
  return (
    <View style={constnatStyles.vwOrangeBgParent}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <View style={styles.vwContainer}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <GlobalLogoTitle style={styles.vwLogotTitle} />

          {/* Otp Title */}
          <Text style={styles.lblOtpTitle}>
            {getTranslation("enterYourTitle")}{" "}
            <Text style={{ fontFamily: fontsfamily.semibold }}>
              {props?.navigateFrom === "ChangeEmail"
                ? getTranslation("emailId")
                : getTranslation("phoneNumber")}
              .{" "}
            </Text>
            {getTranslation("toGetTitle")}{" "}
            <Text style={{ fontFamily: fontsfamily.semibold }}>
              {getTranslation("otp")}{" "}
            </Text>
            {props?.navigateFrom === "ChangeEmail"
              ? getTranslation("toVerifyChangeEmailID")
              : getTranslation("toVerifyChangePhoneNumber")}
          </Text>

          {/* View Input-Button */}
          <View style={{ gap: 20, marginTop: 20 }}>
            {props?.navigateFrom === "ChangeEmail" ? (
              <GlobalTextInput
                placeholder={getTranslation("email")}
                isEmailField
                value={props.email}
                reference={props.emailRef}
                onChangeText={(text) => {
                  props.handleOnChangeText(text, "email");
                }}
                onSubmitEditing={() => {
                  // props.handleOnSubmit("email");
                }}
                onBlur={() => {
                  props.handleOnBlur("email");
                }}
                onFocus={() => {
                  props.handleOnFocus("email");
                }}
                focusValue={props.emailFocused}
                isLastField
              />
            ) : (
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
                  // props.handleOnSubmit("mobileNumber");
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
                isLastField
              />
            )}

            {/* Submit Button */}
            <GlobalButton
              isOrange
              title={
                props?.navigateFrom === "ChangeEmail" || "ChangePhoneNumber"
                  ? getTranslation("update")
                  : getTranslation("sent")
              }
              onPress={props.handleOnPressSubmit}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
     
    </View>
  );
};

export default ChangeEmailPhoneNumberComponenet;
