import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { colors } from "../../constants/Colors";
import {
  activityOpacity,
  hitSlop,
  rupeeSymbol,
} from "../../constants/GConstant";
import { ScreenDimensions } from "../../constants/utils/Dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PlatformVersion } from "../../constants/utils/Platform";
import {
  GroceryProduct,
  Product,
  Restaurant,
} from "../../constants/interfaces";
import FastImage from "react-native-fast-image";
import { DateFormatsManager } from "../../constants/utils/DateFormats";
import { fontsfamily } from "../../constants/FontFamily";

interface PropsType {
  arrMyWhislistProduct: Product[];
  arrMyWhislistStore: Restaurant[];
  search: string;
  onChangeSearch: (text: string) => void;
  handleRemoveProductFromWishlist: (
    product_id: string,
    variation_id?: string,
    is_variation?: boolean
  ) => void;
  handleRemoveStoreFromWishlist: (index: number, vendor_id: string) => void;
  handleQuantityChange: (
    index: number,
    action: "add" | "remove",
    is_variation?: boolean,
    is_color?: boolean,
    is_size?: boolean
  ) => void;
  onPressProduct: (
    product_id: string,
    variation_id: string,
    is_variation?: boolean,
    is_color?: boolean,
    is_size?: boolean,
    color_id?: string,
    size_id?: string
  ) => void;
  onPressRestaurant: (vendor_id: string) => void;
  selectedTab: string;
  handleTabPress: (tab: string) => void;
  // Pagination
  loadMoreCategories: () => void;
  canLoadMore: boolean;
  setCanLoadMore: (value: boolean) => void;
  hasMountedOnce: { current: boolean };
}

const MyWishlistComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  const renderArrMyWhislistProduct = ({
    item,
    index,
  }: {
    item: Product;
    index: number;
  }) => {
    return (
      <View
        style={[
          styles.vwMyWishlistItem,
          { width: (ScreenDimensions.screenWidth - 20 * 2 - 19) / 2 },
        ]}
      >
        <TouchableOpacity
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          style={[
            styles.btnMyWishlistItem,
            {
              width: (ScreenDimensions.screenWidth - 20 * 2 - 19) / 2,
            },
          ]}
          onPress={() =>
            props?.onPressProduct(
              item?.id,
              item?.variation_id,
              item?.is_variation,
              item?.is_color,
              item?.is_size,
              item?.color?.color_id,
              item?.size?.size_id
            )
          }
        >
          {/* Product Image and Favourite button */}
          <View style={styles.vwProductImgLike}>
            <FastImage
              source={{ uri: item?.image }}
              style={{ height: 80, aspectRatio: 1 }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <TouchableOpacity
              style={styles.btnRedHeart}
              activeOpacity={activityOpacity}
              hitSlop={hitSlop}
              onPress={() => {
                props?.handleRemoveProductFromWishlist(
                  item?.id,
                  item?.variation_id,
                  item?.is_variation
                );
              }}
            >
              <Image
                style={styles.imgRedHeart}
                source={images.redHeart}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </View>

          {/* Product Details */}
          <View style={styles.vwProductDetails}>
            <View style={{ height: 59 }}>
              <View style={{ height: 44 }}>
                <Text style={styles.lblProductName} numberOfLines={2}>
                  {item?.name}
                </Text>
              </View>
              <View style={{ height: 15 }}>
                <Text style={styles.lblProductWeight}>{item?.weight}</Text>
              </View>
            </View>

            <View style={styles.vwPriceRating}>
              <View style={styles.vwPrice}>
                <Text style={styles.lblProductFinalPrice}>
                  {rupeeSymbol + item?.price}
                </Text>
                {/* <Text style={styles.lblProductPrice}>
                  {rupeeSymbol + item?.originalPrice}
                </Text> */}
              </View>
              <View style={styles.vwRating}>
                <Image
                  style={styles.imgStar}
                  source={images.star}
                  resizeMode="stretch"
                />
                <Text style={styles.lblProductRating}>
                  {parseFloat(item.rating).toFixed(1)}
                </Text>
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
                item?.is_variation,
                item?.is_color,
                item?.is_size
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
                  item?.is_variation,
                  item?.is_color,
                  item?.is_size
                )
              }
              hitSlop={hitSlop}
              activeOpacity={activityOpacity}
            >
              <Image
                style={styles.imgAddMinus}
                source={images.minus}
                resizeMode="stretch"
              />
            </TouchableOpacity>
            <Text style={styles.lblProductQuantity}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() =>
                props.handleQuantityChange(
                  index,
                  "add",
                  item?.is_variation,
                  item?.is_color,
                  item?.is_size
                )
              }
              hitSlop={hitSlop}
              activeOpacity={activityOpacity}
            >
              <Image
                style={styles.imgAddMinus}
                source={images.add}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderArrMyWhislistStore = ({
    item,
    index,
  }: {
    item: Restaurant;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={styles.btnAllBestSellersItem}
        activeOpacity={activityOpacity}
        key={index}
        onPress={() => props?.onPressRestaurant(item?.id)}
      >
        <FastImage
          style={styles.imgBestSellers}
          source={{ uri: item?.image }}
          resizeMode="stretch"
        />
        <TouchableOpacity
          style={styles.btnFavourite}
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          onPress={() => props?.handleRemoveStoreFromWishlist(index, item?.id)}
        >
          <Image
            style={styles.imgRedHeart}
            source={
              item?.is_store_wishlisted ? images.redHeart : images.emptyHeart
            }
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <View style={styles.vwBestSellersItemDetails}>
          <Text style={styles.lblBestSellersItemName}>{item?.name}</Text>
          <View style={styles.vwLocation}>
            <Image
              style={styles.imgLocation}
              source={images.locationIconOrange}
              resizeMode="stretch"
            />
            <Text style={styles.lblLocation}>{item?.location}</Text>
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
                    item?.open_time,
                    DateFormatsManager.TimeFormats.HHmm,
                    DateFormatsManager.TimeFormats.HHmmss
                  ) +
                    "-" +
                    DateFormatsManager.formatDate(
                      item?.close_time,
                      DateFormatsManager.TimeFormats.HHmm,
                      DateFormatsManager.TimeFormats.HHmmss
                    )}
                </Text>
              </Text>
              <View style={styles.vwDistance}>
                <Image
                  style={styles.imgDot}
                  source={images.dotOrange}
                  resizeMode="stretch"
                />
                <Text style={styles.lblDistance}>{item?.distance}</Text>
              </View>
            </View>
            <View style={styles.vwRatingStore}>
              <Text style={styles.lblRatings}>{item?.rating}</Text>
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
          source={{ uri: item?.logo }}
          resizeMode="stretch"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent={false}
        barStyle={"dark-content"}
        backgroundColor={colors.orange1c}
      />
      <View style={styles.vwSearch}>
        <Image style={styles.imgSearch} source={images.search} />
        <TextInput
          placeholder={getTranslation("search") || ""}
          placeholderTextColor={colors.greya7}
          selectionColor={colors.blue4e}
          style={styles.txtSearch}
          value={props?.search}
          onChangeText={props?.onChangeSearch}
        />
      </View>

      {/* Buttons Products Restaurants */}
      <View style={styles.vwProductsRestaurants}>
        <TouchableOpacity
          style={styles.btnProductsRestaurants}
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          onPress={() => props?.handleTabPress("Product")}
        >
          <Text
            style={
              props?.selectedTab == "Product"
                ? styles.lblProductsRestaurantsSelected
                : styles.lblProductsRestaurantsUnSelected
            }
          >
            Products
          </Text>
          {props?.selectedTab == "Product" ? (
            <View style={styles.vwLine} />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnProductsRestaurants}
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          onPress={() => props?.handleTabPress("Store")}
        >
          <Text
            style={
              props?.selectedTab == "Store"
                ? styles.lblProductsRestaurantsSelected
                : styles.lblProductsRestaurantsUnSelected
            }
          >
            Sellers
          </Text>
          {props?.selectedTab == "Store" ? (
            <View style={styles.vwLine} />
          ) : null}
        </TouchableOpacity>
      </View>

      {/* Products and Restaurants Data*/}
      {props?.selectedTab == "Store" ? (
        <FlatList
          key={"store"}
          data={props?.arrMyWhislistStore}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderArrMyWhislistStore}
          contentContainerStyle={{
            gap: 10,
            paddingHorizontal: 20,
            paddingBottom: insets.bottom ? insets.bottom + 20 : 20,
          }}
          onEndReached={() => {
            if (props.canLoadMore && props.hasMountedOnce.current) {
              props.loadMoreCategories();
            }
          }}
          onEndReachedThreshold={0.4}
          onContentSizeChange={(w, h) => {
            props.setCanLoadMore(h > 600); // Adjust if needed
            props.hasMountedOnce.current = true;
          }}
          ListEmptyComponent={
            <Text style={styles.lblNoData}>
              {getTranslation("noDataFound")}
            </Text>
          }
        />
      ) : (
        <FlatList
          key={"product"}
          data={props?.arrMyWhislistProduct}
          numColumns={2}
          renderItem={renderArrMyWhislistProduct}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: PlatformVersion.isIOS ? insets.bottom : 19,
          }}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 19,
          }}
          showsVerticalScrollIndicator={false}
          bounces={false}
          onEndReached={() => {
            if (props.canLoadMore && props.hasMountedOnce.current) {
              props.loadMoreCategories();
            }
          }}
          onEndReachedThreshold={0.4}
          onContentSizeChange={(w, h) => {
            props.setCanLoadMore(h > 600); // Adjust if needed
            props.hasMountedOnce.current = true;
          }}
          ListEmptyComponent={
            <Text style={styles.lblNoData}>
              {getTranslation("noDataFound")}
            </Text>
          }
        />
      )}
    </View>
  );
};

export default MyWishlistComponent;
