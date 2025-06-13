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
import {
  activityOpacity,
  hitSlop,
  rupeeSymbol,
} from "../../constants/GConstant";
import { GroceryProduct } from "../../constants/interfaces";
import FastImage from "react-native-fast-image";

interface PropsType {
  arrProducts: any[];
  onPressProduct: (item: GroceryProduct) => void;
}

const SearchComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  const renderItemSearch = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={styles.btnProductItem}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        key={index}
        // onPress={() => props.onPressProduct(item)}
      >
        <View style={styles.vwProductImage}>
          <FastImage style={styles.imgProduct} source={{uri : item?.product_img}} />
        </View>
        <View style={styles.vwProductDetails}>
          <Text style={styles.lblProductName}>{item?.name}</Text>
          <View style={styles.vwProductPriceWeight}>
            <Text style={styles.lblProductPrice}>
              {rupeeSymbol + item?.variation_data?.price}
            </Text>
            <Image
              style={styles.imgDot}
              tintColor={colors.blue4e}
              source={images.dotOrange}
              resizeMode="stretch"
            />
            <Text style={styles.lblProductWeight}>{item?.variation_data?.amount+item?.variation_data?.unit}</Text>
          </View>
        </View>
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
      {props.arrProducts.length > 0 ? (
        <FlatList
          data={props.arrProducts}
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
