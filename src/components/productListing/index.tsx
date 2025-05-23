import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  StatusBar,
} from "react-native";
import React, { useMemo, useState } from "react";
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
import { fontSize } from "../../constants/FontSizes";
import GlobalButton from "../../global/GlobalButton";
import DropDownPicker from "react-native-dropdown-picker";
import {
  CategoryItem,
  SubCategoryData,
  SubCategoryItem,
} from "../../constants/interfaces";
import GlobalDropdown from "../../global/GlobalDropdown";

interface PropsType {
  mainCategoryName: string;
  subCategoryTitle: any[];
  subCategoryFoodTitle: any[];
  subCategoryFashionTitle: any[];
  onPressSubCategoryTitle: (index: number) => void;
  arrSubCategory: any[];
  handleQuantityChange: (index: number, type: "add" | "remove") => void;
  onPressFavourite: (index: number) => void;
  onPressRestaurant: (item: any) => void;
  onPressProduct: (item: any) => void;
  isFilterModalVisible: boolean;
  range: number[];
  setRange: (values: number[]) => void;
  rating: number;
  onPressRating: (index: number) => void;
  onPressCloseFilterModal: () => void;
  onPressApplyFilter: () => void;
  isCheckInstantDelivery: boolean;
  onPressInstantDelivery: () => void;

  // Category Dropdown
  openCategory: boolean;
  setOpenCategory: React.Dispatch<React.SetStateAction<boolean>>;
  categoryValue: string;
  setCategoryValue: React.Dispatch<React.SetStateAction<string>>;
  categoryItems: CategoryItem[];
  setCategoryItems: React.Dispatch<React.SetStateAction<CategoryItem[]>>;

  // Sub Category Dropdown
  openSubCategory: boolean;
  setOpenSubCategory: any;
  subCategoryValue: string;
  setSubCategoryValue: any;
  subCategoryItems: SubCategoryData[];
  setSubCategoryItems: any;
  filteredSubCategories: SubCategoryItem[];
  setFilteredSubCategories: any;
}

