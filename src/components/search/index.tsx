import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../constants/Colors";
import { activityOpacity, hitSlop, rupeeSymbol } from "../../constants/GConstant";
import { GroceryProduct } from "../../constants/interfaces";
import FastImage from "react-native-fast-image";

interface PropsType {
  arrProducts: GroceryProduct[];
  filteredProducts: GroceryProduct[];
  onPressProduct: (item: GroceryProduct) => void;
}

const SearchComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  const renderItemSearch = ({
    item,
    index,
  }: {
    item: GroceryProduct;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={styles.btnProductItem}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        key={index}
        onPress={() => props.onPressProduct(item)}
      >
        <View style={styles.vwProductImage}>
          <FastImage style={styles.imgProduct} source={item?.product_img} />
        </View>
        <View style={styles.vwProductDetails}>
          <Text style={styles.lblProductName}>{item?.product_name}</Text>
          <View style={styles.vwProductPriceWeight}>
            <Text style={styles.lblProductPrice}>{rupeeSymbol+item?.product_price}</Text>
            <Image
              style={styles.imgDot}
              tintColor={colors.blue4e}
              source={images.dotOrange}
              resizeMode="stretch"
            />
            <Text style={styles.lblProductWeight}>{item?.product_weight}</Text>
          </View>
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
      {props.filteredProducts.length > 0 ? (
        <FlatList
          data={props.filteredProducts}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderItemSearch}
          contentContainerStyle={{
            ...styles.vwContentContainer,
            paddingBottom: insets.bottom ? insets.bottom : 20,
          }}
        />
      ) : (
        <View style={styles.vwNoDataFound}>
          <Image
            style={styles.imgNoDataFound}
            source={images.searchWithOrangeBG}
            resizeMode="stretch"
          />
          <Text style={styles.lblNoDataFound}>
            {getTranslation("noResultsFound")}
          </Text>
          <Text style={styles.lblNoDataFoundDesc}>
            {getTranslation("cantFindMatch")}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SearchComponent;
