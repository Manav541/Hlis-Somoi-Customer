import { StatusBar } from "react-native";
import React, { useRef, useState } from "react";
import CategoriesComponent from "../../../components/bottomTabs/categories";
import { ScreenNames } from "../../../routers";
import { useFocusEffect } from "@react-navigation/native";
import {
  FashionProduct,
  GroceryProduct,
  MainCategoryListItem,
  Restaurant,
} from "../../../constants/interfaces";
import { statusCodes } from "../../../api/APIConstant";
import {
  flashMessageWarning,
  toggleLoader,
} from "../../../constants/GConstant";
import { zustandStore } from "../../../store";
import LocationManager from "../../../constants/utils/LocationManager";

const CategoriesContainer = ({ navigation }: any) => {
  // API zustand store
  const mainCategoryList = zustandStore.HomeStore(
    (state) => state.mainCategoryList
  );

  const [arrMainCategoryList, setArrMainCategoryList] = useState<
    MainCategoryListItem[]
  >([]);
  const [mainCategoryPageNumber, setMainCategoryPageNumber] =
    useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const hasMountedOnce = useRef(false);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<string | null>("");

  const onPressMainCategories = (
    mainCategoryId: string,
    mainCategoryName: string
  ) => {
    navigation.navigate(ScreenNames.productListing, {
      mainCategoryId: mainCategoryId,
      mainCategoryName: mainCategoryName,
    });
  };

  const onPressLocation = () => {
    navigation.navigate(ScreenNames.manageAddress);
  };
  // handleOnPressNotifaicationIcon
  const handleOnPressNotifaicationIcon = () => {
    navigation.navigate(ScreenNames.notification);
  };

  // handleMainCategoryListApi
  const handleMainCategoryListApi = async (page: number, isLoadMore = false) => {
    if (isLoadMore && isLoadingMore) return;

    if (!isLoadMore) toggleLoader(true);
    else setIsLoadingMore(true);

    const dictData = {
      page_number: page,
    };
    try {
      const response = await mainCategoryList(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "MAIN CATEGORY LIST RESPONSE===>",
            JSON.stringify(response)
          );
        const data = response.data as MainCategoryListItem;
        if (response.code === statusCodes.success) {
          if (Array.isArray(data) && data.length > 0) {
            setArrMainCategoryList((prev) =>
              isLoadMore ? [...prev, ...data] : data
            );
            // Only update the page number if data exists
            setMainCategoryPageNumber(page);
          } else {
            setHasMoreData(false);
          }
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    } finally {
      if (!isLoadMore) toggleLoader(false);
      else setIsLoadingMore(false);
    }
  };

  const loadMoreCategories = () => {
    if (hasMoreData && !isLoadingMore) {
      const nextPage = mainCategoryPageNumber + 1;
      handleMainCategoryListApi(nextPage, true);
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
      setMainCategoryPageNumber(1);
      setHasMoreData(true);
      setArrMainCategoryList([]);
      handleMainCategoryListApi(1, false);
      StatusBar.setBarStyle("light-content");
      return () => {};
    }, [navigation])
  );

  return (
    <CategoriesComponent
      arrMainCategoryList={arrMainCategoryList}
      onPressMainCategories={onPressMainCategories}
      handleOnPressNotifaicationIcon={handleOnPressNotifaicationIcon}
      onPressLocation={onPressLocation}
      loadMoreCategories={loadMoreCategories}
      canLoadMore={canLoadMore}
      setCanLoadMore={setCanLoadMore}
      hasMountedOnce={hasMountedOnce}
      currentAddress={currentAddress}
    />
  );
};

export default CategoriesContainer;
