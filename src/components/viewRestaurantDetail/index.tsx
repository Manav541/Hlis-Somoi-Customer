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
  Pressable,
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
import FastImage from "react-native-fast-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GlobalBackButton from "../../global/GlobalBackButton";
import {
  Category,
  FoodProductVariation,
  ProductRestaurant,
  RestaurantDetailResponse,
} from "../../constants/interfaces";

interface PropsType {
  cartItemTotal: number;
  foodData: RestaurantDetailResponse;
  arrSubCategoryType: Category[];
  onPressSubCategoryType: (selectedId: string, selectedName: string) => void;
  arrSubCategoryFoodData: ProductRestaurant[];

  handleQuantityChange: (
    index: number,
    type: "add" | "remove",
    product_id: string,
    is_variation?: boolean,
    variation_id?: string
  ) => void;
  onPressFavourite: (product_id: string, index: number) => void;

  isFoodModalVisible: boolean;
  handleOnPressFoodItem: (item: ProductRestaurant, index: number) => void;
  onPressVariationFood: (variationId: string) => void;
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

  const renderItemSubCategoryType = ({
    item,
    index,
  }: {
    item: Category;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={
          item?.isSelected
            ? styles.btnSubCategoryTitleSelected
            : styles.btnSubCategoryTitle
        }
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        key={index}
        onPress={() => props.onPressSubCategoryType(item?.id, item?.name)}
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

  const renderArrSubCategoryFood = ({
    item,
    index,
  }: {
    item: ProductRestaurant;
    index: number;
  }) => {
    return (
      <View
        style={[
          styles.vwMyWishlistItem,
          {
            width: (ScreenDimensions.screenWidth - 20 * 2 - 19) / 2,
          },
        ]}
        key={index}
      >
        <TouchableOpacity
          style={[
            styles.btnFoodItem,
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
            <FastImage source={{ uri: item?.image }} style={styles.imgFood} />
            <TouchableOpacity
              style={styles.btnRedHeart}
              activeOpacity={activityOpacity}
              hitSlop={hitSlop}
              onPress={() => {
                props?.onPressFavourite(item?.id, index);
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
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text style={styles.lblFoodFinalPrice}>
                  {rupeeSymbol + item?.price}
                </Text>
                <Text style={styles.lblFoodWeight}>
                  {item?.selected_variation?.amount +
                    item?.selected_variation?.unit}
                </Text>
              </View>
              <View style={styles.vwFoodRating}>
                <Image style={styles.imgStarFood} source={images.star} />
                <Text style={styles.lblFoodRating}>{item?.rating}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {/* Add to cart */}
        {item.quantity === 0 ? (
          <TouchableOpacity
            style={styles.btnAddToCart}
            activeOpacity={activityOpacity}
            onPress={() =>
              props.handleQuantityChange(
                index,
                "add",
                item?.id,
                item?.is_variation,
                item?.selected_variation?.variation_id
              )
            }
          >
            <Text style={styles.lblAddToCart}>
              {getTranslation("addToCart")}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.vwCounterContainer}>
            <TouchableOpacity
              onPress={() =>
                props.handleQuantityChange(
                  index,
                  "remove",
                  item?.id,
                  item?.is_variation,
                  item?.selected_variation?.variation_id
                )
              }
              hitSlop={hitSlop}
              activeOpacity={activityOpacity}
            >
              <Image style={styles.imgAddMinus} source={images.minus} />
            </TouchableOpacity>
            <Text style={styles.lblFoodQuantity}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() =>
                props.handleQuantityChange(
                  index,
                  "add",
                  item?.id,
                  item?.is_variation,
                  item?.selected_variation?.variation_id
                )
              }
              hitSlop={hitSlop}
              activeOpacity={activityOpacity}
            >
              <Image style={styles.imgAddMinus} source={images.add} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderItemSimilarFoodProducts = ({
    item,
    index,
  }: {
    item: FoodProductVariation;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        key={index}
        style={
          item?.is_selected == true
            ? styles.btnSimilarProductSelected
            : styles.btnSimilarProduct
        }
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        onPress={() => props?.onPressVariationFood(item?.variation_id)}
      >
        <FastImage
          style={styles.imgSimilarProduct}
          source={{ uri: props?.selectedFoodItem?.image }}
        />
        <View>
          <Text style={styles.lblProdcuctFinalPrice}>
            {rupeeSymbol + parseInt(item?.price).toFixed(2)}
          </Text>

          <Text style={styles.lblProductWeight1}>
            {item?.amount + item?.unit}
          </Text>
        </View>
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
          <View>
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
                  {props?.cartItemTotal > 0 && (
                    <View style={styles.vwBedge}>
                      <Text style={styles.lblBedge}>
                        {props?.cartItemTotal}
                      </Text>
                    </View>
                  )}
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
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.lblRestaurant_deliverytime}>
                  {getTranslation("deliveryTiming") + " "}
                </Text>
                <Text
                  style={{
                    ...styles.lblRestaurant_deliverytime,
                    fontFamily: fontsfamily.semiboldOutFit,
                  }}
                >
                  {props?.foodData?.restaurant?.delivery_time}
                </Text>
              </View>

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
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.lblRestaurant_reviews}>
                    {props?.foodData?.restaurant?.review_count + " "}
                  </Text>
                  <Text style={styles.lblReviews}>
                    {getTranslation("reviews")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Restaurant Sub Category Type View */}
          <View style={styles.vwFilterSubCategoryType}>
            <Image style={styles.imgFilter} source={images.filterWhiteIcon} />
            <FlatList
              data={props?.arrSubCategoryType}
              renderItem={renderItemSubCategoryType}
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20, gap: 10 }}
            />
          </View>

          {/* Restaurant Food */}
          <View style={styles.vwRestaurantFood}>
            {props.arrSubCategoryFoodData.length === 0 ? (
              <Text style={styles.lblNoData}>
                {getTranslation("noDataFound")}
              </Text>
            ) : (
              Array.from({
                length: Math.ceil(props.arrSubCategoryFoodData.length / 2),
              }).map((_, rowIndex) => {
                const items = props.arrSubCategoryFoodData.slice(
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
              })
            )}
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
            <View style={styles.vwFoodModalView}>
              <Pressable
                style={{ flex: 1 }}
                onPress={() => props?.handleCloseFoodModal()}
              />
              <View style={styles.vwFoodModalContainer}>
                {props?.selectedFoodItem && (
                  <>
                    <ScrollView
                      bounces={false}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{
                        flexGrow: 1,
                        paddingBottom: 80,
                      }}
                    >
                      <View style={styles.vwFoodImgBG}>
                        <FastImage
                          style={styles.imgModalFood}
                          source={{ uri: props?.selectedFoodItem?.image }}
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
                              props?.selectedFoodItem?.id,
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
                      {/* Food Product Variation */}
                      {props?.selectedFoodItem?.is_variation == true && (
                        <FlatList
                          data={
                            props?.selectedFoodItem
                              ?.variations as FoodProductVariation[]
                          }
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          bounces={false}
                          contentContainerStyle={{
                            // paddingLeft: 20,
                            gap: 14,
                            // marginTop: 20,
                            paddingRight: 20,
                          }}
                          renderItem={renderItemSimilarFoodProducts}
                        />
                      )}
                    </ScrollView>

                    {/* Add To Cart */}
                    <View style={styles.fixedBottom}>
                      {props?.selectedFoodItem?.quantity == 0 ? (
                        <TouchableOpacity
                          style={styles.btnModalAddToCart}
                          activeOpacity={activityOpacity}
                          onPress={() =>
                            props.handleQuantityChange(
                              props?.selectedFoodItemIndex,
                              "add",
                              props?.selectedFoodItem?.id,
                              props?.selectedFoodItem?.is_variation,
                              props?.selectedFoodItem?.variation_id
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
                                "remove",
                                props?.selectedFoodItem?.id,
                                props?.selectedFoodItem?.is_variation,
                                props?.selectedFoodItem?.variation_id
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
                            {props?.selectedFoodItem?.quantity}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              props.handleQuantityChange(
                                props?.selectedFoodItemIndex,
                                "add",
                                props?.selectedFoodItem?.id,
                                props?.selectedFoodItem?.is_variation,
                                props?.selectedFoodItem?.variation_id
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
                    </View>
                  </>
                )}
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </View>
  );
};

export default ViewRestaurantDetailComponent;
