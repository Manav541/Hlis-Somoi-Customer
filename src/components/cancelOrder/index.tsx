import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { Ref } from "react";
import { styles } from "./styles";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { images } from "../../constants/Images";
import GlobalTextInput from "../../global/GlobalTextInput";
import GlobalButton from "../../global/GlobalButton";
import GlobalSuccessModal from "../../global/GlobalSuccessModal";
import { CancelOrderReason } from "../../constants/utils/interfaces";

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
}

const CancelOrderComponent = (props: PropsType) => {
  const renderItemCancelOrderReason = (item: CancelOrderReason, index: number) => {
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
      <ScrollView
        style={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
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
        <View style={{ marginHorizontal: 20 }}>
          <GlobalTextInput
            isDescriptionField
            value={props?.otherReason}
            isLastField
            placeholder={getTranslation("writehere")}
            reference={props.otherReasonRef}
            onChangeText={(text) => {
              props.handleOnChangeText(text, "otherReason");
            }}
            onBlur={() => {
              props.handleOnBlur("otherReason");
            }}
            onFocus={() => {
              props.handleOnFocus("otherReason");
            }}
            onSubmitEditing={() => props?.handleOnSubmit("otherReason")}
            focusValue={props.otherReasonFocused}
          />
        </View>
      </ScrollView>
      <View style={{ marginHorizontal: 20, marginBottom: 40 }}>
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
