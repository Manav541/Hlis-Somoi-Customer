import React, { useEffect, useState } from "react";
import HomeComponent from "../../../components/bottomTabs/home";
import { images } from "../../../constants/Images";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { ScreenNames } from "../../../routers";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "react-native";
import {
  AdItem,
  BestProduct,
  BestProductSellerData,
  MainCategoryListItem,
  Restaurant,
  SubCategory,
  SubCategoryListItem,
} from "../../../constants/interfaces";
import {
  flashMessageWarning,
  toggleLoader,
} from "../../../constants/GConstant";
import { statusCodes } from "../../../api/APIConstant";
import { zustandStore } from "../../../store";
import LocationManager from "../../../constants/utils/LocationManager";

const HomeContainer = ({ navigation }: any) => {
  // API zustand store
  const mainCategoryListApi = zustandStore.HomeStore(
    (state) => state.mainCategoryList
  );
  const bannerListApi = zustandStore.HomeStore((state) => state.bannerList);
  const subCategoryListApi = zustandStore.HomeStore(
    (state) => state.subCategoryList
  );
  const bestProductsSellerListApi = zustandStore.HomeStore(
    (state) => state.bestProductsSellerList
  );

  const [arrMainCategoryList, setArrMainCategoryList] = useState<
    MainCategoryListItem[]
  >([]);
  const [arrAds, setArrAds] = useState<AdItem[]>([]);
  const [arrSubCategory, setArrSubCategory] = useState<SubCategoryListItem[]>(
    []
  );
  const [arrBestProductsSellers, setArrBestProductsSellers] = useState<
    BestProductSellerData[]
  >([]);

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
  const [mainCategoryId, setMainCategoryId] = useState<string>("1");
  const [currentAddress, setCurrentAddress] = useState<string | null>("");
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [mainCategoryPageNumber, setMainCategoryPageNumber] =
    useState<number>(1);
  const [subCategoryPageNumber, setSubCategoryPageNumber] = useState<number>(1);
  const [bestProductsSellerPageNumber, setBestProductsSellerPageNumber] =
    useState<number>(1);

  const handleSetBannerIndex = (index: number) => {
    setCurrentBannerIndex(index);
  };

  const onPressSearch = () => {
    navigation.navigate(ScreenNames.search);
  };

  const onPressLocation = () => {
    navigation.navigate(ScreenNames.manageAddress, { navigateFromHome: true });
  };

  const onPressMainCategory = (name: string, mainCategoryId: string) => {
    if (isGroceriesFoodSelected === name) {
      // Already selected, so do nothing
      return;
    }
    console.log("mainCategoryId", mainCategoryId, name);
    setIsGroceriesFoodSelected(name);
    setMainCategoryId(mainCategoryId);
    handleSubCategoryListApi(mainCategoryId);
    handleBestProductsSellerListApi(mainCategoryId);
  };

  // handleSellAllCategories
  const handleSellAllCategories = () => {
    navigation.navigate(ScreenNames.allCategories, {
      mainCategoryId: mainCategoryId,
    });
  };

  // handleSellAllBestSellers
  const handleSellAllBestSellers = () => {
    navigation.navigate(ScreenNames.allBestSellers, {
      mainCategoryId: mainCategoryId,
    });
  };

  const onPressRestaurant = (item: Restaurant) => {
    navigation.navigate(ScreenNames.restaurantDetail, { item: item });
  };

  const onPressSubCategories = () => {
    // navigation.navigate(ScreenNames.productListing, {
    //   mainCategoryName: isGroceriesFoodSelected,
    //   arrSubCategory:
    //     isGroceriesFoodSelected === "Groceries"
    //       ? arrSubCategory
    //       : arrBestSellers,
    // });
  };

  const onPressBestProducts = () => {
    navigation.navigate(ScreenNames.productListing, {
      mainCategoryName: isGroceriesFoodSelected,
      arrSubCategory: arrSubCategory,
    });
  };

  // handleOnPressNotifaicationIcon
  const handleOnPressNotifaicationIcon = () => {
    navigation.navigate(ScreenNames.notification);
  };

  // ----------------------- API Calling -----------------------

  // handleMainCategoryListApi
  const handleMainCategoryListApi = async () => {
    const dictData = {
      page_number: mainCategoryPageNumber,
    };
    try {
      const response = await mainCategoryListApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "MAIN CATEGORY LIST RESPONSE===>",
            JSON.stringify(response)
          );
        const data = response.data as MainCategoryListItem;
        if (response.code === statusCodes.success) {
          // console.log("Dataaa => ", JSON.stringify(data));
          setArrMainCategoryList(Array.isArray(data) ? data : [data]);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  // handleBannerListApi
  const handleBannerListApi = async () => {
    try {
      const response = await bannerListApi({}, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("BANNER LIST RESPONSE===>", JSON.stringify(response));
        const data = response.data as AdItem;
        if (response.code === statusCodes.success) {
          setArrAds(Array.isArray(data) ? data : [data]);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  // handleSubCategoryListApi
  const handleSubCategoryListApi = async (mainCategoryId: String) => {
    const dictData = {
      category_id: mainCategoryId,
      page_number: subCategoryPageNumber,
    };
    try {
      const response = await subCategoryListApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "SUB CATEGORY LIST RESPONSE===>",
            JSON.stringify(response)
          );
        const data = response.data as SubCategoryListItem;
        if (response.code === statusCodes.success) {
          setArrSubCategory(Array.isArray(data) ? data : [data]);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  // handleSubCategoryListApi
  const handleBestProductsSellerListApi = async (mainCategoryId: String) => {
    const dictData = {
      category_id: mainCategoryId,
      page_number: bestProductsSellerPageNumber,
    };
    try {
      const response = await bestProductsSellerListApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "BEST PRODUCTS SELLERS LIST RESPONSE===>",
            JSON.stringify(response)
          );
        const data = response.data as BestProductSellerData;
        if (response.code === statusCodes.success) {
          setArrBestProductsSellers(Array.isArray(data) ? data : [data]);
        } else if (response.code === statusCodes.invaildOrFail) {
          setArrBestProductsSellers([])
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

   // Current Location
   const handleCurrentLocation = async () => {
    toggleLoader(true);
    const current = await LocationManager.getCurrentLocation();
    if (current) {
      const address = await LocationManager.getFormattedAddress(current);
      console.log("currentAddress", address);
      setCurrentAddress(address);
    }
    toggleLoader(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      handleCurrentLocation();
      setIsGroceriesFoodSelected("Groceries");
      handleMainCategoryListApi();
      handleBannerListApi();
      handleSubCategoryListApi(mainCategoryId);
      handleBestProductsSellerListApi(mainCategoryId);
      StatusBar.setBarStyle("light-content");
      return () => {};
    }, [navigation])
  );

 

  return (
    <HomeComponent
      arrMainCategoryList={arrMainCategoryList}
      arrAds={arrAds}
      arrSubCategory={arrSubCategory}
      arrBestProductsSellers={arrBestProductsSellers}
      onPressMainCategory={onPressMainCategory}
      isGroceriesFoodSelected={isGroceriesFoodSelected}
      handleSetBannerIndex={handleSetBannerIndex}
      currentBannerIndex={currentBannerIndex}
      arrBestProducts={arrBestProducts}
      arrBestSellers={arrBestSellers}
      handleSellAllCategories={handleSellAllCategories}
      handleSellAllBestSellers={handleSellAllBestSellers}
      onPressSearch={onPressSearch}
      handleOnPressNotifaicationIcon={handleOnPressNotifaicationIcon}
      onPressLocation={onPressLocation}
      onPressRestaurant={onPressRestaurant}
      onPressSubCategories={onPressSubCategories}
      onPressBestProducts={onPressBestProducts}
      currentAddress={currentAddress}
    />
  );
};

export default HomeContainer;
