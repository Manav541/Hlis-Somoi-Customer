import React, {useEffect, useRef, useState} from 'react';
import SignInComponent from '../../../components/authentication/signin';
import {TextInput} from 'react-native-gesture-handler';
import {flashMessageWarning} from '../../../constants/GConstant';
import {getTranslation} from '../../../localization/i18n/i18n.config';
import {regex} from '../../../constants/Regex';

const SignInContainer = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [isEmailSelected, setIsEmailSelected] = useState(true);

  const onPressEmail=() => {setIsEmailSelected(true)}
  const onPressPhone=() => {setIsEmailSelected(false)}

  const handleOnChangeText = (text: string, type: string) => {
    if (type === 'email') {
      setEmail(text.replace(/\s/g, ''));
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
    } else {
      setPasswordFocused(true);
    }
  };

  const handleOnBlur = (type: string) => {
    if (type === 'email') {
      setEmailFocused(false);
    } else {
      setPasswordFocused(false);
    }
  };

  const handleOnPressSignIn = () => {
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
    }
  };

  const handleOnPressSignUp = () => {
    navigation.replace('Sign Up');
  };

  const handleOnPressForgotPassword = () => {
    navigation.navigate('Forgot Password');
  };

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
    />
  );
};

export default SignInContainer;
