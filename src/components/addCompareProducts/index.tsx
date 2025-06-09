import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import React from "react";
import { styles } from "./styles";
import {
  activityOpacity,
  hitSlop,
  rupeeSymbol,
} from "../../constants/GConstant";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { FlatList } from "react-native-gesture-handler";
import { ScreenDimensions } from "../../constants/utils/Dimensions";
import { images } from "../../constants/Images";
import { PlatformVersion } from "../../constants/utils/Platform";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GroceryProduct } from "../../constants/interfaces";
import FastImage from "react-native-fast-image";
import { colors } from "../../constants/Colors";

interface PropsType {
  arrCompareProducts: GroceryProduct[];
  onPressAdd: (item: GroceryProduct) => void;
}

const AddCompareProductsComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  const renderArrSubCategory = ({
    item,
    index,
  }: {
    item: GroceryProduct;
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
        {/* Product Image and Favourite button */}
        <View style={styles.vwProductImgLike}>
          <FastImage
            source={item?.product_img}
            style={{ height: item?.height, width: item?.width }}
          />
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
            <View style={styles.vwProductRating}>
              <Image style={styles.imgStar} source={images.star} />
              <Text style={styles.lblProductRating}>
                {item?.product_rating}
              </Text>
            </View>
          </View>
        </View>
        {/* Add to cart */}

        <TouchableOpacity
          style={styles.btnAddToCart}
          activeOpacity={activityOpacity}
          onPress={() => props.onPressAdd(item)}
        >
          <Text style={styles.lblAddToCart}>{getTranslation("add")}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.orange1c}
        barStyle={"dark-content"}
      />
      <FlatList
        data={props?.arrCompareProducts}
        numColumns={2}
        renderItem={renderArrSubCategory}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: PlatformVersion.isIOS ? insets.bottom : 19,
          gap: 19,
          marginTop: 20,
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    </View>
  );
};

export default AddCompareProductsComponent;
