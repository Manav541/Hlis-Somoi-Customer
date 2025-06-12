import React, { useEffect, useRef, useState } from "react";
import ChangeEmailPhoneNumberComponenet from "../../components/changeEmailPhoneNumber";
import { getTranslation } from "../../localization/i18n/i18n.config";
import GlobalBackButton from "../../global/GlobalBackButton";
import { styles } from "./styles";
import { StatusBar, Text, TextInput, View } from "react-native";
import { flashMessageSucess, flashMessageWarning } from "../../constants/GConstant";
import { regex } from "../../constants/Regex";
import { useFocusEffect } from "@react-navigation/native";
import { constnatStyles } from "../../constants/Styles";
import {
  CountryDataType,
  updatePhoneEmailVerificationApiResponseType,
} from "../../constants/interfaces";
import { CountryData } from "../../constants/utils/CountryData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../constants/Colors";
import { ScreenNames } from "../../routers";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";

const ChangeEmailPhoneNumberContainer = ({ navigation, route }: any) => {
  // API Zustand Store
  const updatePhoneEmailVerificationApi = zustandStore.AuthStore(
    (state) => state.updatePhoneEmailVerification
  );
  const insets = useSafeAreaInsets();
  const navigateFrom = route.params?.navigateFrom;
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+91");
  const emailRef = useRef<TextInput | null>(null);
  const mobileNumberRef = useRef<TextInput>(null);
  const [emailFocused, setEmailFocused] = useState(false);
  const [mobileNumberFocused, setMobileNumberFocused] = useState(false);

  // Country Code
  const countryList: CountryDataType[] = CountryData;
  const [countryArray, setCountryArray] =
    useState<CountryDataType[]>(countryList);
  const [countryModal, setCountryModal] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");

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
    if (navigateFrom === "ChangeEmail") {
      if (type === "email") {
        setEmail(text.replace(/\s/g, ""));
      }
    } else {
      if (type === "mobileNumber") {
        const onlyDigits = text.replace(/[^0-9]/g, "");
        setMobileNumber(onlyDigits);
      }
    }
  };

  const handleOnFocus = (type: string) => {
    if (navigateFrom === "ChangeEmail") {
      if (type === "email") {
        setEmailFocused(true);
      }
    } else {
      if (type === "mobileNumber") {
        setMobileNumberFocused(true);
      }
    }
  };

  const handleOnBlur = (type: string) => {
    if (navigateFrom === "ChangeEmail") {
      if (type === "email") {
        setEmailFocused(true);
      }
    } else {
      if (type === "mobileNumber") {
        setMobileNumberFocused(true);
      }
    }
  };

  const handleOnPressSubmit = () => {
    if (navigateFrom === "ChangeEmail") {
      if (email.trim() === "") {
        flashMessageWarning(getTranslation("emptyEmail"));
      } else if (!regex.email.test(email)) {
        flashMessageWarning(getTranslation("invalidEmail"));
      } else {
        handleUpdatePhoneEmailVerificationApi();
      }
    } else {
      if (mobileNumber.trim() === "") {
        flashMessageWarning(getTranslation("emptyMobileNumber"));
      } else if (!regex.mobile.test(mobileNumber)) {
        flashMessageWarning(getTranslation("invalidMobileNumber"));
      } else {
        handleUpdatePhoneEmailVerificationApi();
      }
    }
  };

  const handleUpdatePhoneEmailVerificationApi = async () => {
    const dictData: updatePhoneEmailVerificationApiResponseType = {};

    if (navigateFrom === "ChangeEmail") {
      dictData.email = email;
      dictData.change_type = "email";
    } else {
      dictData.mobile_number = Number(mobileNumber);
      dictData.country_code = countryCode.trim();
      dictData.change_type = "phone";
    }

    try {
      const response = await updatePhoneEmailVerificationApi(
        dictData,
        navigation
      );
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("UPDATE PHONE EMAIL VERIFY RESPONSE===>", response);
        if (response.code === statusCodes.success) {
          // flashMessageSucess(response.message);
          if (navigateFrom === "ChangeEmail") {
            setEmail("");
            navigation.navigate(ScreenNames.verification, {
              email: email.toLowerCase(),
              navigateFromChangeEmailPhone: true,
              changeEmail: true,
            });
          } else {
            setMobileNumber("");
            navigation.navigate(ScreenNames.verification, {
              countryCode: countryCode,
              mobileNumber: mobileNumber,
              navigateFromChangeEmailPhone: true,
              changePhone: true,
            });
          }
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        } else if (response.code === statusCodes.emptyData) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  const header = () => {
    navigation.setOptions({
      header: () => (
        <View
          style={[constnatStyles.vwHeader, { paddingTop: insets.top + 10 }]}
        >
          <GlobalBackButton
            onPress={() => navigation.goBack()}
            style={{ marginBottom: 0 }}
          />
          <Text style={constnatStyles.lblHeaderTitle}>
            {navigateFrom === "ChangeEmail"
              ? getTranslation("changeEmail")
              : getTranslation("changePhoneNumber")}
          </Text>
          <View style={{ width: 24 }}></View>
        </View>
      ),
      // headerLeft: () => (
      //   <GlobalBackButton onPress={() => navigation.goBack()} />
      // ),
      // headerTitle: () => (
      //   <Text style={constnatStyles.lblHeaderTitle}>
      //     {navigateFrom === "ChangeEmail"
      //       ? getTranslation("changeEmail")
      //       : getTranslation("changePhoneNumber")}
      //   </Text>
      // ),
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
      mobileNumber={mobileNumber}
      mobileNumberRef={mobileNumberRef}
      mobileNumberFocused={mobileNumberFocused}
      handleOnChangeText={handleOnChangeText}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
      handleOnPressSubmit={handleOnPressSubmit}
      navigateFrom={navigateFrom}
      countryCode={countryCode}
      countryArray={countryArray}
      countryModal={countryModal}
      searchCountry={searchCountry}
      handleOnPressCountryCode={handleOnPressCountryCode}
      handleOnChangeSearchCountry={handleOnChangeSearchCountry}
      handleOnSelectCountry={handleOnSelectCountry}
      handleOnPressBackCountryModal={handleOnPressBackCountryModal}
    />
  );
};

export default ChangeEmailPhoneNumberContainer;
