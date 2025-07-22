import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
  StatusBar,
  Modal,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { colors } from "../../constants/Colors";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { images } from "../../constants/Images";
import {
  activityOpacity,
  hitSlop,
  rupeeSymbol,
} from "../../constants/GConstant";
import { fontSize } from "../../constants/FontSizes";
import GlobalButton from "../../global/GlobalButton";
import {
  ColorVariation,
  GroceryProductVariation,
  Media,
  ProductData,
  RatingSummary,
  Review,
  SizeVariation,
  Tag,
} from "../../constants/interfaces";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GlobalBackButton from "../../global/GlobalBackButton";
import FastImage from "react-native-fast-image";
import { DateFormatsManager } from "../../constants/utils/DateFormats";
import Video from "react-native-video";
import { ScreenDimensions } from "../../constants/utils/Dimensions";

interface PropsType {
  productDetails: ProductData | null;
  arrTags: Tag[];
  arrSizeVariations: SizeVariation[];
  arrColorVariations: ColorVariation[];
  currentIndex: number;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onPressVariationProduct: (variation_id: string) => void;
  onPressGoToCompareProduct: () => void;
  onPressBuyNow: (type: "add" | "remove") => void;
  onPressSize: (selectedSize: string, size_id: string) => void;
  onPressColor: (selectedColor: string) => void;
  onPressImageVideo: () => void;
  onPressViewAllReview: (product_id: string) => void;
  onPressFavourite: (product_id: string, variation_id: string) => void;

  mediaModalVisible: boolean;
  handleCloseMediaModal: () => void;
  selectedMedia: { link: string; type: "image" | "video" } | null;
  handleSelectMedia: (
    mediaList: { link: string; type: "image" | "video" }[],
    index: number
  ) => void;
  allMedia: Media[];
  selectedIndex: number;

  cartItemTotal: number;
  is_variation: boolean;
  is_size: boolean;
  is_color: boolean;
  navigateFromCompareProduct: boolean;
}

const ViewProductDetailComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  const renderDots = () => {
    return (
      <View style={styles.vwDotsContainer}>
        {props?.productDetails?.images?.map((_, index) => (
          <View
            key={index}
            style={[
              styles.vwDot,
              {
                backgroundColor:
                  props?.currentIndex === index ? colors.black : colors.greya7,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const renderItemTags = (item: Tag, index: number) => {
    if (props?.arrTags.length === 1) {
      return (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image
            style={{ height: 21.75, width: 28, marginLeft: 18 }}
            source={item?.icon}
            resizeMode="stretch"
          />
          <Text style={styles.lblProductDeliveryData}>{item?.title}</Text>
        </View>
      );
    }
    return (
      <View
        key={index}
        style={{
          alignItems: "center",
          width: ScreenDimensions?.screenWidth / 4,
        }}
      >
        <Image
          style={
            item?.title === "Fast Delivery"
              ? styles.imgFastDelivery
              : styles.imgProductDeliveryData
          }
          source={item?.icon}
        />
        <Text style={styles.lblProductDeliveryData}>{item?.title}</Text>
      </View>
    );
  };

  const renderItemSimilarProducts = ({
    item,
    index,
  }: {
    item: GroceryProductVariation;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        key={index}
        style={
          item?.is_selected
            ? styles.btnSimilarProductSelected
            : styles.btnSimilarProduct
        }
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        onPress={() => props?.onPressVariationProduct(item?.variation_id)}
      >
        <FastImage
          style={styles.imgSimilarProduct}
          source={{ uri: item?.image }}
        />
        <View style={styles.vwPriceWeight}>
          <Text
            style={{
              ...styles.lblProdcuctFinalPrice,
              color: colors.blue4e,
            }}
          >
            {rupeeSymbol + parseInt(item?.price).toFixed()}
          </Text>
          <Text style={styles.lblProductWeight1}>{item?.weight}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemArrRateProgress = (item: RatingSummary, index: number) => {
    return (
      <View style={styles.vwRateProgressItem} key={index}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View style={styles.vwRateNumber}>
            <Image style={styles.imgMainStar} source={images.star} />
            <Text style={styles.lblRateNumber}>{item?.rate_number}</Text>
          </View>

          <View style={styles.vwProgressBar}>
            <View
              style={[
                styles.vwProgressBarFill,
                {
                  width: `${item?.rate_percentage}%`,
                },
              ]}
            />
          </View>
        </View>
        <View style={{ width: 35, flexDirection: "row-reverse" }}>
          <Text style={styles.lblRatePercentage}>{item?.rate_percentage}%</Text>
        </View>
      </View>
    );
  };

  const renderItemArrReviews = (item: Review, index: number) => {
    return (
      <View key={index}>
        <Text style={styles.lblReviewName}>{item?.name}</Text>
        <View style={styles.vwReviewRateDate}>
          <View style={styles.vwRateNumber}>
            <Image style={styles.imgMainStar} source={images.star} />
            <Text style={styles.lblReviewRateNumber}>{item?.rating}</Text>
          </View>
          <Text style={styles.lblReviewDate}>
            {DateFormatsManager.formatDate(
              item?.date,
              DateFormatsManager.DateFormats.DD_MM_YYYY
            )}
          </Text>
        </View>
        <Text style={styles.lblReviewDesc}>{item?.comment}</Text>
        {/* Media */}
        <FlatList
          data={item?.media}
          horizontal
          bounces={false}
          contentContainerStyle={{ gap: 20 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: itemMedia, index }) => (
            <>
              <TouchableOpacity
                style={styles.btnReviewImage}
                activeOpacity={activityOpacity}
                hitSlop={hitSlop}
                onPress={() => props?.handleSelectMedia(item?.media, index)}
              >
                {itemMedia.type === "image" ? (
                  <Image
                    source={{ uri: itemMedia.link }}
                    style={styles.imgReview}
                    resizeMode="cover"
                  />
                ) : (
                  <Video
                    source={{ uri: itemMedia.link }}
                    style={styles.imgReview}
                    paused={true} // Don't autoplay
                    controls={true} // Native play/pause buttons
                    resizeMode="cover"
                    repeat={false}
                  />
                )}
              </TouchableOpacity>
              {itemMedia?.type === "video" && (
                <TouchableOpacity
                  style={styles.btnReviewVideo}
                  activeOpacity={activityOpacity}
                  hitSlop={hitSlop}
                  onPress={() => props?.handleSelectMedia(item?.media, index)}
                >
                  <Image style={styles.imgVideo} source={images.videocircle} />
                </TouchableOpacity>
              )}
            </>
          )}
        />
        {index !== (props?.productDetails?.reviews?.length ?? 0) - 1 && (
          <View style={styles.vwLine} />
        )}
      </View>
    );
  };

  const renderItemFashionSize = ({
    item,
    index,
  }: {
    item: SizeVariation;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={
          item?.is_selected
            ? styles.btnSize
            : { ...styles.btnSize, backgroundColor: colors.white }
        }
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        onPress={() => props?.onPressSize(item?.size, item?.size_id)}
        key={index}
      >
        <Text style={{ ...styles.lblSize, fontSize: fontSize.size25 }}>
          {item?.size}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItemFashionColor = ({
    item,
    index,
  }: {
    item: ColorVariation;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={{ ...styles.btnColor, backgroundColor: item?.hex }}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        onPress={() => props?.onPressColor(item?.hex)}
        key={index}
      >
        {item?.is_selected && (
          <Image
            style={styles.imgSelectedDot}
            source={images.selectedDot}
            resizeMode="stretch"
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.orange1c}
        barStyle={"dark-content"}
      />
      <View style={{ flex: 1 }}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={[styles.vwImgMainLogo, { position: "relative" }]}>
            <FlatList
              data={props?.productDetails?.images}
              horizontal
              bounces={false}
              onScroll={props?.handleScroll}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <Image
                    style={styles.imgProduct_imgMainF}
                    source={{ uri: item.image }}
                    resizeMode={"stretch"}
                  />
                );
              }}
            />
            {/* Dot indicators */}
            {renderDots()}
          </View>
          {/* Product Main Details */}
          <View style={styles.vwCategoryTitleInstock}>
            <Text style={styles.lblCategoryTitle}>
              {props?.productDetails?.main_category +
                "  /  " +
                props?.productDetails?.sub_category}
            </Text>
            <Text
              style={{
                ...styles.lblStock,
                color: props?.productDetails?.in_stock
                  ? colors.green86
                  : colors.red2e,
              }}
            >
              {props?.productDetails?.in_stock
                ? getTranslation("inStock")
                : getTranslation("outOfStock")}
            </Text>
          </View>

          {/* Produt name */}
          <Text style={styles.lblProductName}>
            {props?.productDetails?.product_name}
          </Text>

          {/* Product Weight */}
          {props?.productDetails?.product_weight && (
            <Text style={styles.lblProductWeight}>
              {props?.productDetails?.product_weight}
            </Text>
          )}

          {/* Product rate review */}
          <View style={styles.vwProductRateReview}>
            <View style={styles.vwProductRate}>
              <Image style={styles.imgStar} source={images.star} />
              <Text style={styles.lblProduct_rate}>
                {props?.productDetails?.average_rating}
              </Text>
            </View>
            <View style={styles.vwProductReview}>
              <Image
                style={styles.imgDotGrey}
                source={images.dotOrange}
                tintColor={colors.greyd9}
                resizeMode="stretch"
              />
              <View>
                <Text style={styles.lblProduct_reviews}>
                  {props?.productDetails?.total_reviews + " "}
                  <Text style={styles.lblReviews}>
                    {getTranslation("reviews")}
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          {/* Product Price */}
          <View style={styles.vwProductPrice}>
            <Text style={styles.lblProdcuctFinalPrice}>
              {rupeeSymbol + props?.productDetails?.price}
            </Text>
            {/* <Text style={styles.lblProductPrice}>
              {rupeeSymbol + props?.productDetails?.original_price}
            </Text> */}
          </View>

          {/* Prodcut distance time */}
          <View style={styles.vwDistanceTime}>
            <Image
              style={styles.imgDistance}
              source={images.distanceIcon}
              resizeMode="stretch"
            />
            <Text style={styles.lblApproxDistanceTime}>
              {getTranslation("approxDistanceTime")}
            </Text>
            <Text style={styles.lblPoductDistance}>
              {props?.productDetails?.distance}
            </Text>
            <Image
              style={styles.imgDotOrange}
              source={images.dotOrange}
              resizeMode="stretch"
            />
            <Text style={styles.lblProductDeliveryTime}>
              {props?.productDetails?.estimated_delivery_time}
            </Text>
          </View>

          {/* variation data */}
          {props?.productDetails?.is_variation === true && (
            <View>
              {/* ✅ Case: Show Size/Color only if either exists */}
              {(props?.productDetails?.is_size === true ||
                props?.productDetails?.is_color === true) && (
                <View style={styles.vwFashionSizeColor}>
                  {props?.productDetails?.is_size === true && (
                    <View>
                      <Text style={styles.lblSize}>
                        {getTranslation("size")}
                      </Text>
                      <FlatList
                        data={props?.arrSizeVariations}
                        bounces={false}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderItemFashionSize}
                        contentContainerStyle={{
                          gap: 14,
                          marginTop: 10,
                          marginBottom: 20,
                          paddingRight: 14,
                        }}
                      />
                    </View>
                  )}
                  {props?.productDetails?.is_color === true && (
                    <View>
                      <Text style={styles.lblColor}>
                        {getTranslation("color")}
                      </Text>
                      <FlatList
                        data={props?.arrColorVariations}
                        bounces={false}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderItemFashionColor}
                        contentContainerStyle={{
                          gap: 15,
                          marginTop: 10,
                          paddingRight: 15,
                        }}
                      />
                    </View>
                  )}
                </View>
              )}

              {/* ✅ Case: Show Similar Products only if no size/color */}
              {props?.productDetails?.is_size !== true &&
                props?.productDetails?.is_color !== true && (
                  <FlatList
                    data={
                      props?.productDetails
                        ?.variations as GroceryProductVariation[]
                    }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={{
                      paddingLeft: 20,
                      gap: 14,
                      marginTop: 20,
                      paddingRight: 20,
                    }}
                    renderItem={renderItemSimilarProducts}
                  />
                )}
            </View>
          )}

          {/* tags */}
          <View
            style={{
              ...styles.vwProductData,
              justifyContent:
                props?.arrTags.length === 1
                  ? "flex-start"
                  : props?.arrTags.length === 2
                  ? "space-evenly"
                  : "space-around",
            }}
          >
            {props?.arrTags?.map(renderItemTags)}
          </View>

          {/* Product Details */}
          <Text style={styles.lblHighlight}>
            {getTranslation("productDetails")}
          </Text>
          <Text style={styles.lblProductDesc}>
            {props?.productDetails?.description}
          </Text>

          {/* Reviews */}
          <Text style={styles.lblHighlight}>{getTranslation("reviews")}</Text>
          <View style={styles.vwRateProgress}>
            <View>
              <View
                style={{ flexDirection: "row", gap: 3, alignItems: "center" }}
              >
                <Text style={styles.lblReviews1}>
                  {props?.productDetails?.average_rating}
                </Text>
                <Image style={styles.imgMainStar} source={images.star} />
              </View>
              <Text style={styles.lblReviewsCount}>
                {props?.productDetails?.total_reviews}{" "}
                {getTranslation("reviews1")}
              </Text>
            </View>
            <View style={styles.vwVerticalLine} />
            <View style={{ gap: 8, flex: 1 }}>
              {props?.productDetails?.rating_summary.map(
                renderItemArrRateProgress
              )}
            </View>
          </View>
          <View style={{ marginTop: 20, marginHorizontal: 20 }}>
            {props?.productDetails?.reviews.map(renderItemArrReviews)}
          </View>
          {(props?.productDetails?.reviews?.length ?? 0) > 0 && (
            <TouchableOpacity
              style={styles.btnViewAll}
              activeOpacity={activityOpacity}
              hitSlop={hitSlop}
              onPress={() => {
                if (props?.productDetails?.product_id) {
                  props.onPressViewAllReview(props.productDetails.product_id);
                }
              }}
            >
              <Text style={styles.lblViewAll}>{getTranslation("viewAll")}</Text>
              <Image
                style={styles.imgRightOrangeArrow}
                source={images.rightArrowOrange}
              />
            </TouchableOpacity>
          )}

          {/* Go to Comapare Products */}
          {!props?.navigateFromCompareProduct && (
            <View style={styles.vwGotoComapreButton}>
              <GlobalButton
                isOrangeWithBorder
                title={getTranslation("goToCompareProduct")}
                onPress={props?.onPressGoToCompareProduct}
              />
            </View>
          )}
        </ScrollView>

        {/* Like buy Now */}
        <View
          style={{
            ...styles.vwLikeBuyNow,
            marginBottom: insets.bottom ? insets.bottom : 20,
          }}
        >
          <TouchableOpacity
            style={styles.btnIsFavourite}
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={() =>
              props?.onPressFavourite(
                props?.productDetails?.product_id ?? "",
                props?.productDetails?.variation_id ?? ""
              )
            }
          >
            <Image
              style={styles.imgRedHeart}
              source={
                props?.productDetails?.is_wishlist
                  ? images.redHeart
                  : images.emptyHeart
              }
            />
          </TouchableOpacity>
          {props?.productDetails?.cart?.quantity === 0 ? (
            <GlobalButton
              isOrange
              title={getTranslation("buyNow")}
              flex={1}
              onPress={() => props?.onPressBuyNow("add")}
            />
          ) : (
            <View style={styles.vwBuyNow}>
              <TouchableOpacity
                onPress={() => props.onPressBuyNow("remove")}
                hitSlop={hitSlop}
                activeOpacity={activityOpacity}
              >
                <Image style={styles.imgAddMinus} source={images.minus} />
              </TouchableOpacity>
              <Text style={styles.lblProductQuantity}>
                {props?.productDetails?.cart?.quantity}
              </Text>
              <TouchableOpacity
                onPress={() => props.onPressBuyNow("add")}
                hitSlop={hitSlop}
                activeOpacity={activityOpacity}
              >
                <Image style={styles.imgAddMinus} source={images.add} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Media Modal */}
      <Modal
        visible={props?.mediaModalVisible}
        transparent
        animationType="fade"
        onRequestClose={props?.handleCloseMediaModal}
      >
        <View style={styles.modalOverlay}>
          {/* Close Button */}
          <TouchableOpacity
            style={[styles.btnClose, { top: insets.top + 20 }]}
            onPress={props?.handleCloseMediaModal}
            hitSlop={hitSlop}
            activeOpacity={activityOpacity}
          >
            <Image
              source={images.closeImage}
              style={{ height: 35, width: 35 }}
            />
          </TouchableOpacity>

          {/* Media Gallery of Review */}
          <FlatList
            data={props?.allMedia || []} // ✅ full media array
            horizontal
            pagingEnabled
            keyExtractor={(_, index) => index.toString()}
            initialScrollIndex={props?.selectedIndex || 0} // start at tapped index
            getItemLayout={(_, index) => ({
              length: ScreenDimensions.screenWidth,
              offset: ScreenDimensions.screenWidth * index,
              index,
            })}
            renderItem={({ item }) => (
              <View style={styles.mediaItem}>
                {item?.type === "image" ? (
                  <Image
                    source={{ uri: item.link }}
                    style={styles.fullScreenMedia}
                    resizeMode="contain"
                  />
                ) : (
                  <Video
                    source={{ uri: item.link }}
                    style={styles.fullScreenMedia}
                    resizeMode="contain"
                    controls
                    paused={false}
                    fullscreen={false}
                  />
                )}
              </View>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ViewProductDetailComponent;
