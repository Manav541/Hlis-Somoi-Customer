import { View, Text, Image, TouchableOpacity, ScrollView, ImageSourcePropType } from "react-native";
import React, { Ref } from "react";
import { styles } from "./styles";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { colors } from "../../constants/Colors";
import { images } from "../../constants/Images";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import GlobalTextInput from "../../global/GlobalTextInput";
import { Asset } from "react-native-image-picker";
import { TextInput } from "react-native-gesture-handler";
import GlobalButton from "../../global/GlobalButton";
import GlobalSuccessModal from "../../global/GlobalSuccessModal";

interface PropsType {
  product_img: ImageSourcePropType;
  product_name: string;
  product_price: string;
  product_weight: string;
  product_quantity: string;
  height: number;
  width: number;
  product_rating: number;
  onPressRating: (index: number) => void;
  product_review: string;
  product_reviewRef: Ref<TextInput>;
  product_reviewFocused: boolean;

  handleOnChangeText: (text: string, type: string) => void;
  handleOnFocus: (type: string) => void;
  handleOnBlur: (type: string) => void;
  handleOnSubmit: (type: string) => void;
  isReviewSuccessModalVisible: boolean;
  onPressSubmit: () => void;
  onPressOkReturn: () => void;

  multiImagesArray: Asset[];
  handleOnPressUploadImages: () => void;
  handleOnPressDeleteUploadedImage: (index: number) => void;
}

const RateAndReviewComponent = (props: PropsType) => {
  const renderUploadImageVideo = (item: any, index: number) => {
    return (
      <View style={styles.vwUploadImageVideosItem}>
        <Image
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
      <ScrollView contentContainerStyle={{paddingBottom : 20}} bounces={false} showsVerticalScrollIndicator={false}>
        <Text style={styles.lblTitle}>{getTranslation("rateReviewTitle")}</Text>
        {/* Product Details */}
        <View style={styles.vwProductsItems}>
          <View style={styles.vwProductImage}>
            <Image
              style={{ height: props?.height, width: props?.width }}
              source={props?.product_img}
            />
          </View>
          <View style={styles.vwProductItemDetails}>
            <View style={{ flex: 1 }}>
              <Text style={styles.lblProductName}>{props?.product_name}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.lblProductPrice}>
                    {props?.product_price}
                  </Text>
                  <Image
                    style={styles.imgDot}
                    source={images.dotOrange}
                    tintColor={colors.blue4e}
                  />
                  <Text style={styles.lblProductWeight}>
                    {props?.product_weight}
                  </Text>
                </View>
                <Text style={styles.lblQuantity}>
                  {getTranslation("qty") + " "}
                  <Text style={styles.lblQuantityCount}>
                    {props?.product_quantity}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Line */}
        <View style={styles.vwLine} />
        {/* Rating  */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal : 18,
            marginBottom: 21.29,
            height : 58.11,
            alignItems : 'center',
            justifyContent : 'space-between'
          }}
        >
          {[0, 1, 2, 3, 4].map((index) => (
            <TouchableOpacity
              key={index}
              onPress={() => props?.onPressRating(index)}
              activeOpacity={activityOpacity}
              hitSlop={hitSlop}
            >
              <Image
                style={styles.imgCheckBox}
                source={images.starFilled}
                tintColor={
                  index < props?.product_rating
                    ? colors.orange1c
                    : colors.greyda
                }
              />
            </TouchableOpacity>
          ))}
        </View>
        {/* Write Review */}
        <View style={{ marginHorizontal: 20 }}>
          <GlobalTextInput
            isDescriptionField
            value={props?.product_review}
            isLastField
            placeholder={getTranslation("writehere")}
            reference={props.product_reviewRef}
            onChangeText={(text) => {
              props.handleOnChangeText(text, "product_review");
            }}
            onBlur={() => {
              props.handleOnBlur("product_review");
            }}
            onFocus={() => {
              props.handleOnFocus("product_review");
            }}
            onSubmitEditing={() => props?.handleOnSubmit("product_review")}
            focusValue={props.product_reviewFocused}
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
        visible={props?.isReviewSuccessModalVisible}
        btnTitle={getTranslation("ok")}
        title={getTranslation("feedBackTitle")}
        subTitle={getTranslation("feedBackDesc")}
        onPress={props?.onPressOkReturn}
      />
    </View>
  );
};

export default RateAndReviewComponent;
