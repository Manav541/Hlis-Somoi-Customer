import React, { useEffect, useRef, useState } from "react";
import HomeComponent from "../../../components/bottomTabs/home";
import { images } from "../../../constants/Images";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { ScreenDimensions } from "../../../constants/utils/Dimensions";
import { ScreenNames } from "../../../routers";
import { useFocusEffect } from "@react-navigation/native";
import { NativeScrollEvent, NativeSyntheticEvent, StatusBar } from "react-native";
import { AdItem, BestProduct, GroceriesFoodItem, Restaurant, SubCategory } from "../../../constants/interfaces";
import { FlatList } from "react-native-gesture-handler";

const HomeContainer = ({ navigation }: any) => {
  const [arrGroceriesFood, setArrGroceriesFood] = useState<GroceriesFoodItem[]>([
    {
      type: getTranslation("groceries"),
      image: images.g1,
    },
    {
      type: getTranslation("food"),
      image: images.f1,
    },
  ]);
  const [arrAds, setArrAds] = useState<AdItem[]>([
    {
      image: images.banner,
    },
    {
      image: images.banner,
    },
    {
      image: images.banner,
    },
  ]);
  const [arrSubCategoryGroceries, setArrSubCategoryGroceries] = useState<SubCategory[]>([
    {
      image: images.riceG,
      name: "Rice",
    },
    {
      image: images.pulsesG,
      name: "Pulses",
    },
    {
      image: images.flourG,
      name: "Flour",
    },
    {
      image: images.cookingOilG,
      name: "Cooking Oil",
    },
    {
      image: images.dairyG,
      name: "Dairy",
    },
    {
      image: images.spicesG,
      name: "Spices",
    },
    {
      image: images.snacksG,
      name: "Snacks",
    },
    {
      image: images.beveragesG,
      name: "Beverages",
    },
  ]);
  const [arrSubCategoryFood, setArrSubCategoryFood] = useState<SubCategory[]>([
    {
      image: images.food1,
      name: "Local & Regional ",
    },
    {
      image: images.food2,
      name: "Fast Food & Snacks",
    },
    {
      image: images.food3,
      name: "Indian & Asian",
    },
    {
      image: images.food4,
      name: "Non-Vegetarian ",
    },
    {
      image: images.food5,
      name: "Vegetarian & Healthy",
    },
    {
      image: images.food6,
      name: "Desserts & Beverages",
    },
    {
      image: images.food7,
      name: "Special Diet & Organic",
    },
    {
      image: images.food8,
      name: "Combo Meals & Family Packs",
    },
  ]);
  const [arrBestProducts, setArrBestProducts] = useState<BestProduct[]>([
    {
      image: images.milkBP,
      name: "Dairy",
      used: "+13 More",
      height: 102,
      width: 102,
    },
    {
      image: images.rice,
      name: "Rice",
      used: "+13 More",
      height: 102.4,
      width: 70.31,
    },
    {
      image: images.spicesBP,
      name: "Spices",
      used: "+13 More",
      height: 129.33,
      width: 103.41,
    },
    {
      image: images.snackBP,
      name: "Snacks",
      used: "+13 More",
      height: 87.24,
      width: 65.98,
    },
  ]);
  const [arrBestSellers, setArrBestSellers] = useState<Restaurant[]>([
    {
      restaurant_imgMain: [
        {
          imgMain: images.restaurantImage,
        },
        {
          imgMain: images.restaurantImage1,
        },
        {
          imgMain: images.restaurantImage2,
        },
      ],
      subCategoryTitle: "Fast Food & Snacks",
      restaurant_img: images.bs1,
      restaurant_logo: images.burgerKingLogo,
      restaurant_name: "Burger King",
      restaurant_address: "Denver Church, California, USA",
      restaurant_time: "10:00-18:00",
      restaurant_deliverytime: "1 hour",
      restaurant_distance: "1 km",
      restaurant_ratings: 4.5,
      restaurant_reviews: 250,
      isFavourite: true,
    },
    {
      restaurant_imgMain: [
        {
          imgMain: images.restaurantImage1,
        },
        {
          imgMain: images.restaurantImage2,
        },
        {
          imgMain: images.restaurantImage,
        },
      ],
      subCategoryTitle: "Fast Food & Snacks",
      restaurant_img: images.bs2,
      restaurant_logo: images.macdonaldsLogo,
      restaurant_name: "Macdonalds",
      restaurant_address: "Denver Church, California, USA",
      restaurant_time: "10:00-18:00",
      restaurant_deliverytime: "1 hour",
      restaurant_distance: "1.2 km",
      restaurant_ratings: 4.5,
      restaurant_reviews: 200,
      isFavourite: false,
    },
    {
      restaurant_imgMain: [
        {
          imgMain: images.restaurantImage2,
        },
        {
          imgMain: images.restaurantImage1,
        },
        {
          imgMain: images.restaurantImage,
        },
      ],
      subCategoryTitle: "Local & Regional Cuisine",
      restaurant_img: images.bs3,
      restaurant_logo: images.subwayLogo,
      restaurant_name: "Subway",
      restaurant_address: "Denver Church, California, USA",
      restaurant_time: "10:00-18:00",
      restaurant_deliverytime: "1 hour",
      restaurant_distance: "3 km",
      restaurant_ratings: 4.5,
      restaurant_reviews: 200,
      isFavourite: false,
    },
  ]);

  const [isGroceriesFoodSelected, setIsGroceriesFoodSelected] =
    useState<string>("Groceries");

    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

  const onPressSearch = () => {
    navigation.navigate(ScreenNames.search);
  };

  const onPressGroceriesFood = (type: string) => {
    setIsGroceriesFoodSelected(type);
  };

   // Auto scroll functionality
   useEffect(() => {
    const autoScroll = setInterval(() => {
      if (flatListRef.current && arrAds.length > 0) {
        const nextIndex = (currentIndex + 1) % arrAds.length;
        flatListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        setCurrentIndex(nextIndex);
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(autoScroll);
  }, [currentIndex, arrAds]);

  const handleOnScrollAds = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(
      scrollPosition / (ScreenDimensions.screenWidth - 40)
    );
    setCurrentIndex(index);
  };

  // handleSellAllCategories
  const handleSellAllCategories = () => {
    navigation.navigate(ScreenNames.allCategories);
  };

  // handleSellAllBestSellers
  const handleSellAllBestSellers = () => {
    navigation.navigate(ScreenNames.allBestSellers, {
      arrBestSellers: arrBestSellers,
    });
  };

  // handleOnPressNotifaicationIcon
  const handleOnPressNotifaicationIcon = () => {
    navigation.navigate(ScreenNames.notification)
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor("transparent");
      return () => {};
    }, [navigation]),
  );


  return (
    <HomeComponent
      arrGroceriesFood={arrGroceriesFood}
      onPressGroceriesFood={onPressGroceriesFood}
      isGroceriesFoodSelected={isGroceriesFoodSelected}
      arrAds={arrAds}
      flatListRef={flatListRef}
      currentIndex={currentIndex}
      handleOnScrollAds={handleOnScrollAds}
      arrSubCategoryGroceries={arrSubCategoryGroceries}
      arrBestProducts={arrBestProducts}
      arrSubCategoryFood={arrSubCategoryFood}
      arrBestSellers={arrBestSellers}
      handleSellAllCategories={handleSellAllCategories}
      handleSellAllBestSellers={handleSellAllBestSellers}
      onPressSearch={onPressSearch}
      handleOnPressNotifaicationIcon={handleOnPressNotifaicationIcon}
    />
  );
};

export default HomeContainer;
