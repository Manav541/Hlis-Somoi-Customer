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
import {
  ComapareProductData,
  GroceryProduct,
} from "../../constants/interfaces";
import FastImage from "react-native-fast-image";
import { colors } from "../../constants/Colors";

interface PropsType {
  arrCompareProducts: ComapareProductData[];
  onPressDeleteButton: (product_id: string) => void;
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

const CompareProductComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  const renderItemCompareProducts = ({
    item,
    index,
  }: {
    item: ComapareProductData;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={styles.btnCompareProducts}
        key={index}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        disabled={index == 0}
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
        <FastImage style={styles.imgProduct} source={{ uri: item?.image }} />
        <View style={{ marginRight: 18, flex: 1 }}>
          <Text style={styles.lblProductName}>{item?.name}</Text>
          <View style={styles.vwProductRate}>
            <Image style={styles.imgStar} source={images.star} />
            <Text style={styles.lblProductRate}>{item?.rating}</Text>
          </View>
          <View style={styles.vwPrice}>
            <Text style={styles.lblProductFinalPrice}>
              {rupeeSymbol + item?.price}
            </Text>
          </View>
          <Text style={styles.lblProductDesc} numberOfLines={4}>
            {item?.description}
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
            onPress={() => {
              props?.onPressDeleteButton(item?.id);
            }}
          >
            <Image style={{ height: 28, width: 28 }} source={images.delete} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
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
