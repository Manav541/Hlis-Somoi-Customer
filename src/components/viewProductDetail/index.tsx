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
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { colors } from "../../constants/Colors";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { images } from "../../constants/Images";
import { activityOpacity, hitSlop, rupeeSymbol } from "../../constants/GConstant";
import { fontSize } from "../../constants/FontSizes";
import { fontsfamily } from "../../constants/FontFamily";
import GlobalButton from "../../global/GlobalButton";
import {
  FashionColor,
  FashionSize,
  RateProgress,
  Review,
  SimilarProduct,
} from "../../constants/interfaces";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PropsType {
  product_imgMain: any[];
  product_imgMainF: any[];
  product_img: any;
  mainCategoryTitle: string;
  subCategoryTitle: any[];
  product_inStock: boolean;
  product_name: string;
  product_weight: string;
  product_rating: string;
  product_review: number;
  product_final_price: string;
  product_price: string;
  product_distance: string;
  product_deliverytime: string;
  product_deliveryData: any[];
  arrSimilarProduct: SimilarProduct[];
  product_highlight: any[];
  product_desc: string;
  product_quantity: number;
  arrFashionSize: FashionSize[];
  arrFashionColor: FashionColor[];

  currentIndex: number;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  totalRate: number;
  totalReviews: string;
  arrRateProgress: RateProgress[];
  arrRevieews: Review[];
  onPressGoToCompareProduct: () => void;
  onPressBuyNow: (type: "add" | "remove") => void;
  onPressSize: (selectedSize: string) => void;
  onPressColor: (selectedColor: string) => void;
  onPressViewAll: () => void;
  onPressFavourite: () => void;
  poduct_isFavourite: boolean;
}

const ViewProductDetailComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  const renderDots = () => {
    return (
      <View style={styles.vwDotsContainer}>
        {props?.product_imgMain?.map((_, index) => (
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

  const renderItemProductDeliveryData = (item: any, index: number) => {
    if (props?.product_deliveryData.length === 1) {
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
            source={item.deliveryDataImage}
            resizeMode="stretch"
          />
          <Text style={styles.lblProductDeliveryData}>
            {item.deliveryDataTitle}
          </Text>
        </View>
      );
    }
    return (
      <View key={index} style={{ alignItems: "center", width: 100 }}>
        <Image
          style={
            item.deliveryDataTitle === "Fast Delivery"
              ? styles.imgFastDelivery
              : styles.imgProductDeliveryData
          }
          source={item.deliveryDataImage}
        />
        <Text style={styles.lblProductDeliveryData}>
          {item.deliveryDataTitle}
        </Text>
      </View>
    );
  };

  const renderItemSimilarProducts = ({
    item,
    index,
  }: {
    item: SimilarProduct;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.btnSimilarProduct}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
      >
        <Image style={styles.imgSimilarProduct} source={item?.product_img} />
        <Text
          style={{
            ...styles.lblProdcuctFinalPrice,
            color: colors.blue4e,
            marginLeft: 9,
          }}
        >
          {rupeeSymbol+item?.product_final_price}
        </Text>
        <View style={styles.vwPriceWeight}>
          <Text style={styles.lblProductPrice}>{rupeeSymbol+item?.product_price}</Text>
          <Text style={styles.lblProductWeight1}>{item?.product_weight}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemProductHighlight = (item: any, index: number) => {
    return (
      <View key={index} style={styles.vwHighlightItem}>
        <View style={{ width: 87 }}>
          <Text style={styles.lblHighlightTitle}>{item?.highlightTitle}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.lblHighlightDesc}>{item?.highlightDesc}</Text>
        </View>
      </View>
    );
  };

  const renderItemArrRateProgress = (item: RateProgress, index: number) => {
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
        <View style={{ width: 30, flexDirection: "row-reverse" }}>
          <Text style={styles.lblRatePercentage}>{item?.rate_percentage}%</Text>
        </View>
      </View>
    );
  };

  const renderItemArrReviews = (item: Review, index: number) => {
    return (
      <View key={index}>
        <Text style={styles.lblReviewName}>{item?.review_personName}</Text>
        <View style={styles.vwReviewRateDate}>
          <View style={styles.vwRateNumber}>
            <Image style={styles.imgMainStar} source={images.star} />
            <Text style={styles.lblReviewRateNumber}>{item?.review_rate}</Text>
          </View>
          <Text style={styles.lblReviewDate}>{item?.review_date}</Text>
        </View>
        <Text style={styles.lblReviewDesc}>{item?.review_description}</Text>
        <View style={styles.vwImgeVideo}>
          <View style={styles.vwReviewImage}>
            <Image
              style={
                props?.mainCategoryTitle === "Groceries"
                  ? styles.imgReview
                  : styles.imgReviewF
              }
              source={
                props?.mainCategoryTitle === "Groceries"
                  ? item?.review_image
                  : images.fashionMainImg
              }
            />
          </View>
          {item?.type === "video" && (
            <View style={styles.vwReviewVideo}>
              <Image style={styles.imgVideo} source={images.videocircle} />
            </View>
          )}
        </View>
        {index !== props?.arrRevieews.length - 1 && (
          <View style={styles.vwLine} />
        )}
      </View>
    );
  };

  const renderItemFashionSize = ({
    item,
    index,
  }: {
    item: FashionSize;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={
          item?.isSelected
            ? styles.btnSize
            : { ...styles.btnSize, backgroundColor: colors.white }
        }
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        onPress={() => props?.onPressSize(item?.size)}
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
    item: FashionColor;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={{ ...styles.btnSize, backgroundColor: item?.color }}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        onPress={() => props?.onPressColor(item?.color)}
        key={index}
      >
        {item?.isSelected && (
          <Image style={styles.imgSelectedDot} source={images.selectedDot} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View
          style={
            props?.mainCategoryTitle === "Groceries" && styles.vwImgMainLogo
          }
        >
          <FlatList
            data={
              props?.mainCategoryTitle === "Fashion"
                ? props?.product_imgMainF
                : props?.product_imgMain
            }
            horizontal
            bounces={false}
            onScroll={props?.handleScroll}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <Image
                  style={
                    props?.mainCategoryTitle === "Fashion"
                      ? styles.imgProduct_imgMainF
                      : styles.imgProduct_imgMain
                  }
                  source={item.imgMain}
                  resizeMode={
                    props?.mainCategoryTitle === "Fashion"
                      ? "stretch"
                      : "contain"
                  }
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
            {props?.mainCategoryTitle + "  /  " + props?.subCategoryTitle}
          </Text>
          <Text
            style={{
              ...styles.lblStock,
              color: props?.product_inStock ? colors.green86 : colors.red2e,
            }}
          >
            {props?.product_inStock
              ? getTranslation("inStock")
              : getTranslation("outOfStock")}
          </Text>
        </View>

        {/* Produt name */}
        <Text style={styles.lblProductName}>{props?.product_name}</Text>

        {/* Product Weight */}
        {props?.mainCategoryTitle === "Groceries" && (
          <Text style={styles.lblProductWeight}>{props?.product_weight}</Text>
        )}

        {/* Product rate review */}
        <View style={styles.vwProductRateReview}>
          <View style={styles.vwProductRate}>
            <Image style={styles.imgStar} source={images.star} />
            <Text style={styles.lblProduct_rate}>{props?.product_rating}</Text>
          </View>
          <View style={styles.vwProductReview}>
            <Image
              style={styles.imgDotGrey}
              source={images.dotOrange}
              tintColor={colors.greyd9}
              resizeMode="stretch"
            />
            <TouchableOpacity
              activeOpacity={activityOpacity}
              hitSlop={hitSlop}
              // onPress={props?.onPressReview}
            >
              <Text style={styles.lblProduct_reviews}>
                {props?.product_review}{" "}
                <Text style={styles.lblReviews}>
                  {getTranslation("reviews")}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Price */}
        <View style={styles.vwProductPrice}>
          <Text style={styles.lblProdcuctFinalPrice}>
            {rupeeSymbol+props?.product_final_price}
          </Text>
          <Text style={styles.lblProductPrice}>{rupeeSymbol+props?.product_price}</Text>
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
            {props?.product_distance}
          </Text>
          <Image
            style={styles.imgDotOrange}
            source={images.dotOrange}
            resizeMode="stretch"
          />
          <Text style={styles.lblProductDeliveryTime}>
            {props?.product_deliverytime}
          </Text>
        </View>

        {/* fashion data */}
        {props?.mainCategoryTitle === "Fashion" && (
          <View style={styles.vwFashionSizeColor}>
            <Text style={styles.lblSize}>{getTranslation("size")}</Text>
            <View>
              <FlatList
                data={props?.arrFashionSize}
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

            <Text style={styles.lblColor}>{getTranslation("color")}</Text>
            <View>
              <FlatList
                data={props?.arrFashionColor}
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
          </View>
        )}

        {/* Similar Product */}
        {props?.mainCategoryTitle === "Groceries" && (
          <FlatList
            data={props?.arrSimilarProduct}
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

        {/* product_deliveryData */}
        <View
          style={{
            ...styles.vwProductData,
            justifyContent:
              props?.product_deliveryData.length === 1
                ? "flex-start"
                : "space-around",
          }}
        >
          {props?.product_deliveryData?.map(renderItemProductDeliveryData)}
        </View>

        {/* Highligh */}
        <Text style={styles.lblHighlight}>{getTranslation("highlight")}</Text>
        <View style={styles.vwHighlight}>
          {props?.product_highlight?.map(renderItemProductHighlight)}
        </View>

        {/* Product Details */}
        <Text style={styles.lblHighlight}>
          {getTranslation("productDetails")}
        </Text>
        <Text style={styles.lblProductDesc}>{props?.product_desc}</Text>

        {/* Reviews */}
        <Text style={styles.lblHighlight}>{getTranslation("reviews")}</Text>
        <View style={styles.vwRateProgress}>
          <View>
            <View
              style={{ flexDirection: "row", gap: 3, alignItems: "center" }}
            >
              <Text style={styles.lblReviews1}>{props?.totalRate}</Text>
              <Image style={styles.imgMainStar} source={images.star} />
            </View>
            <Text style={styles.lblReviewsCount}>
              {props?.totalReviews}  {getTranslation("reviews1")}
            </Text>
          </View>
          <View style={styles.vwVerticalLine} />
          <View style={{ gap: 8, flex: 1 }}>
            {props?.arrRateProgress.map(renderItemArrRateProgress)}
          </View>
        </View>
        <View style={{ marginTop: 20, marginHorizontal: 20 }}>
          {props?.arrRevieews.map(renderItemArrReviews)}
        </View>
        <TouchableOpacity
          style={styles.btnViewAll}
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          onPress={props?.onPressViewAll}
        >
          <Text style={styles.lblViewAll}>{getTranslation("viewAll")}</Text>
          <Image
            style={styles.imgRightOrangeArrow}
            source={images.rightArrowOrange}
          />
        </TouchableOpacity>

        {/* Go to Comapare Products */}
        <View style={styles.vwGotoComapreButton}>
          <GlobalButton
            isOrangeWithBorder
            title={getTranslation("goToCompareProduct")}
            onPress={props?.onPressGoToCompareProduct}
          />
        </View>
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
          onPress={props?.onPressFavourite}
        >
          <Image
            style={styles.imgRedHeart}
            source={
              props?.poduct_isFavourite ? images.redHeart : images.emptyHeart
            }
          />
        </TouchableOpacity>
        {props?.product_quantity === 0 ? (
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
              {props?.product_quantity}
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
  );
};

export default ViewProductDetailComponent;
