import React, {useEffect, useRef, useState} from 'react';
import ForgotPasswordComponent from '../../../components/authentication/forgotPassword';
import GlobalBackButton from '../../../global/GlobalBackButton';
import {TextInput} from 'react-native';
import {flashMessageWarning} from '../../../constants/GConstant';
import {getTranslation} from '../../../localization/i18n/i18n.config';
import {regex} from '../../../constants/Regex';

const ForgotPasswordContainer = ({navigation, route}: any) => {
  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => null,
    });
  };

  const [email, setEmail] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const [emailFocused, setEmailFocused] = useState(false);

  const handleOnChangeText = (text: string) => {
    setEmail(text.replace(/\s/g, ''));
  };

  const handleOnFocus = () => {
    setEmailFocused(true);
  };

  const handleOnBlur = () => {
    setEmailFocused(false);
  };

  const handleOnPressSubmit = () => {
    if (email.trim() == '') {
      flashMessageWarning(getTranslation('emptyEmail'));
    } else if (!regex.email.test(email)) {
      flashMessageWarning(getTranslation('invalidEmail'));
    } else {
      setEmail('');
      navigation.navigate('Verification', {
        email: email.toLowerCase(),
        navigateFromForgotPassword: true,
      });
    }
  };

  useEffect(() => {
    header();
  }, []);

  return (
    <ForgotPasswordComponent
      email={email}
      emailRef={emailRef}
      emailFocused={emailFocused}
      handleOnChangeText={handleOnChangeText}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
      handleOnPressSubmit={handleOnPressSubmit}
    />
  );
};

export default ForgotPasswordContainer;
