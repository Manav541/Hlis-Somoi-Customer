import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { images } from "../../constants/Images";
import { activityOpacity, hitSlop, rupeeSymbol } from "../../constants/GConstant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PlatformVersion } from "../../constants/utils/Platform";
import { GroceryProduct } from "../../constants/interfaces";

interface PropsType {
  arrCompareProducts: GroceryProduct[];
}

const CompareProductComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  const renderItemCompareProducts = ({
    item,
    index,
  }: {
    item: GroceryProduct;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={styles.btnCompareProducts}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        key={index}
      >
        <Image style={styles.imgProduct} source={item?.product_img} />
        <View style={{ marginRight: 18, flex: 1 }}>
          <Text style={styles.lblProductName}>{item?.product_name}</Text>
          <View style={styles.vwProductRate}>
            <Image style={styles.imgStar} source={images.star} />
            <Text style={styles.lblProductRate}>{item?.product_rating}</Text>
          </View>
          <View style={styles.vwPrice}>
            <Text style={styles.lblProductFinalPrice}>
              {rupeeSymbol+item?.product_final_price}
            </Text>
            <Text style={styles.lblProductPrice}>{rupeeSymbol+item?.product_price}</Text>
          </View>
          <Text style={styles.lblProductDesc} numberOfLines={4}>
            {item?.product_desc}
          </Text>
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
      <Text style={styles.lblTitle}>
        {getTranslation("similarProducttoCompare")}
      </Text>
      <FlatList
        data={props?.arrCompareProducts}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItemCompareProducts}
        contentContainerStyle={{
          gap: 15,
          marginHorizontal: 20,
          paddingBottom: PlatformVersion.isIOS ? insets.bottom + 20 : 40,
        }}
      />
    </View>
  );
};

export default CompareProductComponent;
