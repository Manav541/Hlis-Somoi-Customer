import React, { RefObject, useEffect, useRef, useState } from "react";
import VerificationComponent from "../../../components/authentication/verification";
import GlobalBackButton from "../../../global/GlobalBackButton";
import { AppState, Keyboard, Text, TextInput } from "react-native";
import { regex } from "../../../constants/Regex";
import { OTPManager } from "../../../constants/utils/OTP";
import {
  flashMessageSucess,
  flashMessageWarning,
} from "../../../constants/GConstant";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { MmkvManager } from "../../../constants/utils/MmkvManager";
import { CommonActions } from "@react-navigation/native";
import { ScreenNames } from "../../../routers";
import { constnatStyles } from "../../../constants/Styles";
import { zustandStore } from "../../../store";

interface OtpArray {
  value: string;
  ref: RefObject<TextInput | null>;
}

const VerificationContainer = ({ navigation, route }: any) => {
  // API Zustand Store
  const otpVerificationApi = zustandStore.OtpVerificationStore(
    (state) => state.otpVerification
  );
  const requestResendOtpApi = zustandStore.OtpVerificationStore(
    (state) => state.requestResendOtp
  );

  const [fullOtp, setFullOtp] = useState<string | number>("");
  const [otp, setOtp] = useState(60);
  const [resendOtp, setResendOtp] = useState(true);
  const [otpArray, setOtpArray] = useState<OtpArray[]>([
    {
      value: "",
      ref: useRef<TextInput>(null),
    },
    {
      value: "",
      ref: useRef<TextInput>(null),
    },
    {
      value: "",
      ref: useRef<TextInput>(null),
    },
    {
      value: "",
      ref: useRef<TextInput>(null),
    },
  ]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const appStateRef = useRef(AppState.currentState);
  const [emailFromRoute, setEmailFromRoute] = useState("");
  const [countryCode, setCountryCode] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const {
    navigateFromSignup,
    navigateFromForgotPassword,
    navigateFromChangeEmailPhone,
  } = route?.params;

  //handleOnChangeText
  const handleOnChangeText = (text: string, index: number) => {
    if (regex.number.test(text)) {
      const updatedValue = [...otpArray];
      updatedValue[index].value = text;
      setOtpArray(updatedValue);
      if (text?.length === 1) {
        handleOnSubmit(index);
      }
    }
  };

  //handleOnSubmit
  const handleOnSubmit = (index: number) => {
    if (index === otpArray.length - 1) {
      Keyboard.dismiss();
    } else {
      const updatedValue = [...otpArray];
      updatedValue[index + 1].ref?.current?.focus();
      setOtpArray(updatedValue);
    }
  };

  //handleOnKeyPress
  const handleOnKeyPress = ({ nativeEvent }: any, item: any, index: number) => {
    if (nativeEvent.key === "Backspace" && item.value === "") {
      if (index > 0) {
        otpArray[index - 1].ref?.current?.focus();
      } else {
        Keyboard.dismiss();
      }
    } else if (nativeEvent.key === "Backspace") {
      handleOnChangeText("", index);
    }
  };

  const handleResendOtpTimer = () => {
    OTPManager.resendOtpStartTimerReverse(
      60,
      setOtp,
      setResendOtp,
      timerRef,
      startTimeRef,
      appStateRef
    );
  };

  const handleOnPressResendOtp = async () => {
    try {
      const response = await requestResendOtpApi(
        Number(mobileNumber),
        countryCode,
        navigation
      );
      console.log("Data=====>>>>>>", JSON.stringify(response));
      if (response.code == 1) {
        console.log(response);
        flashMessageSucess(response?.message);
        const clearedOtpArray = otpArray.map((item) => ({
          ...item,
          value: "",
        }));
        setOtpArray(clearedOtpArray);
        setFullOtp("");
        handleResendOtpTimer();
      } else if (response.code == 0) {
        flashMessageWarning(response.message);
      }
    } catch (error: any) {
      console.log("Error:", error.message);
    }
  };

  const handleOnPressContinueUpdateSubmit = async () => {
    // Validate OTP
    if (fullOtp.toString().length !== 4) {
      flashMessageWarning(getTranslation("emptyOtp"));
      return;
    } else {
      // Handle forgot password flow
      if (navigateFromForgotPassword) {
        navigation.navigate("Change Password", {
          navigateFromForgotPassword,
        });
      }
      // Handle signup flow
      else if (navigateFromSignup) {
        try {
          const response = await otpVerificationApi(
            Number(mobileNumber),
            countryCode,
            Number(fullOtp),
            emailFromRoute,
            navigation
          );

          console.log("Data=====>>>>>>", JSON.stringify(response));

          if (response.code == 1) {
            console.log(response);
            // Clear OTP fields after successful validation
            const clearedOtpArray = otpArray.map((item) => ({
              ...item,
              value: "",
            }));
            setOtpArray(clearedOtpArray);
            setFullOtp("");

            const userTokenFromBackend = response?.data?.device_info?.token;
            MmkvManager.setData(
              MmkvManager.Keys.userToken,
              userTokenFromBackend
            );

            MmkvManager.setData(MmkvManager.Keys.isLoggedIn, "true");
            flashMessageSucess(response?.message);
            navigation.navigate("Add Address", {
              navigateFromManageAddress: false,
            });
          } else if (response.code == 0) {
            flashMessageWarning(response.message);
          }
        } catch (error: any) {
          console.log("Error:", error.message);
        }
      } else if (navigateFromChangeEmailPhone) {
        if (route?.params?.email) {
          flashMessageSucess(getTranslation("emailUpdateSuccess"));
        } else if (route?.params?.mobileNumber) {
          flashMessageSucess(getTranslation("phoneNumberUpdateSuccess"));
        }
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
      }
      // Handle default login flow
      else {
        MmkvManager.setData(MmkvManager.Keys.isLoggedIn, "true");
        flashMessageSucess(getTranslation("loginSuccessfully"));
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: ScreenNames.bottomTabsNavigation }],
          })
        );
      }
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
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {ScreenNames.verification}
        </Text>
      ),
    });
  };

  // For storing otp in another state
  useEffect(() => {
    const fullOtp = otpArray.map((item: any) => item?.value).join("");
    if (fullOtp) {
      setFullOtp(Number(fullOtp));
    } else {
      setFullOtp("");
    }
  }, [otpArray]);

  useEffect(() => {
    handleResendOtpTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    header();
  }, []);

  useEffect(() => {
    if (route?.params) {
      setEmailFromRoute(route?.params?.email);
      setCountryCode(route?.params?.countryCode);
      setMobileNumber(route?.params?.mobileNumber);
    }
  }, [route]);

  return (
    <VerificationComponent
      otpArray={otpArray}
      handleOnChangeText={handleOnChangeText}
      handleOnSubmit={handleOnSubmit}
      handleOnKeyPress={handleOnKeyPress}
      emailFromRoute={emailFromRoute}
      otp={otp}
      resendOtp={resendOtp}
      onPressResendOtp={handleOnPressResendOtp}
      handleOnPressContinueUpdateSubmit={handleOnPressContinueUpdateSubmit}
      countryCode={countryCode}
      mobileNumber={mobileNumber}
    />
  );
};

export default VerificationContainer;
