import React, { useEffect, useState } from "react";
import HomeComponent from "../../../components/bottomTabs/home";
import { ScreenNames } from "../../../routers";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "react-native";
import {
  AdItem,
  BestProductSellerData,
  MainCategoryListItem,
  SubCategoryListItem,
} from "../../../constants/interfaces";
import { flashMessageWarning } from "../../../constants/GConstant";
import { statusCodes } from "../../../api/APIConstant";
import { zustandStore } from "../../../store";
import { MmkvManager } from "../../../constants/utils/MmkvManager";

const HomeContainer = ({ navigation }: any) => {
  const currentLatLong = zustandStore.AddressStore(
    (state) => state.currentLocation
  );
  const formattedAddress = zustandStore.AddressStore(
    (state) => state.formattedAddress
  );
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

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [mainCategoryPageNumber] = useState<number>(1);
  const [subCategoryPageNumber] = useState<number>(1);
  const [hasLoadedMainCategories, setHasLoadedMainCategories] =
    useState<boolean>(false);

  const handleSetBannerIndex = (index: number) => {
    setCurrentBannerIndex(index);
  };

  const onPressSearch = () => {
    navigation.navigate(ScreenNames.search, { currentLatLong });
  };

  const onPressLocation = () => {
    navigation.navigate(ScreenNames.manageAddress, { navigateFromHome: true });
  };

  const onPressMainCategory = (
    name: string,
    selectedMainCategoryId: string
  ) => {
    const selectedType = name.toLowerCase();

    if (isGroceriesFoodSelected.toLowerCase() === selectedType) return;

    setArrBestProductsSellers([]);
    setIsGroceriesFoodSelected(name);
    setMainCategoryId(selectedMainCategoryId);
    setMainCategoryName(name);

    handleSubCategoryListApi(selectedMainCategoryId);

    if (currentLatLong) {
      handleBestProductsSellerListApi(
        selectedMainCategoryId,
        selectedType,
        currentLatLong
      );
    }
  };

  const handleSellAllCategories = () => {
    navigation.navigate(ScreenNames.allCategories, {
      mainCategoryId,
      mainCategoryName,
      currentLatLong,
    });
  };

  const handleSellAllBestProducts = () => {
    navigation.navigate(ScreenNames.allBestProducts, {
      mainCategoryId: "1",
      type: isGroceriesFoodSelected.toLowerCase(),
      currentLatLong,
    });
  };

  const handleSellAllBestSellers = () => {
    navigation.navigate(ScreenNames.allBestSellers, {
      mainCategoryId: "2",
      type: isGroceriesFoodSelected.toLowerCase(),
      currentLatLong,
    });
  };

  const onPressRestaurant = (vendor_id: string) => {
    navigation.navigate(ScreenNames.restaurantDetail, {
      vendor_id,
      customer_latitude: currentLatLong?.latitude,
      customer_longitude: currentLatLong?.longitude,
      mainCategoryId,
    });
  };

  const onPressSubCategories = (
    sub_category_id: string,
    subCategoryName: string
  ) => {
    navigation.navigate(ScreenNames.productListing, {
      mainCategoryId,
      mainCategoryName: mainCategoryName,
      sub_category_id,
      subCategoryName,
      currentLatLong,
    });
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
    navigation.navigate(ScreenNames.productDetail, {
      product_id,
      variation_id,
      customer_latitude: currentLatLong?.latitude,
      customer_longitude: currentLatLong?.longitude,
      is_variation,
      is_color,
      is_size,
      color_id,
      size_id,
    });
  };

  const handleOnPressNotifaicationIcon = () => {
    navigation.navigate(ScreenNames.notification);
  };

  const handleMainCategoryListApi = async () => {
    if (hasLoadedMainCategories) return;

    const dictData = { page_number: mainCategoryPageNumber };
    try {
      const response = await mainCategoryListApi(
        dictData,
        isGuestUser,
        navigation
      );
      if (response?.code === statusCodes.success) {
        const data = response.data as MainCategoryListItem;
        setArrMainCategoryList(Array.isArray(data) ? data : [data]);

        if (!mainCategoryName) {
          setMainCategoryName(
            Array.isArray(data) && data.length > 0 ? data[0].name : ""
          );
        }

        setHasLoadedMainCategories(true);
      } else if (response?.code === statusCodes.invaildOrFail) {
        flashMessageWarning(response.message);
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  const handleBannerListApi = async () => {
    try {
      const response = await bannerListApi({}, isGuestUser, navigation);
      if (response?.code === statusCodes.success) {
        const data = response.data as AdItem;
        setArrAds(Array.isArray(data) ? data : [data]);
      } else if (response?.code === statusCodes.invaildOrFail) {
        flashMessageWarning(response.message);
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  const handleSubCategoryListApi = async (mainCategoryId: string) => {
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
      if (response?.code === statusCodes.success) {
        const data = response.data as SubCategoryListItem;
        setArrSubCategory(Array.isArray(data) ? data : [data]);
      } else if (response?.code === statusCodes.invaildOrFail) {
        flashMessageWarning(response.message);
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  const handleBestProductsSellerListApi = async (
    mainCategoryId: string,
    name: string,
    currentLatLong: any
  ) => {
    const dictData: any = {
      category_id: mainCategoryId,
      page_number: 1,
      customer_latitude: currentLatLong?.latitude?.toString(),
      customer_longitude: currentLatLong?.longitude?.toString(),
      type: name.toLowerCase() === "food" ? "food" : "groceries",
    };

    try {
      const response = await bestProductsSellerListApi(
        dictData,
        isGuestUser,
        navigation
      );
      if (response?.code === statusCodes.success) {
        const rawData = response.data as BestProductSellerData;
        setArrBestProductsSellers(Array.isArray(rawData) ? rawData : []);
      } else {
        setArrBestProductsSellers([]);
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleBannerListApi();
      handleMainCategoryListApi();
      handleSubCategoryListApi(mainCategoryId);

      if (currentLatLong) {
        handleBestProductsSellerListApi(
          mainCategoryId,
          isGroceriesFoodSelected,
          currentLatLong
        );
      }

      StatusBar.setBarStyle("light-content");

      MmkvManager.getData(MmkvManager.Keys.isGuestUser, (storedValue) => {
        setIsGuestUser(Boolean(storedValue));
      });

      return () => {};
    }, [navigation, currentLatLong, mainCategoryId, isGroceriesFoodSelected])
  );

  useEffect(() => {
    setIsGroceriesFoodSelected("Groceries");
  }, []);

  return (
    <HomeComponent
      mainCategoryName={mainCategoryName}
      arrMainCategoryList={arrMainCategoryList}
      arrAds={arrAds}
      arrSubCategory={arrSubCategory}
      arrBestProductsSellers={arrBestProductsSellers}
      onPressMainCategory={onPressMainCategory}
      isGroceriesFoodSelected={isGroceriesFoodSelected}
      handleSetBannerIndex={handleSetBannerIndex}
      currentBannerIndex={currentBannerIndex}
      handleSellAllCategories={handleSellAllCategories}
      handleSellAllBestProducts={handleSellAllBestProducts}
      handleSellAllBestSellers={handleSellAllBestSellers}
      onPressSearch={onPressSearch}
      handleOnPressNotifaicationIcon={handleOnPressNotifaicationIcon}
      onPressLocation={onPressLocation}
      onPressRestaurant={onPressRestaurant}
      onPressSubCategories={onPressSubCategories}
      onPressBestProducts={onPressBestProducts}
      currentAddress={formattedAddress}
    />
  );
};

export default HomeContainer;
