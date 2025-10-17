import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import React, { Ref, useState } from "react";
import { colors } from "../../constants/Colors";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import DatePicker from "react-native-date-picker";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";

interface PropsType {
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
  onFocus: () => void;
  onBlur: () => void;
  focusValue: boolean;
  placeholder: string | null;
  reference: Ref<TextInput>;

  //   Optional
  secureTextEntry?: boolean;
  onPressEye?: () => void;
  countryCode?: string;
  isEmailField?: boolean;
  isPhoneField?: boolean;
  isNumberInputField?: boolean;
  isPasswordField?: boolean;
  isLastField?: boolean;
  isDescriptionField?: boolean;
  onPressCode?: () => void;
  maxLength?: number;
  isExpiryDateField?: boolean;
  isBlueInput?: boolean;
  googlePlacesInput?: boolean;
  isLoaderVisible?: boolean;
}

const GlobalTextInput = (props: PropsType) => {
  const [open, setOpen] = useState(false);

  return (
    <View
      style={[
        styles.vwMain,
        {
          height: props.isDescriptionField ? 121 : 52,
          borderRadius: props.isDescriptionField ? 20 : 100,
          borderColor: props.isBlueInput
            ? props.focusValue || props.value?.length > 0
              ? colors.blue4e
              : colors.greya7
            : props.focusValue || props.value?.length > 0
            ? colors.white
            : colors.greya7,
            flex:props.googlePlacesInput ? 0 : 1,
        },
      ]}
    >
      {/* Country Code */}
      {props.isPhoneField && (
        // <TouchableOpacity
        //   activeOpacity={activityOpacity}
        //   hitSlop={hitSlop}
        //   onPress={props.onPressCode}>
        <Text style={styles.lblCountryCode}>{props.countryCode}</Text>
        // </TouchableOpacity>
      )}

      {/* Input - Eye */}
      <View style={styles.vwInputEye}>
        {props.isExpiryDateField ? (
          <TouchableOpacity
            activeOpacity={activityOpacity}
            style={{
              flex: 1,
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() => setOpen(true)}
          >
            <Text
              style={[
                // styles.input,
                {
                  flex: 1,
                  borderRadius: 100,
                  fontSize: fontSize.size14,
                  fontFamily: fontsfamily.medium,
                  // height: 52,
                  alignSelf: "center",
                  color: props.value ? colors.white : colors.greya7,
                },
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {props.value || props.placeholder || ""}
            </Text>
            <Image source={images.calendar} style={styles.eyeImg} />
          </TouchableOpacity>
        ) : (
          <TextInput
            placeholder={props.placeholder || ""}
            ref={props.reference}
            value={props.value}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            cursorColor={colors.greya7}
            selectionColor={colors.greya7}
            onChangeText={props.onChangeText}
            secureTextEntry={props.secureTextEntry}
            onSubmitEditing={props.onSubmitEditing}
            placeholderTextColor={colors.greya7}
            multiline={props.isDescriptionField}
            returnKeyType={props.isLastField ? "done" : "next"}
            blurOnSubmit={props.isLastField}
            maxLength={props.maxLength}
            autoCorrect={false}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="none"
            keyboardType={
              props.isEmailField
                ? "email-address"
                : props.isPhoneField || props.isNumberInputField
                ? "number-pad"
                : "default"
            }
            style={[
              styles.input,
              {
                height: props.isDescriptionField ? 121 : 52,
                textAlignVertical: props.isDescriptionField ? "top" : "center",
                paddingVertical: props.isDescriptionField ? 10 : 0,
              },
            ]}
          />
        )}

        {/* Calendar Icon for Expiry Date */}
        {/* {props.isExpiryDateField && (
          <TouchableOpacity
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={() => setOpen(true)}
          >
            <Image source={images.calendar} style={styles.eyeImg} />
          </TouchableOpacity>
        )} */}

        {/* Eye Icon for Password */}
        {props.isPasswordField && (
          <TouchableOpacity
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={props.onPressEye}
          >
            <Image
              source={props.secureTextEntry ? images.hideEye : images.showEye}
              style={styles.eyeImg}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Date Picker */}
      <DatePicker
        modal
        mode="date"
        open={open}
        date={new Date()}
        onConfirm={(date) => {
          setOpen(false);
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const year = date.getFullYear().toString().slice(-2);
          props.onChangeText(`${month}/${year}`);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        minimumDate={new Date()}
        maximumDate={
          new Date(new Date().setFullYear(new Date().getFullYear() + 10))
        }
      />

      {/* Googler Places Loader */}
      {props?.isLoaderVisible && props?.googlePlacesInput && (
        <ActivityIndicator
          size={'small'}
          color={colors.orange1c}
        />
      )}
    </View>
  );
};

export default GlobalTextInput;
