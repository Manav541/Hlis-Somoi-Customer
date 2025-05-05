import { View, Text, TextInput } from "react-native";
import React, { Ref } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import GlobalLogoTitle from "../../../global/GlobalLogoTitle";
import { styles } from "./styles";
import GlobalTextInput from "../../../global/GlobalTextInput";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import GlobalButton from "../../../global/GlobalButton";
import { constnatStyles } from "../../../constants/Styles";

interface PropsType {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  oldPasswordRef: Ref<TextInput | null>;
  confirmPasswordRef: Ref<TextInput | null>;
  newPasswordRef: Ref<TextInput | null>;
  oldPasswordFocused: boolean;
  newPasswordFocused: boolean;
  confirmPasswordFocused: boolean;
  handleOnChangeText: (text: string, type: string) => void;
  handleOnSubmit: () => void;
  handleOnFocus: (type: string) => void;
  handleOnBlur: (type: string) => void;
  handleOnPressEye: (type: string) => void;
  showOldPassword: boolean;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  handleOnPressUpdate: () => void;
  navigateFromForgotPassword: boolean;
}

const ChangePasswordComponent = (props: PropsType) => {
  return (
    <View style={constnatStyles.vwOrangeBgParent}>
      <View style={constnatStyles.vwBlueBgWithRadius}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <GlobalLogoTitle style={styles.logoTitle} />

          <View style={{ gap: 10 }}>
            {!props?.navigateFromForgotPassword && (
              <GlobalTextInput
                isPasswordField
                placeholder={getTranslation("oldPassword")}
                value={props.oldPassword}
                onChangeText={(text) =>
                  props.handleOnChangeText(text, "oldPassword")
                }
                onFocus={() => props.handleOnFocus("oldPassword")}
                onBlur={() => props.handleOnBlur("oldPassword")}
                focusValue={props.oldPasswordFocused}
                reference={props.oldPasswordRef}
                onSubmitEditing={() => {
                  if (props.newPasswordRef && 'current' in props.newPasswordRef) {
                    props.newPasswordRef.current?.focus();
                  }
                }}
                secureTextEntry={!props.showOldPassword}
                onPressEye={() => props.handleOnPressEye("oldPassword")}
              />
            )}
            <GlobalTextInput
              isPasswordField
              placeholder={getTranslation("newPassword")}
              value={props.newPassword}
              onChangeText={(text) =>
                props.handleOnChangeText(text, "newPassword")
              }
              onFocus={() => props.handleOnFocus("newPassword")}
              onBlur={() => props.handleOnBlur("newPassword")}
              focusValue={props.newPasswordFocused}
              reference={props.newPasswordRef}
              onSubmitEditing={props.handleOnSubmit}
              secureTextEntry={!props.showNewPassword}
              onPressEye={() => props.handleOnPressEye("newPassword")}
            />
            <GlobalTextInput
              isPasswordField
              isLastField
              placeholder={getTranslation("confirmPassword")}
              value={props.confirmPassword}
              onChangeText={(text) =>
                props.handleOnChangeText(text, "confirmPassword")
              }
              onFocus={() => props.handleOnFocus("confirmPassword")}
              onBlur={() => props.handleOnBlur("confirmPassword")}
              focusValue={props.confirmPasswordFocused}
              reference={props.confirmPasswordRef}
              onSubmitEditing={() => {}}
              secureTextEntry={!props.showConfirmPassword}
              onPressEye={() => props.handleOnPressEye("confirmPassword")}
            />
          </View>

          <View style={{ marginTop: 25 }}>
            <GlobalButton
              isOrange
              title={getTranslation("update")}
              onPress={props.handleOnPressUpdate}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default ChangePasswordComponent;
