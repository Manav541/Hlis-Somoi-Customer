import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { fontsfamily } from "../../constants/FontFamily";
import {
  activityOpacity,
  hitSlop,
  rupeeSymbol,
} from "../../constants/GConstant";
import { colors } from "../../constants/Colors";
import { ScreenDimensions } from "../../constants/utils/Dimensions";
import { fontSize } from "../../constants/FontSizes";
import FastImage from "react-native-fast-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GlobalBackButton from "../../global/GlobalBackButton";
import { ProductRestaurant, RestaurantDetailResponse } from "../../constants/interfaces";

interface PropsType {
  foodData: RestaurantDetailResponse;
  arrSubCategoryType: any[];
  onPressSubCategoryType: (index: number) => void;
  arrSubCategoryData: any[];
  currentIndex: number;
  handleScroll: (event: any) => void;

  handleQuantityChange: (index: number, type: "add" | "remove") => void;
  onPressFavourite: (index: number) => void;

  isFoodModalVisible: boolean;
  handleOnPressFoodItem: (item: ProductRestaurant, index: number) => void;
  selectedFoodItem: ProductRestaurant;
  selectedFoodItemIndex: number;
  handleCloseFoodModal: () => void;
  onPressShare: () => void;
  onPressReview: () => void;
  onPressCartIcon: () => void;

  onPressBack: () => void;
  isNavigating: boolean;
}

const ViewRestaurantDetailComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  const renderItemSubCategoryType = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={
          item?.isSelected
            ? styles.btnSubCategoryTitleSelected
            : styles.btnSubCategoryTitle
        }
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        onPress={() => props.onPressSubCategoryType(index)}
      >
        <Text
          style={
            item?.isSelected
              ? styles.lblSubCategoryTitleSelected
              : styles.lblSubCategoryTitle
          }
        >
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderArrSubCategoryFood = ({ item, index }: {item : ProductRestaurant, index: number}) => {
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.vwFoodItem,
          {
            width: (ScreenDimensions.screenWidth - 20 * 2 - 19) / 2,
          },
        ]}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        onPress={() => props.handleOnPressFoodItem(item, index)}
      >
        {/* Product Image and Favourite button */}
        <View style={styles.vwFoodImgLike}>
          <FastImage source={{uri : item?.image}} style={styles.imgFood} />
          <TouchableOpacity
            style={styles.btnRedHeart}
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={() => {
              props?.onPressFavourite(index);
            }}
          >
            <Image
              style={styles.imgRedHeart}
              source={item?.is_favorite ? images.redHeart : images.emptyHeart}
            />
          </TouchableOpacity>
        </View>

        {/* Product Details */}
        <View style={styles.vwFoodDetails}>
          <View style={{ height: 44, marginRight: 10 }}>
            <Text style={styles.lblFoodName} numberOfLines={2}>
              {item?.name}
            </Text>
          </View>

          <View style={styles.vwPriceRating}>
            <Text style={styles.lblFoodFinalPrice}>
              {rupeeSymbol + item?.price}
            </Text>
            <View style={styles.vwFoodRating}>
              <Image style={styles.imgStarFood} source={images.star} />
              <Text style={styles.lblFoodRating}>{item?.rating}</Text>
            </View>
          </View>
        </View>
        {/* Add to cart */}
        {item.quantity === 0 ? (
          <TouchableOpacity
            style={styles.btnAddToCart}
            activeOpacity={activityOpacity}
            onPress={() => props.handleQuantityChange(index, "add")}
          >
            <Text style={styles.lblAddToCart}>
              {getTranslation("addToCart")}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.vwCounterContainer}>
            <TouchableOpacity
              onPress={() => props.handleQuantityChange(index, "remove")}
              hitSlop={hitSlop}
              activeOpacity={activityOpacity}
            >
              <Image style={styles.imgAddMinus} source={images.minus} />
            </TouchableOpacity>
            <Text style={styles.lblFoodQuantity}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => props.handleQuantityChange(index, "add")}
              hitSlop={hitSlop}
              activeOpacity={activityOpacity}
            >
              <Image style={styles.imgAddMinus} source={images.add} />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.vwMain}>
      <StatusBar
        // translucent
        backgroundColor={colors.blue4e}
        barStyle={"light-content"}
      />
      <View style={{ flex: 1, marginTop: insets.top }}>
        <ScrollView
          style={styles.vwMain}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.vwImgMainLogo}>
            {/* Stick header */}
            <View style={styles.vwHeader}>
              <GlobalBackButton onPress={props?.onPressBack} isWhite />
              <View style={styles.vwHeaderRight}>
                <TouchableOpacity
                  activeOpacity={activityOpacity}
                  hitSlop={hitSlop}
                  onPress={props?.onPressShare}
                >
                  <Image
                    style={styles.imgButton}
                    source={images.shareIcon}
                    tintColor={colors.white}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={activityOpacity}
                  hitSlop={hitSlop}
                  onPress={props?.onPressCartIcon}
                  disabled={props?.isNavigating}
                >
                  <Image
                    style={styles.imgButton}
                    source={images.cartBagIcon}
                    tintColor={colors.white}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <FastImage
              style={styles.imgRestaurant_imgMain}
              source={{ uri: props?.foodData?.restaurant?.banner_image }}
              resizeMode="cover"
            />
            <FastImage
              style={styles.imgRestaurant_logo}
              source={{ uri: props?.foodData?.restaurant?.logo }}
            />
          </View>

          {/* Restaurant Details */}
          <View style={styles.vwRestaurantDetails}>
            <Text style={styles.lblRestaurant_name}>
              {props?.foodData?.restaurant?.name}
            </Text>
            <View style={styles.vwRestaurantAddress}>
              <Image
                style={styles.imgRestaurant_location}
                source={images.locationIconOrange}
              />
              <Text style={styles.lblRestaurant_address}>
                {props?.foodData?.restaurant?.location}
              </Text>
            </View>
            <View style={styles.vwRestaurantTimeDistance}>
              <Text style={styles.lblRestaurant_deliverytime}>
                {getTranslation("deliveryTiming")}{" "}
                <Text
                  style={{
                    ...styles.lblRestaurant_deliverytime,
                    fontFamily: fontsfamily.semiboldOutFit,
                  }}
                >
                  {props?.foodData?.restaurant?.delivery_time}
                </Text>
              </Text>
              <View style={styles.vwRestaurantDistance}>
                <Image
                  style={styles.imgDot}
                  source={images.dotOrange}
                  resizeMode="stretch"
                />
                <Text style={styles.lblRestaurant_distance}>
                  {props?.foodData?.restaurant?.distance_km}
                </Text>
              </View>
            </View>
          </View>

          {/* Rate & Reviews */}
          <View style={styles.vwRestaurantRateReview}>
            <View style={styles.vwRestaurantRate}>
              <Image
                style={styles.imgStar}
                source={images.star}
                resizeMode="stretch"
              />
              <Text style={styles.lblRestaurant_rate}>
                {props?.foodData?.restaurant?.rating}
              </Text>
            </View>
            <View style={styles.vwRestaurantReview}>
              <Image
                style={styles.imgDotGrey}
                source={images.dotOrange}
                resizeMode="stretch"
              />
              <TouchableOpacity
                activeOpacity={activityOpacity}
                hitSlop={hitSlop}
                onPress={props?.onPressReview}
              >
                <Text style={styles.lblRestaurant_reviews}>
                  {props?.foodData?.restaurant?.review_count}{" "}
                  <Text style={styles.lblReviews}>
                    {getTranslation("reviews")}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Restaurant Sub Category Type View */}
          <View style={styles.vwFilterSubCategoryType}>
            <Image style={styles.imgFilter} source={images.filterWhiteIcon} />
            <FlatList
              data={props?.foodData?.categories}
              renderItem={renderItemSubCategoryType}
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20, gap: 10 }}
            />
          </View>

          {/* Restaurant Food */}
          <View style={styles.vwRestaurantFood}>
            {Array.from({
              length: Math.ceil(props.arrSubCategoryData.length / 2),
            }).map((_, rowIndex) => {
              const items = props?.foodData?.products.slice(
                rowIndex * 2,
                rowIndex * 2 + 2
              );
              return (
                <View
                  key={rowIndex}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {items.map((item, index) => {
                    const actualIndex = rowIndex * 2 + index;
                    return renderArrSubCategoryFood({
                      item,
                      index: actualIndex,
                    });
                  })}
                </View>
              );
            })}
          </View>

          {/* Food Item Detail Modal */}
          <Modal
            visible={props?.isFoodModalVisible}
            transparent
            animationType="fade"
            onRequestClose={props?.handleCloseFoodModal}
          >
            <StatusBar
              translucent
              backgroundColor={colors.black50}
              barStyle={"dark-content"}
            />
            <TouchableWithoutFeedback onPress={props?.handleCloseFoodModal}>
              <View style={styles.vwFoodModalView}>
                <TouchableWithoutFeedback>
                  <View style={styles.vwFoodModalContainer}>
                    {props?.selectedFoodItem && (
                      <>
                        <View style={styles.vwFoodImgBG}>
                          <FastImage
                            style={styles.imgModalFood}
                            source={{uri : props?.selectedFoodItem?.image}}
                          />
                          <TouchableOpacity
                            style={{
                              ...styles.btnRedHeart,
                              height: 35,
                              width: 35,
                              top: 22.22,
                              right: 22.21,
                            }}
                            activeOpacity={activityOpacity}
                            hitSlop={hitSlop}
                            onPress={() => {
                              props?.onPressFavourite(
                                props?.selectedFoodItemIndex
                              );
                            }}
                          >
                            <Image
                              style={{
                                ...styles.imgRedHeart,
                                height: 20,
                                width: 20,
                              }}
                              source={
                                props?.selectedFoodItem.is_favorite
                                  ? images.redHeart
                                  : images.emptyHeart
                              }
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.vwFoodNameShare}>
                          <Text style={styles.lblModalFoodName}>
                            {props?.selectedFoodItem.name}
                          </Text>
                          <View style={{ flexDirection: "row", gap: 9 }}>
                            <TouchableOpacity
                              activeOpacity={activityOpacity}
                              hitSlop={hitSlop}
                              onPress={props?.onPressCartIcon}
                            >
                              <Image
                                style={styles.imgShareCartBag}
                                source={images.cartBagIcon}
                                tintColor={colors.white}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              activeOpacity={activityOpacity}
                              hitSlop={hitSlop}
                              onPress={props?.onPressShare}
                            >
                              <Image
                                style={styles.imgShareCartBag}
                                source={images.shareIcon}
                                tintColor={colors.white}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                        <Text style={styles.lblModalFoodDesc}>
                          {props?.selectedFoodItem.description}
                        </Text>
                        {props?.selectedFoodItem.quantity === 0 ? (
                          <TouchableOpacity
                            style={styles.btnModalAddToCart}
                            activeOpacity={activityOpacity}
                            onPress={() =>
                              props.handleQuantityChange(
                                props?.selectedFoodItemIndex,
                                "add"
                              )
                            }
                          >
                            <Text style={styles.lblAddToCart}>
                              {getTranslation("addToCart")}
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <View
                            style={{
                              ...styles.btnModalAddToCart,
                              flexDirection: "row",
                            }}
                          >
                            <TouchableOpacity
                              onPress={() =>
                                props.handleQuantityChange(
                                  props?.selectedFoodItemIndex,
                                  "remove"
                                )
                              }
                              hitSlop={hitSlop}
                              activeOpacity={activityOpacity}
                            >
                              <Image
                                style={styles.imgAddMinus}
                                source={images.minus}
                              />
                            </TouchableOpacity>
                            <Text style={styles.lblFoodQuantity}>
                              {props?.selectedFoodItem.quantity}
                            </Text>
                            <TouchableOpacity
                              onPress={() =>
                                props.handleQuantityChange(
                                  props?.selectedFoodItemIndex,
                                  "add"
                                )
                              }
                              hitSlop={hitSlop}
                              activeOpacity={activityOpacity}
                            >
                              <Image
                                style={styles.imgAddMinus}
                                source={images.add}
                              />
                            </TouchableOpacity>
                          </View>
                        )}
                      </>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </ScrollView>
      </View>
    </View>
  );
};

export default ViewRestaurantDetailComponent;
