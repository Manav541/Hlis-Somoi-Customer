import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { styles } from "./styles";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { images } from "../../constants/Images";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { fontsfamily } from "../../constants/FontFamily";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Restaurant } from "../../constants/utils/interfaces";

interface PropsType {
  arrAllBestSellers: Restaurant[];
  onPressFavourite: (index: number) => void;
  onPressRestaurant:(item: Restaurant)=>void;
}

const ViewAllBestSellersComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  const renderItemAllBestSellers = ({ item, index }: {item : Restaurant, index : number}) => {
    return (
      <TouchableOpacity
        style={styles.btnAllBestSellersItem}
        activeOpacity={activityOpacity}
        onPress={()=>props?.onPressRestaurant(item)}
      >
        <Image style={styles.imgBestSellers} source={item?.restaurant_img} />
        <TouchableOpacity
          style={styles.btnFavourite}
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          onPress={() => props?.onPressFavourite(index)}
        >
          <Image
            style={styles.imgHeart}
            source={item?.isFavourite ? images.redHeart : images.emptyHeart}
          />
        </TouchableOpacity>
        <View style={styles.vwBestSellersItemDetails}>
          <Text style={styles.lblBestSellersItemName}>{item?.restaurant_name}</Text>
          <View style={styles.vwLocation}>
            <Image
              style={styles.imgLocation}
              source={images.locationIconOrange}
            />
            <Text style={styles.lblLocation}>{item?.restaurant_address}</Text>
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
                  {item?.restaurant_time}
                </Text>
              </Text>
              <View style={styles.vwDistance}>
                <Image style={styles.imgDot} source={images.dotOrange} />
                <Text style={styles.lblDistance}>{item?.restaurant_distance}</Text>
              </View>
            </View>
            <View style={styles.vwRating}>
              <Text style={styles.lblRatings}>{item?.restaurant_ratings}</Text>
              <Image style={styles.imgStarBlue} source={images.starBlue} />
            </View>
          </View>
          <Image style={styles.imgLogo} source={item?.restaurant_logo}/>
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.vwMain}>
      <FlatList
        data={props?.arrAllBestSellers}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItemAllBestSellers}
        contentContainerStyle={{ gap: 10, marginTop: 20,paddingBottom: insets.bottom ? insets.bottom  : 20 }}
      />
    </View>
  );
};

export default ViewAllBestSellersComponent; 
