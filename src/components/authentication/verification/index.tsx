import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import React, { Ref, RefObject } from "react";
import { constnatStyles } from "../../../constants/Styles";
import GlobalLogoTitle from "../../../global/GlobalLogoTitle";
import { styles } from "./styles";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { colors } from "../../../constants/Colors";
import GlobalButton from "../../../global/GlobalButton";
import { activityOpacity } from "../../../constants/GConstant";

interface OtpArray {
  value: string;
  ref: RefObject<TextInput | null>;
}

interface PropsType {
  otpArray: OtpArray[];
  handleOnChangeText: (text: string, index: number) => void;
  handleOnSubmit: (index: number) => void;
  handleOnKeyPress: (nativeEvent: any, item: any, index: number) => void;
  emailFromRoute: string;
  otp: number;
  resendOtp: boolean;
  onPressResendOtp: () => void;
  handleOnPressContinueUpdateSubmit: () => void;
  countryCode: string;
  mobileNumber: string;
}

const VerificationComponent = (props: PropsType) => {
  return (
    <View style={constnatStyles.vwOrangeBgParent}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <View style={constnatStyles.vwBlueBgWithRadius}>
        <GlobalLogoTitle style={styles.vwLogoTitle} />
        <Text style={styles.lblTitle}>{getTranslation("enterYouOTPDesc")}</Text>
        <Text style={styles.lblTitle}>
          {props?.emailFromRoute
            ? props.emailFromRoute
            : props?.countryCode + ' ' + props?.mobileNumber}
        </Text>

        {/* View OTP Field */}
        <View style={styles.vwOtpMain}>
          {props?.otpArray?.map((item, index) => {
            return (
              <View style={styles.vwTxtInput} key={index}>
                <TextInput
                  maxLength={1}
                  cursorColor={colors.white}
                  selectionColor={colors.white}
                  inputMode="numeric"
                  style={styles.txtInput}
                  value={item?.value}
                  ref={item?.ref}
                  blurOnSubmit={index == props?.otpArray?.length - 1}
                  returnKeyType={
                    index == props?.otpArray?.length - 1 ? "default" : "next"
                  }
                  onChangeText={(text) => {
                    props.handleOnChangeText(text, index);
                  }}
                  onKeyPress={(nativeEvent) => {
                    props.handleOnKeyPress(nativeEvent, item, index);
                  }}
                  onSubmitEditing={() => {
                    props?.handleOnSubmit(index);
                  }}
                />
              </View>
            );
          })}
        </View>

        {/* Continue Button */}
        <GlobalButton
          isOrange
          onPress={props.handleOnPressContinueUpdateSubmit}
          title={getTranslation("continue")}
        />

        {/* Button Resend OTP */}
        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 20 }}
          activeOpacity={activityOpacity}
          disabled={props.resendOtp}
          onPress={props.onPressResendOtp}
        >
          {!props.resendOtp ? (
            <Text style={styles.lblTitle}>{getTranslation("resendOTP")}</Text>
          ) : (
            <Text style={styles.lblResendTitle}>
              {getTranslation("resendIn")}{" "}
              <Text style={[styles.lblResendTitle, { color: colors.white }]}>
                {props.otp} {getTranslation("seconds")}
              </Text>
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerificationComponent;
