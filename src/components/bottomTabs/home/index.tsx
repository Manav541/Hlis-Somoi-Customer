import {
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Platform,
  TextInput,
  FlatList,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { styles } from "./styles";
import { images } from "../../../constants/Images";
import { ScreenDimensions } from "../../../constants/utils/Dimensions";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { activityOpacity, hitSlop } from "../../../constants/GConstant";
import { colors } from "../../../constants/Colors";

interface PropsType {
  arrGroceriesFood: any[];
  onPressGroceriesFood: (type: string) => void;
  isGroceriesFoodSelected: string;
  search: string;
  onChangeSearch: (text: string) => void;
  arrAds: any[];
  handleOnScrollAds: (event: any) => void;
  arrSubCategoryGroceries: any[];
  arrBestProducts: any[];
  arrSubCategoryFood: any[];
  arrBestSellers: any[];
}

const HomeComponent = (props: PropsType) => {
  const arrSubCategory =
    props?.isGroceriesFoodSelected === "Groceries"
      ? props?.arrSubCategoryGroceries
      : props?.arrSubCategoryFood;
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto scroll functionality
  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (flatListRef.current && props.arrAds.length > 0) {
        const nextIndex = (currentIndex + 1) % props.arrAds.length;
        flatListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        setCurrentIndex(nextIndex);
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(autoScroll);
  }, [currentIndex, props.arrAds]);

  const handleOnScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(
      scrollPosition / (ScreenDimensions.screenWidth - 40)
    );
    setCurrentIndex(index);
    props.handleOnScrollAds(event);
  };

  const renderGroceriesFoodItem = (item: any, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={{
          ...styles.btnGroceriesFood,
          width: (ScreenDimensions.screenWidth - 20 * 2 - 19) / 2,
          marginRight: index % 2 === 0 ? 19 : 0,
          backgroundColor:
            props?.isGroceriesFoodSelected === item?.type
              ? colors.orange1c
              : colors.white,
        }}
        activeOpacity={activityOpacity}
        onPress={() => props?.onPressGroceriesFood(item?.type)}
      >
        <Image style={styles.imgGroceriesFood} source={item?.image} />
        <View style={styles.vwType}>
          <Text style={styles.lblGroceriesFood}>{item?.type}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemAds = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.vwAddsItem}
        activeOpacity={activityOpacity}
      >
        <Image style={styles.imgAdds} source={item?.image} resizeMode="cover" />
      </TouchableOpacity>
    );
  };

  const renderDots = () => {
    return (
      <View style={styles.vwDotsContainer}>
        {props.arrAds.map((_, index) => (
          <View
            key={index}
            style={[
              styles.vwDot,
              {
                backgroundColor:
                  index === currentIndex ? colors.blue4e : colors.greyd9,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const renderSubCategories = (item: any, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.btnSubCategories}
        activeOpacity={activityOpacity}
      >
        <Image
          style={styles.imgSubCategories}
          source={item?.image}
          resizeMode="cover"
        />
        <Text style={styles.lblSubCategory}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderBestProducts = (item: any, index: number) => {
    return (
      <TouchableOpacity
        style={styles.btnBestProducts}
        key={index}
        activeOpacity={activityOpacity}
      >
        <View style={styles.vwBestProductsImage}>
          <Image
            style={{ height: item?.height, width: item?.width }}
            source={item?.image}
          />
        </View>
        <Text style={styles.lblBestProductsUsed}>{item?.used}</Text>
        <Text style={styles.lblBestProductsName}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderStar = (rate: number) => {
    const totalStars = 5;
    return (
      <View style={{ flexDirection: "row" }}>
        {Array.from({ length: totalStars }).map((_, index) => {
          const isFilled = index < Math.floor(rate);
          return (
            <Image
              key={index}
              source={isFilled ? images.star : images.starEmpty}
              style={{ width: 24, height: 24, marginRight: 2 }}
              resizeMode="contain"
            />
          );
        })}
      </View>
    );
  };

  const renderBestSeller = ({item,index} : any) => {
    return (
      <TouchableOpacity style={styles.btnBestSeller} activeOpacity={activityOpacity}>
        <Image style={styles.imgBestSeller} source={item?.image} />
        
        <View style={styles.vwBestSellerDetails}>
          <Text style={styles.lblBestSellerName}>{item?.name}</Text>
          <View style={{flexDirection : 'row',marginTop : 7, alignItems : 'center'}}>
          {renderStar(item?.rating)}
            <Text style={styles.lblBestSellerReviews}>(+{item?.reviews})</Text>
          </View>
        </View>
        <Image style={styles.imgLogo} source={item?.logo}/>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"light-content"}
      />
      <View style={styles.vwMainContainer}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: Platform.OS === "ios" ? insets.top : 30,
            overflow: "hidden",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Groceries Food */}
          <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
            {/* Groceries Food */}
            {props?.arrGroceriesFood.map((item, index) =>
              renderGroceriesFoodItem(item, index)
            )}
          </View>

          {/* Location Notification */}

          <View style={styles.vwLocationNotification}>
            <View style={styles.vwLocationWithArrow}>
              <View style={styles.vwLocation}>
                <Image
                  style={styles.imgLocation}
                  source={images.locationIcon}
                />
                <Text style={styles.lblLocation}>
                  {getTranslation("ahmedabad")}
                </Text>
              </View>
              <Image
                style={styles.imgLocation}
                source={images.rightarrowBlue}
              />
            </View>
            <TouchableOpacity
              style={styles.btnNotification}
              activeOpacity={activityOpacity}
              hitSlop={hitSlop}
            >
              <Image
                style={styles.imgLocation}
                source={images.notificationIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={styles.vwSearch}>
            <Image style={styles.imgLocation} source={images.search} />
            <TextInput
              placeholder={getTranslation("search") || ""}
              placeholderTextColor={colors.greya7}
              style={styles.txtSearchInput}
              selectionColor={colors.blue4e}
              value={props?.search}
              onChangeText={props?.onChangeSearch}
              keyboardType="default"
            />
          </View>

          {/* Ads */}
          <View style={styles.vwAdds}>
            <FlatList
              ref={flatListRef}
              data={props.arrAds}
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              renderItem={renderItemAds}
              pagingEnabled={true}
              onScroll={handleOnScroll}
              contentContainerStyle={{ paddingRight: 20 }}
              snapToInterval={ScreenDimensions.screenWidth - 40}
              decelerationRate="fast"
            />
            {renderDots()}
          </View>

          {/* Sub Categories */}
          <View style={styles.vwSubCategoriesMain}>
            <View style={styles.vwSubCategoriesTitleSeeAll}>
              <Text style={styles.lblSubCategoriesTitle}>
                {getTranslation("shopBySubCategories")}
              </Text>
              <TouchableOpacity
                activeOpacity={activityOpacity}
                hitSlop={hitSlop}
              >
                <Text style={styles.lblSeeAll}>{getTranslation("seeAll")}</Text>
              </TouchableOpacity>
            </View>

            {/* Sub Categories Grid */}
            <View style={styles.vwSubCategoriesGrid}>
              {arrSubCategory.map((item, index) =>
                renderSubCategories(item, index)
              )}
            </View>
          </View>

          {props?.isGroceriesFoodSelected === "Groceries" ? (
            <View style={styles.vwBestProducts}>
              <Text style={styles.lblBestProducts}>
                {getTranslation("bestProducts")}
              </Text>
              <View style={styles.vwBestProductsGrid}>
                {props?.arrBestProducts.map((item, index) =>
                  renderBestProducts(item, index)
                )}
              </View>
            </View>
          ) : (
            <View style={{marginBottom : 10}}>
              <Text style={styles.lblBestProducts}>
                {getTranslation("bestSellers")}
              </Text>
              <FlatList
                data={props?.arrBestSellers}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderBestSeller}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeComponent;
