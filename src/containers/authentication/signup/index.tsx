import React, { useRef, useState } from "react";
import SignupComponent from "../../../components/authentication/signup";
import { regex } from "../../../constants/Regex";
import { flashMessageWarning } from "../../../constants/GConstant";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { CountryData } from "../../../constants/utils/CountryData";
import { CountryDataType } from "../../../constants/utils/interfaces";
import { TextInput } from "react-native-gesture-handler";

const SignupContainer = ({ navigation }: any) => {
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

  const onPressEmail = () => setIsEmailSelected(true);
  const onPressPhone = () => setIsEmailSelected(false);

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
    }
    else if (type === "mobileNumber") {
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
      } else if (password.trim() === "") {
        flashMessageWarning(getTranslation("emptyPassword"));
      } else if (!regex.password.test(password)) {
        flashMessageWarning(getTranslation("invalidPassword"));
      } else {
        setName("");
        setEmail("");
        setPassword("");
        navigation.navigate("Verification", {
          email: email.toLowerCase(),
          navigateFromSignup: true,
        });
      }
    } else {
      if (mobileNumber.trim() === "") {
        flashMessageWarning(getTranslation("emptyMobileNumber"));
      } else if (!regex.mobile.test(mobileNumber)) {
        flashMessageWarning(getTranslation("invalidMobileNumber"));
      } else {
        setMobileNumber("");
        navigation.navigate("Verification", {
          countryCode: countryCode,
          mobileNumber: mobileNumber,
          navigateFromSignup: true,
        });
      }
    }
  };

  const handleOnPressSignIn = () => {
    navigation.replace("Sign In");
  };

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
    />
  );
};

export default SignupContainer;
