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
import { MmkvManager } from "../../../constants/utils/MmkvManager";

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

  const [isGuestUser, setIsGuestUser] = useState<boolean>(false);
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

  const [isGroceriesFoodSelected, setIsGroceriesFoodSelected] =
    useState<string>("Groceries");
  const [mainCategoryId, setMainCategoryId] = useState<string>("1");
  const [mainCategoryName, setMainCategoryName] = useState<string>("");
  const [currentAddress, setCurrentAddress] = useState<string | null>("");
  const [currentLatLong, setCurrentLatLong] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
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
    navigation.navigate(ScreenNames.search, {
      currentLatLong: currentLatLong,
    });
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
    setMainCategoryName(name);
    handleSubCategoryListApi(mainCategoryId);
    if (currentLatLong) {
      handleBestProductsSellerListApi(
        mainCategoryId,
        name.toLowerCase(),
        currentLatLong.latitude,
        currentLatLong.longitude
      );
    }
  };

  // handleSellAllCategories
  const handleSellAllCategories = () => {
    navigation.navigate(ScreenNames.allCategories, {
      mainCategoryId: mainCategoryId,
      mainCategoryName: mainCategoryName,
      currentLatLong: currentLatLong,
    });
  };

  // handleSellAllBestSellers
  const handleSellAllBestSellers = () => {
    navigation.navigate(ScreenNames.allBestSellers, {
      mainCategoryId: mainCategoryId,

      type: isGroceriesFoodSelected.toLowerCase(),
      currentLatLong: currentLatLong,
    });
  };

  const onPressRestaurant = (vendor_id: string) => {
    navigation.navigate(ScreenNames.restaurantDetail, {
      vendor_id: vendor_id,
      customer_latitude: currentLatLong?.latitude,
      customer_longitude: currentLatLong?.longitude,
      mainCategoryId: mainCategoryId,
    });
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

  const onPressBestProducts = (
    product_id: string,
    variation_id?: string,
    is_variation?: boolean,
    is_color?: boolean,
    is_size?: boolean,
    color_id?: string,
    size_id?: string
  ) => {
    console.log("color_id", color_id);
    console.log("size_id", size_id);

    navigation.navigate(ScreenNames.productDetail, {
      product_id: product_id,
      variation_id: variation_id,
      customer_latitude: currentLatLong?.latitude,
      customer_longitude: currentLatLong?.longitude,
      is_variation: is_variation,
      is_color: is_color,
      is_size: is_size,
      color_id: color_id,
      size_id: size_id,
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
      const response = await mainCategoryListApi(
        dictData,
        isGuestUser,
        navigation
      );
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "MAIN CATEGORY LIST RESPONSE===>",
            JSON.stringify(response)
          );
        const data = response.data as MainCategoryListItem;
        if (response.code === statusCodes.success) {
          setArrMainCategoryList(Array.isArray(data) ? data : [data]);
          setMainCategoryName(
            Array.isArray(data) && data.length > 0 ? data[0].name : ""
          );
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
      const response = await bannerListApi({}, isGuestUser, navigation);
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
      const response = await subCategoryListApi(
        dictData,
        isGuestUser,
        navigation
      );
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
  const handleBestProductsSellerListApi = async (
    mainCategoryId: String,
    name: string,
    customer_latitude: number,
    customer_longitude: number
  ) => {
    const dictData = {
      category_id: mainCategoryId,
      page_number: bestProductsSellerPageNumber,
      type: name,
      customer_latitude: customer_latitude?.toString(),
      customer_longitude: customer_longitude?.toString(),
    };
    try {
      const response = await bestProductsSellerListApi(
        dictData,
        isGuestUser,
        navigation
      );
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
          setArrBestProductsSellers([]);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  // handleCurrentLocation
  const handleCurrentLocation = async () => {
    toggleLoader(true);
    const current = await LocationManager.getCurrentLocation();
    if (current) {
      setCurrentLatLong(current);
      const address = await LocationManager.getFormattedAddress(current);
      console.log("currentAddress", address);
      setCurrentAddress(address);

      // ✅ Other initial APIs
      handleMainCategoryListApi();

      handleSubCategoryListApi(mainCategoryId);

      // ✅ Now call the API after lat/long is ready
      handleBestProductsSellerListApi(
        mainCategoryId,
        isGroceriesFoodSelected,
        current.latitude,
        current.longitude
      );
    }
    toggleLoader(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      setIsGroceriesFoodSelected("Groceries");
      // ✅ Get location & then call product API
      handleCurrentLocation();
      handleBannerListApi();
      StatusBar.setBarStyle("light-content");
      // Fetch Guest User
      MmkvManager.getData(MmkvManager.Keys.isGuestUser, (storedValue) => {
        console.log("isGuestUser=====>", Boolean(storedValue));

        setIsGuestUser(Boolean(storedValue));
      });

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
