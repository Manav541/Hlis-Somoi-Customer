import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from "react-native";
import React, { Ref } from "react";
import { styles } from "./styles";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { images } from "../../constants/Images";
import GlobalTextInput from "../../global/GlobalTextInput";
import GlobalButton from "../../global/GlobalButton";
import GlobalSuccessModal from "../../global/GlobalSuccessModal";
import { CancelOrderReason } from "../../constants/interfaces";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { colors } from "../../constants/Colors";

interface PropsType {
  arrCancelOrderReason: CancelOrderReason[];
  otherReason: string;
  otherReasonRef: Ref<TextInput>;
  otherReasonFocused: boolean;

  handleOnChangeText: (text: string, type: string) => void;
  handleOnFocus: (type: string) => void;
  handleOnBlur: (type: string) => void;
  handleOnSubmit: (type: string) => void;
  handleSelectReason: (index: number) => void;
  isCancelSuccessModalVisible: boolean;
  onPressSubmit: () => void;
  onPressOkCancel: () => void;
  selectedReason: string;
}

const CancelOrderComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  const renderItemCancelOrderReason = (
    item: CancelOrderReason,
    index: number
  ) => {
    return (
      <View key={index}>
        <TouchableOpacity
          style={styles.btnCancelOrderReasonItem}
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          onPress={() => props?.handleSelectReason(index)}
        >
          <Text style={styles.lblCancelOrderReason}>{item?.reason}</Text>
          <Image
            style={styles.imgCheckbox}
            source={item?.isSelected ? images.checkfill : images.whiteCheckBox}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        {index !== props?.arrCancelOrderReason.length - 1 && (
          <View style={styles.vwLine} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent={false}
        barStyle={"dark-content"}
        backgroundColor={colors.orange1c}
      />

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        enableOnAndroid
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
      >
        <Text style={styles.lblCancelOrderDesc}>
          {getTranslation("cancelOrderHeader")}
        </Text>
        <Text style={styles.lblCancelOrderDesc}>
          {getTranslation("selectCancelOrderReason")}
        </Text>

        <View style={styles.vwCancelOrder}>
          {props?.arrCancelOrderReason.map(renderItemCancelOrderReason)}
        </View>

        {props?.selectedReason === "Other (please specify)" && (
          <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
            <GlobalTextInput
              isDescriptionField
              value={props?.otherReason}
              isLastField
              placeholder={getTranslation("writehere")}
              reference={props.otherReasonRef}
              onChangeText={(text) => {
                props.handleOnChangeText(text, "description");
              }}
              onBlur={() => {
                props.handleOnBlur("description");
              }}
              onFocus={() => {
                props.handleOnFocus("description");
              }}
              onSubmitEditing={() => props?.handleOnSubmit("description")}
              focusValue={props.otherReasonFocused}
            />
          </View>
        )}
      </KeyboardAwareScrollView>

      <View
        style={{
          marginHorizontal: 20,
          marginBottom: insets.bottom ? insets.bottom : 20,
        }}
      >
        <GlobalButton
          isOrange
          title={getTranslation("submit")}
          onPress={props?.onPressSubmit}
        />
      </View>

      {/* Cancel Modal */}
      <GlobalSuccessModal
        visible={props?.isCancelSuccessModalVisible}
        btnTitle={getTranslation("ok")}
        title={getTranslation("orderCancelled")}
        subTitle={getTranslation("orderCancelledSuccessDesc")}
        onPress={props?.onPressOkCancel}
      />
    </View>
  );
};

export default CancelOrderComponent;
