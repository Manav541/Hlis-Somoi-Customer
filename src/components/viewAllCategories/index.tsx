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
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { SubCategory } from "../../constants/interfaces";
import FastImage from "react-native-fast-image";
import { colors } from "../../constants/Colors";

interface PropsType {
  arrAllCategories: SubCategory[];
  onPressCategory: () => void;
}

const ViewAllCategoriesComponenet = (props: PropsType) => {
  const renderItemAllCategories = ({
    item,
    index,
  }: {
    item: SubCategory;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={styles.btnAllCategories}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        key={index}
        onPress={props?.onPressCategory}
      >
        <FastImage style={styles.imgAllCategories} source={item?.image} />
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
        data={props?.arrAllCategories}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItemAllCategories}
        numColumns={2}
        contentContainerStyle={{ paddingTop: 20, gap: 20 }}
        columnWrapperStyle={{
          marginHorizontal: 20,
          justifyContent: "space-between",
        }}
      />
    </View>
  );
};

export default ViewAllCategoriesComponenet;
