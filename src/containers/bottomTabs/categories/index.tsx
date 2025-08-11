import { StatusBar } from "react-native";
import React, { useRef, useState } from "react";
import CategoriesComponent from "../../../components/bottomTabs/categories";
import { ScreenNames } from "../../../routers";
import { useFocusEffect } from "@react-navigation/native";
import {
  MainCategoryListItem,
} from "../../../constants/interfaces";
import { statusCodes } from "../../../api/APIConstant";
import {
  showConfirmForGuest,
  toggleLoader,
} from "../../../constants/GConstant";
import { zustandStore } from "../../../store";
import { MmkvManager } from "../../../constants/utils/MmkvManager";
import { colors } from "../../../constants/Colors";

const CategoriesContainer = ({ navigation }: any) => {
  // API zustand store
  const currentLatLong = zustandStore.AddressStore(
    (state) => state.currentLocation
  );
  const currentAddress = zustandStore.AddressStore(
    (state) => state.formattedAddress
  );
  const mainCategoryList = zustandStore.HomeStore(
    (state) => state.mainCategoryList
  );
  const [isGuestUser, setIsGuestUser] = useState<boolean>(false);
  const [arrMainCategoryList, setArrMainCategoryList] = useState<
    MainCategoryListItem[]
  >([]);
  const [mainCategoryPageNumber, setMainCategoryPageNumber] =
    useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const hasMountedOnce = useRef(false);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPressMainCategories = (
    mainCategoryId: string,
    mainCategoryName: string
  ) => {
    navigation.navigate(ScreenNames.productListing, {
      mainCategoryId: mainCategoryId,
      mainCategoryName: mainCategoryName,
      currentLatLong: currentLatLong,
    });
  };

  const onPressLocation = () => {
    if (isGuestUser) {
      showConfirmForGuest(() => {
        navigation.navigate(ScreenNames.signin);
      });
    } else {
      navigation.navigate(ScreenNames.manageAddress, {
        navigateFromHome: true,
      });
    }
  };

  // handleOnPressNotifaicationIcon
  const handleOnPressNotifaicationIcon = () => {
    navigation.navigate(ScreenNames.notification);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    setHasMoreData(true);
    setMainCategoryPageNumber(1);
    handleMainCategoryListApi(1, false);
  };

  const loadMoreCategories = () => {
    if (hasMoreData && !isLoadingMore && hasMountedOnce.current) {
      const nextPage = mainCategoryPageNumber + 1;
      handleMainCategoryListApi(nextPage, true);
    }
  };

  // -------------------------API Calling----------------------------
  // handleMainCategoryListApi
  const handleMainCategoryListApi = async (
    page: number,
    isLoadMore = false
  ) => {
    if (isLoadMore && isLoadingMore) return;

    if (!isLoadMore) toggleLoader(true);
    else setIsLoadingMore(true);

    const dictData = {
      page_number: page,
    };
    try {
      const response = await mainCategoryList(
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

        if (response.code === statusCodes.success) {
          setIsRefreshing(false);
          const data = response.data as MainCategoryListItem;
          if (Array.isArray(data) && data.length > 0) {
            setArrMainCategoryList((prev) =>
              isLoadMore ? [...prev, ...data] : data
            );
            setMainCategoryPageNumber(page);
            setHasMoreData(true);
            // ✅ Set mounted + canLoadMore
            hasMountedOnce.current = true;
            setCanLoadMore(data.length >= 10);
          } else {
            if (!isLoadMore) setArrMainCategoryList([]);
            setHasMoreData(false);
          }
        } else if (response.code === statusCodes.invaildOrFail) {
          setArrMainCategoryList([]);
        } else if (response.code === statusCodes.emptyData) {
          if (!isLoadMore) setArrMainCategoryList([]);
          setHasMoreData(false);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    } finally {
      if (!isLoadMore) toggleLoader(false);
      else setIsLoadingMore(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Fetch Guest User
      MmkvManager.getData(MmkvManager.Keys.isGuestUser, (storedValue) => {
        console.log("isGuestUser=====>", Boolean(storedValue));

        setIsGuestUser(Boolean(storedValue));
      });
      handleMainCategoryListApi(1, false);

      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor(colors.blue4e);
      StatusBar.setTranslucent(false);
      return () => {};
    }, [navigation])
  );

  return (
    <CategoriesComponent
      arrMainCategoryList={arrMainCategoryList}
      onPressMainCategories={onPressMainCategories}
      handleOnPressNotifaicationIcon={handleOnPressNotifaicationIcon}
      onPressLocation={onPressLocation}
      currentAddress={currentAddress}
      // pagination
      loadMoreCategories={loadMoreCategories}
      canLoadMore={canLoadMore}
      setCanLoadMore={setCanLoadMore}
      hasMountedOnce={hasMountedOnce}
      isRefreshing={isRefreshing}
      onRefresh={onRefresh}
    />
  );
};

export default CategoriesContainer;