const ProductListingComponent = (props: PropsType) => {
  const categoryDropdownStyle = useMemo(
    () => ({
      ...styles.btnDropdownCategories,
      borderTopLeftRadius: props.openCategory ? 20 : 100,
      borderTopRightRadius: props.openCategory ? 20 : 100,
    }),
    [props.openCategory]
  );

  const subCategoryDropdownStyle = useMemo(
    () => ({
      ...styles.btnDropdownCategories,
      borderTopLeftRadius: props.openSubCategory ? 20 : 100,
      borderTopRightRadius: props.openSubCategory ? 20 : 100,
    }),
    [props.openSubCategory]
  );
  const insets = useSafeAreaInsets();
  const renderItemSubCategoryTitle = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={
          item?.isSelected
            ? styles.btnSubCategoryTitleSelected
            : styles.btnSubCategoryTitle
        }
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        onPress={() => props.onPressSubCategoryTitle(index)}
      >
        <Image
          style={styles.imgSubIcon}
          tintColor={item?.isSelected ? colors.blue4e : colors.greya7}
          source={item?.subIcon}
        />
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

  const renderArrSubCategory = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.vwMyWishlistItem,
          {
            width: (ScreenDimensions.screenWidth - 20 * 2 - 19) / 2,
          },
        ]}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        onPress={() => props?.onPressProduct(item)}
      >
        {/* Product Image and Favourite button */}
        <View style={styles.vwProductImgLike}>
          <Image
            source={item?.product_img}
            style={{ height: item?.height, width: item?.width }}
          />
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

          <Text style={styles.lblInStock}>{getTranslation("inStock")}</Text>
        </View>

        {/* Product Details */}
        <View style={styles.vwProductDetails}>
          {/* name and weight */}
          <View style={{ height: 59 }}>
            <Text style={styles.lblProductName} numberOfLines={2}>
              {item?.product_name}
            </Text>
            <Text style={styles.lblProductWeight}>{item?.product_weight}</Text>
          </View>

          {/* Price and Rating */}
          <View style={styles.vwPriceRating}>
            {/* Price */}
            <View style={styles.vwPrice}>
              <Text style={styles.lblProductFinalPrice}>
                {rupeeSymbol + item?.product_final_price}
              </Text>
              <Text style={styles.lblProductPrice}>
                {rupeeSymbol + item?.product_price}
              </Text>
            </View>

            {/* Rating */}
            <View style={styles.vwProductRating}>
              <Image style={styles.imgStar} source={images.star} />
              <Text style={styles.lblProductRating}>
                {item?.product_rating}
              </Text>
            </View>
          </View>
        </View>

        {/* Add to cart */}
        {item.product_quantity === 0 ? (
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
            <Text style={styles.lblProductQuantity}>
              {item.product_quantity}
            </Text>
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

  const renderArrFoodSubCategory = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={styles.btnAllBestSellersItem}
        activeOpacity={activityOpacity}
        onPress={() => props?.onPressRestaurant(item)}
      >
        <Image style={styles.imgBestSellers} source={item?.restaurant_img} />
        <TouchableOpacity
          style={styles.btnFavourite}
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          onPress={() => props?.onPressFavourite(index)}
        >
          <Image
            style={styles.imgRedHeart}
            source={item?.isFavourite ? images.redHeart : images.emptyHeart}
          />
        </TouchableOpacity>
        <View style={styles.vwBestSellersItemDetails}>
          <Text style={styles.lblBestSellersItemName}>
            {item?.restaurant_name}
          </Text>
          <View style={styles.vwLocation}>
            <Image
              style={styles.imgLocation}
              source={images.locationIconOrange}
            />
            <Text style={styles.lblLocation}>{item?.restaurant_address}</Text>
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
                  {item?.restaurant_time}
                </Text>
              </Text>
              <View style={styles.vwDistance}>
                <Image style={styles.imgDot} source={images.dotOrange} />
                <Text style={styles.lblDistance}>
                  {item?.restaurant_distance.toLowerCase()}
                </Text>
              </View>
            </View>
            <View style={styles.vwRating}>
              <Text style={styles.lblRatings}>{item?.restaurant_ratings}</Text>
              <Image style={styles.imgStarBlue} source={images.starBlue} />
            </View>
          </View>
          <Image style={styles.imgLogo} source={item?.restaurant_logo} />
        </View>
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
      <View>
        <FlatList
          data={
            props?.mainCategoryName === "Food"
              ? props?.subCategoryFoodTitle
              : props?.mainCategoryName === "Fashion"
              ? props?.subCategoryFashionTitle
              : props?.subCategoryTitle
          }
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItemSubCategoryTitle}
          contentContainerStyle={styles.vwSubCategoryContainer}
        />
      </View>

      {props?.mainCategoryName === "Food" ? (
        <FlatList
          data={props?.arrSubCategory}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderArrFoodSubCategory}
          contentContainerStyle={{
            gap: 10,
            // marginTop: 20,
            paddingHorizontal: 20,
            paddingBottom: insets.bottom ? insets.bottom + 20 : 20,
          }}
        />
      ) : (
        <FlatList
          data={props?.arrSubCategory}
          numColumns={2}
          renderItem={renderArrSubCategory}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: insets.bottom ? insets.bottom + 20 : 20,
            gap: 19,
          }}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          showsVerticalScrollIndicator={false}
          bounces={false}
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
          translucent
          backgroundColor={colors.black50}
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

              {/* Categories Dropdown */}
              <View style={styles.vwCategories}>
                <Text style={styles.lblCategories}>
                  {getTranslation("categories")}
                </Text>
                <GlobalDropdown
                  open={props.openCategory}
                  value={props.categoryValue}
                  items={props.categoryItems}
                  setOpen={props.setOpenCategory}
                  setValue={props.setCategoryValue}
                  setItems={props.setCategoryItems}
                  placeholder={getTranslation("select") || ""}
                  zIndex={5000}
                />
              </View>

              {/* Sub Categories Dropdown */}
              <View style={styles.vwCategories}>
                <Text style={styles.lblCategories}>
                  {getTranslation("subCategories")}
                </Text>
                <GlobalDropdown
                  open={props?.openSubCategory}
                  value={props?.subCategoryValue}
                  items={props?.filteredSubCategories}
                  setOpen={props?.setOpenSubCategory}
                  setValue={props?.setSubCategoryValue}
                  setItems={props?.setFilteredSubCategories}
                  placeholder={getTranslation("select") || ""}
                  disabled={!props.categoryValue}
                  zIndex={4000}
                />
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
                  <Image style={styles.imgDash} source={images.dashLine} />
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
    </View>
  );
};

export default ProductListingComponent;
