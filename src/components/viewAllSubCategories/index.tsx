import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import React, { useRef, useState } from "react";
import { styles } from "./styles";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { SubCategoryListItem } from "../../constants/interfaces";
import FastImage from "react-native-fast-image";
import { colors } from "../../constants/Colors";

interface PropsType {
  arrSubCategory: SubCategoryListItem[];
  onPressCategory: (sub_category_id: string,subCategoryName:string) => void;
  loadMoreCategories: () => void;
  canLoadMore: boolean;
  setCanLoadMore: (value: boolean) => void;
  hasMountedOnce: { current: boolean };
}

const ViewAllSubCategoriesComponenet = (props: PropsType) => {
  const renderItemAllCategories = ({
    item,
    index,
  }: {
    item: SubCategoryListItem;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={styles.btnAllCategories}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        key={index}
        onPress={() => {
          props?.onPressCategory(item?.id,item?.name);
        }}
      >
        <FastImage
          style={styles.imgAllCategories}
          source={{ uri: item?.image }}
        />
        <Text style={styles.lblAllCategoriesName}>{item?.name}</Text>
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
        data={props.arrSubCategory}
        renderItem={renderItemAllCategories}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        bounces
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 20, gap: 20 }}
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
          props.setCanLoadMore(h > 600); // Adjust if needed
          props.hasMountedOnce.current = true;
        }}
      />
    </View>
  );
};

export default ViewAllSubCategoriesComponenet;
