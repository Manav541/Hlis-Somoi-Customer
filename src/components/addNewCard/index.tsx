import { View, Text, TextInput, StatusBar } from "react-native";
import React, { Ref } from "react";
import { styles } from "./styles";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import GlobalTextInput from "../../global/GlobalTextInput";
import { PlatformVersion } from "../../constants/utils/Platform";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GlobalButton from "../../global/GlobalButton";

interface PropsType {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
  cardNumberRef: Ref<TextInput>;
  cardHolderNameRef: Ref<TextInput>;
  expiryDateRef: Ref<TextInput>;
  cvvRef: Ref<TextInput>;

  cardNumberFocused: boolean;
  cardHolderNameFocused: boolean;
  expiryDateFocused: boolean;
  cvvFocused: boolean;

  handleOnChangeText: (text: string, type: string) => void;
  handleOnSubmit: (type: string) => void;
  handleOnFocus: (type: string) => void;
  handleOnBlur: (type: string) => void;
  handleOnPressAdd: () => void;
}

const AddNewCardComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.vwMain1}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.vwMain}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.lblAddCardHeading}>
            {getTranslation("AddCardHeading")}
          </Text>
          <View style={styles.vwAddCard}>
            <View style={{ gap: 10, flex: 1 }}>
              <GlobalTextInput
                placeholder={getTranslation("cardNumber")}
                value={props?.cardNumber}
                reference={props.cardNumberRef}
                secureTextEntry={false}
                onChangeText={(text) => {
                  props.handleOnChangeText(text, "cardNumber");
                }}
                onSubmitEditing={() => {
                  props.handleOnSubmit("cardNumber");
                }}
                onBlur={() => {
                  props.handleOnBlur("cardNumber");
                }}
                onFocus={() => {
                  props.handleOnFocus("cardNumber");
                }}
                focusValue={props.cardNumberFocused}
                isNumberInputField
              />

              <GlobalTextInput
                placeholder={getTranslation("cardHolderName")}
                value={props?.cardHolderName}
                reference={props.cardHolderNameRef}
                secureTextEntry={false}
                onChangeText={(text) => {
                  props.handleOnChangeText(text, "cardHolderName");
                }}
                onSubmitEditing={() => {
                  props.handleOnSubmit("cardHolderName");
                }}
                onBlur={() => {
                  props.handleOnBlur("cardHolderName");
                }}
                onFocus={() => {
                  props.handleOnFocus("cardHolderName");
                }}
                focusValue={props.cardHolderNameFocused}
              />

              <GlobalTextInput
                placeholder={getTranslation("expiryDate")}
                value={props?.expiryDate}
                reference={props.expiryDateRef}
                secureTextEntry={false}
                onChangeText={(text) => {
                  props.handleOnChangeText(text, "expiryDate");
                }}
                onSubmitEditing={() => {
                  props.handleOnSubmit("expiryDate");
                }}
                onBlur={() => {
                  props.handleOnBlur("expiryDate");
                }}
                onFocus={() => {
                  props.handleOnFocus("expiryDate");
                }}
                focusValue={props.expiryDateFocused}
                isExpiryDateField={true}
              />
              <GlobalTextInput
                placeholder={getTranslation("cvv")}
                value={props?.cvv}
                reference={props.cvvRef}
                secureTextEntry={true}
                onChangeText={(text) => {
                  props.handleOnChangeText(text, "cvv");
                }}
                onSubmitEditing={() => {
                  props.handleOnSubmit("cvv");
                }}
                onBlur={() => {
                  props.handleOnBlur("cvv");
                }}
                onFocus={() => {
                  props.handleOnFocus("cvv");
                }}
                focusValue={props.cvvFocused}
                isNumberInputField
                isLastField
              />
            </View>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            paddingBottom: PlatformVersion.isIOS ? insets.bottom + 20 : 20,
          }}
        >
          <GlobalButton
            isOrange
            title={getTranslation("add")}
            onPress={props?.handleOnPressAdd}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddNewCardComponent;
