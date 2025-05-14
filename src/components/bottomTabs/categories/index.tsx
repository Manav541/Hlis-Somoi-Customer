import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { images } from "../../../constants/Images";
import { activityOpacity, hitSlop } from "../../../constants/GConstant";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PropsType {
  arrAllCategories: any[];
  onPressMainCategories: (
    mainCategoryName: string,
    arrSubCategory: any
  ) => void;
  handleOnPressNotifaicationIcon: () => void;
}

const CategoriesComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  const renderItemAllCategories = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={styles.btnAllCategories}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
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
      <View style={styles.vwContainer}>
        <View
          style={{
            ...styles.vwLocationNotification,
            marginTop: insets.top ? insets.top : 50,
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
          contentContainerStyle={{ paddingTop: 37, gap: 20,paddingBottom:20 }}
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
