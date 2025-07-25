import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import React, { Ref } from "react";
import { styles } from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import GlobalTextInput from "../../../global/GlobalTextInput";
import GlobalButton from "../../../global/GlobalButton";
import { PlatformVersion } from "../../../constants/utils/Platform";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { activityOpacity, hitSlop } from "../../../constants/GConstant";
import { images } from "../../../constants/Images";
import { colors } from "../../../constants/Colors";
import GooglePlacesTextInput, {
  GooglePlacesTextInputRef,
} from "react-native-google-places-textinput";

interface PropsType {
  address: string;
  house: string;
  additionalDescription: string;

  addressRef: Ref<TextInput>;
  houseRef: Ref<TextInput>;
  additionalDescriptionRef: Ref<TextInput>;

  addressFocused: boolean;
  houseFocused: boolean;
  additionalDescriptionFocused: boolean;

  handleOnChangeText: (text: string, type: string) => void;
  handleOnSubmit: (type: string) => void;
  handleOnFocus: (type: string) => void;
  handleOnBlur: (type: string) => void;
  handleOnPressAdd: () => void;
  isDefault: boolean;
  handleSetDefault: () => void;
  isNavigateFromManageAddress: boolean;
  isEditAddress: boolean;
  handlePlaceSelect: (place: any) => void;
  googleApiKey: string;
  isAddressInitialized: boolean;
}

const AddAddressComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.vwMain}
      bounces={false}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar
        translucent={false}
        barStyle={"dark-content"}
        backgroundColor={colors.orange1c}
      />
      <View>
        <Text style={styles.lblAddAddressHeading}>
          {getTranslation("addAddressHeading")}
        </Text>
        <View style={styles.vwAddress}>
          <Text style={styles.lblAddress}>{getTranslation("address")}</Text>
          <View style={{ gap: 10, flex: 1 }}>
            <GooglePlacesTextInput
              key={
                props.isEditAddress && props.isAddressInitialized
                  ? "location-initialization"
                  : undefined
              }
              style={{
                container: styles.container,
                input: {
                  ...styles.input,
                  borderColor:
                    props?.addressFocused ||
                    (props.isEditAddress && props.isAddressInitialized)
                      ? colors.white
                      : colors.greya7,
                },
                placeholder: styles.placeholder,
                loadingIndicator: styles.loadingIndicator,
                suggestionsContainer: styles.suggestionsContainer,
              }}
              onTextChange={(text) => {
                if (text.length > 0) {
                  props.handleOnFocus("address");
                }
                props.handleOnChangeText(text, "address");
              }}
              placeHolderText={getTranslation("address") || undefined}
              ref={
                props?.addressRef as unknown as Ref<GooglePlacesTextInputRef>
              }
              value={props?.address}
              apiKey={props?.googleApiKey}
              onPlaceSelect={props?.handlePlaceSelect}
              debounceDelay={300}
              showClearButton={true}
              hideOnKeyboardDismiss={true}
            />

            <GlobalTextInput
              placeholder={getTranslation("HousenoBuildingsreetarea")}
              value={props?.house}
              reference={props.houseRef}
              secureTextEntry={false}
              onChangeText={(text) => {
                props.handleOnChangeText(text, "house");
              }}
              onSubmitEditing={() => {
                props.handleOnSubmit("house");
              }}
              onBlur={() => {
                props.handleOnBlur("house");
              }}
              onFocus={() => {
                props.handleOnFocus("house");
              }}
              focusValue={props.houseFocused}
            />

            <GlobalTextInput
              placeholder={getTranslation("additionalDescription")}
              isDescriptionField
              isLastField
              value={props?.additionalDescription}
              reference={props.additionalDescriptionRef}
              secureTextEntry={false}
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
              focusValue={props.additionalDescriptionFocused}
            />
          </View>

          {/* set as default */}
          {props?.isNavigateFromManageAddress === true && (
            <View style={styles.vwSetAsDefault}>
              <TouchableOpacity
                activeOpacity={activityOpacity}
                hitSlop={hitSlop}
                onPress={props?.handleSetDefault}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 24,
                  gap: 10,
                }}
                disabled={props?.isDefault}
              >
                <Image
                  source={
                    props?.isDefault ? images.checkfill : images.checkempty
                  }
                  style={styles.imgCheck}
                />
                <Text style={styles.lblSetAsDefault}>
                  {getTranslation("setAsDefault")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          paddingBottom: PlatformVersion.isIOS ? insets.bottom + 10 : 20,
        }}
      >
        <GlobalButton
          isOrange
          title={
            props?.isNavigateFromManageAddress
              ? props?.isEditAddress
                ? getTranslation("update")
                : getTranslation("add")
              : getTranslation("add")
          }
          onPress={props?.handleOnPressAdd}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddAddressComponent;
