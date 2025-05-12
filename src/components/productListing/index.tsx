import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { styles } from "./styles";
import { colors } from "../../constants/Colors";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { images } from "../../constants/Images";
import { ScreenDimensions } from "../../constants/utils/Dimensions";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { PlatformVersion } from "../../constants/utils/Platform";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PropsType {
  subCategoryTitle: any[];
  onPressSubCategoryTitle: (index: number) => void;
  arrSubCategory: any[];
  handleQuantityChange: (index: number, type: "add" | "remove") => void;
  onPressFavourite: (index: number) => void;
}

const ProductListingComponent = (props: PropsType) => {
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
              source={item?.favourite ? images.redHeart : images.emptyHeart}
            />
          </TouchableOpacity>
        </View>

        {/* Product Details */}
        <View style={styles.vwProductDetails}>
          <View style={{ height: 59 }}>
            <View style={{ height: 44 }}>
              <Text style={styles.lblProductName} numberOfLines={2}>
                {item?.product_name}
              </Text>
            </View>
            <View style={{ height: 15 }}>
              <Text style={styles.lblProductWeight}>
                {item?.product_weight}
              </Text>
            </View>
          </View>

          <View style={styles.vwPriceRating}>
            <View style={styles.vwPrice}>
              <Text style={styles.lblProductFinalPrice}>
                {item?.product_final_price}
              </Text>
              <Text style={styles.lblProductPrice}>{item?.product_price}</Text>
            </View>
            <View style={styles.vwRating}>
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

  return (
    <View style={styles.vwMain}>
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
      <FlatList
        data={props?.arrSubCategory}
        numColumns={2}
        renderItem={renderArrSubCategory}
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
        ListEmptyComponent={
          <View style={styles.vwNoData}>
            <Text style={styles.lblNoData}>
              {getTranslation("noDataFound")}
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default ProductListingComponent;
