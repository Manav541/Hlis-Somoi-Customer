import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { TextInput } from "react-native-gesture-handler";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { colors } from "../../constants/Colors";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { ScreenDimensions } from "../../constants/utils/Dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PlatformVersion } from "../../constants/utils/Platform";

interface PropsType {
  arrMyWhislist: any;
  search: string;
  onChangeSearch: (text: string) => void;
  handleRemoveFromWishlist: (indexToRemove: number) => void;
}

const MyWishlistComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  const renderArrMyWhislist = ({ item, index }: any) => {
    return (
      <View
        style={[
          styles.vwMyWishlistItem,
          {
            width: (ScreenDimensions.screenWidth - 20 * 2 - 19) / 2,
          },
        ]}
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
              props?.handleRemoveFromWishlist(index);
            }}
          >
            <Image style={styles.imgRedHeart} source={images.redHeart} />
          </TouchableOpacity>
        </View>

        {/* Product Details */}
        <View style={styles.vwProductDetails}>
          <View style={{height : 59}}>
          <View style={{ height : 44}}>
            <Text style={styles.lblProductName} numberOfLines={2}>
              {item?.product_name}
            </Text>
          </View>
          <View style={{height : 15}}>
            <Text style={styles.lblProductWeight}>{item?.product_weight}</Text>
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
        <TouchableOpacity
          style={styles.btnAddToCart}
          activeOpacity={activityOpacity}
        >
          <Text style={styles.lblAddToCart}>{getTranslation("addToCart")}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.vwMain}>
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

export default MyWishlistComponent;
