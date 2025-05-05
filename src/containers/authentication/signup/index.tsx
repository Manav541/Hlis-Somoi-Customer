import React, {useRef, useState} from 'react';
import SignupComponent from '../../../components/authentication/signup';
import {TextInput} from 'react-native-gesture-handler';
import {regex} from '../../../constants/Regex';
import {flashMessageWarning} from '../../../constants/GConstant';
import {getTranslation} from '../../../localization/i18n/i18n.config';

const SignupContainer = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [isEmailSelected, setIsEmailSelected] = useState(true);

  const onPressEmail=() => {setIsEmailSelected(true)}
  const onPressPhone=() => {setIsEmailSelected(false)}

  const handleOnChangeText = (text: string, type: string) => {
    if (type === 'name') {
      if (regex.fullName.test(text)) {
        setName(text);
      }
    } else if (type === 'email') {
      setEmail(text.replace(/\s/g, ''));
    } else {
      setPassword(text.replace(/\s/g, ''));
    }
  };

  const handleOnSubmit = (type: string) => {
    if (type === 'name') {
      emailRef?.current?.focus();
    } else if (type === 'email') {
      passwordRef?.current?.focus();
    }
  };

  const handleOnPressEye = () => {
    setShowPassword(!showPassword);
  };

  const handleOnFocus = (type: string) => {
    if (type === 'name') {
      setNameFocused(true);
    } else if (type === 'email') {
      setEmailFocused(true);
    } else {
      setPasswordFocused(true);
    }
  };

  const handleOnBlur = (type: string) => {
    if (type === 'name') {
      setNameFocused(false);
    } else if (type === 'email') {
      setEmailFocused(false);
    } else {
      setPasswordFocused(false);
    }
  };

  const handleOnPressSignup = () => {
    if (name.trim() == '') {
      flashMessageWarning(getTranslation('emptyName'));
    } else if (email.trim() == '') {
      flashMessageWarning(getTranslation('emptyEmail'));
    } else if (!regex.email.test(email)) {
      flashMessageWarning(getTranslation('invalidEmail'));
    } else if (password.trim() == '') {
      flashMessageWarning(getTranslation('emptyPassword'));
    } else if (!regex.password.test(password)) {
      flashMessageWarning(getTranslation('invalidPassword'));
    } else {
      setName('');
      setEmail('');
      setPassword('');
      navigation.navigate('Verification', {
        email: email.toLowerCase(),
        navigateFromSignup: true,
      });
    }
  };

  const handleOnPressSignIn = () => {
    navigation.replace('Sign In');
  };

  return (
    <SignupComponent
      name={name}
      email={email}
      password={password}
      nameRef={nameRef}
      emailRef={emailRef}
      passwordRef={passwordRef}
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
    />
  );
};

export default SignupContainer;
