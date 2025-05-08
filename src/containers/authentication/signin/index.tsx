import React, {useEffect, useRef, useState} from 'react';
import SignInComponent from '../../../components/authentication/signin';
import {TextInput} from 'react-native-gesture-handler';
import {flashMessageSucess, flashMessageWarning} from '../../../constants/GConstant';
import {getTranslation} from '../../../localization/i18n/i18n.config';
import {regex} from '../../../constants/Regex';
import { CountryDataType } from '../../../constants/utils/interfaces';
import { CountryData } from '../../../constants/utils/CountryData';
import { MmkvManager } from '../../../constants/utils/MmkvManager';
import { CommonActions } from '@react-navigation/native';
import { ScreeNames } from '../../../routers';

const SignInContainer = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const onPressEmail=() => {setIsEmailSelected(true)}
  const onPressPhone=() => {setIsEmailSelected(false)}

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
    if (type === 'email') {
      setEmail(text.replace(/\s/g, ''));
    }else if (type === "mobileNumber") {
      const onlyDigits = text.replace(/[^0-9]/g, "");
      setMobileNumber(onlyDigits);
    } else {
      setPassword(text.replace(/\s/g, ''));
    }
  };

  const handleOnSubmit = (type: string) => {
    if (type === 'email') {
      passwordRef?.current?.focus();
    }
    
  };

  const handleOnPressEye = () => {
    setShowPassword(!showPassword);
  };

  const handleOnFocus = (type: string) => {
    if (type === 'email') {
      setEmailFocused(true);
    }else if (type === "mobileNumber") {
      setMobileNumberFocused(true);
    } else {
      setPasswordFocused(true);
    }
  };

  const handleOnBlur = (type: string) => {
    if (type === 'email') {
      setEmailFocused(false);
    }else if (type === "mobileNumber") {
      setMobileNumberFocused(true);
    } else {
      setPasswordFocused(false);
    }
  };

  const handleOnPressSignIn = () => {
    if (isEmailSelected) {
      if (email.trim() == '') {
        flashMessageWarning(getTranslation('emptyEmail'));
      } else if (!regex.email.test(email)) {
        flashMessageWarning(getTranslation('invalidEmail'));
      } else if (password.trim() == '') {
        flashMessageWarning(getTranslation('emptyPassword'));
      } else if (!regex.password.test(password)) {
        flashMessageWarning(getTranslation('invalidPassword'));
      } else {
        setEmail('');
        setPassword('');
        MmkvManager.setData(MmkvManager.Keys.isLoggedIn, 'true');
      flashMessageSucess(getTranslation('loginSuccessfully'));
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: ScreeNames.bottomTabsNavigation}],
        }),
      );
      }
    }
    else {
      if (mobileNumber.trim() === "") {
        flashMessageWarning(getTranslation("emptyMobileNumber"));
      } else if (!regex.mobile.test(mobileNumber)) {
        flashMessageWarning(getTranslation("invalidMobileNumber"));
      } else {
        setMobileNumber("");
        navigation.navigate("Verification", {
          countryCode: countryCode,
          mobileNumber: mobileNumber,
          navigateFromSignup: false,
        });
      }
    }
    
  };

  const handleOnPressSignUp = () => {
    navigation.replace('Sign Up');
  };

  const handleOnPressForgotPassword = () => {
    navigation.navigate('Forgot Password');
  };

  const handleOnPressGuest =()=>{
    MmkvManager.setData(MmkvManager.Keys.isGuestUser, 'true');
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: ScreeNames.bottomTabsNavigation}],
        }),
      );
  }

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
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
