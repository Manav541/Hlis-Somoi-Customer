import { View, Text, Image, TextInput } from "react-native";
import React, { Ref } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import GlobalTextInput from "../../global/GlobalTextInput";
import GlobalButton from "../../global/GlobalButton";
import { getTranslation } from "../../localization/i18n/i18n.config";

interface PropsType {
  name: string;
  email: string;
  subject: string;
  description: string;

  nameRef: Ref<TextInput>;
  emailRef: Ref<TextInput>;
  subjectRef: Ref<TextInput>;
  descriptionRef: Ref<TextInput>;

  nameFocused: boolean;
  emailFocused: boolean;
  subjectFocused: boolean;
  descriptionFocused: boolean;

  handleOnChangeText: (text: string, type: string) => void;
  handleOnSubmit: (type: string) => void;
  handleOnFocus: (type: string) => void;
  handleOnBlur: (type: string) => void;

  handleOnPressSubmit: () => void;
}

const ContactUsComponent = (props: PropsType) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.vwMain}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={{ flex: 1 }}>
        <Image source={images.logoTitle} style={styles.imgLogo} />
        <View style={{gap: 10}}>
        <GlobalTextInput
          placeholder={getTranslation("name")}
          value={props.name}
          reference={props.nameRef}
          secureTextEntry={false}
          onChangeText={(text) => {
            props.handleOnChangeText(text, "name");
          }}
          onSubmitEditing={() => {
            props.handleOnSubmit("name");
          }}
          onBlur={() => {
            props.handleOnBlur("name");
          }}
          onFocus={() => {
            props.handleOnFocus("name");
          }}
          focusValue={props.nameFocused}
        />
        <GlobalTextInput
          placeholder={getTranslation("email")}
          isEmailField
          value={props.email}
          reference={props.emailRef}
          onChangeText={(text) => {
            props.handleOnChangeText(text, "email");
          }}
          onSubmitEditing={() => {
            props.handleOnSubmit("email");
          }}
          onBlur={() => {
            props.handleOnBlur("email");
          }}
          onFocus={() => {
            props.handleOnFocus("email");
          }}
          focusValue={props.emailFocused}
        />
        <GlobalTextInput
          placeholder={getTranslation("subject")}
          value={props.subject}
          reference={props.subjectRef}
          onChangeText={(text) => {
            props.handleOnChangeText(text, "subject");
          }}
          onSubmitEditing={() => {
            props.handleOnSubmit("subject");
          }}
          onBlur={() => {
            props.handleOnBlur("subject");
          }}
          onFocus={() => {
            props.handleOnFocus("subject");
          }}
          focusValue={props.subjectFocused}
        />
        <GlobalTextInput
          placeholder={getTranslation("description")}
          value={props.description}
          reference={props.descriptionRef}
          onChangeText={(text) => {
            props.handleOnChangeText(text, "description");
          }}
          onSubmitEditing={() => {
            props.handleOnSubmit("description");
          }}
          onBlur={() => {
            props.handleOnBlur("description");
          }}
          onFocus={() => {
            props.handleOnFocus("description");
          }}
          focusValue={props.descriptionFocused}
          isDescriptionField
        />
        
        </View>
      </View>
      <View style={{marginTop : 20,marginBottom:38}}>
      <GlobalButton
        title={getTranslation("submit")}
        isOrange={true}
        onPress={props?.handleOnPressSubmit}
      />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ContactUsComponent;
