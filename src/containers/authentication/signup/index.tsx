import React, { useEffect, useRef, useState } from "react";
import SignupComponent from "../../../components/authentication/signup";
import { regex } from "../../../constants/Regex";
import {
  flashMessageSucess,
  flashMessageWarning,
} from "../../../constants/GConstant";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { CountryData } from "../../../constants/utils/CountryData";
import { CountryDataType, DeviceInfoType } from "../../../constants/interfaces";
import { MmkvManager } from "../../../constants/utils/MmkvManager";
import { CommonActions } from "@react-navigation/native";
import { ScreenNames } from "../../../routers";
import { constnatStyles } from "../../../constants/Styles";
import { Text, TextInput } from "react-native";
import { APIManager } from "../../../api/ApiManager";
import { apiEndPoint, statusCodes } from "../../../api/APIConstant";
import { DeviceInfoManager } from "../../../constants/utils/DeviceInfo";
import { zustandStore } from "../../../store";
import DeviceInfo from "react-native-device-info";

const SignupContainer = ({ navigation }: any) => {
  // API Zustand Store
  const signupApi = zustandStore.AuthStore((state) => state.signup);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+91");

  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const mobileNumberRef = useRef<TextInput>(null);

  const [nameFocused, setNameFocused] = useState(false);
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
    if (type === "name") {
      if (regex.fullName.test(text)) {
        setName(text);
      }
    } else if (type === "email") {
      setEmail(text.replace(/\s/g, ""));
    } else if (type === "password") {
      setPassword(text.replace(/\s/g, ""));
    } else if (type === "mobileNumber") {
      const onlyDigits = text.replace(/[^0-9]/g, "");
      setMobileNumber(onlyDigits);
    }
  };

  const handleOnSubmit = (type: string) => {
    if (type === "name") {
      emailRef?.current?.focus();
    } else if (type === "email") {
      mobileNumberRef?.current?.focus();
    } else if (type === "mobileNumber") {
      passwordRef?.current?.focus();
    }
  };

  const handleOnPressEye = () => {
    setShowPassword(!showPassword);
  };

  const handleOnFocus = (type: string) => {
    if (type === "name") {
      setNameFocused(true);
    } else if (type === "email") {
      setEmailFocused(true);
    } else if (type === "password") {
      setPasswordFocused(true);
    } else if (type === "mobileNumber") {
      setMobileNumberFocused(true);
    }
  };

  const handleOnBlur = (type: string) => {
    if (type === "name") {
      setNameFocused(false);
    } else if (type === "email") {
      setEmailFocused(false);
    } else if (type === "password") {
      setPasswordFocused(false);
    } else if (type === "mobileNumber") {
      setMobileNumberFocused(false);
    }
  };

  const handleOnPressSignup = () => {
    if (isEmailSelected) {
      if (name.trim() === "") {
        flashMessageWarning(getTranslation("emptyName"));
      } else if (email.trim() === "") {
        flashMessageWarning(getTranslation("emptyEmail"));
      } else if (!regex.email.test(email)) {
        flashMessageWarning(getTranslation("invalidEmail"));
      } else if (mobileNumber.trim() === "") {
        flashMessageWarning(getTranslation("emptyMobileNumber"));
      } else if (!regex.mobile.test(mobileNumber)) {
        flashMessageWarning(getTranslation("invalidMobileNumber"));
      } else if (password.trim() === "") {
        flashMessageWarning(getTranslation("emptyPassword"));
      } else if (!regex.password.test(password)) {
        flashMessageWarning(getTranslation("invalidPassword"));
      } else {
        handleAPISignup();
      }
    } else if (mobileNumber.trim() === "") {
      flashMessageWarning(getTranslation("emptyMobileNumber"));
    } else if (!regex.mobile.test(mobileNumber)) {
      flashMessageWarning(getTranslation("invalidMobileNumber"));
    } else {
      handleAPISignup();
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
      const response = await signupApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ && console.log("SIGNUP RESPONSE===>", response);
        if (response.code === statusCodes.success) {
          flashMessageSucess(response.message);
          setEmail("");
          setMobileNumber("");
          setPassword("");
          setEmailFocused(false);
          setMobileNumberFocused(false);
          setPasswordFocused(false);
          navigation.navigate("Verification", {
            mobileNumber: mobileNumber,
            countryCode: countryCode,
            navigateFromSignup: true,
          });
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  const [isNavigating, setIsNavigating] = useState(false);

  const handleOnPressSignIn = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    navigation.replace("Sign In");
    // Reset the flag after a short delay
    setTimeout(() => {
      setIsNavigating(false);
    }, 1000);
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

  const onPressCMS = (page: string) => {
    navigation.navigate(ScreenNames.cmsPage, { navigateFrom: page });
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>{ScreenNames.signup}</Text>
      ),
    });
  }, []);

  return (
    <SignupComponent
      name={name}
      email={email}
      password={password}
      nameRef={nameRef}
      emailRef={emailRef}
      passwordRef={passwordRef}
      mobileNumber={mobileNumber}
      mobileNumberRef={mobileNumberRef}
      mobileNumberFocused={mobileNumberFocused}
      handleOnChangeText={handleOnChangeText}
      handleOnSubmit={handleOnSubmit}
      showPassword={showPassword}
      handleOnPressEye={handleOnPressEye}
      handleOnPressSignup={handleOnPressSignup}
      handleOnPressSignIn={handleOnPressSignIn}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
      nameFocused={nameFocused}
      emailFocused={emailFocused}
      passwordFocused={passwordFocused}
      isEmailSelected={isEmailSelected}
      onPressEmail={onPressEmail}
      onPressPhone={onPressPhone}
      countryCode={countryCode}
      countryArray={countryArray}
      countryModal={countryModal}
      searchCountry={searchCountry}
      handleOnPressCountryCode={handleOnPressCountryCode}
      handleOnChangeSearchCountry={handleOnChangeSearchCountry}
      handleOnSelectCountry={handleOnSelectCountry}
      handleOnPressBackCountryModal={handleOnPressBackCountryModal}
      handleOnPressGuest={handleOnPressGuest}
      onPressCMS={onPressCMS}
    />
  );
};

export default SignupContainer;
