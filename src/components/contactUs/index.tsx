import { View, Text, Image, TextInput, StatusBar } from "react-native";
import React, { Ref } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import GlobalTextInput from "../../global/GlobalTextInput";
import GlobalButton from "../../global/GlobalButton";
import { getTranslation } from "../../localization/i18n/i18n.config";
import GlobalLogoTitle from "../../global/GlobalLogoTitle";
import { PlatformVersion } from "../../constants/utils/Platform";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../constants/Colors";

interface PropsType {
  name: string;
  email: string;
  subject: string;
  description: string;

  nameRef: Ref<TextInput>;
  emailRef: Ref<TextInput>;
  subjectRef: Ref<TextInput>;
  descriptionRef: Ref<TextInput>;

  isNameFocused: boolean;
  isEmailFocused: boolean;
  isSubjectFocused: boolean;
  isDescriptionFocused: boolean;

  handleOnChangeText: (text: string, type: string) => void;
  handleOnSubmit: (type: string) => void;
  handleOnFocus: (type: string) => void;
  handleOnBlur: (type: string) => void;

  handleOnPressSubmit: () => void;
}

const ContactUsComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent={false}
        barStyle={"dark-content"}
        backgroundColor={colors.orange1c}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Logo - Title */}
        <GlobalLogoTitle style={{ marginVertical: 30 }} />

        {/* View Inputs */}
        <View style={{ gap: 10 }}>
          <GlobalTextInput
            placeholder={getTranslation("name")}
            value={props.name}
            reference={props.nameRef}
            focusValue={props.isNameFocused}
            onChangeText={(text) => {
              props?.handleOnChangeText(text, "name");
            }}
            onSubmitEditing={() => props?.handleOnSubmit("name")}
            onFocus={() => props?.handleOnFocus("name")}
            onBlur={() => props?.handleOnBlur("name")}
          />
          <GlobalTextInput
            placeholder={getTranslation("email")}
            value={props.email}
            reference={props.emailRef}
            focusValue={props.isEmailFocused}
            onChangeText={(text) => {
              props?.handleOnChangeText(text, "email");
            }}
            onSubmitEditing={() => props?.handleOnSubmit("email")}
            onFocus={() => props?.handleOnFocus("email")}
            onBlur={() => props?.handleOnBlur("email")}
            isEmailField
          />
          <GlobalTextInput
            placeholder={getTranslation("subject")}
            value={props.subject}
            reference={props.subjectRef}
            focusValue={props.isSubjectFocused}
            onChangeText={(text) => {
              props?.handleOnChangeText(text, "subject");
            }}
            onSubmitEditing={() => props?.handleOnSubmit("subject")}
            onFocus={() => props?.handleOnFocus("subject")}
            onBlur={() => props?.handleOnBlur("subject")}
          />
          <GlobalTextInput
            isDescriptionField
            placeholder={getTranslation("description")}
            value={props.description}
            reference={props.descriptionRef}
            focusValue={props.isDescriptionFocused}
            onChangeText={(text) => {
              props?.handleOnChangeText(text, "description");
            }}
            onSubmitEditing={() => props?.handleOnSubmit("description")}
            onFocus={() => props?.handleOnFocus("description")}
            onBlur={() => props?.handleOnBlur("description")}
          />
        </View>
      </KeyboardAwareScrollView>

      <View
        style={{
          paddingBottom: PlatformVersion.isIOS ? insets.bottom + 20 : 20,
        }}
      >
        <GlobalButton
          isOrange
          title={getTranslation("submit")}
          onPress={props?.handleOnPressSubmit}
        />
      </View>
    </View>
  );
};

export default ContactUsComponent;
