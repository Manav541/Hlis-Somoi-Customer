import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Platform,
  RefreshControl,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { images } from "../../../constants/Images";
import { activityOpacity, hitSlop } from "../../../constants/GConstant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MainCategoryListItem } from "../../../constants/interfaces";
import { colors } from "../../../constants/Colors";
import FastImage from "react-native-fast-image";

interface PropsType {
  arrMainCategoryList: MainCategoryListItem[];
  onPressMainCategories: (
    mainCategoryId: string,
    mainCategoryName: string
  ) => void;
  handleOnPressNotifaicationIcon: () => void;
  onPressLocation: () => void;
  currentAddress: string | null;
  // Pagination
  loadMoreCategories: () => void;
  canLoadMore: boolean;
  setCanLoadMore: (value: boolean) => void;
  hasMountedOnce: { current: boolean };
  isRefreshing: boolean;
  onRefresh: () => void;
}

const CategoriesComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  const renderItemAllCategories = ({
    item,
    index,
  }: {
    item: MainCategoryListItem;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={styles.btnAllCategories}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        key={index}
        onPress={() => {
          props?.onPressMainCategories(item?.id, item?.name);
        }}
      >
        <FastImage
          style={styles.imgAllCategories}
          source={{ uri: item?.image, priority: FastImage.priority.normal }}
        />

        <Text style={styles.lblAllCategoriesName}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.blue4e}
        barStyle={"light-content"}
      />
      <View
        style={{
          ...styles.vwContainer,
          paddingTop: insets.top ? insets.top + 20 : 40,
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
            onPress={props?.onPressLocation}
          >
            <Image
              style={styles.imgLocation}
              source={images.locationWhite}
              resizeMode="stretch"
            />
            <Text style={styles.lblLocation} numberOfLines={1}>
              {props?.currentAddress}
            </Text>
            <Image
              style={styles.imgDownArrow}
              source={images.whiteDownArrow}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={props?.handleOnPressNotifaicationIcon}
          >
            <Image
              style={styles.imgNotification}
              source={images.notificationWhite}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={props?.arrMainCategoryList}
          bounces={true}
          showsVerticalScrollIndicator={false}
          renderItem={renderItemAllCategories}
          numColumns={2}
          style={{ marginTop: 10 }}
          contentContainerStyle={{ paddingTop: 27, gap: 20, paddingBottom: 20 }}
          columnWrapperStyle={{
            marginHorizontal: 20,
            justifyContent: "space-between",
          }}
          onEndReached={() => {
            if (
              props.canLoadMore &&
              props.hasMountedOnce.current &&
              !props.isRefreshing
            ) {
              props.loadMoreCategories();
            }
          }}
          onEndReachedThreshold={0.4}
          refreshControl={
            <RefreshControl
              refreshing={props.isRefreshing}
              onRefresh={props.onRefresh}
              colors={[colors.orange1c]}
              tintColor={colors.orange1c}
            />
          }
        />
      </View>
    </View>
  );
};

export default CategoriesComponent;
