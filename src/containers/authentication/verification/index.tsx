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
import { statusCodes } from "../../../api/APIConstant";
import {
  RequestOTPResponseType,
  VerifyOTPResponseType,
} from "../../../constants/interfaces";

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
  const [email, setEmail] = useState("");
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
    const dictData: RequestOTPResponseType = {};

    if (email) {
      dictData.email = email;
    } else {
      dictData.mobile_number = Number(mobileNumber);
      dictData.country_code = countryCode.trim();
    }

    try {
      const response = await requestResendOtpApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ && console.log("SIGNUP RESPONSE===>", response);
        if (response.code === statusCodes.success) {
          flashMessageSucess(response.message);
          const clearedOtpArray = otpArray.map((item) => ({
            ...item,
            value: "",
          }));
          setOtpArray(clearedOtpArray);
          setFullOtp("");
          handleResendOtpTimer();
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  const handleOnPressContinueUpdateSubmit = async () => {
    // Validate OTP
    if (fullOtp.toString().length !== 4) {
      flashMessageWarning(getTranslation("emptyOtp"));
      return;
    } else {
      handleotpVerificationApi();
    }
  };

  const handleotpVerificationApi = async () => {
    const dictData: VerifyOTPResponseType = {
      otp: Number(fullOtp),
    };

    if (email) {
      dictData.email = email;
    } else {
      dictData.mobile_number = Number(mobileNumber);
      dictData.country_code = countryCode.trim();
    }

    try {
      const response = await otpVerificationApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ && console.log("OTP VERIFICATION RESPONSE===>", response);
        if (response.code === statusCodes.success) {
          // Clear OTP fields after successful validation
          const clearedOtpArray = otpArray.map((item) => ({
            ...item,
            value: "",
          }));
          setOtpArray(clearedOtpArray);
          setFullOtp("");

          // Handle forgot password flow
          if (navigateFromForgotPassword) {
            navigation.navigate(ScreenNames.changePassword, {
              navigateFromForgotPassword,
              email: email,
            });
          }
          // Handle signup flow
          else if (navigateFromSignup) {
            flashMessageSucess(response?.message);
            const userTokenFromBackend = (response?.data as any)?.device_info?.token;
            console.log("userTokenFromBackend", userTokenFromBackend);
            MmkvManager.setData(
              MmkvManager.Keys.userToken,
              userTokenFromBackend
            );
            const customer_id = (response?.data as any)?.customer_details?.id;
            MmkvManager.setData(MmkvManager.Keys.isLoggedIn, "true");

            navigation.navigate(ScreenNames.addAddress, {
              navigateFromManageAddress: false,
              customer_id:customer_id
            });
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
      setEmail(route?.params?.email);
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
      email={email}
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
