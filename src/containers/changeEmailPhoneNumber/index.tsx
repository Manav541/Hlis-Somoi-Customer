import React, { useEffect, useRef, useState } from "react";
import ChangeEmailPhoneNumberComponenet from "../../components/changeEmailPhoneNumber";
import { getTranslation } from "../../localization/i18n/i18n.config";
import GlobalBackButton from "../../global/GlobalBackButton";
import { styles } from "./styles";
import { StatusBar, Text, TextInput } from "react-native";
import { flashMessageWarning } from "../../constants/GConstant";
import { regex } from "../../constants/Regex";
import { useFocusEffect } from "@react-navigation/native";

const ChangeEmailPhoneNumberContainer = ({ navigation, route }: any) => {
  const navigateFrom = route.params?.navigateFrom;
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const emailRef = useRef<TextInput | null>(null);
  const phoneNumberRef = useRef<TextInput | null>(null);
  const [emailFocused, setEmailFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);

  const handleOnChangeText = (text: string) => {
    if (navigateFrom === "ChangeEmail") {
        setEmail(text.replace(/\s/g, ""));
      } else {
        setPhoneNumber(text.replace(/\s/g, ""));
      }
  };

  const handleOnFocus = () => {
    if (navigateFrom === "ChangeEmail") {
        setEmailFocused(true);
      } else {
        setPhoneFocused(true);
      }
  };

  const handleOnBlur = () => {
    if (navigateFrom === "ChangeEmail") {
        setEmailFocused(false);
      } else {
        setPhoneFocused(false);
      }
  };

  const handleOnPressSubmit = () => {
    if (navigateFrom === "ChangeEmail") {
        if (email.trim() === "") {
          flashMessageWarning(getTranslation("emptyEmail"));
        } else if (!regex.email.test(email)) {
          flashMessageWarning(getTranslation("invalidEmail"));
        } else {
          setEmail("");
          navigation.navigate("Verification", {
            email: email.toLowerCase(),
            navigateFromForgotPassword: true,
          });
        }
      } else {
        if (phoneNumber.trim() === "") {
          flashMessageWarning(getTranslation("emptyPhone"));
        } else if (!regex.mobile.test(phoneNumber)) {
          flashMessageWarning(getTranslation("invalidPhone"));
        } else {
          setPhoneNumber("");
          navigation.navigate("Verification", {
            phone: phoneNumber,
            navigateFromForgotPassword: true,
          });
        }
      }
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => (
        <Text style={styles.txtHeaderTitle}>
          {navigateFrom === "ChangeEmail"
            ? getTranslation("changeEmail")
            : getTranslation("changePhoneNumber")}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, [navigateFrom]);
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <ChangeEmailPhoneNumberComponenet
      email={email}
      emailRef={emailRef}
      emailFocused={emailFocused}
      phoneNumber={phoneNumber}
      phoneNumberRef={phoneNumberRef}
      phoneFocused={phoneFocused}
      handleOnChangeText={handleOnChangeText}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
      handleOnPressSubmit={handleOnPressSubmit}
      navigateFrom={navigateFrom}
    />
  );
};

export default ChangeEmailPhoneNumberContainer;
