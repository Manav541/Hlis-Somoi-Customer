import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
  FlatList,
  StatusBar,
} from "react-native";
import React, { Ref } from "react";
import { styles } from "./styles";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { colors } from "../../constants/Colors";
import { images } from "../../constants/Images";
import {
  activityOpacity,
  hitSlop,
  rupeeSymbol,
} from "../../constants/GConstant";
import GlobalTextInput from "../../global/GlobalTextInput";
import { Asset } from "react-native-image-picker";
import { TextInput } from "react-native-gesture-handler";
import GlobalButton from "../../global/GlobalButton";
import GlobalSuccessModal from "../../global/GlobalSuccessModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FastImage, { Source as FastImageSource } from "react-native-fast-image";
import { OrderItem, RestaurantInfo } from "../../constants/interfaces";
import { DateFormatsManager } from "../../constants/utils/DateFormats";
import { fontsfamily } from "../../constants/FontFamily";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Video from "react-native-video";

interface PropsType {
  navigateFromStoreReview: boolean;
  isEditRating: boolean;
  storeDetail: RestaurantInfo;
  prodcutDetail: OrderItem;
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
  const insets = useSafeAreaInsets();
  const renderUploadImageVideo = (item: any, index: number) => {
    return (
      <View style={styles.vwUploadImageVideosItem} key={index}>
        {item?.type == "video/mp4" ? (
          <Video
            source={{ uri: item?.uri }}
            style={styles.imgUpload}
            paused={true} // Don't autoplay
            controls={true} // Native play/pause buttons
            resizeMode="cover"
            repeat={false}
            muted
          />
        ) : (
          <FastImage
            style={styles.imgUpload}
            source={{ uri: item?.uri }}
            resizeMode="stretch"
          />
        )}
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
        contentContainerStyle={{ paddingBottom: 20 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.lblTitle}>{getTranslation("rateReviewTitle")}</Text>
        {props?.navigateFromStoreReview == true ? (
          <View style={styles.vwAllBestSellersItem}>
            <FastImage
              style={styles.imgBestSellers}
              source={{ uri: props?.storeDetail?.banner_image }}
            />
            <View style={styles.vwBestSellersItemDetails}>
              <Text style={styles.lblBestSellersItemName}>
                {props?.storeDetail?.name}
              </Text>
              <View style={styles.vwLocation}>
                <Image
                  style={styles.imgLocation}
                  source={images.locationIconOrange}
                  resizeMode="stretch"
                />
                <Text style={styles.lblLocation}>
                  {props?.storeDetail?.location}
                </Text>
              </View>
              <View style={styles.vwTimeDistanceRating}>
                <View style={styles.vwTimeDistance}>
                  <Text style={styles.lblTime}>
                    {getTranslation("openCloseTime")}
                    <Text
                      style={{
                        ...styles.lblTime,
                        fontFamily: fontsfamily.semiboldOutFit,
                      }}
                    >
                      {DateFormatsManager.formatDate(
                        props?.storeDetail?.opening_time,
                        DateFormatsManager.TimeFormats.HHmm,
                        DateFormatsManager.TimeFormats.HHmmss
                      ) +
                        "-" +
                        DateFormatsManager.formatDate(
                          props?.storeDetail?.closing_time,
                          DateFormatsManager.TimeFormats.HHmm,
                          DateFormatsManager.TimeFormats.HHmmss
                        )}
                    </Text>
                  </Text>
                </View>
                <View style={styles.vwRating}>
                  <Text style={styles.lblRatings}>
                    {parseFloat(props?.storeDetail?.rating).toFixed(1)}
                  </Text>
                  <Image
                    style={styles.imgStarBlue}
                    source={images.starBlue}
                    resizeMode="stretch"
                  />
                </View>
              </View>
            </View>
            <FastImage
              style={styles.imgLogo}
              source={{ uri: props?.storeDetail?.logo }}
              resizeMode="stretch"
            />
          </View>
        ) : (
          <View style={styles.vwProductsItems}>
            <View style={styles.vwProductImage}>
              <FastImage
                style={{ height: 61.6, width: 42.3 }}
                source={{ uri: props?.prodcutDetail?.image_url }}
              />
            </View>
            <View style={styles.vwProductItemDetails}>
              <Text style={styles.lblProductName}>
                {props?.prodcutDetail?.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.lblProductPrice}>
                    {rupeeSymbol + props?.prodcutDetail?.price}
                  </Text>
                  <Image
                    style={styles.imgDot}
                    source={images.dotOrange}
                    tintColor={colors.blue4e}
                    resizeMode="stretch"
                  />
                  <Text style={styles.lblProductWeight}>
                    {props?.prodcutDetail?.unit}
                  </Text>
                </View>
                <Text style={styles.lblQuantity}>
                  {getTranslation("qty") + " "}
                  <Text style={styles.lblQuantityCount}>
                    {props?.prodcutDetail?.quantity}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Line */}
        <View style={styles.vwLine} />
        {/* Rating  */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 18,
            marginBottom: 21.29,
            height: 58.11,
            alignItems: "center",
            justifyContent: "space-between",
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
                resizeMode="stretch"
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
              props.handleOnChangeText(text, "description");
            }}
            onBlur={() => {
              props.handleOnBlur("description");
            }}
            onFocus={() => {
              props.handleOnFocus("description");
            }}
            onSubmitEditing={() => props?.handleOnSubmit("description")}
            focusValue={props.product_reviewFocused}
          />
        </View>
        {/* Upload Image and Videos */}
        {!props?.navigateFromStoreReview && (
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
                  />
                </TouchableOpacity>
                {props?.multiImagesArray?.length > 0 && (
                  <View style={{ flexDirection: "row", gap: 9.02 }}>
                    {props?.multiImagesArray?.map(renderUploadImageVideo)}
                  </View>
                )}
              </View>
            </ScrollView>
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
          title={
            props?.isEditRating
              ? getTranslation("update")
              : getTranslation("submit")
          }
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
