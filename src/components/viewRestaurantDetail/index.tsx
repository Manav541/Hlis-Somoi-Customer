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

interface PropsType {
  restaurant_imgMain: any[];
  restaurant_img: any;
  restaurant_logo: any;
  restaurant_name: string;
  restaurant_address: string;
  restaurant_ratings: number;
  restaurant_distance: string;
  restaurant_reviews: number;
  restaurant_deliverytime: string;

  arrSubCategoryType: any[];
  onPressSubCategoryType: (index: number) => void;
  arrSubCategoryData: any[];
  currentIndex: number;
  handleScroll: (event: any) => void;

  handleQuantityChange: (index: number, type: "add" | "remove") => void;
  onPressFavourite: (index: number) => void;

  isFoodModalVisible: boolean;
  handleOnPressFoodItem: (item: any, index: number) => void;
  selectedFoodItem: any;
  selectedFoodItemIndex: number;
  handleCloseFoodModal: () => void;
  onPressShare: () => void;
  onPressReview: () => void;
  onPressCartIcon: () => void;
}

const ViewRestaurantDetailComponent = (props: PropsType) => {
  const renderDots = () => {
    return (
      <View style={styles.vwDotsContainer}>
        {props.restaurant_imgMain.map((_, index) => (
          <View
            key={index}
            style={[
              styles.vwDot,
              {
                backgroundColor:
                  index === props?.currentIndex ? colors.white : colors.greya7,
              },
            ]}
          />
        ))}
      </View>
    );
  };

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

  const renderArrSubCategoryFood = ({ item, index }: any) => {
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
          <FastImage source={item?.food_img} style={styles.imgFood} />
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
              source={item?.isFavourite ? images.redHeart : images.emptyHeart}
            />
          </TouchableOpacity>
        </View>

        {/* Product Details */}
        <View style={styles.vwFoodDetails}>
          <View style={{ height: 44, marginRight: 10 }}>
            <Text style={styles.lblFoodName} numberOfLines={2}>
              {item?.food_name}
            </Text>
          </View>

          <View style={styles.vwPriceRating}>
            <Text style={styles.lblFoodFinalPrice}>
              {rupeeSymbol + item?.food_price}
            </Text>
            <View style={styles.vwFoodRating}>
              <Image style={styles.imgStarFood} source={images.star} />
              <Text style={styles.lblFoodRating}>{item?.food_rate}</Text>
            </View>
          </View>
        </View>
        {/* Add to cart */}
        {item.food_quantity === 0 ? (
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
            <Text style={styles.lblFoodQuantity}>{item.food_quantity}</Text>
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
    <ScrollView
      style={styles.vwMain}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <View style={styles.vwImgMainLogo}>
        <FlatList
          data={props?.restaurant_imgMain}
          horizontal
          bounces={false}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={props?.handleScroll}
          renderItem={({ item, index }) => {
            return (
              <FastImage
                style={styles.imgRestaurant_imgMain}
                source={item?.imgMain}
                resizeMode="cover"
              />
            );
          }}
        />
        {renderDots()}
        <FastImage
          style={styles.imgRestaurant_logo}
          source={props?.restaurant_logo}
        />
      </View>

      {/* Restaurant Details */}
      <View style={styles.vwRestaurantDetails}>
        <Text style={styles.lblRestaurant_name}>{props?.restaurant_name}</Text>
        <View style={styles.vwRestaurantAddress}>
          <Image
            style={styles.imgRestaurant_location}
            source={images.locationIconOrange}
          />
          <Text style={styles.lblRestaurant_address}>
            {props?.restaurant_address}
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
              {props?.restaurant_deliverytime}
            </Text>
          </Text>
          <View style={styles.vwRestaurantDistance}>
            <Image
              style={styles.imgDot}
              source={images.dotOrange}
              resizeMode="stretch"
            />
            <Text style={styles.lblRestaurant_distance}>
              {props?.restaurant_distance.toLowerCase()}
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
            {props?.restaurant_ratings}
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
              {props?.restaurant_reviews}{" "}
              <Text style={styles.lblReviews}>{getTranslation("reviews")}</Text>
            </Text>
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
        {Array.from({
          length: Math.ceil(props.arrSubCategoryData.length / 2),
        }).map((_, rowIndex) => {
          const items = props.arrSubCategoryData.slice(
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
                return renderArrSubCategoryFood({ item, index: actualIndex });
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
                        source={props?.selectedFoodItem.food_img}
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
                          props?.onPressFavourite(props?.selectedFoodItemIndex);
                        }}
                      >
                        <Image
                          style={{
                            ...styles.imgRedHeart,
                            height: 20,
                            width: 20,
                          }}
                          source={
                            props?.selectedFoodItem.isFavourite
                              ? images.redHeart
                              : images.emptyHeart
                          }
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.vwFoodNameShare}>
                      <Text style={styles.lblModalFoodName}>
                        {props?.selectedFoodItem.food_name}
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
                      {props?.selectedFoodItem.food_description}
                    </Text>
                    <View style={styles.vwAdditionalInfo}>
                      <Text style={styles.lblModalFoodAdditionalInfo}>
                        {getTranslation("additionalInfo")}
                      </Text>
                      <Text
                        style={{
                          ...styles.lblModalFoodAdditionalInfo,
                          fontSize: fontSize.size12,
                        }}
                      >
                        {props?.selectedFoodItem.food_AdditionalInfo}
                      </Text>
                    </View>
                    {props?.selectedFoodItem.food_quantity === 0 ? (
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
                          {props?.selectedFoodItem.food_quantity}
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
  );
};

export default ViewRestaurantDetailComponent;
