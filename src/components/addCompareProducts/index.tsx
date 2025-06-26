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
import {
  SimilarCompareProductData,
} from "../../constants/interfaces";
import FastImage from "react-native-fast-image";
import { colors } from "../../constants/Colors";

interface PropsType {
  arrSimilarCompareProducts: SimilarCompareProductData[];
  onPressAdd: (product_id: string) => void;
   onPressProduct: (
    product_id: string,
    variation_id?: string,
    is_variation?: boolean,
    is_color?: boolean,
    is_size?: boolean,
    color_id?: string,
    size_id?: string
  ) => void;
}

const AddCompareProductsComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  const renderArrSubCategory = ({
    item,
    index,
  }: {
    item: SimilarCompareProductData;
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
        <TouchableOpacity
          style={[
            styles.btnMyWishlistItem,
            {
              width: (ScreenDimensions.screenWidth - 20 * 2 - 19) / 2,
            },
          ]}
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          onPress={() => {
          props?.onPressProduct(
            item?.id,
            item?.variation_id,
            item?.is_variation,
            item?.is_color,
            item?.is_size,
            item?.color_id,
            item?.size_id
          );
        }}
        >
          {/* Product Image and Favourite button */}
          <View style={styles.vwProductImgLike}>
            <FastImage
              source={{ uri: item?.image }}
              style={{ height: 80, aspectRatio: 1 }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>

          {/* Product Details */}
          <View style={styles.vwProductDetails}>
            <View style={{ height: 59 }}>
              <View style={{ height: 44 }}>
                <Text style={styles.lblProductName} numberOfLines={2}>
                  {item?.name}
                </Text>
              </View>
              {item?.weight && (
                <View style={{ height: 15 }}>
                  <Text style={styles.lblProductWeight}>{item?.weight}</Text>
                </View>
              )}
            </View>

            <View style={styles.vwPriceRating}>
              <View style={styles.vwPrice}>
                <Text style={styles.lblProductFinalPrice}>
                  {rupeeSymbol + item?.price}
                </Text>
              </View>
              <View style={styles.vwProductRating}>
                <Image style={styles.imgStar} source={images.star} />
                <Text style={styles.lblProductRating}>{parseFloat(item?.rating).toFixed(1)}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Add to cart */}

        <TouchableOpacity
          style={styles.btnAddToCart}
          activeOpacity={activityOpacity}
          onPress={() => props.onPressAdd(item?.id)}
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
        data={props?.arrSimilarCompareProducts}
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
