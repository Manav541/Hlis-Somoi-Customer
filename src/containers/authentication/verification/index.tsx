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
  DeviceInfoType,
  RequestOTPResponseType,
  updatePhoneEmailApiResponseType,
  VerifyOTPResponseType,
} from "../../../constants/interfaces";
import { DeviceInfoManager } from "../../../constants/utils/DeviceInfo";

interface OtpArray {
  value: string;
  ref: RefObject<TextInput | null>;
}

const VerificationContainer = ({ navigation, route }: any) => {
  // API Zustand Store
  const signupApi = zustandStore.AuthStore((state) => state.signup);
  const otpVerificationApi = zustandStore.OtpVerificationStore(
    (state) => state.otpVerification
  );
  const requestResendOtpApi = zustandStore.OtpVerificationStore(
    (state) => state.requestResendOtp
  );
  const updatePhoneEmail = zustandStore.AuthStore(
    (state) => state.updatePhoneEmail
  );

  const [customerId, setCustomerId] = useState<string>("");
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
  const [responseOTP, setResponseOTP] = useState<string | number>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [isEmailSelected, setIsEmailSelected] = useState(false);
  const {
    navigateFromSignup,
    navigateFromForgotPassword,
    navigateFromChangeEmailPhone,
    changeEmail,
    changePhone,
    siginPhone,
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
    const dictData: RequestOTPResponseType = {
      type: navigateFromSignup
        ? 'signup'
        : changeEmail
        ? 'changeEmail'
        : changePhone
        ? 'changePhone'
        : 'login',

    };

    if (email) {
      dictData.email = email;
    } else {
      dictData.mobile_number = Number(mobileNumber);
      dictData.country_code = countryCode.trim();
    }

    if (navigateFromChangeEmailPhone) {
      dictData.customer_id = customerId.toString();
    }

    try {
      const response = await requestResendOtpApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ && console.log("REQUEST OTP RESPONSE===>", response);
        if (response.code === statusCodes.success) {
          flashMessageSucess(getTranslation('otpResendSuccessfully'));
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
    } else if (
      navigateFromSignup &&
      fullOtp.toString() !== responseOTP.toString()
    ) {
      flashMessageWarning(getTranslation("invalidOtp"));
      return;
    } else {
      // Call the appropriate API based on the navigation flow
      if (navigateFromSignup) {
        handleAPISignup();
      } else if (navigateFromChangeEmailPhone) {
        handleUpdatePhoneEmailVerificationApi();
      } else {
        handleOtpVerificationApi();
      }
    }
  };

  const handleAPISignup = async () => {
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
      dictData.name = name.trim();
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
          // Clear OTP fields after successful validation
          const clearedOtpArray = otpArray.map((item) => ({
            ...item,
            value: "",
          }));
          setOtpArray(clearedOtpArray);
          setFullOtp("");
          const userTokenFromBackend = (response?.data as any)?.device_info
            ?.token;
          console.log("userTokenFromBackend", userTokenFromBackend);
          MmkvManager.setData(MmkvManager.Keys.userToken, userTokenFromBackend);
          const customer_details = (response?.data as any)?.customer_details;
          MmkvManager.setData(
            MmkvManager.Keys.customerDetails,
            customer_details
          );

          const customerId = (response?.data as any)?.customer_details?.id;
          MmkvManager.setData(MmkvManager.Keys.customerId, customerId);

          MmkvManager.setData(MmkvManager.Keys.isLoggedIn, "true");
          MmkvManager.setData(MmkvManager.Keys.isGuestUser, "false");

          navigation.navigate(ScreenNames.addAddress, {
            navigateFromManageAddress: false,
          });
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  const handleUpdatePhoneEmailVerificationApi = async () => {
    const dictData: updatePhoneEmailApiResponseType = {
      otp: Number(fullOtp),
    };

    if (email) {
      dictData.new_email = email;
      dictData.change_type = "email";
    } else {
      dictData.new_mobile_number = Number(mobileNumber);
      dictData.new_country_code = countryCode.trim();
      dictData.change_type = "phone";
    }

    try {
      const response = await updatePhoneEmail(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ && console.log("OTP VERIFICATION RESPONSE===>", response);
        if (response.code === statusCodes.success) {
          flashMessageSucess(response.message);
          // Clear OTP fields after successful validation
          const clearedOtpArray = otpArray.map((item) => ({
            ...item,
            value: "",
          }));
          setOtpArray(clearedOtpArray);
          setFullOtp("");

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

  const handleOtpVerificationApi = async () => {
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
          if (navigateFromForgotPassword) {
            flashMessageSucess(getTranslation('otpVerifiedSucessfully'));
            navigation.navigate(ScreenNames.changePassword, {
              navigateFromForgotPassword,
              email: email,
            });
          } else if (navigateFromChangeEmailPhone) {
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
          } else {
            flashMessageSucess(response.message);
            MmkvManager.setData(MmkvManager.Keys.isLoggedIn, "true");
            MmkvManager.setData(MmkvManager.Keys.isGuestUser, "false");
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
      console.log("route?.params", route?.params);

      setName(route?.params?.name);
      setEmail(route?.params?.email);
      setPassword(route?.params?.password);
      setCountryCode(route?.params?.countryCode);
      setMobileNumber(route?.params?.mobileNumber);
      setIsEmailSelected(route?.params?.isEmailSelected);
      setResponseOTP(route?.params?.responseOTP);
    }
  }, [route]);

  useEffect(() => {
    MmkvManager.getData(MmkvManager.Keys.customerId, (customerId) => {
      console.log("customerId from MMKV:", customerId);
      setCustomerId(customerId || "");
    });
  }, []);

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
      navigateFromSignup={navigateFromSignup}
      changeEmail={changeEmail}
      changePhone={changePhone}
      siginPhone={siginPhone}
    />
  );
};

export default VerificationContainer;
