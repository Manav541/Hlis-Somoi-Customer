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
  BestProductSellerData,
  MainCategoryListItem,
  Restaurant,
  SubCategory,
  SubCategoryListItem,
} from "../../../constants/interfaces";
import Carousel from "react-native-reanimated-carousel";
import FastImage from "react-native-fast-image";

interface PropsType {
  arrMainCategoryList: MainCategoryListItem[];
  onPressMainCategory: (name: string, mainCategoryId: string) => void;
  isGroceriesFoodSelected: string;
  arrAds: AdItem[];
  arrSubCategory: SubCategoryListItem[];
  arrBestProductsSellers: BestProductSellerData[];
  handleSellAllCategories: () => void;
  handleSellAllBestProducts: () => void;
  handleSellAllBestSellers: () => void;
  onPressSearch: () => void;
  handleOnPressNotifaicationIcon: () => void;
  onPressLocation: () => void;
  onPressRestaurant: (vendor_id: string) => void;
  onPressSubCategories: (
    sub_category_id: string,
    subCategoryName: string
  ) => void;
  onPressBestProducts: (
    product_id: string,
    variation_id?: string,
    is_variation?: boolean,
    is_color?: boolean,
    is_size?: boolean,
    color_id?: string,
    size_id?: string
  ) => void;
  handleSetBannerIndex: (index: number) => void;
  currentBannerIndex: number;
  currentAddress: string | null;
  mainCategoryName: string;
}

const HomeComponent = (props: PropsType) => {
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
        onPress={() => props?.onPressMainCategory(item.name, item?.id)}
      >
        {/* <FastImage
          style={styles.imgGroceriesFood}
          source={{ uri: item?.image }}
          resizeMode="stretch"
        /> */}
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

  const renderSubCategoryListItem = (
    item: SubCategoryListItem,
    index: number
  ) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.btnSubCategories}
        activeOpacity={activityOpacity}
        onPress={() => props?.onPressSubCategories(item?.id, item?.name)}
      >
        <FastImage
          style={styles.imgSubCategories}
          source={{ uri: item?.image }}
          resizeMode="cover"
        />
        <Text style={styles.lblSubCategory} numberOfLines={2}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderBestProducts = (item: BestProductSellerData, index: number) => {
    return (
      <TouchableOpacity
        style={styles.btnBestProducts}
        key={index}
        activeOpacity={activityOpacity}
        onPress={() =>
          props?.onPressBestProducts(
            item?.id,
            item?.variation_data?.variation_id,
            item?.is_variation,
            item?.is_color,
            item?.is_size
          )
        }
      >
        <View style={styles.vwBestProductsImage}>
          <FastImage
            style={{ height: 100, width: 90 }}
            source={{ uri: item?.image }}
          />
        </View>
        <Text style={styles.lblBestProductsUsed}>
          +{item?.total_products} More
        </Text>
        <Text style={styles.lblBestProductsName}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderStar = (rate: string | number) => {
    const numericRate = Math.floor(parseFloat(rate as string)); // Convert and floor
    const totalStars = 5;

    return (
      <View style={{ flexDirection: "row" }}>
        {Array.from({ length: totalStars }).map((_, index) => (
          <Image
            key={index}
            source={index < numericRate ? images.starFilled : images.starEmpty}
            style={{ width: 24, height: 24, marginRight: 2 }}
          />
        ))}
      </View>
    );
  };

  const renderBestSeller = ({
    item,
    index,
  }: {
    item: BestProductSellerData;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={styles.btnBestSeller}
        activeOpacity={activityOpacity}
        key={index}
        onPress={() => props?.onPressRestaurant(item?.vendor_id)}
      >
        <FastImage
          style={styles.imgBestSeller}
          source={{ uri: item?.store_cover_image }}
          resizeMode="cover"
        />

        <View style={styles.vwBestSellerDetails}>
          <Text style={styles.lblBestSellerName}>{item?.store_name}</Text>
          <View style={styles.vwRating}>
            {renderStar(item?.store_rating)}
            <Text style={styles.lblBestSellerReviews}>
              (+{item?.total_reviews})
            </Text>
          </View>
        </View>
        <FastImage style={styles.imgLogo} source={{ uri: item?.store_image }} />
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
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Category*/}
          <View style={styles.vwMainCategory}>
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
                <Text style={styles.lblLocation} numberOfLines={2}>
                  {props?.currentAddress}
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

          {/* Best Products & Best Sellers */}
          {props?.arrBestProductsSellers.length > 0 &&
            (props?.isGroceriesFoodSelected === "Groceries" ? (
              <View>
                <View style={styles.vwBestProducts}>
                  <Text style={styles.lblBestProducts}>
                    {getTranslation("bestProducts")}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={activityOpacity}
                    hitSlop={hitSlop}
                    onPress={props?.handleSellAllBestProducts}
                  >
                    <Text style={styles.lblSeeAll}>
                      {getTranslation("seeAll")}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.vwBestProductsGrid}>
                  {props?.arrBestProductsSellers
                    .slice(0, 4)
                    .map((item, index) => renderBestProducts(item, index))}
                </View>
              </View>
            ) : (
              <View style={{ marginBottom: 35 }}>
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
                  data={props?.arrBestProductsSellers.slice(0, 3)}
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
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeComponent;
