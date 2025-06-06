import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
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
import { GroceryProduct } from "../../constants/interfaces";
import FastImage from "react-native-fast-image";

interface PropsType {
  arrMyWhislist: GroceryProduct[];
  search: string;
  onChangeSearch: (text: string) => void;
  handleRemoveFromWishlist: (indexToRemove: number) => void;
  handleQuantityChange: (index: number, action: "add" | "remove") => void;
  onPressProduct: (item: any) => void;
}

const MyWishlistComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  const renderArrMyWhislist = ({
    item,
    index,
  }: {
    item: GroceryProduct;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        style={[
          styles.vwMyWishlistItem,
          {
            width: (ScreenDimensions.screenWidth - 20 * 2 - 19) / 2,
          },
        ]}
        onPress={() => props?.onPressProduct(item)}
      >
        {/* Product Image and Favourite button */}
        <View style={styles.vwProductImgLike}>
          <FastImage
            source={item?.product_img}
            style={{ height: item?.height, width: item?.width }}
          />
          <TouchableOpacity
            style={styles.btnRedHeart}
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={() => {
              props?.handleRemoveFromWishlist(index);
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
                {rupeeSymbol + item?.product_final_price}
              </Text>
              <Text style={styles.lblProductPrice}>
                {rupeeSymbol + item?.product_price}
              </Text>
            </View>
            <View style={styles.vwRating}>
              <Image
                style={styles.imgStar}
                source={images.star}
                resizeMode="stretch"
              />
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
              <Image
                style={styles.imgAddMinus}
                source={images.minus}
                resizeMode="stretch"
              />
            </TouchableOpacity>
            <Text style={styles.lblProductQuantity}>
              {item.product_quantity}
            </Text>
            <TouchableOpacity
              onPress={() => props.handleQuantityChange(index, "add")}
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

      <FlatList
        data={props?.arrMyWhislist}
        numColumns={2}
        renderItem={renderArrMyWhislist}
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
          <Text style={styles.lblNoData}>{getTranslation("noDataFound")}</Text>
        }
      />
    </View>
  );
};

export default MyWishlistComponent;
