import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
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

interface PropsType {
  arrReturnOrderReason: any[];
  otherReason: string;
  otherReasonRef: Ref<TextInput>;
  otherReasonFocused: boolean;

  handleOnChangeText: (text: string, type: string) => void;
  handleOnFocus: (type: string) => void;
  handleOnBlur: (type: string) => void;
  handleOnSubmit: (type: string) => void;
  handleSelectReason: (index: number) => void;
  isReturnSuccessModalVisible: boolean;
  onPressSubmit: () => void;
  onPressOkReturn: () => void;

  multiImagesArray: Asset[];
  handleOnPressUploadImages: () => void;
  handleOnPressDeleteUploadedImage: (index: number) => void;
}

const ReturnOrderComponent = (props: PropsType) => {
  const renderItemReturnOrderReason = (item: any, index: number) => {
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
        <Image
          style={styles.imgUpload}
          source={{uri: item?.uri}}
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
          <Image style={styles.imgAdd} source={images.closeImage}/>
        </TouchableOpacity>
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
        <Text style={styles.lblReturnOrderDesc}>
          {getTranslation("ReturnOrderHeader")}
        </Text>
        <View style={styles.vwReturnOrder}>
          {props?.arrReturnOrderReason.map(renderItemReturnOrderReason)}
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
        {/* Upload Image and Videos */}
        <View style={styles.vwUploadImageVideos}>
          <Text style={styles.lblUploadImageVideo}>
            {getTranslation("uploadImagesVideo")}
          </Text>
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
              />
            </TouchableOpacity>
            {props?.multiImagesArray?.length > 0 && (
            <View style={{ flexDirection: "row", gap: 9.02 }}>
              {props?.multiImagesArray.map(renderUploadImageVideo)}
            </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={{ marginHorizontal: 20, marginBottom: 40 }}>
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
