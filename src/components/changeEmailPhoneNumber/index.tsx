import { View, Text, TextInput } from "react-native";
import React, { Ref } from "react";
import { constnatStyles } from "../../constants/Styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import GlobalLogoTitle from "../../global/GlobalLogoTitle";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { fontsfamily } from "../../constants/FontFamily";
import GlobalTextInput from "../../global/GlobalTextInput";
import GlobalButton from "../../global/GlobalButton";
import { styles } from "./styles";

interface PropsType {
  email: string;
  emailRef: Ref<TextInput | null>;
  emailFocused: boolean;
  phoneNumber: string;
  phoneNumberRef: Ref<TextInput | null>;
  phoneFocused: boolean;
  handleOnChangeText: (text: string) => void;
  handleOnFocus: () => void;
  handleOnBlur: () => void;
  handleOnPressSubmit: () => void;
  navigateFrom: string;
}

const ChangeEmailPhoneNumberComponenet = (props: PropsType) => {
  return (
    <View style={constnatStyles.vwOrangeBgParent}>
      <View style={constnatStyles.vwBlueBgWithRadius}>
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
            <GlobalTextInput
              value={props.email}
              reference={props.emailRef}
              onChangeText={props.handleOnChangeText}
              focusValue={props.emailFocused}
              placeholder={getTranslation("email")}
              isEmailField
              isLastField
              onFocus={props.handleOnFocus}
              onBlur={props.handleOnBlur}
              onSubmitEditing={() => {}}
            />

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
