import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  StatusBar,
} from "react-native";
import React, { Ref } from "react";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { images } from "../../constants/Images";
import { styles } from "./styles";
import GlobalSuccessModal from "../../global/GlobalSuccessModal";
import { getTranslation } from "../../localization/i18n/i18n.config";
import GlobalButton from "../../global/GlobalButton";
import GlobalTextInput from "../../global/GlobalTextInput";
import { colors } from "../../constants/Colors";
import { Asset } from "react-native-image-picker";
import { CancelOrderReason } from "../../constants/interfaces";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface PropsType {
  arrReturnOrderReason: CancelOrderReason[];
  otherReason: string;
  otherReasonRef: Ref<TextInput>;
  otherReasonFocused: boolean;
  selectedReason: string;

  handleOnChangeText: (text: string, type: string) => void;
  handleOnFocus: (type: string) => void;
  handleOnBlur: (type: string) => void;
  handleOnSubmit: (type: string) => void;
  handleSelectReason: (index: number) => void;
  isReturnSuccessModalVisible: boolean;
  onPressSubmit: () => void;
  onPressOkReturn: () => void;
  isRefundReplacement: string;
  onPressSelectRefundReplacement: (type: string) => void;

  multiImagesArray: Asset[];
  handleOnPressUploadImages: () => void;
  handleOnPressDeleteUploadedImage: (index: number) => void;
}

const ReturnOrderComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  const renderItemReturnOrderReason = (
    item: CancelOrderReason,
    index: number
  ) => {
    return (
      <View key={index}>
        <TouchableOpacity
          style={styles.btnReturnOrderReasonItem}
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          onPress={() => props?.handleSelectReason(index)}
        >
          <Text style={styles.lblReturnOrderReason}>{item?.reason}</Text>
          <Image
            style={styles.imgCheckbox}
            source={item?.isSelected ? images.checkfill : images.whiteCheckBox}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        {index !== props?.arrReturnOrderReason.length - 1 && (
          <View style={styles.vwLine} />
        )}
      </View>
    );
  };

  const renderUploadImageVideo = (item: any, index: number) => {
    return (
      <View style={styles.vwUploadImageVideosItem}>
        <FastImage
          style={styles.imgUpload}
          source={{ uri: item?.uri }}
          resizeMode="stretch"
        />
        <TouchableOpacity
          style={styles.btnCancelImage}
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          onPress={() => {
            props?.handleOnPressDeleteUploadedImage(index);
          }}
        >
          <Image style={styles.imgAdd} source={images.closeImage} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.orange1c}
        barStyle={"dark-content"}
      />
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        enableOnAndroid
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
      >
        <Text style={styles.lblReturnOrderDesc}>
          {getTranslation("ReturnOrderHeader")}
        </Text>
        <View style={styles.vwReturnOrder}>
          {props?.arrReturnOrderReason.map(renderItemReturnOrderReason)}
        </View>
        {props?.selectedReason === "Other (please specify)" && (
          <>
            <View style={{ marginHorizontal: 20 }}>
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
            {/* Upload Image and Videos */}
            <View style={styles.vwUploadImageVideos}>
              <Text style={styles.lblUploadImageVideo}>
                {getTranslation("uploadImagesVideo")}
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: "row", gap: 9.02 }}>
                  <TouchableOpacity
                    style={styles.btnUploadImageVideo}
                    activeOpacity={activityOpacity}
                    hitSlop={hitSlop}
                    onPress={props?.handleOnPressUploadImages}
                  >
                    <Image
                      style={styles.imgAdd}
                      tintColor={colors.black13}
                      source={images.add}
                      resizeMode="stretch"
                    />
                  </TouchableOpacity>
                  {props?.multiImagesArray?.length > 0 && (
                    <View style={{ flexDirection: "row", gap: 9.02 }}>
                      {props?.multiImagesArray.map(renderUploadImageVideo)}
                    </View>
                  )}
                </View>
              </ScrollView>
            </View>
          </>
        )}
        {/* Choose refund or replace */}
        {/* <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
          <Text style={styles.lblChooseResolution}>
            {getTranslation("chooseResolution")}
          </Text>
          <View style={styles.vwChooseResoltionItem}>
            <TouchableOpacity
              style={{ flexDirection: "row", gap: 7 }}
              activeOpacity={activityOpacity}
              hitSlop={hitSlop}
              onPress={() => {
                props?.onPressSelectRefundReplacement("Refund");
              }}
            >
              <Image
                style={styles.imgRadioButton}
                source={
                  props?.isRefundReplacement === "Refund"
                    ? images.radioButtonSelected
                    : images.radioButtonUnSelected
                }
                resizeMode="stretch"
              />
              <Text style={styles.lblRadioText}>
                {getTranslation("refund")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row", gap: 7 }}
              activeOpacity={activityOpacity}
              hitSlop={hitSlop}
              onPress={() => {
                props?.onPressSelectRefundReplacement("Replacement");
              }}
            >
              <Image
                style={styles.imgRadioButton}
                source={
                  props?.isRefundReplacement === "Replacement"
                    ? images.radioButtonSelected
                    : images.radioButtonUnSelected
                }
                resizeMode="stretch"
              />
              <Text style={styles.lblRadioText}>
                {getTranslation("replacement")}
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
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
      {/* Return Modal */}
      <GlobalSuccessModal
        visible={props?.isReturnSuccessModalVisible}
        btnTitle={getTranslation("ok")}
        title={getTranslation("requestSend")}
        subTitle={getTranslation("requestSendSuccessDesc")}
        onPress={props?.onPressOkReturn}
      />
    </View>
  );
};

export default ReturnOrderComponent;
