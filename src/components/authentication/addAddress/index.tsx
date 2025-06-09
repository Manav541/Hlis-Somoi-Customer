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
}

const AddAddressComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.vwMain}
      bounces={false}
      showsVerticalScrollIndicator={false}
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
            <GlobalTextInput
              placeholder={getTranslation("address")}
              value={props?.address}
              reference={props.addressRef}
              secureTextEntry={false}
              onChangeText={(text) => {
                props.handleOnChangeText(text, "address");
              }}
              onSubmitEditing={() => {
                props.handleOnSubmit("address");
              }}
              onBlur={() => {
                props.handleOnBlur("address");
              }}
              onFocus={() => {
                props.handleOnFocus("address");
              }}
              focusValue={props.addressFocused}
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
              >
                <Image
                  source={
                    props?.isDefault ? images.checkfill : images.checkempty
                  }
                  style={styles.imgCheck}
                />
              </TouchableOpacity>
              <Text style={styles.lblSetAsDefault}>
                {getTranslation("setAsDefault")}
              </Text>
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
