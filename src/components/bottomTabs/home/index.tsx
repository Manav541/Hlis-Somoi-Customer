import {
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  StyleSheet,
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
  MainCategoryListItem,
  Restaurant,
  SubCategory,
  SubCategoryListItem,
} from "../../../constants/interfaces";
import Carousel from "react-native-reanimated-carousel";
import FastImage from "react-native-fast-image";

interface PropsType {
  arrMainCategoryList: MainCategoryListItem[];
  onPressMainCategory: (name: string,mainCategoryId:string) => void;
  isGroceriesFoodSelected: string;
  arrAds: AdItem[];
  arrSubCategory:SubCategoryListItem[]
  arrBestProducts: BestProduct[];
  arrBestSellers: Restaurant[];
  handleSellAllCategories: () => void;
  handleSellAllBestSellers: () => void;
  onPressSearch: () => void;
  handleOnPressNotifaicationIcon: () => void;
  onPressLocation: () => void;
  onPressRestaurant: (item: Restaurant) => void;
  onPressSubCategories: () => void;
  onPressBestProducts: () => void;

  handleSetBannerIndex: (index: number) => void;
  currentBannerIndex: number;
}

const HomeComponent = (props: PropsType) => {
  // console.log('arrmaincategorylist',props?.arrMainCategoryList)

  const insets = useSafeAreaInsets();

  const renderMainCategoryListItem = (
    item: MainCategoryListItem,
    index: number
  ) => {
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.btnGroceriesFood,
          {
            backgroundColor:
              props?.isGroceriesFoodSelected === item?.name
                ? colors.orange1c
                : colors.white,
          },
        ]}
        activeOpacity={activityOpacity}
        onPress={() => props?.onPressMainCategory(item.name,item?.id)}
      >
        <FastImage
          style={styles.imgGroceriesFood}
          source={{ uri: item?.image }}
          resizeMode="stretch"
        />
        <View style={styles.vwType}>
          <Text style={styles.lblGroceriesFood}>{item?.name}</Text>
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
        <FastImage
          style={styles.imgAdds}
          source={{ uri: item?.image }}
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
                  index === props?.currentBannerIndex
                    ? colors.blue4e
                    : colors.greyd9,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const renderSubCategoryListItem = (item: SubCategoryListItem, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.btnSubCategories}
        activeOpacity={activityOpacity}
        onPress={() => props?.onPressSubCategories()}
      >
        <FastImage
          style={styles.imgSubCategories}
          source={{uri : item?.image}}
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
          <FastImage
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
        <FastImage
          style={styles.imgBestSeller}
          source={item?.restaurant_img}
          resizeMode="stretch"
        />

        <View style={styles.vwBestSellerDetails}>
          <Text style={styles.lblBestSellerName}>{item?.restaurant_name}</Text>
          <View style={styles.vwRating}>
            {renderStar(item?.restaurant_ratings)}
            <Text style={styles.lblBestSellerReviews}>
              (+{item?.restaurant_reviews})
            </Text>
          </View>
          <FastImage style={styles.imgLogo} source={item?.restaurant_logo} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.blue4e}
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
          {/* Main Category*/}
          <View
            style={{ flexDirection: "row", paddingHorizontal: 20, gap: 19 }}
          >
            {props?.arrMainCategoryList
              .slice(0, 2)
              .map((item, index) => renderMainCategoryListItem(item, index))}
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
          {props?.arrAds.length != 0 && (
            <View style={styles.vwAdds}>
              <Carousel
                data={props.arrAds}
                width={ScreenDimensions.screenWidth - 40}
                height={200}
                loop={props.arrAds.length != 1}
                style={{ borderRadius: 10 }}
                autoPlay
                pagingEnabled
                scrollAnimationDuration={1000}
                onSnapToItem={props.handleSetBannerIndex}
                defaultIndex={0}
                enabled={props.arrAds.length != 1}
                autoPlayReverse={false}
                vertical={false}
                renderItem={renderItemAds}
              />
              {renderDots()}
            </View>
          )}

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
              {props?.arrSubCategory.map((item, index) =>
                renderSubCategoryListItem(item, index)
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
                contentContainerStyle={{ paddingHorizontal: 16 }}
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
