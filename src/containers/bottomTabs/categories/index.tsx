import { StatusBar } from "react-native";
import React, { useRef, useState } from "react";
import CategoriesComponent from "../../../components/bottomTabs/categories";
import { ScreenNames } from "../../../routers";
import { useFocusEffect } from "@react-navigation/native";
import {
  MainCategoryListItem,
  Restaurant,
} from "../../../constants/interfaces";
import { statusCodes } from "../../../api/APIConstant";
import {
  flashMessageWarning,
  showConfirmForGuest,
  toggleLoader,
} from "../../../constants/GConstant";
import { zustandStore } from "../../../store";
import LocationManager from "../../../constants/utils/LocationManager";
import { MmkvManager } from "../../../constants/utils/MmkvManager";

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
  // const [currentLatLong, setCurrentLatLong] = useState<{
  //   latitude: number;
  //   longitude: number;
  // } | null>(null);
  // const [currentAddress, setCurrentAddress] = useState<string | null>("");
  const hasSelectedAddressRef = React.useRef(false);

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
  // const handleCurrentLocation = async () => {
  //   toggleLoader(true);
  //   const current = await LocationManager.getCurrentLocation();
  //   if (current) {
  //     setCurrentLatLong(current);
  //     console.log("current ", current);

  //     const address = await LocationManager.getFormattedAddress(current);
  //     console.log("currentAddress", address);
  //     setCurrentAddress(address);

  //     handleMainCategoryListApi(1, false);
  //   }
  //   toggleLoader(false);
  // };

  useFocusEffect(
    React.useCallback(() => {
      // Fetch Guest User
      MmkvManager.getData(MmkvManager.Keys.isGuestUser, (storedValue) => {
        console.log("isGuestUser=====>", Boolean(storedValue));

        setIsGuestUser(Boolean(storedValue));
      });
      // if (!hasSelectedAddressRef.current) {
      //   handleCurrentLocation();
      // }
      handleMainCategoryListApi(1, false);
      setMainCategoryPageNumber(1);
      setHasMoreData(true);
      setArrMainCategoryList([]);

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
