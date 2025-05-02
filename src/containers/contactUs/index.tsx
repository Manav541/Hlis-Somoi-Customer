import React, { useEffect, useRef, useState } from 'react'
import ContactUsComponent from '../../components/contactUs'
import GlobalBackButton from '../../global/GlobalBackButton';
import { TextInput } from 'react-native-gesture-handler';
import { regex } from '../../constants/Regex';
import { flashMessageSucess, flashMessageWarning } from '../../constants/GConstant';
import { getTranslation } from '../../localization/i18n/i18n.config';

const ContactUsContainer = ({navigation} : any) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const subjectRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [subjectFocused, setSubjectFocused] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(false);

  const handleOnSubmit = (type: string) => {
    if (type === 'name') {
      emailRef?.current?.focus();
    } else if (type === 'email') {
      subjectRef?.current?.focus();
    }else if (type === 'subject') {
      descriptionRef?.current?.focus();
    }
  };

  const handleOnChangeText = (text: string, type: string) => {
    if (type === 'name') {
      if (regex.fullName.test(text)) {
        setName(text);
      }
    } else if (type === 'email') {
      setEmail(text.replace(/\s/g, ''));
    }else if (type === 'subject') {
      setSubject(text.replace(/\s/g, ''));
    } else {
      setDescription(text.replace(/\s/g, ''));
    }
  };

  const handleOnFocus = (type: string) => {
    if (type === 'name') {
      setNameFocused(true);
    } else if (type === 'email') {
      setEmailFocused(true);
    } else if (type === 'subject') {
      setSubjectFocused(true);
    } else {
      setDescriptionFocused(true);
    }
  };

  const handleOnBlur = (type: string) => {
    if (type === 'name') {
      setNameFocused(true);
    } else if (type === 'email') {
      setEmailFocused(true);
    } else if (type === 'subject') {
      setSubjectFocused(true);
    } else {
      setDescriptionFocused(true);
    }
  };

  const handleOnPressSubmit = () => {
    if (name.trim() == '') {
      flashMessageWarning(getTranslation('emptyName'));
    } else if (email.trim() == '') {
      flashMessageWarning(getTranslation('emptyEmail'));
    } else if (!regex.email.test(email)) {
      flashMessageWarning(getTranslation('invalidEmail'));
    } else if (subject.trim() == '') {
      flashMessageWarning(getTranslation('emptySubject'));
    } else if (description.trim() == '') {
      flashMessageWarning(getTranslation('emptyDesc'));
    } else {
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
        });
      };
    
      useEffect(() => {
        header();
      }, []);
  return (
   <ContactUsComponent
      name={name}
      email={email}
      subject={subject}
      description={description}

      nameRef={nameRef}
      emailRef={emailRef}
      subjectRef={subjectRef}
      descriptionRef={descriptionRef}

      nameFocused={nameFocused}
      emailFocused={emailFocused}
      subjectFocused={subjectFocused}
      descriptionFocused={descriptionFocused}
     
      handleOnChangeText={handleOnChangeText}
      handleOnSubmit={handleOnSubmit}
      handleOnPressSubmit={handleOnPressSubmit}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}/>
  )
}

export default ContactUsContainer