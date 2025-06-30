import React, { useEffect, useRef, useState } from "react";
import SignInComponent from "../../../components/authentication/signin";
import {
  containsEmoji,
  flashMessageSucess,
  flashMessageWarning,
} from "../../../constants/GConstant";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { regex } from "../../../constants/Regex";
import {
  CountryDataType,
  CustomerDetails,
  DeviceInfoType,
  SignupResponse,
} from "../../../constants/interfaces";
import { CountryData } from "../../../constants/utils/CountryData";
import { MmkvManager } from "../../../constants/utils/MmkvManager";
import { CommonActions } from "@react-navigation/native";
import { ScreenNames } from "../../../routers";
import { constnatStyles } from "../../../constants/Styles";
import { Text, TextInput } from "react-native";
import { statusCodes } from "../../../api/APIConstant";
import { DeviceInfoManager } from "../../../constants/utils/DeviceInfo";
import { zustandStore } from "../../../store";

const SignInContainer = ({ navigation }: any) => {
  const signinApi = zustandStore.AuthStore((state) => state.signin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+91");

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const mobileNumberRef = useRef<TextInput>(null);

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [mobileNumberFocused, setMobileNumberFocused] = useState(false);

  const [isEmailSelected, setIsEmailSelected] = useState(true);

  // Country Code
  const countryList: CountryDataType[] = CountryData;
  const [countryArray, setCountryArray] =
    useState<CountryDataType[]>(countryList);
  const [countryModal, setCountryModal] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");

  const onPressEmail = () => {
    setIsEmailSelected(true);
  };
  const onPressPhone = () => {
    setIsEmailSelected(false);
  };

  const handleOnPressCountryCode = () => {
    setCountryModal(true);
    setSearchCountry("");
    setCountryArray(countryList);
  };

  const handleOnChangeSearchCountry = (text: string) => {
    if (text.trim() === "") {
      setSearchCountry("");
      setCountryArray(countryList);
    } else {
      const filtered = countryList.filter(
        (item) =>
          item.dial_code.toLowerCase().includes(text.toLowerCase()) ||
          item.name.toLowerCase().includes(text.toLowerCase())
      );
      setSearchCountry(text);
      setCountryArray(filtered);
    }
  };

  const handleOnSelectCountry = (item: CountryDataType) => {
    setCountryCode(item.dial_code);
    setCountryModal(false);
  };

  const handleOnPressBackCountryModal = () => {
    setCountryModal(false);
  };

  const handleOnChangeText = (text: string, type: string) => {
    if (type === "email") {
      const newText = text.replace(/\s/g, "");
      if (!containsEmoji(newText)) {
        setEmail(newText);
      }
    } else if (type === "mobileNumber") {
      const onlyDigits = text.replace(/[^0-9]/g, "");
      setMobileNumber(onlyDigits);
    } else {
      const newText = text.replace(/\s/g, "");
      if (!containsEmoji(newText)) {
        setPassword(newText);
      }
    }
  };

  const handleOnSubmit = (type: string) => {
    if (type === "email") {
      passwordRef?.current?.focus();
    }
  };

  const handleOnPressEye = () => {
    setShowPassword(!showPassword);
  };

  const handleOnFocus = (type: string) => {
    if (type === "email") {
      setEmailFocused(true);
    } else if (type === "mobileNumber") {
      setMobileNumberFocused(true);
    } else {
      setPasswordFocused(true);
    }
  };

  const handleOnBlur = (type: string) => {
    if (type === "email") {
      setEmailFocused(false);
    } else if (type === "mobileNumber") {
      setMobileNumberFocused(true);
    } else {
      setPasswordFocused(false);
    }
  };

  const handleOnPressSignIn = () => {
    if (isEmailSelected) {
      if (email.trim() == "") {
        flashMessageWarning(getTranslation("emptyEmail"));
      } else if (!regex.email.test(email)) {
        flashMessageWarning(getTranslation("invalidEmail"));
      } else if (password.trim() == "") {
        flashMessageWarning(getTranslation("emptyPassword"));
      }
      // else if (!regex.password.test(password)) {
      //   flashMessageWarning(getTranslation('invalidPassword'));
      // }
      else {
        handleAPISignup();
      }
    } else {
      if (mobileNumber.trim() === "") {
        flashMessageWarning(getTranslation("emptyMobileNumber"));
      } else if (!regex.mobile.test(mobileNumber)) {
        flashMessageWarning(getTranslation("invalidMobileNumber"));
      } else {
        handleAPISignup();
      }
    }
  };

  const handleAPISignup = async () => {
    console.log("type ===>>", DeviceInfoManager.getPlatformType());
    const dictData: DeviceInfoType = {
      device_type: DeviceInfoManager.getPlatformType(),
      device_token: "0",
      os_version: await DeviceInfoManager.getVersion(),
      device_name: await DeviceInfoManager.getDeviceName(),
      model_name: await DeviceInfoManager.getModel(),
      ip: await DeviceInfoManager.getIpAddress(),
      uuid: await DeviceInfoManager.getUniqueId(),
      sign_in_type: isEmailSelected ? "email" : "phone",
    };

    if (isEmailSelected) {
      dictData.email = email.trim();
      dictData.password = password.trim();
      dictData.mobile_number = Number(mobileNumber);
      dictData.country_code = countryCode.trim();
    } else {
      dictData.mobile_number = Number(mobileNumber);
      dictData.country_code = countryCode.trim();
    }

    try {
      const response = await signinApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ && console.log("SIGNIN RESPONSE===>", response);
        if (response.code === statusCodes.success) {
          if (isEmailSelected) {
            flashMessageSucess(response.message);
          }
          const userTokenFromBackend = (response?.data as SignupResponse)
            ?.device_info?.token;
          console.log("userTokenFromBackend", userTokenFromBackend);
          MmkvManager.setData(MmkvManager.Keys.userToken, userTokenFromBackend);
          const customer_details = (response?.data as SignupResponse)
            ?.customer_details;
          MmkvManager.setData(
            MmkvManager.Keys.customerDetails,
            JSON.stringify(customer_details)
          );

          const customerId = (response?.data as any)?.customer_details?.id;
          MmkvManager.setData(MmkvManager.Keys.customerId, customerId);
          if (isEmailSelected) {
            setEmail("");
            setPassword("");
            MmkvManager.setData(MmkvManager.Keys.isLoggedIn, "true");
            MmkvManager.setData(MmkvManager.Keys.isGuestUser, "false");
            // flashMessageSucess(getTranslation("loginSuccessfully"));
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{ name: ScreenNames.bottomTabsNavigation }],
              })
            );
          } else {
            setMobileNumber("");
            navigation.navigate("Verification", {
              countryCode: countryCode,
              mobileNumber: mobileNumber,
              navigateFromSignup: false,
              siginPhone: true,
            });
          }
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  const [isNavigating, setIsNavigating] = useState(false);

  const handleOnPressSignUp = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    navigation.replace("Sign Up");
    // Reset the flag after a short delay
    setTimeout(() => {
      setIsNavigating(false);
    }, 1000);
  };

  const handleOnPressForgotPassword = () => {
    navigation.navigate("Forgot Password");
  };

  const handleOnPressGuest = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    MmkvManager.setData(MmkvManager.Keys.isGuestUser, "true");
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: ScreenNames.bottomTabsNavigation }],
      })
    );
    setTimeout(() => {
      setIsNavigating(false);
    }, 1000);
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>{ScreenNames.signin}</Text>
      ),
    });
  }, []);

  return (
    <SignInComponent
      email={email}
      password={password}
      showPassword={showPassword}
      emailRef={emailRef}
      passwordRef={passwordRef}
      handleOnChangeText={handleOnChangeText}
      handleOnSubmit={handleOnSubmit}
      handleOnPressEye={handleOnPressEye}
      handleOnPressSignIn={handleOnPressSignIn}
      handleOnPressSignUp={handleOnPressSignUp}
      emailFocused={emailFocused}
      passwordFocused={passwordFocused}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
      handleOnPressForgotPassword={handleOnPressForgotPassword}
      isEmailSelected={isEmailSelected}
      onPressEmail={onPressEmail}
      onPressPhone={onPressPhone}
      mobileNumber={mobileNumber}
      mobileNumberRef={mobileNumberRef}
      mobileNumberFocused={mobileNumberFocused}
      countryCode={countryCode}
      countryArray={countryArray}
      countryModal={countryModal}
      searchCountry={searchCountry}
      handleOnPressCountryCode={handleOnPressCountryCode}
      handleOnChangeSearchCountry={handleOnChangeSearchCountry}
      handleOnSelectCountry={handleOnSelectCountry}
      handleOnPressBackCountryModal={handleOnPressBackCountryModal}
      handleOnPressGuest={handleOnPressGuest}
    />
  );
};

export default SignInContainer;
