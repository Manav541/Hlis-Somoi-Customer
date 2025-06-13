import React, { useEffect, useRef, useState } from "react";
import ForgotPasswordComponent from "../../../components/authentication/forgotPassword";
import GlobalBackButton from "../../../global/GlobalBackButton";
import { Text, TextInput } from "react-native";
import { containsEmoji, flashMessageWarning } from "../../../constants/GConstant";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { regex } from "../../../constants/Regex";
import { constnatStyles } from "../../../constants/Styles";
import { ScreenNames } from "../../../routers";
import { zustandStore } from "../../../store";
import { statusCodes } from "../../../api/APIConstant";

const ForgotPasswordContainer = ({ navigation, route }: any) => {
  // API Zustand Store
  const forgotPasswordEmailVerifyApi = zustandStore.AuthStore(
    (state) => state.forgotPasswordEmailVerify
  );

  const [email, setEmail] = useState("");
  const emailRef = useRef<TextInput | null>(null);
  const [emailFocused, setEmailFocused] = useState(false);

  const handleOnChangeText = (text: string) => {
    const newText = text.replace(/\s/g, "");
      if (!containsEmoji(newText)) {
        setEmail(newText);
      }
  };

  const handleOnFocus = () => {
    setEmailFocused(true);
  };

  const handleOnBlur = () => {
    setEmailFocused(false);
  };

  const handleOnPressSubmit = () => {
    if (email.trim() == "") {
      flashMessageWarning(getTranslation("emptyEmail"));
    } else if (!regex.email.test(email)) {
      flashMessageWarning(getTranslation("invalidEmail"));
    } else {
      handleForgotPasswordEmailVerifyApi();
    }
  };

  const handleForgotPasswordEmailVerifyApi = async () => {
    const dictData = {
      email: email.toLowerCase(),
    };

    try {
      const response = await forgotPasswordEmailVerifyApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ && console.log("FORGOT PASSWORD EMAIL VERIFY RESPONSE===>", response);
        if (response.code === statusCodes.success) {
          setEmail("");
          navigation.navigate(ScreenNames.verification, {
            email: email.toLowerCase(),
            navigateFromForgotPassword: true,
          });
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
        else if (response.code === statusCodes.emptyData) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => null,
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {ScreenNames.forgotPassword}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  return (
    <ForgotPasswordComponent
      email={email}
      emailRef={emailRef}
      emailFocused={emailFocused}
      handleOnChangeText={handleOnChangeText}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
      handleOnPressSubmit={handleOnPressSubmit}
    />
  );
};

export default ForgotPasswordContainer;
