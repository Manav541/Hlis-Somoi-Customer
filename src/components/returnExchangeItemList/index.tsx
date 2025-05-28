import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { OrderReviewProduct } from "../../constants/interfaces";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { colors } from "../../constants/Colors";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { activityOpacity, hitSlop, rupeeSymbol } from "../../constants/GConstant";
import GlobalButton from "../../global/GlobalButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";

interface PropsType {
  arrProducts: OrderReviewProduct[];
  onPressItem: (item: OrderReviewProduct, index: number) => void;
  onPressContinue: () => void;
}

const ReturnExchangeItemListComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  const renderItemArrProducts = ({
    item,
    index,
  }: {
    item: OrderReviewProduct;
    index: number;
  }) => (
    <TouchableOpacity
      style={styles.btnProductsItem}
      key={index}
      activeOpacity={activityOpacity}
      hitSlop={hitSlop}
      onPress={() => props?.onPressItem(item, index)}
    >
      <View style={styles.vwProductImage}>
        <FastImage
          source={item?.product_img}
          style={{ height: item?.height, width: item?.width }}
        />
      </View>
      <View style={styles.vwProductDetails}>
        <Text style={styles.lblProductName}>{item?.product_name}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            marginTop: 5,
            marginBottom: 10,
          }}
        >
          <Text style={styles.lblProductPrice}>{rupeeSymbol+item?.product_price}</Text>
          <Image
            style={styles.imgDotBlue}
            source={images.dotOrange}
            tintColor={colors.blue4e}
            resizeMode="stretch"
          />
          <Text style={styles.lblProductWeight}>{item?.product_weight}</Text>
        </View>
        <Text style={styles.lblQuantity}>
          <Text>{getTranslation("qty")}</Text>{" "}
          <Text style={styles.lblQuantityCount}>{item?.product_quantity}</Text>
        </Text>
      </View>
      <Image
        style={styles.imgCheckBox}
        source={item?.isSelected ? images.checkfill : images.checkempty}
        resizeMode="stretch"
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.vwMain}>
      <FlatList
        data={props?.arrProducts}
        showsVerticalScrollIndicator={false}
        bounces={false}
        renderItem={renderItemArrProducts}
        contentContainerStyle={{
          marginHorizontal: 20,
          paddingTop: 20,
          gap: 10,
          flexGrow: 1,
        }}
      />
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: insets.bottom ? insets.bottom : 20,
        }}
      >
        <GlobalButton
          title={getTranslation("continue")}
          isOrange
          onPress={props?.onPressContinue}
        />
      </View>
    </View>
  );
};

export default ReturnExchangeItemListComponent;
