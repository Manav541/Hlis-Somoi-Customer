import {
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Platform,
  FlatList,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import React, { Ref } from "react";
import { styles } from "./styles";
import { images } from "../../../constants/Images";
import { ScreenDimensions } from "../../../constants/utils/Dimensions";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { activityOpacity, hitSlop } from "../../../constants/GConstant";
import { colors } from "../../../constants/Colors";
import {
  AdItem,
  BestProduct,
  GroceriesFoodItem,
  Restaurant,
  SubCategory,
} from "../../../constants/interfaces";

interface PropsType {
  arrGroceriesFood: GroceriesFoodItem[];
  onPressGroceriesFood: (type: string) => void;
  isGroceriesFoodSelected: string;
  arrAds: AdItem[];
  flatListRef: Ref<FlatList>;
  currentIndex: number;
  handleOnScrollAds: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  arrSubCategoryGroceries: SubCategory[];
  arrBestProducts: BestProduct[];
  arrSubCategoryFood: SubCategory[];
  arrBestSellers: Restaurant[];
  handleSellAllCategories: () => void;
  handleSellAllBestSellers: () => void;
  onPressSearch: () => void;
  handleOnPressNotifaicationIcon: () => void;
  onPressLocation: () => void;
  onPressRestaurant: (item: Restaurant) => void;
  onPressSubCategories:()=>void;
  onPressBestProducts:()=>void;
}

const HomeComponent = (props: PropsType) => {
  const arrSubCategory =
    props?.isGroceriesFoodSelected === "Groceries"
      ? props?.arrSubCategoryGroceries
      : props?.arrSubCategoryFood;
  const insets = useSafeAreaInsets();

  const renderGroceriesFoodItem = (item: GroceriesFoodItem, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.btnGroceriesFood,
          {
            backgroundColor:
              props?.isGroceriesFoodSelected === item?.type
                ? colors.orange1c
                : colors.white,
          },
        ]}
        activeOpacity={activityOpacity}
        onPress={() => props?.onPressGroceriesFood(item.type || "")}
      >
        <Image
          style={styles.imgGroceriesFood}
          source={item?.image}
          resizeMode="stretch"
        />
        <View style={styles.vwType}>
          <Text style={styles.lblGroceriesFood}>{item?.type}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemAds = ({ item, index }: { item: AdItem; index: number }) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.vwAddsItem}
        activeOpacity={activityOpacity}
      >
        <Image
          style={styles.imgAdds}
          source={item?.image}
          resizeMode="stretch"
        />
      </TouchableOpacity>
    );
  };

  const renderDots = () => {
    return (
      <View style={styles.vwDotsContainer}>
        {props.arrAds.map((_, index) => (
          <View
            key={index}
            style={[
              styles.vwDot,
              {
                backgroundColor:
                  index === props?.currentIndex ? colors.blue4e : colors.greyd9,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const renderSubCategories = (item: SubCategory, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.btnSubCategories}
        activeOpacity={activityOpacity}
        onPress={() => props?.onPressSubCategories()}
      >
        <Image
          style={styles.imgSubCategories}
          source={item?.image}
          resizeMode="cover"
        />
        <Text style={styles.lblSubCategory} numberOfLines={2}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderBestProducts = (item: BestProduct, index: number) => {
    return (
      <TouchableOpacity
        style={styles.btnBestProducts}
        key={index}
        activeOpacity={activityOpacity}
        onPress={() => props?.onPressBestProducts()}
      >
        <View style={styles.vwBestProductsImage}>
          <Image
            style={{ height: item?.height, width: item?.width }}
            source={item?.image}
          />
        </View>
        <Text style={styles.lblBestProductsUsed}>{item?.used}</Text>
        <Text style={styles.lblBestProductsName}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderStar = (rate: number) => {
    const totalStars = 5;
    const filledStars = 4;
    return (
      <View style={{ flexDirection: "row" }}>
        {Array.from({ length: totalStars }).map((_, index) => {
          return (
            <Image
              key={index}
              source={
                index !== filledStars ? images.starFilled : images.starEmpty
              }
              style={{ width: 24, height: 24, marginRight: 2 }}
            />
          );
        })}
      </View>
    );
  };

  const renderBestSeller = ({
    item,
    index,
  }: {
    item: Restaurant;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={styles.btnBestSeller}
        activeOpacity={activityOpacity}
        key={index}
        onPress={() => props?.onPressRestaurant(item)}
      >
        <Image style={styles.imgBestSeller} source={item?.restaurant_img} resizeMode="stretch" />

        <View style={styles.vwBestSellerDetails}>
          <Text style={styles.lblBestSellerName}>{item?.restaurant_name}</Text>
          <View style={styles.vwRating}>
            {renderStar(item?.restaurant_ratings)}
            <Text style={styles.lblBestSellerReviews}>
              (+{item?.restaurant_reviews})
            </Text>
          </View>
        </View>
        <Image style={styles.imgLogo} source={item?.restaurant_logo} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"light-content"}
      />
      <View style={styles.vwMainContainer}>
        <Image
          style={{
            width: ScreenDimensions.screenWidth,
            height: ScreenDimensions.screenHeight / 3,
          }}
          source={images.linearBG1}
        />
        <ScrollView
          style={StyleSheet.absoluteFillObject}
          contentContainerStyle={{
            paddingTop: insets.top ? insets.top + 20 : 40,
            overflow: "hidden",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,

            flexGrow: 1,
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Groceries Food */}
          <View
            style={{ flexDirection: "row", paddingHorizontal: 20, gap: 19 }}
          >
            {props?.arrGroceriesFood.map((item, index) =>
              renderGroceriesFoodItem(item, index)
            )}
          </View>

          {/* Location Notification */}

          <View style={styles.vwLocationNotification}>
            <TouchableOpacity
              style={styles.vwLocationWithArrow}
              activeOpacity={activityOpacity}
              hitSlop={hitSlop}
              onPress={props?.onPressLocation}
            >
              <View style={styles.vwLocation}>
                <Image
                  style={styles.imgLocation}
                  source={images.locationIcon}
                  resizeMode="stretch"
                />
                <Text style={styles.lblLocation}>
                  {getTranslation("ahmedabad")}
                </Text>
              </View>
              <Image
                style={styles.imgLocation}
                source={images.rightarrowBlue}
                resizeMode="stretch"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnNotification}
              activeOpacity={activityOpacity}
              hitSlop={hitSlop}
              onPress={props?.handleOnPressNotifaicationIcon}
            >
              <Image
                style={styles.imgLocation}
                source={images.notificationIcon}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <TouchableOpacity
            style={styles.btnSearch}
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={props?.onPressSearch}
          >
            <Image style={styles.imgLocation} source={images.search} />
            <Text style={styles.lblSearch}>{getTranslation("search")}</Text>
          </TouchableOpacity>

          {/* Ads */}
          <View style={styles.vwAdds}>
            <FlatList
              ref={props?.flatListRef}
              data={props.arrAds}
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              renderItem={renderItemAds}
              pagingEnabled={true}
              onScroll={props?.handleOnScrollAds}
              snapToInterval={ScreenDimensions.screenWidth - 40}
              decelerationRate="fast"
            />
            {renderDots()}
          </View>

          {/* Sub Categories */}
          <View style={styles.vwSubCategoriesMain}>
            <View style={styles.vwSubCategoriesTitleSeeAll}>
              <Text style={styles.lblSubCategoriesTitle}>
                {getTranslation("shopBySubCategories")}
              </Text>
              <TouchableOpacity
                activeOpacity={activityOpacity}
                hitSlop={hitSlop}
                onPress={props?.handleSellAllCategories}
              >
                <Text style={styles.lblSeeAll}>{getTranslation("seeAll")}</Text>
              </TouchableOpacity>
            </View>

            {/* Sub Categories Grid */}
            <View style={styles.vwSubCategoriesGrid}>
              {arrSubCategory.map((item, index) =>
                renderSubCategories(item, index)
              )}
            </View>
          </View>

          {props?.isGroceriesFoodSelected === "Groceries" ? (
            <View style={styles.vwBestProducts}>
              <Text style={{ ...styles.lblBestProducts, marginHorizontal: 20 }}>
                {getTranslation("bestProducts")}
              </Text>
              <View style={styles.vwBestProductsGrid}>
                {props?.arrBestProducts.map((item, index) =>
                  renderBestProducts(item, index)
                )}
              </View>
            </View>
          ) : (
            <View style={{ marginBottom: 35, marginTop: 30 }}>
              <View style={styles.vwBestSellerSeeAll}>
                <Text style={styles.lblBestProducts}>
                  {getTranslation("bestSellers")}
                </Text>
                <TouchableOpacity
                  activeOpacity={activityOpacity}
                  hitSlop={hitSlop}
                  onPress={props?.handleSellAllBestSellers}
                >
                  <Text style={styles.lblSeeAll}>
                    {getTranslation("seeAll")}
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={props?.arrBestSellers}
                renderItem={renderBestSeller}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16}}
                initialScrollIndex={1}
                getItemLayout={(data, index) => ({
                  length: 299,
                  offset: 299 * index,
                  index,
                })}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeComponent;
