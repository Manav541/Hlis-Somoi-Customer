import { Text, StatusBar } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ViewAllBestSellersComponent from "../../components/viewAllBestSellers";
import GlobalBackButton from "../../global/GlobalBackButton";
import { useFocusEffect } from "@react-navigation/native";
import { ScreenNames } from "../../routers";
import { BestProductSellerData } from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import { statusCodes } from "../../api/APIConstant";
import {
  flashMessageWarning,
  showConfirmForGuest,
  toggleLoader,
} from "../../constants/GConstant";
import { zustandStore } from "../../store";
import { MmkvManager } from "../../constants/utils/MmkvManager";

const ViewAllBestSellersContainer = ({ navigation, route }: any) => {
  const bestProductsSellerListApi = zustandStore.HomeStore(
    (state) => state.bestProductsSellerList
  );
  const wishlistStoreApi = zustandStore.MyWishlistStore(
    (state) => state.wishlistStore
  );
  const [isGuestUser, setIsGuestUser] = useState<boolean>(false);
  const [arrBestProductsSellers, setArrBestProductsSellers] = useState<
    BestProductSellerData[]
  >([]);

  const [bestProductsSellerPageNumber, setBestProductsSellerPageNumber] =
    useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const hasMountedOnce = useRef(false);
  const [canLoadMore, setCanLoadMore] = useState(false);

  const mainCategoryId = route.params.mainCategoryId;
  const type = route.params.type;
  const currentLatLong = route.params?.currentLatLong;

  const onPressFavourite = (index: number, vendor_id: string) => {
    if (isGuestUser) {
      showConfirmForGuest(() => {
        navigation.navigate(ScreenNames.signin);
        MmkvManager.setData(MmkvManager.Keys.isGuestUser, "false");
      });
    } else {
      handleWishlistStoreApi(vendor_id, index);
    }
  };

  const onPressRestaurant = (vendor_id: string) => {
    navigation.navigate(ScreenNames.restaurantDetail, {
      vendor_id: vendor_id,
      customer_latitude: currentLatLong?.latitude,
      customer_longitude: currentLatLong?.longitude,
      mainCategoryId: mainCategoryId,
    });
  };

  // ------------------------API Calling---------------------------

  // handleBestProductsSellerListApi
  const handleBestProductsSellerListApi = async (
    page: number,
    isLoadMore: boolean,
    type: string
  ) => {
    if (isLoadMore && isLoadingMore) return;

    if (!isLoadMore) toggleLoader(true);
    else setIsLoadingMore(true);
    const dictData = {
      category_id: mainCategoryId,
      page_number: page,
      type: type,
      customer_latitude: currentLatLong?.latitude.toString(),
      customer_longitude: currentLatLong?.longitude.toString(),
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
        if (response.code === statusCodes.success) {
          const data = response.data as BestProductSellerData[];
          if (Array.isArray(data) && data.length > 0) {
            setArrBestProductsSellers((prev: BestProductSellerData[]) =>
              isLoadMore ? [...prev, ...data] : data
            );

            // Only update the page number if data exists
            setBestProductsSellerPageNumber(page);
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

  // handleWishlistStoreApi
  const handleWishlistStoreApi = async (vendor_id: string, index: number) => {
    const dictData = {
      vendor_id: vendor_id,
    };
    try {
      const response = await wishlistStoreApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("WISHLIST STORE RESPONSE===>", JSON.stringify(response));
        if (response.code === statusCodes.success) {
          const updatedList = [...arrBestProductsSellers];
          updatedList[index].is_store_wishlisted =
            !updatedList[index].is_store_wishlisted;
          setArrBestProductsSellers(updatedList);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {ScreenNames.allBestSellers}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  const loadMoreCategories = () => {
    if (hasMoreData && !isLoadingMore) {
      const nextPage = bestProductsSellerPageNumber + 1;
      handleBestProductsSellerListApi(nextPage, true, type);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Fetch Guest User
      MmkvManager.getData(MmkvManager.Keys.isGuestUser, (storedValue) => {
        console.log("isGuestUser=====>", Boolean(storedValue));

        setIsGuestUser(Boolean(storedValue));
      });
      setBestProductsSellerPageNumber(1);
      setHasMoreData(true);
      setArrBestProductsSellers([]);
      handleBestProductsSellerListApi(1, false, type);
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <ViewAllBestSellersComponent
      arrBestProductsSellers={arrBestProductsSellers}
      onPressFavourite={onPressFavourite}
      onPressRestaurant={onPressRestaurant}
      loadMoreCategories={loadMoreCategories}
      canLoadMore={canLoadMore}
      setCanLoadMore={setCanLoadMore}
      hasMountedOnce={hasMountedOnce}
    />
  );
};

export default ViewAllBestSellersContainer;
