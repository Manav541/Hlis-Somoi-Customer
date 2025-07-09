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
import { images } from "../../constants/Images";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { fontsfamily } from "../../constants/FontFamily";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BestProductSellerData, Restaurant } from "../../constants/interfaces";
import FastImage from "react-native-fast-image";
import { colors } from "../../constants/Colors";
import { DateFormatsManager } from "../../constants/utils/DateFormats";

interface PropsType {
  arrBestProductsSellers: BestProductSellerData[];
  onPressFavourite: (index: number,vendor_id: string) => void;
  onPressRestaurant: (vendor_id : string) => void;
  loadMoreCategories: () => void;
  canLoadMore: boolean;
  setCanLoadMore: (value: boolean) => void;
  hasMountedOnce: { current: boolean };
}

const ViewAllBestSellersComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  const renderItemAllBestSellers = ({
    item,
    index,
  }: {
    item: BestProductSellerData;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={styles.btnAllBestSellersItem}
        activeOpacity={activityOpacity}
        onPress={() => props?.onPressRestaurant(item?.vendor_id)}
      >
        <FastImage
          style={styles.imgBestSellers}
          source={{ uri: item?.store_cover_image }}
        />
        <TouchableOpacity
          style={styles.btnFavourite}
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          onPress={() => props?.onPressFavourite(index,item?.vendor_id)}
        >
          <Image
            style={styles.imgHeart}
            source={
              item?.is_store_wishlisted == true
                ? images.emptyHeart
                : images.redHeart
            }
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <View style={styles.vwBestSellersItemDetails}>
          <Text style={styles.lblBestSellersItemName}>{item?.store_name}</Text>
          <View style={styles.vwLocation}>
            <Image
              style={styles.imgLocation}
              source={images.locationIconOrange}
              resizeMode="stretch"
            />
            <Text style={styles.lblLocation}>{item?.store_location}</Text>
          </View>
          <View style={styles.vwTimeDistanceRating}>
            <View style={styles.vwTimeDistance}>
              <Text style={styles.lblTime}>
                {getTranslation("openCloseTime")}
                <Text
                  style={{
                    ...styles.lblTime,
                    fontFamily: fontsfamily.semiboldOutFit,
                  }}
                >
                  {DateFormatsManager.formatDate(
                    item?.opening_time,
                    DateFormatsManager.TimeFormats.HHmm,
                    DateFormatsManager.TimeFormats.HHmmss
                  ) +
                    "-" +
                    DateFormatsManager.formatDate(
                      item?.closing_time,
                      DateFormatsManager.TimeFormats.HHmm,
                      DateFormatsManager.TimeFormats.HHmmss
                    )}
                </Text>
              </Text>
              <View style={styles.vwDistance}>
                <Image
                  style={styles.imgDot}
                  source={images.dotOrange}
                  resizeMode="stretch"
                />
                <Text style={styles.lblDistance}>
                  {item?.distance}
                </Text>
              </View>
            </View>
            <View style={styles.vwRating}>
              <Text style={styles.lblRatings}>
                {parseFloat(item?.store_rating).toFixed(1)}
              </Text>
              <Image
                style={styles.imgStarBlue}
                source={images.starBlue}
                resizeMode="stretch"
              />
            </View>
          </View>
         
        </View>
         <FastImage
            style={styles.imgLogo}
            source={{ uri: item?.store_image }}
            resizeMode="stretch"
          />
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
        bounces
        showsVerticalScrollIndicator={false}
        renderItem={renderItemAllBestSellers}
        contentContainerStyle={{
          marginTop: 20,
          paddingBottom: insets.bottom ? insets.bottom : 30,
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

export default ViewAllBestSellersComponent;
