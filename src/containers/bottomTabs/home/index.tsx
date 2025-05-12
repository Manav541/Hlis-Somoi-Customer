import React, { useState } from "react";
import HomeComponent from "../../../components/bottomTabs/home";
import { images } from "../../../constants/Images";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { ScreenDimensions } from "../../../constants/utils/Dimensions";
import { ScreenNames } from "../../../routers";

const HomeContainer = ({ navigation }: any) => {
  const [arrGroceriesFood, setArrGroceriesFood] = useState([
    {
      type: getTranslation("groceries"),
      image: images.groceriesLogo,
    },
    {
      type: getTranslation("food"),
      image: images.foodLogo,
    },
  ]);
  const [arrAds, setArrAds] = useState([
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
  const [arrSubCategoryGroceries, setArrSubCategoryGroceries] = useState([
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
  const [arrSubCategoryFood, setArrSubCategoryFood] = useState([
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
  const [arrBestProducts, setArrBestProducts] = useState([
    {
      image: images.milkBP,
      name: "Dairy",
      used: "+13 More",
      height: 102,
      width: 102,
    },
    {
      image: images.rice,
      name: "Dairy",
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
  const [arrBestSellers, setArrBestSellers] = useState([
    {
      image: images.bs1,
      logo: images.burgerKingLogo,
      name: "Burger King",
      address: "Denver Church, California, USA",
      time: "10:00-18:00",
      distance: "1 km",
      ratings: 4.5,
      reviews: 200,
      isFavourite: true,
    },
    {
      image: images.bs2,
      logo: images.macdonaldsLogo,
      name: "Macdonalds",
      address: "Denver Church, California, USA",
      time: "10:00-18:00",
      distance: "1.2 km",
      ratings: 4.5,
      reviews: 200,
      isFavourite: false,
    },
    {
      image: images.bs3,
      logo: images.subwayLogo,
      name: "Burger King",
      address: "Denver Church, California, USA",
      time: "10:00-18:00",
      distance: "3 km",
      ratings: 4.5,
      reviews: 200,
      isFavourite: false,
    },
  ]);

  const [isGroceriesFoodSelected, setIsGroceriesFoodSelected] =
    useState<string>("Groceries");

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const onPressSearch = () => {
    navigation.navigate(ScreenNames.search);
  };

  const onPressGroceriesFood = (type: string) => {
    setIsGroceriesFoodSelected(type);
  };

  //handleOnScrollAds
  const handleOnScrollAds = (event: any) => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.ceil(offset / ScreenDimensions.screenWidth);
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
  }

  return (
    <HomeComponent
      arrGroceriesFood={arrGroceriesFood}
      onPressGroceriesFood={onPressGroceriesFood}
      isGroceriesFoodSelected={isGroceriesFoodSelected}
      arrAds={arrAds}
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
