import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  StatusBar,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { colors } from "../../constants/Colors";
import {
  activityOpacity,
  hitSlop,
  rupeeSymbol,
} from "../../constants/GConstant";
import { images } from "../../constants/Images";
import { ScreenDimensions } from "../../constants/utils/Dimensions";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fontsfamily } from "../../constants/FontFamily";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import GlobalButton from "../../global/GlobalButton";
import {
  Product,
  Restaurant,
  SubCategoryTitle,
} from "../../constants/interfaces";
import FastImage from "react-native-fast-image";
import { DateFormatsManager } from "../../constants/utils/DateFormats";

interface PropsType {
  mainCategoryName: string;
  subCategoryTitle: SubCategoryTitle[];
  subCategoryFoodTitle: any[];
  arrRestaurants: Restaurant[];
  subCategoryFashionTitle: any[];
  onPressSubCategoryTitle: (selectedName: string) => void;
  arrSubCategoryProduct: Product[];
  handleQuantityChange: (
    index: number,
    type: "add" | "remove",
    is_variation?: boolean,
    is_color?: boolean,
    is_size?: boolean
  ) => void;
  onPressFavourite: (
    product_id: string,
    variation_id?: string,
    is_variation?: boolean
  ) => void;
  onPressFavouriteStore: (index: number, vendor_id: string) => void;
  onPressRestaurant: (vendor_id: string) => void;
  onPressProduct: (
    product_id: string,
    variation_id: string,
    is_variation?: boolean,
    is_color?: boolean,
    is_size?: boolean,
    color_id?: string,
    size_id?: string
  ) => void;
  isFilterModalVisible: boolean;
  isSortModalVisible: boolean;
  arrSortList: any[];
  range: number[];
  setRange: (values: number[]) => void;
  rating: number;
  onPressRating: (index: number) => void;
  onPressCloseFilterModal: () => void;
  onPressCloseSortModal: () => void;
  onPressApplyFilter: () => void;
  onPressSortList: (sort_by: string) => void;
  isCheckInstantDelivery: boolean;
  onPressInstantDelivery: () => void;
  // Pagination
  loadMoreCategories: () => void;
  canLoadMore: boolean;
  setCanLoadMore: (value: boolean) => void;
  hasMountedOnce: { current: boolean };
}

const ProductListingComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  const renderItemSubCategoryTitle = ({
    item,
    index,
  }: {
    item: SubCategoryTitle;
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
        onPress={() => props.onPressSubCategoryTitle(item?.name)}
      >
        {item?.name == "All" || item?.image == undefined ? (
          <Image
            style={styles.imgSubIcon}
            tintColor={item?.isSelected ? colors.blue4e : colors.greya7}
            source={images.allSubIcon}
          />
        ) : (
          <Image
            style={styles.imgSubIcon}
            tintColor={item?.isSelected ? colors.blue4e : colors.greya7}
            source={{ uri: item?.image }}
          />
        )}

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

  const renderArrSubCategoryProduct = ({
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
          {
            width: (ScreenDimensions.screenWidth - 20 * 2 - 19) / 2,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.btnMyWishlistItem,
            {
              width: (ScreenDimensions.screenWidth - 20 * 2 - 19) / 2,
            },
          ]}
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
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
                props?.onPressFavourite(
                  item?.id,
                  item?.variation_id,
                  item?.is_variation
                );
              }}
            >
              <Image
                style={styles.imgRedHeart}
                source={item?.isFavorite ? images.redHeart : images.emptyHeart}
                resizeMode="stretch"
              />
            </TouchableOpacity>

            <Text
              style={[
                styles.lblInStock,
                { color: item?.inStock ? colors.green2b : colors.red2e },
              ]}
            >
              {item?.inStock
                ? getTranslation("inStock")
                : getTranslation("outOfStock")}
            </Text>
          </View>

          {/* Product Details */}
          <View style={styles.vwProductDetails}>
            {/* name and weight */}
            <View style={{ height: 59 }}>
              <Text style={styles.lblProductName} numberOfLines={2}>
                {item?.name}
              </Text>
              <Text style={styles.lblProductWeight}>{item?.weight}</Text>
            </View>

            {/* Price and Rating */}
            <View style={styles.vwPriceRating}>
              {/* Price */}
              <Text style={styles.lblProductFinalPrice}>
                {rupeeSymbol + parseFloat(item?.price).toFixed(2)}
              </Text>

              {/* Rating */}
              <View style={styles.vwProductRating}>
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
            disabled={item?.inStock == false}
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

  const renderArrFoodSubCategory = ({
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
          onPress={() => props?.onPressFavouriteStore(index, item?.id)}
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
            <View style={styles.vwRating}>
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

  const renderArrSortList = (item: any, index: number) => {
    return (
      <TouchableOpacity
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        key={index}
        onPress={() => {
          props?.onPressSortList(item?.value);
        }}
      >
        <View style={styles.vwLineSort} />
        <View style={styles.vwSort}>
          <Text style={styles.lblSort}>{item?.name}</Text>
          {item?.isSelected && (
            <Image
              style={styles.imgSortSelected}
              source={images.tickSort}
              resizeMode="stretch"
            />
          )}
        </View>
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
      <View>
        <FlatList
          data={props?.subCategoryTitle}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItemSubCategoryTitle}
          contentContainerStyle={styles.vwSubCategoryContainer}
        />
      </View>

      {props?.mainCategoryName === "Food" ? (
        <FlatList
          data={props?.arrRestaurants}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderArrFoodSubCategory}
          contentContainerStyle={{
            gap: 10,
            // marginTop: 20,
            paddingHorizontal: 20,
            paddingBottom: insets.bottom ? insets.bottom + 20 : 20,
            flexGrow: 1,
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
            <View style={styles.vwNoData}>
              <Text style={styles.lblNoData}>
                {getTranslation("noDataFound")}
              </Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={props?.arrSubCategoryProduct}
          numColumns={2}
          renderItem={renderArrSubCategoryProduct}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: insets.bottom ? insets.bottom + 20 : 20,
            gap: 19,
            flexGrow : 1
          }}
          columnWrapperStyle={{
            justifyContent: "space-between",
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
            <View style={styles.vwNoData}>
              <Text style={styles.lblNoData}>
                {getTranslation("noDataFound")}
              </Text>
            </View>
          }
        />
      )}

      {/* Filter Modal */}
      <Modal
        visible={props?.isFilterModalVisible}
        transparent
        animationType="fade"
      >
        <StatusBar
          translucent={false}
          backgroundColor={colors.orange1c}
          barStyle={"dark-content"}
        />
        <View style={styles.vwFilterModal}>
          <View style={styles.vwFilterModalContainer}>
            <View style={styles.vwFilterTitleClose}>
              <Text style={styles.lblFilters}>{getTranslation("filters")}</Text>
              <TouchableOpacity
                activeOpacity={activityOpacity}
                hitSlop={hitSlop}
                onPress={props?.onPressCloseFilterModal}
              >
                <Image
                  style={styles.imgClose}
                  source={images.closeSearch}
                  tintColor={colors.orange1c}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.vwLine} />
            <View
              style={{ marginHorizontal: 20, marginTop: 10, marginBottom: 15 }}
            >
              <View style={styles.vwInstantDeliveries}>
                <Text style={styles.lblInstantDeliveries}>
                  {getTranslation("instantDeliveries")}
                </Text>
                <View style={styles.vwInstantDeliveriesCheck}>
                  <TouchableOpacity
                    activeOpacity={activityOpacity}
                    hitSlop={hitSlop}
                    onPress={props?.onPressInstantDelivery}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Image
                      style={styles.imgCheckBox}
                      resizeMode="stretch"
                      source={
                        props?.isCheckInstantDelivery
                          ? images.checkfill
                          : images.filterCheckbox
                      }
                    />

                    <Text style={styles.lblAvailableInstantDeliveries}>
                      {getTranslation("availableforInstantDelivery")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Price Range */}
              <View style={styles.vwPricerange}>
                <Text style={styles.lblCategories}>
                  {getTranslation("priceRange")}
                </Text>
                <View style={styles.vwPriceRangeData}>
                  <View style={styles.vwPriceValueBox}>
                    <Text style={styles.lblLowHightPriceValue}>
                      {rupeeSymbol + props?.range[0]}
                    </Text>
                  </View>
                  <Image
                    style={styles.imgDash}
                    source={images.dashLine}
                    resizeMode="stretch"
                  />
                  <View style={styles.vwPriceValueBox}>
                    <Text style={styles.lblLowHightPriceValue}>
                      {rupeeSymbol + props?.range[1]}
                    </Text>
                  </View>
                </View>
                <MultiSlider
                  values={props?.range}
                  sliderLength={ScreenDimensions.screenWidth - 40}
                  onValuesChange={props?.setRange}
                  min={0}
                  max={500}
                  step={1}
                  selectedStyle={styles.sliderSelected}
                  unselectedStyle={styles.sliderUnselected}
                  markerStyle={styles.sliderMarker}
                  containerStyle={styles.sliderContainer}
                  touchDimensions={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    slipDisplacement: 40,
                  }}
                />
                <View style={styles.vwSliderMinMaxValue}>
                  <Text style={styles.lblSliderMinMaxValue}>
                    {rupeeSymbol + 0}
                  </Text>
                  <Text style={styles.lblSliderMinMaxValue}>
                    {rupeeSymbol + 500}
                  </Text>
                </View>
              </View>

              {/* rating range */}

              <View style={styles.vwRatingRange}>
                <Text style={styles.lblCategories}>
                  {getTranslation("ratingRange")}
                </Text>
                <View style={{ flexDirection: "row", gap: 5 }}>
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
                          index < props?.rating
                            ? colors.orange1c
                            : colors.greyda
                        }
                        resizeMode="stretch"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              {/* Filter Button */}

              <View
                style={{
                  marginTop: 15,
                  marginBottom: insets.bottom ? insets.bottom : 10,
                }}
              >
                <GlobalButton
                  title={getTranslation("applyFilters")}
                  isOrange
                  onPress={props?.onPressApplyFilter}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Sort Modal */}
      <Modal
        visible={props?.isSortModalVisible}
        transparent
        animationType="fade"
      >
        <StatusBar
          translucent={false}
          backgroundColor={colors.orange1c}
          barStyle={"dark-content"}
        />
        <View style={styles.vwFilterModal}>
          <View style={[styles.vwFilterModalContainer, { paddingBottom: 40 }]}>
            <View style={styles.vwFilterTitleClose}>
              <Text style={styles.lblFilters}>{getTranslation("sort")}</Text>
              <TouchableOpacity
                activeOpacity={activityOpacity}
                hitSlop={hitSlop}
                onPress={props?.onPressCloseSortModal}
              >
                <Image
                  style={styles.imgClose}
                  source={images.closeSearch}
                  tintColor={colors.orange1c}
                />
              </TouchableOpacity>
            </View>
            {props?.arrSortList.map(renderArrSortList)}
            {/* <View
                style={{
                  marginTop: 15,
                  marginBottom: insets.bottom ? insets.bottom : 10,
                  marginHorizontal : 20
                }}
              >
                <GlobalButton
                  title={getTranslation("applySort")}
                  isOrange
                  onPress={props?.onPressApplyFilter}
                />
              </View> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProductListingComponent;
