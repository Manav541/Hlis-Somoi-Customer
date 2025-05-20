import React, { useEffect, useRef, useState } from "react";
import ChangePasswordComponent from "../../../components/authentication/changePassword";
import GlobalBackButton from "../../../global/GlobalBackButton";
import { BackHandler, Text, TextInput } from "react-native";
import {
  flashMessageSucess,
  flashMessageWarning,
} from "../../../constants/GConstant";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { regex } from "../../../constants/Regex";
import { CommonActions } from "@react-navigation/native";
import { constnatStyles } from "../../../constants/Styles";
import { ScreenNames } from "../../../routers";

const ChangePasswordContainer = ({ navigation, route }: any) => {
  const { navigateFromForgotPassword } = route?.params;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const oldPasswordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const newPasswordRef = useRef<TextInput>(null);

  const [oldPasswordFocused, setOldPasswordFocused] = useState(false);
  const [newPasswordFocused, setNewPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const handleOnChangeText = (text: string, type: string) => {
    const cleanedText = text.replace(/\s/g, "");
    if (type === "oldPassword") {
      setOldPassword(cleanedText);
    } else if (type === "newPassword") {
      setNewPassword(cleanedText);
    } else {
      setConfirmPassword(cleanedText);
    }
  };

  const handleOnSubmit = () => {
    confirmPasswordRef?.current?.focus();
  };

  const handleOnFocus = (type: string) => {
    if (type === "oldPassword") {
      setOldPasswordFocused(true);
    } else if (type === "newPassword") {
      setNewPasswordFocused(true);
    } else {
      setConfirmPasswordFocused(true);
    }
  };

  const handleOnBlur = (type: string) => {
    if (type === "oldPassword") {
      setOldPasswordFocused(false);
    } else if (type === "newPassword") {
      setNewPasswordFocused(false);
    } else {
      setConfirmPasswordFocused(false);
    }
  };

  const handleOnPressEye = (type: string) => {
    if (type === "oldPassword") {
      setShowOldPassword(!showOldPassword);
    } else if (type === "newPassword") {
      setShowNewPassword(!showNewPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleOnBack = () => {
    if (navigateFromForgotPassword) {
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "Sign In" }],
          })
        );
      }, 100);
    } else {
      navigation.goBack();
    }
  };

  const handleOnPressUpdate = () => {
    if (!navigateFromForgotPassword && oldPassword === "") {
      flashMessageWarning(getTranslation("emptyOldPassword"));
    } else if (newPassword === "") {
      flashMessageWarning(getTranslation("emptyNewPassword"));
    } else if (!regex.password.test(newPassword)) {
      flashMessageWarning(getTranslation("invalidPassword"));
    } else if (confirmPassword === "") {
      flashMessageWarning(getTranslation("emptyConfirmPassword"));
    } else if (newPassword !== confirmPassword) {
      flashMessageWarning(getTranslation("passwordNotMatch"));
    } else {
      flashMessageSucess(getTranslation("passwordChangedSucessfully"));
      if (navigateFromForgotPassword) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "Sign In" }],
          })
        );
      } else {
        navigation.goBack();
      }
    }
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => <GlobalBackButton onPress={handleOnBack} />,
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>{ScreenNames.changePassword}</Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  return (
    <ChangePasswordComponent
      oldPassword={oldPassword}
      newPassword={newPassword}
      confirmPassword={confirmPassword}
      oldPasswordRef={oldPasswordRef}
      confirmPasswordRef={confirmPasswordRef}
      newPasswordRef={newPasswordRef}
      oldPasswordFocused={oldPasswordFocused}
      newPasswordFocused={newPasswordFocused}
      confirmPasswordFocused={confirmPasswordFocused}
      handleOnChangeText={handleOnChangeText}
      handleOnSubmit={handleOnSubmit}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
      handleOnPressEye={handleOnPressEye}
      showOldPassword={showOldPassword}
      showNewPassword={showNewPassword}
      showConfirmPassword={showConfirmPassword}
      handleOnPressUpdate={handleOnPressUpdate}
      navigateFromForgotPassword={navigateFromForgotPassword}
    />
  );
};

export default ChangePasswordContainer;
