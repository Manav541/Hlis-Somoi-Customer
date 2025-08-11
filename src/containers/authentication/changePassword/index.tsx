import React, { useEffect, useRef, useState } from "react";
import ChangePasswordComponent from "../../../components/authentication/changePassword";
import GlobalBackButton from "../../../global/GlobalBackButton";
import { Text, TextInput } from "react-native";
import {
  containsEmoji,
  flashMessageSucess,
  flashMessageWarning,
} from "../../../constants/GConstant";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { regex } from "../../../constants/Regex";
import { CommonActions } from "@react-navigation/native";
import { constnatStyles } from "../../../constants/Styles";
import { ScreenNames } from "../../../routers";
import { zustandStore } from "../../../store";
import { statusCodes } from "../../../api/APIConstant";

const ChangePasswordContainer = ({ navigation, route }: any) => {
  // API Zustand Store
  const changeForgotPasswordApi = zustandStore.AuthStore(
    (state) => state.changeForgotPassword
  );
  const changePasswordApi = zustandStore.AuthStore(
    (state) => state.changePassword
  );
  const { navigateFromForgotPassword } = route?.params;
  const [email, setEmail] = useState("");
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
      if (!containsEmoji(cleanedText)) {
        setOldPassword(cleanedText);
      }
    } else if (type === "newPassword") {
      if (!containsEmoji(cleanedText)) {
        setNewPassword(cleanedText);
      }
    } else {
      if (!containsEmoji(cleanedText)) {
        setConfirmPassword(cleanedText);
      }
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
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Sign In" }],
        })
      );
    } else {
      navigation.goBack();
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 1,
      //     routes: [
      //       {
      //         name: ScreenNames.bottomTabsNavigation,
      //         state: {
      //           routes: [{ name: ScreenNames.settings }],
      //           index: 0,
      //         },
      //       },
      //     ],
      //   })
      // );
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
      if (navigateFromForgotPassword) {
        handlechangeForgotPasswordApi();
      } else {
        handlechangePasswordApi();
      }
    }
  };

  const handlechangeForgotPasswordApi = async () => {
    const dictData = {
      email: email,
      new_password: newPassword,
    };

    try {
      const response = await changeForgotPasswordApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ && console.log("CHANGE FORGOT PASSWORD RESPONSE===>", response);
        if (response.code === statusCodes.success) {
          flashMessageSucess(response.message);
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "Sign In" }],
            })
          );
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  const handlechangePasswordApi = async () => {
    const dictData = {
      old_password: oldPassword,
      new_password: newPassword,
    };

    try {
      const response = await changePasswordApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ && console.log("CHANGE PASSWORD RESPONSE===>", response);
        if (response.code === statusCodes.success) {
          flashMessageSucess(response.message);
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: ScreenNames.bottomTabsNavigation,
                  state: {
                    routes: [{ name: ScreenNames.settings }],
                    index: 0,
                  },
                },
              ],
            })
          );
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => <GlobalBackButton onPress={handleOnBack} />,
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {ScreenNames.changePassword}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
    if (route?.params) {
      setEmail(route?.params?.email);
    }
  }, [route]);

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
