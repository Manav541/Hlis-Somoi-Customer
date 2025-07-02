import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import React from "react";
import { BestProductSellerData } from "../../constants/interfaces";
import { styles } from "./styles";
import { activityOpacity } from "../../constants/GConstant";
import FastImage from "react-native-fast-image";
import { colors } from "../../constants/Colors";

interface PropsType {
  arrBestProductsSellers: BestProductSellerData[];
  onPressBestProducts: (
    product_id: string,
    variation_id?: string,
    is_variation?: boolean,
    is_color?: boolean,
    is_size?: boolean,
    color_id?: string,
    size_id?: string
  ) => void;
  loadMoreCategories: () => void;
  canLoadMore: boolean;
  setCanLoadMore: (value: boolean) => void;
  hasMountedOnce: { current: boolean };
}

const ViewAllBestProductsComponent = (props: PropsType) => {
  const renderBestProducts = ({
    item,
    index,
  }: {
    item: BestProductSellerData;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={styles.btnBestProducts}
        key={index}
        activeOpacity={activityOpacity}
        onPress={() =>
          props?.onPressBestProducts(
            item?.id,
            item?.variation_data?.variation_id,
            item?.is_variation,
            item?.is_color,
            item?.is_size
          )
        }
      >
        <View style={styles.vwBestProductsImage}>
          <FastImage
            style={{ height: 100, width: 90 }}
            source={{ uri: item?.image }}
          />
        </View>
        <Text style={styles.lblBestProductsUsed}>
          +{item?.total_products} More
        </Text>
        <Text style={styles.lblBestProductsName}>{item?.name}</Text>
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
      <FlatList
        data={props?.arrBestProductsSellers}
        renderItem={renderBestProducts}
        numColumns={2}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 20, gap: 20, paddingBottom: 40 }}
        columnWrapperStyle={{
          marginHorizontal: 20,
          justifyContent: "space-between",
        }}
        onEndReached={() => {
          if (props.canLoadMore && props.hasMountedOnce.current) {
            props.loadMoreCategories();
          }
        }}
        onEndReachedThreshold={0.4}
        onContentSizeChange={(w, h) => {
          props.setCanLoadMore(h > 600);
          props.hasMountedOnce.current = true;
        }}
      />
    </View>
  );
};

export default ViewAllBestProductsComponent;
