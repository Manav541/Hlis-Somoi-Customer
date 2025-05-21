import React, { useEffect, useRef, useState } from "react";
import ContactUsComponent from "../../components/contactUs";
import GlobalBackButton from "../../global/GlobalBackButton";
import { TextInput } from "react-native-gesture-handler";
import { regex } from "../../constants/Regex";
import { flashMessageSucess, flashMessageWarning } from "../../constants/GConstant";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar, Text } from "react-native";
import { constnatStyles } from "../../constants/Styles";
import { ScreenNames } from "../../routers";

const ContactUsContainer = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const subjectRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

  const [isNameFocused, setIsNameFocused] = useState<boolean>(false);
  const [isEmailFocused, setIsEmailFocused] = useState<boolean>(false);
  const [isSubjectFocused, setIsSubjectFocused] = useState<boolean>(false);
  const [isDescriptionFocused, setIsDescriptionFocused] =
    useState<boolean>(false);

  const handleOnSubmit = (type: string) => {
    if (type === "name") {
      emailRef?.current?.focus();
    } else if (type === "email") {
      subjectRef?.current?.focus();
    } else if (type === "subject") {
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
    } else if (type === 'subject') {
      setSubject(text);
    } else if (type === 'description') {
      setDescription(text);
    }
  };

  const handleOnFocus = (type: string) => {
    if (type === 'name') {
      setIsNameFocused(true);
    } else if (type === 'email') {
      setIsEmailFocused(true);
    } else if (type === 'subject') {
      setIsSubjectFocused(true);
    } else if (type === 'description') {
      setIsDescriptionFocused(true);
    }
  };

  const handleOnBlur = (type: string) => {
    if (type === 'name') {
      setIsNameFocused(false);
    } else if (type === 'email') {
      setIsEmailFocused(false);
    } else if (type === 'subject') {
      setIsSubjectFocused(false);
    } else if (type === 'description') {
      setIsDescriptionFocused(false);
    }
  };

  const handleOnPressSubmit = () => {
    if (name.trim() === '') {
      flashMessageWarning(getTranslation('emptyNameCU'));
    } else if (email.trim() === '') {
      flashMessageWarning(getTranslation('emptyEmailCU'));
    } else if (!regex.email.test(email)) {
      flashMessageWarning(getTranslation('invalidEmail'));
    } else if (subject.trim() === '') {
      flashMessageWarning(getTranslation('emptySubjectCU'));
    } else if (description.trim() === '') {
      flashMessageWarning(getTranslation('emptyDescCU'));
    } else {
      setName('');
      setEmail('');
      setSubject('');
      setDescription('');
      setIsNameFocused(false);
      setIsEmailFocused(false);
      setIsSubjectFocused(false);
      setIsDescriptionFocused(false);
      nameRef.current?.blur();
      emailRef.current?.blur();
      subjectRef.current?.blur();
      flashMessageSucess(getTranslation('contactusSuccessfully'));
      navigation.goBack();
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
        <Text style={constnatStyles.lblHeaderTitle}>{ScreenNames.contactUs}</Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

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
      isNameFocused={isNameFocused}
      isEmailFocused={isEmailFocused}
      isSubjectFocused={isSubjectFocused}
      isDescriptionFocused={isDescriptionFocused}
      handleOnChangeText={handleOnChangeText}
      handleOnSubmit={handleOnSubmit}
      handleOnPressSubmit={handleOnPressSubmit}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
    />
  );
};

export default ContactUsContainer;
