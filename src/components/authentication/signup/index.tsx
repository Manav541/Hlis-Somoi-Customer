import { View, Text, TextInput } from "react-native";
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

interface PropsType {
  name: string;
  email: string;
  password: string;
  nameRef: Ref<TextInput>;
  emailRef: Ref<TextInput>;
  passwordRef: Ref<TextInput>;
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

  isEmailSelected: boolean;
  onPressEmail: () => void;
  onPressPhone: () => void;
}

const SignupComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={constnatStyles.vwOrangeBgParent}>
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
              <Text>Hello</Text>
            )}

            {/* Bottom View */}
            <View
              style={{
                paddingBottom: PlatformVersion.isIOS ? insets.bottom + 10 : 20,
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
                onPress={() => console.log("Continue As Guest")}
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
                    onPress={() => {}}
                    style={[
                      styles.lblTermsCondition,
                      styles.lblTermsConditionLine,
                    ]}
                  >
                    {getTranslation("termsandconditions")}
                  </Text>{" "}
                  {getTranslation("andi")}{" "}
                  <Text
                    onPress={() => {}}
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
    </View>
  );
};

export default SignupComponent;
