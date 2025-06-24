import {
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { images } from "../../constants/Images";
import {
  activityOpacity,
  hitSlop,
  rupeeSymbol,
} from "../../constants/GConstant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PlatformVersion } from "../../constants/utils/Platform";
import { GroceryProduct } from "../../constants/interfaces";
import FastImage from "react-native-fast-image";
import { colors } from "../../constants/Colors";

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
      <View style={styles.btnCompareProducts} key={index}>
        <FastImage style={styles.imgProduct} source={item?.product_img} />
        <View style={{ marginRight: 18, flex: 1 }}>
          <Text style={styles.lblProductName}>{item?.product_name}</Text>
          <View style={styles.vwProductRate}>
            <Image style={styles.imgStar} source={images.star} />
            <Text style={styles.lblProductRate}>{item?.product_rating}</Text>
          </View>
          <View style={styles.vwPrice}>
            <Text style={styles.lblProductFinalPrice}>
              {rupeeSymbol + item?.product_final_price}
            </Text>
            <Text style={styles.lblProductPrice}>
              {rupeeSymbol + item?.product_price}
            </Text>
          </View>
          <Text style={styles.lblProductDesc} numberOfLines={4}>
            {item?.product_desc}
          </Text>
        </View>

        {/* Delete Compare Product */}
        {index != 0 && (
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 10,
              right: 10,
            }}
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
          >
            <Image style={{ height: 28, width: 28 }} source={images.delete} />
          </TouchableOpacity>
        )}
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
