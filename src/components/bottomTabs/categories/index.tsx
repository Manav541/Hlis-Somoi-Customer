import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Platform,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { images } from "../../../constants/Images";
import { activityOpacity, hitSlop } from "../../../constants/GConstant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Category,
  FashionProduct,
  GroceryProduct,
  Restaurant,
} from "../../../constants/interfaces";

interface PropsType {
  arrAllCategories: Category[];
  onPressMainCategories: (
    mainCategoryName: string,
    arrSubCategory: (GroceryProduct | Restaurant | FashionProduct)[]
  ) => void;
  handleOnPressNotifaicationIcon: () => void;
}

const CategoriesComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  const renderItemAllCategories = ({
    item,
    index,
  }: {
    item: Category;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={styles.btnAllCategories}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        key={index}
        onPress={() => {
          props?.onPressMainCategories(item?.name, item?.arrSubCategory);
        }}
      >
        <Image style={styles.imgAllCategories} source={item?.image} />
        <Text style={styles.lblAllCategoriesName}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"light-content"}
      />
      <View
        style={{
          ...styles.vwContainer,
          paddingTop:  insets.top ? insets.top + 20 : 40,
        }}
      >
        <View
          style={{
            ...styles.vwLocationNotification,
          }}
        >
          <TouchableOpacity
            style={styles.btnLocation}
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
          >
            <Image style={styles.imgLocation} source={images.locationWhite} />
            <Text style={styles.lblLocation}>New York,NY</Text>
            <Image style={styles.imgDownArrow} source={images.whiteDownArrow} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={props?.handleOnPressNotifaicationIcon}
          >
            <Image
              style={styles.imgNotification}
              source={images.notificationWhite}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={props?.arrAllCategories}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderItemAllCategories}
          numColumns={2}
          style={{marginTop: 10}}
          contentContainerStyle={{paddingTop : 27,  gap: 20, paddingBottom: 20 }}
          columnWrapperStyle={{
            marginHorizontal: 20,
            justifyContent: "space-between",
          }}
        />
      </View>
    </View>
  );
};

export default CategoriesComponent;
